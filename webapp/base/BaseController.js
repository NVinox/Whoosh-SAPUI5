sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/Core", "App/constants/index", "App/services/Common/Fragments/Fragments"],
  (Controller, Core, { FRAGMENT_TYPES }, FragmentsService) => {
    return Controller.extend("App.base.BaseController", {
      // Пробрасывание имени модалки для её открытия
      onOpenDialog(oEvent) {
        let dialogName = oEvent.getSource().data("dialog-fragment-name");
        this.openFragment(oEvent, dialogName, FRAGMENT_TYPES.DIALOG);
      },

      // Пробрасывание имени поповера для открытия
      onOpenPopover(oEvent) {
        let popoverName = oEvent.getSource().data("popover-fragment-name");
        this.openFragment(oEvent, popoverName, FRAGMENT_TYPES.POPOVER);
      },

      /**
       * Подгрузка и открытие фрагментов
       * @param {string} fragmentName имя фргмента для открытия
       * @param {string} fragmentType тип фргмента для открытия
       */
      async openFragment(oEvent, fragmentName, fragmentType = FRAGMENT_TYPES.DIALOG) {
        let fragment = FragmentsService.getFragmentData(fragmentType, fragmentName);

        if (fragmentType === FRAGMENT_TYPES.POPOVER) {
          let popover = this.byId(fragment.id);

          if (popover?.isOpen()) {
            popover.close();
            return;
          }
        }

        return await FragmentsService.loadFragment.call(
          this,
          {
            ...fragment,
            eventSource: oEvent.getSource(),
          },
          fragmentType,
        );
      },

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
  },
);
