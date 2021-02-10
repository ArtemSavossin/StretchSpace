import { Scenes } from 'telegraf';
import { getSchedueleKeyboard } from '../../bot/util/keyboards.js';

const { leave } = Scenes.Stage;
const scheduele = new Scenes.BaseScene('scheduele');

scheduele.enter(async (ctx) => {
  const { schedueleKeyboard } = getSchedueleKeyboard(ctx);
  ctx.replyWithPhoto(
    { source: './backend/bot/data/ssScheduele.jpg' },
    schedueleKeyboard
  );
});

scheduele.on('text', (ctx) => {
  switch (ctx.update.message.text) {
    case 'Записаться на тренировку':
      ctx.scene.leave();
      ctx.scene.enter('myTrainings');
      break;
    case 'Вернуться в меню':
      ctx.scene.leave();
      ctx.scene.enter('main');
      break;
    case 'Flex Core':
      ctx.reply('Описание тренировки');
      break;
    case 'Front Split':
      ctx.reply('Описание тренировки');
      break;
    case 'Bootcamp':
      ctx.reply('Описание тренировки');
      break;
    case 'Side split':
      ctx.reply('Описание тренировки');
      break;
    case 'Abs&core':
      ctx.reply('Описание тренировки');
      break;
    case 'Relax':
      ctx.reply('Описание тренировки');
      break;
    default:
      ctx.reply(
        'Я не поддерживаю такое сообщение, нажми на одну из кнопок, чтобы взаимодействовать'
      );
      break;
  }
});

export default scheduele;
