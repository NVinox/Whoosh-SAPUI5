sap.ui.define(["App/base/BaseController", "App/core/model/App"], function (BaseController, AppModel) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
    },

    // Метод показа/скрытия дополнительной информации
    onInfoToggle() {
      let mainModel = this.getModel("AppMainModel");
      let isSelected = mainModel.getProperty("/infoText/isVisible");

      mainModel.setProperty("/infoText/isVisible", !isSelected);
    },
  });
});
