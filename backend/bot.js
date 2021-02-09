import { Telegraf, Scenes, session } from 'telegraf';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import register from './bot/src/register.js';
import start from './bot/src/start.js';
import firstMain from './bot/src/firstMain.js';
import main from './bot/src/main.js';
import myTrainings from './bot/src/myTrainings.js';
import myTrainingsCheckin from './bot/src/myTrainingsCheckin.js';
import myTrainingsCheckout from './bot/src/myTrainingsCheckout.js';
import scheduele from './bot/src/scheduele.js';
import asyncWrapper from './bot/util/errorHandler.js';
dotenv.config();

connectDB();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const stage = new Scenes.Stage([
  start,
  register,
  firstMain,
  main,
  scheduele,
  myTrainings,
  myTrainingsCheckin,
  myTrainingsCheckout,
]);
console.log('ok');
bot.use(session());
bot.use(stage.middleware());
bot.start(async (ctx) => {
  ctx.scene.enter('start');
});
bot.hears('text', (ctx) => {
  ctx.reply('not started but hears');
});
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
