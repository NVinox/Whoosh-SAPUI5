sap.ui.define(["App/base/BaseComponent"], function (BaseComponent) {
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
    },
  });
});
