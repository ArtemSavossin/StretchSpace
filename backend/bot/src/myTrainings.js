import { Scenes } from 'telegraf';
import {
  getMainKeyboard,
  getBackKeyboard,
  getMyTrainingsKeyboard,
} from '../util/keyboards.js';
import dotenv from 'dotenv';
import schedueledSession from '../../models/schedueledSessionModel.js';
import User from '../../models/userModel.js';
dotenv.config();

const { leave } = Scenes.Stage;
const myTrainings = new Scenes.BaseScene('myTrainings');

myTrainings.enter(async (ctx) => {
  const { myTrainingsKeyboard } = getMyTrainingsKeyboard(ctx);
  ctx.reply(
    'Здесь ты можешь управлять своими тренировками',
    myTrainingsKeyboard
  );
});

myTrainings.on('text', async (ctx) => {
  switch (ctx.update.message.text) {
    case 'Записаться на тренировку':
      ctx.scene.leave();
      ctx.scene.enter('myTrainingsCheckin');
      break;
    case 'Отписаться от тренировки':
      ctx.scene.leave();
      ctx.scene.enter('myTrainingsCheckout');
      break;
    case 'История тренировок':
      const user = await User.findOne({ telegramId: ctx.from.id });
      let scSessions = await schedueledSession
        .find({
          registeredUsers: { $in: [user._id] },
          start: { $lte: new Date() },
        })
        .populate('class')
        .sort({ start: 1 });
      let msg = '\n';
      for (let i = 0; i < scSessions.length; ++i) {
        msg += `${i + 1} : ${scSessions[i].start.getMonth() + 1}.${scSessions[
          i
        ].start.getDate()}.${scSessions[i].start.getHours()}:${scSessions[
          i
        ].start.getMinutes()} ${scSessions[i].class.name}\n\n`;
      }
      const { backKeyboard } = getBackKeyboard(ctx);
      ctx.reply(
        msg +
          `Всего посещено тренировок : ${scSessions.length}\nДоступно тренировок: ${user.availableSessions}`,
        backKeyboard
      );
      break;
    case 'Вернуться в меню':
      ctx.scene.leave();
      ctx.scene.enter('main');
      break;
    default:
      ctx.reply(
        'Я не поддерживаю такое сообщение, нажми на одну из кнопок, чтобы взаимодействовать'
      );
      break;
  }
});

export default myTrainings;
