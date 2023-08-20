sap.ui.define(["App/API/index"], (API) => {
  return {
    // Метод получения местоположений
    async getPlaces() {
      return await API.location.places();
    },

    // Метод получения списка городов в котором работает компания
    async getCompanyCities() {
      return await API.location.companyCities();
    },

    // Метод получения штатов
    async getStates() {
      return await API.location.states();
    },

    // Метод получения информации о навигации
    async getNavigation() {
      let navigations = await API.navigation.navigation();

      return this.parseNavigations(navigations);
    },

    /**
     * Метод парсинга данных о панели навигации
     * @param {Object} navigations - данные о панели навигации
     * @returns {Object} - объект навигации
     */
    parseNavigations(navigations) {
      let menus = navigations.menus.reduce((acc, current) => {
        acc[current.menu] = current.items;

        return acc;
      }, {});

      return {
        about: navigations.about,
        address: navigations.address,
        phone: navigations.contactUs,
        socials: navigations.socials,
        menu: menus.menu,
        services: menus.service,
      };
    },
  };
});
