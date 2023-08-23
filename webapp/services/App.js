sap.ui.define(["App/API/index"], (API) => {
  return {
    // Метод получения списка городов в котором работает компания
    async getCompanyCities() {
      return await API.location.companyCities();
    },

    // Метод получения информации о навигации
    async getNavigation() {
      let navigations = await API.reference.navigation();

      return this.parseNavigations(navigations);
    },

    // Метод получения информации для страницы
    async getPromo() {
      let promo = await API.reference.promo();

      return this.parsePromo(promo);
    },

    /**
     * Метод парсинга данных о панели навигации
     * @param {Object} navigations - данные о панели навигации
     * @returns {Object} объект навигации
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

    /**
     * Метод парсинга данных для промо-страницы
     * @param {Object} promo - данные для промо-страницы
     * @returns {Object} объект промо-страницы
     */
    parsePromo(promo) {
      let deliveryWays = promo.deliveryWays.reduce((acc, current) => {
        let name = current.code.slice(3).toLowerCase();

        acc[name] = current;

        return acc;
      }, {});

      return {
        offer: {
          backgroundImage: promo.backgroundImage,
          promoTextBlock: promo.promoTextBlock,
          video: promo.video,
          promoParcelHint: promo.promoParcelHint,
          deliveryWays,
        },
        whatWeDoText: promo.whatWeDoText,
        expressDeliveryText: promo.expressDeliveryText,
        partners: promo.partners,
        paymentMethods: promo.paymentMethods,
      };
    },
  };
});
