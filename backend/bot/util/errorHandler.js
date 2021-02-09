const asyncWrapper = (fn) => {
  return async function (ctx, next) {
    try {
      return await fn(ctx);
    } catch (error) {
      console.log(ctx, 'asyncWrapper error, %O', error);
      await ctx.reply('Произошла какая-то ошибка на сервере, попробуй еще раз');
      return next();
    }
  };
};

export default asyncWrapper;
