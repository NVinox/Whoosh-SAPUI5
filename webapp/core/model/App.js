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
      partners: [
        {
          title: "Alva",
          logo: "/assets/images/alva.svg",
        },
        {
          title: "Tendo",
          logo: "/assets/images/tendo.svg",
        },
        {
          title: "Fagor",
          logo: "/assets/images/fagor.svg",
        },
        {
          title: "RadioShack",
          logo: "/assets/images/radioshack.svg",
        },
        {
          title: "Guitar Center",
          logo: "/assets/images/guitar-center.svg",
        },
      ],
      whatWeDo: [
        {
          title: "Online",
          link: "calculation",
          icon: "/assets/images/calculation.svg",
          text: "Instant calculation of the cost in the order form, the price is updated in the process of filling out the form",
        },
        {
          title: "Minimum paperwork",
          icon: "/assets/images/paperwork.svg",
          text: "You can place an order for courier or freight delivery without registration and contract.",
        },
        {
          title: "Convenient payment",
          icon: "/assets/images/payment.svg",
          text: "You can pay for delivery by card or in cash at any of the order addresses. For legal entities non-cash is available.",
          more: "/assets/images/arrow.svg",
        },
      ],
    }),
  };
});
