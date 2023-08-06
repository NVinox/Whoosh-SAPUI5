sap.ui.define(
  [
    "sap/ui/core/Fragment",
    "App/constants/index",
    "App/services/Common/Fragments/Maps/Dialogs",
    "App/services/Common/Fragments/Maps/Popovers",
  ],
  (Fragment, { FRAGMENT_TYPES }, dialogsMap, popoversMap) => {
    return {
      _dialogFragmentsDataMap: dialogsMap,
      _popoverFragmentsDataMap: popoversMap,

      /**
       * Загрузка фрагмента диалогового окна. Вызывать с учетом контекста контроллера.
       * @param {Object} options - параметры для загрузки фрагмента: id диалога, путь до файла
       * @param {string} options.id - id диалога
       * @param {string} options.path - путь до файла
       * @param {Function[]=} options.callbacks - коллбэки, вызываются последовательно перед открытием фрагмента
       * @param {Object} options.eventSource - ссылка на инициатора события
       * @param {string} fType - тип фрагмента
       * @returns {Promise<Fragment> | undefined}
       */
      async loadFragment(options, fType) {
        const currentView = this.getView();

        let cbs = options.callbacks;
        let evtSrc = options.eventSource;
        let fragment = this.byId(options.id);
        let openFragment = (fragment) => {
          if (fType === FRAGMENT_TYPES.DIALOG) {
            fragment.open();
          } else if (fType === FRAGMENT_TYPES.POPOVER) {
            fragment.openBy(evtSrc);
          } else {
            throw new Error("Некорректный тип фрагмента!");
          }
        };

        if (!fragment) {
          let loadedFragment = await Fragment.load({
            id: currentView.getId(),
            name: options.path,
            controller: this,
          });

          currentView.addDependent(loadedFragment);
          cbs && cbs.forEach((cb) => this[cb](evtSrc, options.id));
          openFragment(loadedFragment);

          return loadedFragment;
        }

        cbs && cbs.forEach((cb) => this[cb](evtSrc, options.id));
        openFragment(fragment);

        return fragment;
      },

      /**
       * Получение данных фрагмента
       * @param {string} fType - тип фрагмента
       * @param {string} fName - имя фрагмента
       * @returns {Object} - данные фрагмента
       */
      getFragmentData(fType, fName) {
        let fMap = `_${fType}FragmentsDataMap`;
        return this[fMap][fName];
      },
    };
  },
);
