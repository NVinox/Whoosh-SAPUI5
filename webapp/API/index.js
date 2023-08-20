sap.ui.define(["App/API/APISections/Location", "App/API/APISections/Navigation"], (Locations, Navigation) => {
  return {
    get location() {
      return Locations;
    },

    get navigation() {
      return Navigation;
    },
  };
});
