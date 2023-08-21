sap.ui.define(
  ["App/base/BaseController", "App/core/model/App", "sap/ui/Device", "App/services/App", "App/helpers/index"],
  function (BaseController, AppModel, Device, AppServices, Helpers) {
    return BaseController.extend("App.core.controller.App", {
      onInit() {
        // debugger;
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
            let states = await AppServices.getStates();
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

      onAfterRendering() {
        let tapBox = this.byId("tapBox");
        let delegateObject = {
          onclick: () => this.onToggleSideMenu(),
        };
        tapBox.addEventDelegate(delegateObject);
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

      onLogoPress(oEvent) {
        this.getRouter().navTo("Main");
      },

      onSendPress(oEvent) {
        // debugger;
        this.getRouter().navTo("Send");
      },
    });
  },
);
