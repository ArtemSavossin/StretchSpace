import { Scenes } from 'telegraf';
import { getMainKeyboard, getHelpKeyboard } from '../../bot/util/keyboards.js';

const { leave } = Scenes.Stage;
const main = new Scenes.BaseScene('main');

main.enter(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  ctx.reply('Ты находишься в главном меню', mainKeyboard);
});

main.on('text', (ctx) => {
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
      ctx.replyWithPhoto({ source: './backend/bot/data/ssPrices.jpg' });
      break;
    case 'Одежда для тренировок':
      ctx.reply(
        'КОМФОРТНАЯ ОДЕЖДА ДЛЯ ПЕРВОЙ ТРЕНИРОВКИ 🤝\n\
          \n\
- спортивный топ/футболка/лонгслив\n\
- лосины/спортивные штаны/шорты\n\
- носки/чешки для растяжки (пн-ср-пт)\n\
- кроссовки для функциональной тренировки (вт-чт)\n\
\n\
Мы рекомендуем собирать волосы в хвост/косу, чтобы не стеснять движения.\
💧 Для поддержания водного баланса в организме возьмите с собой бутылку с водой.\
Йога-мат, эспандеры, блоки и подушки мы предоставим ;)'
      );
      break;
    case 'Где находится вход?':
      ctx.replyWithPhoto({ source: './backend/bot/data/ssRoute.jpg' });
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

export default main;
