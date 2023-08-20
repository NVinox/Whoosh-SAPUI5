sap.ui.define(["App/API/Location"], (API) => {
  return {
    // Метод получения местоположений
    async getPlaces() {
      return await API.places();
    },
  };
});
