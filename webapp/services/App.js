sap.ui.define(["App/API/Location"], (API) => {
  return {
    // Метод получения местоположений
    async getPlaces() {
      return await API.places();
    },

    // Метод получения списка городов в котором работает компания
    async getCompanyCities() {
      return await API.companyCities();
    },

    // Метод получения штатов
    async getStates() {
      return await API.states();
    },
  };
});
