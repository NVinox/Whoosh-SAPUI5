sap.ui.define(
  ["App/base/BaseController", "App/core/model/App", "sap/ui/Device", "App/services/App", "App/helpers/index"],
  function (BaseController, AppModel, Device, AppServices, Helpers) {
    return BaseController.extend("App.core.controller.App", {
      onInit() {
        this.setModels();

        Device.media.attachHandler(this.sizeChanged, this, "MainRangeSet");

        this.sizeChanged(Device.media.getCurrentRange("MainRangeSet"));
        this.setPageInfo();
      },

      // Метод установки моделей
      setModels() {
        this.setModel(AppModel.main, "AppMainModel");
        this.setModel(AppModel.ui, "AppUiModel");
      },

      // Метод установки данных страницы в модель
      setPageInfo() {
        let uiModel = this.getModel("AppUiModel");
        let mainModel = this.getModel("AppMainModel");

        uiModel.setProperty("/isLoading", true);
        Helpers.trackExec({
          cb: async () => {
            let states = await AppServices.getCompanyCities();
            let navigations = await AppServices.getNavigation();

            mainModel.setProperty("/states", states);
            mainModel.setProperty("/footer", navigations);
          },
          errCb: (err) => {
            let errorAPI = err?.response?.data?.errors?.[0]?.text;

            throw new Error(errorAPI);
          },
          finalCb: () => {
            uiModel.setProperty("/isLoading", false);
          },
        });
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

      onAfterRendering() {
        this.partnersSliderInit();
        this.sliderInit();
        let tapBox = this.byId("tapBox");
        let delegateObject = {
          onclick: () => this.onToggleSideMenu(),
        };
        tapBox.addEventDelegate(delegateObject);
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

      // Обработчик перехода на ссылку соц медиа
      onNavSocial(oEvent) {
        let { socialLink } = oEvent.getSource().data();

        window.open(socialLink);
      },
    });
  },
);
