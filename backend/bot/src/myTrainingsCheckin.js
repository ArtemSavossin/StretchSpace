import { Scenes } from 'telegraf';
import { getMainKeyboard, getBackKeyboard } from '../util/keyboards.js';
import Session from '../../models/sessionModel.js';
import dotenv from 'dotenv';
import schedueledSession from '../../models/schedueledSessionModel.js';
import User from '../../models/userModel.js';
import mongoose from 'mongoose';

dotenv.config();

const { leave } = Scenes.Stage;
const myTrainingsCheckin = new Scenes.BaseScene('myTrainingsCheckin');

myTrainingsCheckin.enter(async (ctx) => {
  let date = new Date();
  let end = Number(date) + 14 * 24 * 60 * 60 * 1000;
  const user = await User.findOne({ telegramId: ctx.from.id });
  const finish = user.sessionsValidUntil
    ? Number(user.sessionsValidUntil) < end
      ? user.sessionsValidUntil
      : new Date(end)
    : new Date(end);

  let scSessions = await schedueledSession
    .find({
      start: { $gte: date, $lte: finish },
    })
    .populate('class')
    .sort({ start: 1 });

  scSessions = scSessions.filter(
    (s) =>
      s.class.availablePlace > s.registeredUsers.length + s.waitList.length &&
      !s.registeredUsers.includes(user._id)
  );
  process.env[ctx.from.id] = {};
  process.env[ctx.from.id].sessions = scSessions;
  let msg = '\n';
  for (let i = 0; i < scSessions.length; ++i) {
    msg += `${i + 1}) ${scSessions[i].start.getMonth() + 1}.${scSessions[
      i
    ].start.getDate()} - ${scSessions[i].start.getHours()}:${scSessions[
      i
    ].start.getMinutes()} ${scSessions[i].class.name}\n\n`;
  }
  msg +=
    '\n введи через пробел номера тренировок, на которые хочешь записаться';
  const { backKeyboard } = getBackKeyboard(ctx);
  ctx.reply(
    'Список доступных на данный момент тренировок\n' + msg,
    backKeyboard
  );
});

myTrainingsCheckin.on('text', async (ctx) => {
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
        if (user.availableSessions >= choosen.length || user.hasCertifiacte) {
          const delta = user.availableSessions - choosen.length;
          for (let i = 0; i < choosen.length; ++i) {
            console.log(process.env[ctx.from.id].sessions[choosen[i] - 1]._id);
            await schedueledSession.updateOne(
              {
                _id: process.env[ctx.from.id].sessions[choosen[i] - 1]._id,
              },
              {
                $push: { registeredUsers: mongoose.Types.ObjectId(user._id) },
              }
            );
          }
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
          ctx.reply('Записал');
        } else {
          ctx.reply(
            `Было введено больше тренировок, чем тебе доступно. Доступно тренировок: ${user.availableSessions}`
          );
        }
      } else {
        ctx.reply(
          'Я не поддерживаю такое сообщение, нажми на одну из кнопок, чтобы взаимодействовать'
        );
      }
      break;
  }
});

export default myTrainingsCheckin;
