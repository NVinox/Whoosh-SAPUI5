sap.ui.define(["App/base/BaseController", "App/core/model/App", "sap/ui/Device"], function (BaseController, AppModel, Device) {
  return BaseController.extend("App.core.controller.App", {
    onInit() {
      this.setModels();

      Device.media.attachHandler(this.sizeChanged, this, "MainRangeSet");

      this.sizeChanged(Device.media.getCurrentRange("MainRangeSet"));
    },

    // Метод установки моделей
    setModels() {
      this.setModel(AppModel.main, "AppMainModel");
      this.setModel(AppModel.ui, "AppUiModel");
    },

    onAfterRendering() {
      let mainModel = this.getModel("AppMainModel");
      let i = mainModel.getProperty("/sliders/isInit");
      if (i != 1 && i != 2) {
        this.partnersSliderInit();
        this.sliderInit();
      }
      mainModel.setProperty("/sliders/isInit", ++i);
    },

    // Метод изменения размера экрана
    sizeChanged(params) {
      this.getModel("AppMainModel").setProperty("/typeSize", params.from);
    },

    // Инициализация слайдера Partners
    partnersSliderInit() {
      $(".partners-slider").slick({
        centerMode: true,
        slidesToShow: 1,
        arrows: false,
        centerPadding: "77px",
        initialSlide: 2,
      });
    },

    // Инициализация слайдера Payment
    sliderInit() {
      $(".slider").slick({
        slidesToShow: 5,
        swipeToSlide: true,

        prevArrow: `<Button class="button button_left" ><img src="/assets/images/payment/left.svg" /></button>`,
        nextArrow: `<Button class="button button_right" ><img src="/assets/images/payment/right.svg" /></button>`,

        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              slidesToShow: 3,
            },
          },
        ],
      });
    },

    // Метод показа/скрытия дополнительной информации
    onInfoToggle() {
      let mainModel = this.getModel("AppMainModel");
      let isSelected = mainModel.getProperty("/infoText/isVisible");

      mainModel.setProperty("/infoText/isVisible", !isSelected);
    },

    // Обработчик перехода на ссылку соц медиа
    onNavSocial(oEvent) {
      let { socialLink } = oEvent.getSource().data();

      window.open(socialLink);
    },
  });
});
