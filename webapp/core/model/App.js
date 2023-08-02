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
      expressPads: [
        {
          title: "Become a Courier",
          icon: "/assets/images/courier.svg",
          icon2: "/assets/images/route.svg",
          text: "You choose a schedule. You decide how much and when to earn. Earnings from day one",
        },
        {
          title: "Help & Support",
          icon: "/assets/images/support.svg",
          text: "Door-to-door delivery \nin 90 minutes or at your convenience",
        },
        {
          title: "Affiliate Program",
          icon: "/assets/images/case.svg",
          text: "Use our service and feel \nnew quality of this traditional service!",
        },
      ],
    }),
  };
});
