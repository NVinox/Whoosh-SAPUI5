sap.ui.define(
  ["App/base/BaseController", "App/base/App/BaseMainPageModel", "sap/ui/Device"],
  function (BaseController, BaseMainPageModel, Device) {
    return BaseController.extend("App.base.BaseMainPageController", {
      onInit() {
        console.log("Main");
        this.setModels();

        Device.media.attachHandler(this.sizeChanged, this, "MainRangeSet");

        this.sizeChanged(Device.media.getCurrentRange("MainRangeSet"));

        let slidersF = this.slidersInit.bind(this);
        setTimeout(slidersF, 3000);
      },

      // Метод установки моделей
      setModels() {
        this.setModel(BaseMainPageModel.ui, "BaseUiModel");
        this.setModel(BaseMainPageModel.main, "BaseMainModel");
      },

      onAfterRendering() {
        this.slidersInit();
      },

      //Метод инициализации слайдеров
      slidersInit() {
        this.partnersSliderInit();
        this.sliderInit();
      },

      // Метод изменения размера экрана
      sizeChanged(params) {
        BaseMainPageModel.main.setProperty("/typeSize", params.from);
      },

      // Инициализация слайдера Partners
      partnersSliderInit() {
        let sliders = $(".partners-slider:not(.slick-initialized)");
        sliders.each(function () {
          $(this).slick({
            centerMode: true,
            slidesToShow: 1,
            arrows: false,
            centerPadding: "77px",
            initialSlide: 2,
          });
        });
      },

      // Инициализация слайдера Payment
      sliderInit() {
        let sliders = $(".slider:not(.slick-initialized)");
        let delay = +BaseMainPageModel.main.getProperty("/pageInfo/paymentMethods/sliderTimeout") * 1000;

        sliders.each(function () {
          $(this).slick({
            slidesToShow: 5,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: delay,

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
        });
      },

      // Метод показа/скрытия дополнительной информации
      onInfoToggle() {
        let isSelected = BaseMainPageModel.main.getProperty("/infoText/isVisible");
        BaseMainPageModel.main.setProperty("/infoText/isVisible", !isSelected);
      },

      // Обработчик перехода на ссылку соц медиа
      onNavSocial(oEvent) {
        let { socialLink } = oEvent.getSource().data();

        window.open(socialLink);
      },
    });
  },
);
