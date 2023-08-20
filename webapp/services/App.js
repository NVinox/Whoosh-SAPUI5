sap.ui.define(["App/API/Location"], (API) => {
  return {
    async getPlaces() {
      return await API.places();
    },
  };
});
