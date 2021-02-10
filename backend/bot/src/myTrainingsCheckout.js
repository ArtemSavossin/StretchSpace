import { Scenes } from 'telegraf';
import { getMainKeyboard, getBackKeyboard } from '../util/keyboards.js';
import schedueledSession from '../../models/schedueledSessionModel.js';
import User from '../../models/userModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { leave } = Scenes.Stage;
const myTrainingsCheckout = new Scenes.BaseScene('myTrainingsCheckout');

myTrainingsCheckout.enter(async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });
  let scSessions = await schedueledSession
    .find({
      registeredUsers: { $in: [user._id] },
      start: { $gte: new Date() },
    })
    .populate('class')
    .sort({ start: 1 });

  process.env[ctx.from.id] = {};
  process.env[ctx.from.id].atSessions = scSessions;
  let msg = '\n';
  for (let i = 0; i < scSessions.length; ++i) {
    msg += `${i + 1}) ${scSessions[i].start.getMonth() + 1}.${scSessions[
      i
    ].start.getDate()} - ${scSessions[i].start.getHours()}:${scSessions[
      i
    ].start.getMinutes()} ${scSessions[i].class.name} \n\n`;
  }
  const { backKeyboard } = getBackKeyboard(ctx);
  ctx.reply(
    `Тебе предстоит посетить следующие тренировки: \n${msg}\nЧерез пробел введи номера тренировок, от которых хочешь отказаться. Обрати внимание, что если до тренировки осталось меньше 6 часов, то мы не вернем за нее деньги`,
    backKeyboard
  );
});

myTrainingsCheckout.on('text', async (ctx) => {
  switch (ctx.update.message.text) {
    case 'Вернуться в меню':
      ctx.scene.leave();
      ctx.scene.enter('myTrainings');
      break;
    default:
      const choosen = ctx.update.message.text
        .split(' ')
        .map((x) => parseInt(x));
      if (choosen.length) {
        const user = await User.findOne({ telegramId: ctx.from.id });
        let returning = 0;
        const date = new Date();
        for (let i = 0; i < choosen.length; ++i) {
          await schedueledSession.updateOne(
            {
              _id: process.env[ctx.from.id].atSessions[choosen[i] - 1]._id,
            },
            {
              $pull: { registeredUsers: mongoose.Types.ObjectId(user._id) },
            }
          );
          if (
            Number(process.env[ctx.from.id].atSessions[choosen[i] - 1].start) -
              Number(date) >=
            6 * 60 * 60 * 1000
          ) {
            returning += 1;
          }
        }
        let delta = returning + user.availableSessions;
        if (!user.hasCertifiacte) {
          await User.updateOne(
            {
              _id: user._id,
            },
            {
              availableSessions: delta,
            }
          );
        }
        ctx.reply('Отписал');
      } else {
        ctx.reply(
          'Я не поддерживаю такое сообщение, нажми на одну из кнопок, чтобы взаимодействовать'
        );
      }
      break;
  }
});

export default myTrainingsCheckout;
