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
  let jopa = await schedueledSession
    .find({
      registeredUsers: { $in: [user._id] },
    })
    .populate('class')
    .sort({ start: 1 });

  process.env[ctx.from.id] = {};
  process.env[ctx.from.id].atSessions = jopa;
  let msg = '\n';
  for (let i = 0; i < jopa.length; ++i) {
    msg += `${i + 1} : ${jopa[i].start.getMonth() + 1}.${jopa[
      i
    ].start.getDate()}.${jopa[i].start.getHours()}:${jopa[
      i
    ].start.getMinutes()} ${jopa[i].class.name} \n\n`;
  }
  const { backKeyboard } = getBackKeyboard(ctx);
  ctx.reply(
    `Тебе предстоит посетить следующие тренировки: \n${msg}\nЧерез пробел введи номера тренировок, от которых хочешь отказаться. Обрати внимание, что если до тренировки осталось меньше 5 часов, то мы не вернем за нее деньги`,
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
            5 * 60 * 60 * 1000
          ) {
            returning += 1;
          }
        }
        let delta = returning + user.availableSessions;
        await User.updateOne(
          {
            _id: user._id,
          },
          {
            availableSessions: delta,
          }
        );
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
