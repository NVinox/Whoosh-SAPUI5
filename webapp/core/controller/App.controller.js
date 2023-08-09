sap.ui.define(["App/base/BaseController", "App/core/model/App"], function (BaseController, AppModel) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();
    },

    onAfterRendering() {
      this.sliderInit();
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
    },

    // Инициализация slick
    sliderInit() {
      $(".slider").slick({
        slidesToShow: 5,
        swipeToSlide: true,

        prevArrow: `<Button class="button button_left" ><img src="/assets/images/payment/left.svg" /></button>`,
        nextArrow: `<Button class="button button_right" ><img src="/assets/images/payment/right.svg" /></button>`,
      });
    },

    // Метод показа/скрытия дополнительной информации
    onInfoToggle() {
      let mainModel = this.getModel("AppMainModel");
      let isSelected = mainModel.getProperty("/infoText/isVisible");

      mainModel.setProperty("/infoText/isVisible", !isSelected);
    },
  });
});
