sap.ui.define(["App/base/BaseModel"], (BaseModel) => {
  return {
    main: new BaseModel({
      footerMenu: [
        {
          text: "About company",
        },
        {
          text: "Contact",
        },
        {
          text: "Rules",
        },
        {
          text: "FAQ",
        },
        {
          text: "Reviews",
        },
        {
          text: "Cargo transportation",
        },
        {
          text: "Tariffs",
        },
      ],
      footerServices: [
        {
          text: "Online stores",
        },
        {
          text: "Legal entity",
        },
        {
          text: "API Integration",
        },
        {
          text: "Contract",
        },
        {
          text: "Jobs",
        },
        {
          text: "Courier job",
        },
        {
          text: "The blog",
        },
      ],
    }),
  };
});
