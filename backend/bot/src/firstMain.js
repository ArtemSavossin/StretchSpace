import { Scenes } from 'telegraf';
import { getMainKeyboard, getHelpKeyboard } from '../../bot/util/keyboards.js';

const { leave } = Scenes.Stage;
const firstMain = new Scenes.BaseScene('firstMain');

firstMain.enter(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  ctx.reply(
    'Отлично! Ты находишься в главном меню.\n\
  Нажми на “Расписание”, чтобы ознакомиться со временем и видами тренировок.\n\
  Если хочешь записаться на первую пробную тренировку, выбери “Мои тренировки”.',
    mainKeyboard
  );
});

firstMain.on('text', (ctx) => {
  switch (ctx.update.message.text) {
    case 'Мои тренировки':
      ctx.scene.leave();
      ctx.scene.enter('myTrainings');
      break;
    case 'Расписание':
      ctx.scene.leave();
      ctx.scene.enter('scheduele');
      break;
    case 'Прайс-лист':
      ctx.reply('Тут стандартное сообщение');
      break;
    case 'Одежда для тренировок':
      ctx.reply('Тут фото от Жаси');
      break;
    case 'Где находится вход?':
      ctx.reply('Тут карта и фото');
      break;
    case 'Мне нужна помощь':
      const { helpKeyboard } = getHelpKeyboard(ctx);
      ctx.reply(
        'Если возникла проблема с записью или отменой тренировки, нажми на 💔. Мы как можно скорее свяжемся с тобой и все решим',
        helpKeyboard
      );
      break;
    case '💔':
      ctx.reply(
        'Спасибо за твое обращение. Нам жаль, что так вышло. Мы обязательно свяжемся с тобой в ближайшее время!'
      );
      break;
    case 'Как тут все работает?':
      ctx.reply('lalala tri rubla');
      break;
    case 'Вернуться в меню':
      ctx.scene.leave();
      ctx.scene.enter('main');
      break;
    default:
      ctx.reply(
        'Я не поддерживаю такое сообщение, нажми на кнпоку Помощь, чтобы узнать, что я умею'
      );
      break;
  }
});

export default firstMain;
