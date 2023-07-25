sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Core"], (Controller, Core) => {
    return Controller.extend("App.base.BaseController", {
        /**
         * Получение модели, если модель i18n - получаем бандл ресурса переводов
         * @param {string=} sName имя модели
         * @returns {sap.ui.model.Model} инстанс модели
         */
        getModel(sName) {
            if (sName === "i18n") {
                return Core.getModel(sName);
            }

            return this.getView().getModel(sName);
        },

        /**
         * Установка модели
         * @param {BaseModel} BaseModel - инстанс модели
         * @param {string=} name - имя модели
         * @returns {sap.ui.mvc.View} - инстанс View
         */
        setModel(BaseModel, name) {
            return this.getView().setModel(BaseModel, name);
        },
    });
});
