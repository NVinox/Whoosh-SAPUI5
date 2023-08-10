sap.ui.define(
  [
    "App/base/BaseController", 
    "App/core/model/App",
    "sap/ui/Device",
  ], function 
  (
    BaseController, 
    AppModel,
    Device,
    ) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();

      Device.media.attachHandler(this.sizeChanged, this, "MainRangeSet");

      this.sizeChanged(Device.media.getCurrentRange("MainRangeSet"));
    },

    onAfterRendering() {
      this.sliderInit();
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
    },

    // Метод изменения размера экрана
    sizeChanged(params) {
      this.getModel("AppMainModel").setProperty("/typeSize", params.from);
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
