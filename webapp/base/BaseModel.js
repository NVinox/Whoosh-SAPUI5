sap.ui.define(["sap/ui/model/json/JSONModel"], (JSONModel) => {
  return JSONModel.extend("App.base.BaseModel", {
    _initialModel: null,

    constructor: function () {
      JSONModel.prototype.constructor.apply(this, arguments);
      this.init();
    },

    init() {
      this._setInitialModel();
    },

    // Сохранение начального стейта модели в строковом формате
    _setInitialModel() {
      this._initialModel = JSON.stringify(this.getData());
    },

    // Парсинг и получение начального стейта модели
    getInitialModel() {
      return JSON.parse(this._initialModel);
    },

    /**
     * Рекурсивная функция заменяющая данные в модели на начальные
     * @param {Object} initialModel - первоначальный вид модели
     * @param {String} route - путь
     * @param {Array} prop - массив разбитого на части пути
     */
    getClearingItemInInitialModel(initialModel, route, prop) {
      let item = prop[0];

      if (prop.length === 1) {
        this.setProperty(route, initialModel[item]);
      } else {
        this.getClearingItemInInitialModel(initialModel[item], route, prop.slice(1));
      }
    },

    /**
     * Устанавливает модель по указанному пути в initial состояние, если путь не указан, полностью ресетнет модель.
     * @param {string=} route - путь до свойства
     */
    clear(route) {
      if (route) {
        let prop = route.split("/").slice(1);
        let initialModel = this.getInitialModel();

        this.getClearingItemInInitialModel(initialModel, route, prop);
      } else {
        this.setProperty("/", this.getInitialModel());
      }
    },
  });
});
