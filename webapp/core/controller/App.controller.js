sap.ui.define(["App/base/BaseController", "App/core/model/App", "sap/ui/Device"], function (BaseController, AppModel, Device) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();

      Device.media.attachHandler(this.sizeChanged, this, "MainRangeSet");

      this.sizeChanged(Device.media.getCurrentRange("MainRangeSet"));
    },

    onAfterRendering() {
      this.sliderInit();
      this.setSliderSlidesToShow();
      let tapBox = this.byId("tapBox");
      let delegateObject = {
        onclick: () => this.onToggleSideMenu(),
      };
      tapBox.addEventDelegate(delegateObject);
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
    },

    // Метод изменения размера экрана
    sizeChanged(params) {
      this.getModel("AppMainModel").setProperty("/typeSize", params.from);
      this.setSliderSlidesToShow();
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

    setSliderSlidesToShow() {
      let mainModel = this.getModel("AppMainModel");
      let typeSize = mainModel.getProperty("/typeSize");

      if (typeSize < 1024) {
        $(".slider").slick("setOption", "slidesToShow", 3);
      } else {
        $(".slider").slick("setOption", "slidesToShow", 5);
      }
    },

    // Метод показа/скрытия дополнительной информации
    onInfoToggle() {
      let mainModel = this.getModel("AppMainModel");
      let isSelected = mainModel.getProperty("/infoText/isVisible");

      mainModel.setProperty("/infoText/isVisible", !isSelected);
    },

    // Метод показа/скрытия бокового меню
    onToggleSideMenu() {
      let mainModel = this.getModel("AppMainModel");
      let sideMenu = this.byId("sideMenu");

      let isClosed = mainModel.getProperty("/sideMenu/isClosed");
      let sideMenuClass = (state) => (state ? "side-menu_closed" : "side-menu_opened");

      mainModel.setProperty("/sideMenu/isClosed", !isClosed);
      sideMenu.addStyleClass(sideMenuClass(!isClosed));
      sideMenu.removeStyleClass(sideMenuClass(isClosed));
    },
  });
});
