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
      footer: {},
      autoFill: [
        {
          text: "502 86th St, Brooklyn, NY 11209",
        },
        {
          text: "523 Fake Street. Seattle, WA 98112",
        },
        {
          text: "516 SW. Country Ave. Bethpage, NY",
        },
        {
          text: "578 Spring Street Hanover, PA 1733",
        },
        {
          text: "516 SW. Country Ave. Bethpage, NY",
        },
      ],
      expressPads: [
        {
          title: "Become a Courier",
          icon: "/assets/images/express-delivery/courier.svg",
          icon2: "/assets/images/express-delivery/route.svg",
          text: "You choose a schedule. You decide how much and when to earn. Earnings from day one",
        },
        {
          title: "Help & Support",
          icon: "/assets/images/express-delivery/support.svg",
          text: "Door-to-door delivery \nin 90 minutes or at your convenience",
        },
        {
          title: "Affiliate Program",
          icon: "/assets/images/express-delivery/case.svg",
          text: "Use our service and feel \nnew quality of this traditional service!",
        },
      ],
      partners: [
        {
          title: "Alva",
          logo: "/assets/images/partners/alva.svg",
        },
        {
          title: "Tendo",
          logo: "/assets/images/partners/tendo.svg",
        },
        {
          title: "Fagor",
          logo: "/assets/images/partners/fagor.svg",
        },
        {
          title: "RadioShack",
          logo: "/assets/images/partners/radioshack.svg",
        },
        {
          title: "Guitar Center",
          logo: "/assets/images/partners/guitar-center.svg",
        },
      ],
      whatWeDo: [
        {
          title: "Online",
          link: "calculation",
          icon: "/assets/images/what-we-do/calculation.svg",
          text: "Instant calculation of the cost in the order form, the price is updated in the process of filling out the form",
        },
        {
          title: "Minimum paperwork",
          icon: "/assets/images/what-we-do/paperwork.svg",
          text: "You can place an order for courier or freight delivery without registration and contract.",
        },
        {
          title: "Convenient payment",
          icon: "/assets/images/what-we-do/payment.svg",
          text: "You can pay for delivery by card or in cash at any of the order addresses. For legal entities non-cash is available.",
          more: "/assets/images/what-we-do/arrow.svg",
        },
      ],
      payment: [
        {
          title: "Google Pay",
          logo: "/assets/images/payment/google.svg",
        },
        {
          title: "Sofort",
          logo: "/assets/images/payment/sofort.svg",
        },
        {
          title: "UnionPay",
          logo: "/assets/images/payment/union-pay.svg",
        },
        {
          title: "Visa",
          logo: "/assets/images/payment/visa.svg",
        },
        {
          title: "MasterCard",
          logo: "/assets/images/payment/mastercard.svg",
        },
        {
          title: "American Express",
          logo: "/assets/images/payment/amex.svg",
        },
      ],
      infoText: {
        isVisible: false,
        text: `Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.
          
          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`,
        textHideable: `Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.
          
          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`,
      },
    }),
  };
});
