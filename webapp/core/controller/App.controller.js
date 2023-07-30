sap.ui.define(["App/base/BaseController", "App/core/model/App"], function (BaseController, AppModel) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
    },
  });
});
