sap.ui.define(["App/base/BaseModel"], (BaseModel) => {
  return {
    ui: new BaseModel({
      isLoading: false,
    }),

    main: new BaseModel({
      typeSize: "",
      sideMenu: {
        isClosed: true,
      },
      states: [],
    }),
  };
});
