import { Scenes } from 'telegraf';
import User from '../../models/userModel.js';
import dotenv from 'dotenv';
import {
  getMainKeyboard,
  getRegisterKeyboard,
} from '../../bot/util/keyboards.js';
dotenv.config();

const { leave } = Scenes.Stage;
const start = new Scenes.BaseScene('start');

start.enter(async (ctx) => {
  const uid = String(ctx.from.id);
  console.log(ctx.chat);
  console.log(ctx.from);
  const user = await User.findOne({ telegramId: uid });

  const { mainKeyboard } = getMainKeyboard(ctx);
  console.log('user is', user);
  if (user) {
    await ctx.reply('С возвращением', mainKeyboard);

    ctx.scene.leave();
    ctx.scene.enter('main');
  } else {
    await ctx.reply(
      'Добро пожаловать в Stretching Space! ❤\
      Давайте знакомится: введите свой номер телефона, пожалуйста.'
    );
  }
});

start.on('text', async (ctx) => {
  const msg = ctx.update.message.text.replace(/\D/g, '').slice(1);
  console.log(msg);
  console.log('phone is', msg);
  if (parseInt(msg) && msg.length === 10) {
    ctx.scene.leave();
    const user = await User.findOne({ phone: `+7${msg}` });
    console.log('user i text is', user);
    if (user) {
      const { mainKeyboard } = getMainKeyboard(ctx);
      ctx.reply(
        `Привет, ${user.name}. Выбери, что хочешь делать`,
        mainKeyboard
      );
      ctx.scene.enter('main');
    } else {
      const uid = String(ctx.from.id);
      process.env[uid] = `+7${msg}`;
      ctx.scene.enter('register');
    }
  } else {
    ctx.reply(
      'Кажется, был введен некорректный номер телефона =( \nПопробуй еще раз'
    );
  }
});

start.command('saveme', leave());
start.action(/confirmAccount/, async () => {
  await ctx.answerCbQuery();
  ctx.scene.leave();
});

export default start;
