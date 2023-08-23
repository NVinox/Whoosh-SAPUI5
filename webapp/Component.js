sap.ui.define(["App/base/BaseComponent", "App/constants/index", "sap/ui/Device"], function (BaseComponent, constants, Device) {
  "use strict";

  return BaseComponent.extend("App.Compoment", {
    metadata: {
      manifest: "json",
    },

    createContent() {
      let oView = sap.ui.view({
        id: "app",
        viewName: "App.core.view.App",
        async: true,
        type: "XML",
      });
      return oView;
    },

    init() {
      BaseComponent.prototype.init.apply(this, arguments);

      Device.media.initRangeSet(
        "MainRangeSet",
        [
          constants.BREAKPOINT.X,
          constants.BREAKPOINT.XS,
          constants.BREAKPOINT.S,
          constants.BREAKPOINT.M,
          constants.BREAKPOINT.L,
          constants.BREAKPOINT.XL,
        ],
        "px",
        ["X", "XS", "S", "M", "L", "XL"],
      );
    },
  });
});
