import { Scenes } from 'telegraf';
import {
  getMainKeyboard,
  getBackKeyboard,
  getRegisterKeyboard,
} from '../../bot/util/keyboards.js';
import User from '../../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const { leave } = Scenes.Stage;
const register = new Scenes.BaseScene('register');

register.enter(async (ctx) => {
  const { registerKeyboard } = getRegisterKeyboard(ctx);
  ctx.reply(
    `Рады знакомству, ${ctx.message.from.first_name} ${ctx.message.from.last_name}\n\n\
    Нажми “Продолжить”, если имя указано верно;\n\
    Если хочешь изменить — введи его в сообщении.`,
    registerKeyboard
  );
});

/*register.leave(async (ctx) => {
  console.log(ctx, 'Leaves register scene');
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply('назад', mainKeyboard);
  //deleteFromSession(ctx, 'registerScene');
});

register.command('saveme', leave());
register.hears('keyboards.back_keyboard.back', leave());
register.hears('keyboards.register_keyboard.Продолжить', (ctx) => {
  console.log(ctx);
});*/
register.on('text', async (ctx) => {
  console.log('text');
  console.log(ctx.update.message.text);
  const name =
    ctx.update.message.text === 'Продолжить'
      ? `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
      : ctx.update.message.text;
  const uid = String(ctx.from.id);
  console.log('saved uid is', process.env[uid]);
  const newUser = new User({
    telegramId: uid,
    name: name,
    phone: process.env[uid],
    password: '0000',
  });
  await newUser.save();

  process.env[uid] = undefined;
  const { mainKeyboard } = getMainKeyboard(ctx);
  ctx.reply(
    'Рад сообщить, что новым пользователям мы дарим одно бесплатное занятие.\
    Ты можешь выбрать и записаться на любую из свободных тренировок, для этого перейди в раздел Мои тренировки',
    mainKeyboard
  );
  ctx.scene.leave();
  ctx.scene.enter('firstMain');
});

export default register;
