/**
 * Обертка для try catch
 * @param {Function} cb - коллбэк исполнения
 * @param {Function=} errCb - обработчик ошибки
 * @param {Function=} finalCb - финальный обработчик
 * @param {boolean=} noThrow - флаг определяющий, будет ли выкинута ошибка из catch
 * @returns {Promise} - thenable
 */
sap.ui.define([], () => {
  return async ({ cb, errCb, finalCb, noThrow = false }) => {
    try {
      return await cb();
    } catch (err) {
      if (errCb) {
        await errCb(err);
      }

      if (!noThrow) throw err;
    } finally {
      if (finalCb) {
        await finalCb();
      }
    }
  };
});
