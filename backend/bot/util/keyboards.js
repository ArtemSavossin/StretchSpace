import { Markup } from 'telegraf';

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx) => {
  const backKeyboardBack = 'Вернуться в меню';
  let backKeyboard = Markup.keyboard([backKeyboardBack]);

  backKeyboard = backKeyboard.resize();

  return {
    backKeyboard,
    backKeyboardBack,
  };
};

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx) => {
  const mainKeyboardSessions = 'Мои тренировки';
  const mainKeyboardScheduele = 'Расписание';
  const mainKeyboardPrices = 'Прайс-лист';
  const mainKeyboardWhatToWhear = 'Одежда для тренировок';
  const mainKeyboardEntrance = 'Где находится вход?';
  const mainKeyboardContact = 'Мне нужна помощь';
  let mainKeyboard = Markup.keyboard([
    [mainKeyboardSessions, mainKeyboardScheduele],
    [mainKeyboardPrices, mainKeyboardWhatToWhear],
    [mainKeyboardEntrance, mainKeyboardContact],
  ]);
  mainKeyboard = mainKeyboard.resize();

  return {
    mainKeyboard,
    mainKeyboardSessions,
    mainKeyboardScheduele,
    mainKeyboardPrices,
    mainKeyboardWhatToWhear,
    mainKeyboardEntrance,
    mainKeyboardContact,
  };
};

export const getRegisterKeyboard = (ctx) => {
  const registerKeyboardContinue = 'Продолжить';
  let registerKeyboard = Markup.keyboard([[registerKeyboardContinue]]);
  registerKeyboard = registerKeyboard.resize();

  return {
    registerKeyboard,
    registerKeyboardContinue,
  };
};

export const getMyTrainingsKeyboard = (ctx) => {
  const myTrainingsKeyboardCheckin = 'Записаться на тренировку';
  const myTrainingsKeyboardCheckout = 'Отписаться от тренировки';
  const myTrainingsKeyboardHistory = 'История тренировок';
  const myTrainingsKeyboardBack = 'Вернуться в меню';
  let myTrainingsKeyboard = Markup.keyboard([
    [myTrainingsKeyboardCheckin, myTrainingsKeyboardCheckout],
    [myTrainingsKeyboardHistory, myTrainingsKeyboardBack],
  ]);
  myTrainingsKeyboard = myTrainingsKeyboard.resize();

  return {
    getMyTrainingsKeyboard,
    myTrainingsKeyboard,
    myTrainingsKeyboardCheckin,
    myTrainingsKeyboardCheckout,
    myTrainingsKeyboardHistory,
    myTrainingsKeyboardBack,
  };
};

export const getSchedueleKeyboard = (ctx) => {
  const schedueleKeyboardRegister = 'Записаться на тренировку';
  const schedueleKeyboardBack = 'Вернуться в меню';
  const schedueleKeyboardFlexCore = 'Flex Core';
  const schedueleKeyboardFronSplit = 'Front Split';
  const schedueleKeyboardBootcamp = 'Bootcamp';
  const schedueleKeyboardSideSplit = 'Side split';
  const schedueleKeyboardAbsCore = 'Abs&core';
  const schedueleKeyboardRelax = 'Relax';
  let schedueleKeyboard = Markup.keyboard([
    [schedueleKeyboardRegister, schedueleKeyboardBack],
    [schedueleKeyboardFlexCore, schedueleKeyboardFronSplit],
    [schedueleKeyboardBootcamp, schedueleKeyboardSideSplit],
    [schedueleKeyboardAbsCore, schedueleKeyboardRelax],
  ]);
  schedueleKeyboard = schedueleKeyboard.resize();

  return {
    schedueleKeyboard,
    schedueleKeyboardRegister,
    schedueleKeyboardBack,
    schedueleKeyboardFlexCore,
    schedueleKeyboardFronSplit,
    schedueleKeyboardBootcamp,
    schedueleKeyboardSideSplit,
    schedueleKeyboardAbsCore,
    schedueleKeyboardRelax,
  };
};

export const getHelpKeyboard = (ctx) => {
  const helpKeyboardNotify = '💔';
  const helpKeyboardInfo = 'Как тут все работает?';
  const helpKeyboardBack = 'Вернуться в меню';
  let helpKeyboard = Markup.keyboard([
    [helpKeyboardNotify, helpKeyboardInfo],
    [helpKeyboardBack],
  ]);

  helpKeyboard = helpKeyboard.resize();

  return {
    helpKeyboard,
    helpKeyboardNotify,
    helpKeyboardInfo,
    helpKeyboardBack,
  };
};
