sap.ui.define(["App/API/APISections/Location", "App/API/APISections/Reference"], (Locations, Reference) => {
  return {
    get location() {
      return Locations;
    },

    get reference() {
      return Reference;
    },
  };
});
