jQuery.sap.registerPreloadedModules({
	"name": "webapp.Component-preload",
	"version": "2.0",
	"modules": {
		"webapp/Component.js": "sap.ui.define([\"App/base/BaseComponent\",\"App/constants/index\",\"sap/ui/Device\"],function(e,t,n){\"use strict\";return e.extend(\"App.Compoment\",{metadata:{manifest:\"json\"},createContent(){return sap.ui.view({id:\"app\",viewName:\"App.core.view.App\",async:!0,type:\"XML\"})},init(){e.prototype.init.apply(this,arguments),n.media.initRangeSet(\"MainRangeSet\",[t.BREAKPOINT.X,t.BREAKPOINT.XS,t.BREAKPOINT.S,t.BREAKPOINT.M,t.BREAKPOINT.L,t.BREAKPOINT.XL],\"px\",[\"X\",\"XS\",\"S\",\"M\",\"L\",\"XL\"]),n.media.initRangeSet(\"WhooshRangeSet\",[t.BREAKPOINT.XS,t.BREAKPOINT.S,t.BREAKPOINT.M,t.BREAKPOINT.L,t.BREAKPOINT.XL],\"px\",[\"XS\",\"S\",\"M\",\"L\",\"XL\",\"XXL\"])}})});",
		"webapp/API/index.js": "sap.ui.define([\"App/API/APISections/Location\",\"App/API/APISections/Navigation\"],(i,n)=>({get location(){return i},get navigation(){return n}}));",
		"webapp/base/BaseComponent.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],e=>{\"use strict\";return e.extend(\"App.base.BaseComponent\",{init(){e.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});",
		"webapp/base/BaseController.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/Core\",\"App/constants/index\",\"App/services/Common/Fragments/Fragments\"],(e,t,{FRAGMENT_TYPES:o},a)=>e.extend(\"App.base.BaseController\",{onOpenDialog(e){var t=e.getSource().data(\"dialog-fragment-name\");this.openFragment(e,t,o.DIALOG)},onOpenPopover(e){var t=e.getSource().data(\"popover-fragment-name\");this.openFragment(e,t,o.POPOVER)},async openFragment(e,t,n=o.DIALOG){t=a.getFragmentData(n,t);if(n===o.POPOVER){var r=this.byId(t.id);if(r?.isOpen())return void r.close()}return a.loadFragment.call(this,{...t,eventSource:e.getSource()},n)},getModel(e){return(\"i18n\"===e?t:this.getView()).getModel(e)},setModel(e,t){return this.getView().setModel(e,t)}}));",
		"webapp/base/BaseModel.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\"],t=>t.extend(\"App.base.BaseModel\",{_initialModel:null,constructor:function(){t.prototype.constructor.apply(this,arguments),this.init()},init(){this._setInitialModel()},_setInitialModel(){this._initialModel=JSON.stringify(this.getData())},getInitialModel(){return JSON.parse(this._initialModel)},getClearingItemInInitialModel(t,i,e){var l=e[0];1===e.length?this.setProperty(i,t[l]):this.getClearingItemInInitialModel(t[l],i,e.slice(1))},clear(t){var i,e;t?(i=t.split(\"/\").slice(1),e=this.getInitialModel(),this.getClearingItemInInitialModel(e,t,i)):this.setProperty(\"/\",this.getInitialModel())}}));",
		"webapp/constants/index.js": "sap.ui.define([],()=>({FRAGMENT_TYPES:{DIALOG:\"dialog\",POPOVER:\"popover\"},SCREEN:{XS:\"XS\",S:\"S\",M:\"M\",L:\"L\",XL:\"XL\",XXL:\"XXL\"},BREAKPOINT:{X:360,XS:500,S:768,M:1024,L:1240,XL:1366}}));",
		"webapp/helpers/index.js": "sap.ui.define([\"App/helpers/functions/trackExec\"],e=>({trackExec:e}));",
		"webapp/services/App.js": "sap.ui.define([\"App/API/index\"],e=>({async getPlaces(){return e.location.places()},async getCompanyCities(){return e.location.companyCities()},async getStates(){return e.location.states()},async getNavigation(){var a=await e.navigation.navigation();return this.parseNavigations(a)},parseNavigations(a){var e=a.menus.reduce((a,e)=>(a[e.menu]=e.items,a),{});return{about:a.about,address:a.address,phone:a.contactUs,socials:a.socials,menu:e.menu,services:e.service}}}));",
		"webapp/API/APISections/Location.js": "sap.ui.define([],()=>{const t=axios.create({baseURL:\"https://api.whoosh.dev.pyrobyte.ru/api/location/\"});return{async states(){var a=(await t.get(\"states\"))[\"data\"];return a},async companyCities(){var a=(await t.get(\"company-cities\"))[\"data\"];return a},async places(){var a=(await t.get(\"places\"))[\"data\"];return a}}});",
		"webapp/API/APISections/Navigation.js": "sap.ui.define([],()=>{const e=axios.create({baseURL:\"https://api.whoosh.dev.pyrobyte.ru/api/reference/\"});return{async navigation(){var a=(await e.get(\"navigation\"))[\"data\"];return a}}});",
		"webapp/core/controller/App.controller.js": "sap.ui.define([\"App/base/BaseController\",\"App/core/model/App\",\"sap/ui/Device\",\"App/services/App\",\"App/helpers/index\"],function(e,t,s,i,o){return e.extend(\"App.core.controller.App\",{onInit(){this.setModels(),s.media.attachHandler(this.sizeChanged,this,\"MainRangeSet\"),this.sizeChanged(s.media.getCurrentRange(\"MainRangeSet\")),this.setPageInfo()},setModels(){this.setModel(t.main,\"AppMainModel\"),this.setModel(t.ui,\"AppUiModel\")},setPageInfo(){let e=this.getModel(\"AppUiModel\"),s=this.getModel(\"AppMainModel\");e.setProperty(\"/isLoading\",!0),o.trackExec({cb:async()=>{var e=await i.getStates(),t=await i.getNavigation();s.setProperty(\"/states\",e),s.setProperty(\"/footer\",t)},errCb:e=>{e=e?.response?.data?.errors?.[0]?.text;throw new Error(e)},finalCb:()=>{e.setProperty(\"/isLoading\",!1)}})},sizeChanged(e){this.getModel(\"AppMainModel\").setProperty(\"/typeSize\",e.from)},partnersSliderInit(){$(\".partners-slider\").slick({centerMode:!0,slidesToShow:1,arrows:!1,centerPadding:\"77px\",initialSlide:2})},sliderInit(){$(\".slider\").slick({slidesToShow:5,swipeToSlide:!0,prevArrow:'<Button class=\"button button_left\" ><img src=\"/assets/images/payment/left.svg\" /></button>',nextArrow:'<Button class=\"button button_right\" ><img src=\"/assets/images/payment/right.svg\" /></button>',responsive:[{breakpoint:1024,settings:{arrows:!1,slidesToShow:3}}]})},onAfterRendering(){this.partnersSliderInit(),this.sliderInit(),this.byId(\"tapBox\").addEventDelegate({onclick:()=>this.onToggleSideMenu()})},onInfoToggle(){var e=this.getModel(\"AppMainModel\"),t=e.getProperty(\"/infoText/isVisible\");e.setProperty(\"/infoText/isVisible\",!t)},onToggleSideMenu(){var e=this.getModel(\"AppMainModel\"),t=this.byId(\"sideMenu\"),s=e.getProperty(\"/sideMenu/isClosed\"),i=e=>e?\"side-menu_closed\":\"side-menu_opened\";e.setProperty(\"/sideMenu/isClosed\",!s),t.addStyleClass(i(!s)),t.removeStyleClass(i(s))},onNavSocial(e){e=e.getSource().data().socialLink;window.open(e)}})});",
		"webapp/core/model/App.js": "sap.ui.define([\"App/base/BaseModel\"],e=>({ui:new e({isLoading:!1}),main:new e({typeSize:\"\",sideMenu:{isClosed:!0},states:[],footer:{},autoFill:[{text:\"502 86th St, Brooklyn, NY 11209\"},{text:\"523 Fake Street. Seattle, WA 98112\"},{text:\"516 SW. Country Ave. Bethpage, NY\"},{text:\"578 Spring Street Hanover, PA 1733\"},{text:\"516 SW. Country Ave. Bethpage, NY\"}],expressPads:[{title:\"Become a Courier\",icon:\"/assets/images/express-delivery/courier.svg\",icon2:\"/assets/images/express-delivery/route.svg\",text:\"You choose a schedule. You decide how much and when to earn. Earnings from day one\"},{title:\"Help & Support\",icon:\"/assets/images/express-delivery/support.svg\",text:\"Door-to-door delivery \\nin 90 minutes or at your convenience\"},{title:\"Affiliate Program\",icon:\"/assets/images/express-delivery/case.svg\",text:\"Use our service and feel \\nnew quality of this traditional service!\"}],partners:[{title:\"Alva\",logo:\"/assets/images/partners/alva.svg\"},{title:\"Tendo\",logo:\"/assets/images/partners/tendo.svg\"},{title:\"Fagor\",logo:\"/assets/images/partners/fagor.svg\"},{title:\"RadioShack\",logo:\"/assets/images/partners/radioshack.svg\"},{title:\"Guitar Center\",logo:\"/assets/images/partners/guitar-center.svg\"}],whatWeDo:[{title:\"Online\",link:\"calculation\",icon:\"/assets/images/what-we-do/calculation.svg\",text:\"Instant calculation of the cost in the order form, the price is updated in the process of filling out the form\"},{title:\"Minimum paperwork\",icon:\"/assets/images/what-we-do/paperwork.svg\",text:\"You can place an order for courier or freight delivery without registration and contract.\"},{title:\"Convenient payment\",icon:\"/assets/images/what-we-do/payment.svg\",text:\"You can pay for delivery by card or in cash at any of the order addresses. For legal entities non-cash is available.\",more:\"/assets/images/what-we-do/arrow.svg\"}],payment:[{title:\"Google Pay\",logo:\"/assets/images/payment/google.svg\"},{title:\"Sofort\",logo:\"/assets/images/payment/sofort.svg\"},{title:\"UnionPay\",logo:\"/assets/images/payment/union-pay.svg\"},{title:\"Visa\",logo:\"/assets/images/payment/visa.svg\"},{title:\"MasterCard\",logo:\"/assets/images/payment/mastercard.svg\"},{title:\"American Express\",logo:\"/assets/images/payment/amex.svg\"}],infoText:{isVisible:!1,text:`Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.\n          \n          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`,textHideable:`Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.\n          \n          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`}})}));",
		"webapp/core/view/App.view.xml": "<mvc:View\r\n  controllerName=\"App.core.controller.App\"\r\n  xmlns:core=\"sap.ui.core\"\r\n  xmlns:mvc=\"sap.ui.core.mvc\"\r\n  xmlns=\"sap.m\"\r\n  xmlns:tnt=\"sap.tnt\"\r\n  xmlns:f=\"sap.f\"\r\n  xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n  xmlns:grid=\"sap.ui.layout.cssgrid\"\r\n  displayBlock=\"true\"><tnt:ToolPage\r\n    class=\"tool-page\"><tnt:header><tnt:ToolHeader class=\"header\" busy=\"{AppUiModel>/isLoading}\" busyIndicatorDelay=\"0\"><HBox \r\n          width=\"100%\" \r\n          justifyContent=\"Center\"\r\n          visible=\"{= ${AppMainModel>/typeSize} &gt; 1240}\"  \r\n          ><HBox \r\n            class=\"wrapper\"\r\n            width=\"100%\"\r\n            height=\"80px\"\r\n            justifyContent=\"SpaceBetween\"\r\n            alignItems=\"Center\"\r\n          ><HBox class=\"subwrapper\" alignItems=\"Center\"><Image \r\n                class=\"header__logo\"\r\n                mode=\"InlineSvg\"\r\n                src=\"/assets/images/header/logo.svg\" \r\n              /><ToolbarSpacer width=\"66px\" /><Select class=\"header__city\" width=\"200px\" items=\"{AppMainModel>/states}\" selectedKey=\"{AppMainModel>/selectedKeyState}\"><core:ListItem key=\"{AppMainModel>id}\" text=\"{AppMainModel>code}, {AppMainModel>name}\" /></Select></HBox><HBox class=\"subwrapper\" alignItems=\"Center\"><SearchField \r\n                class=\"header__search search-field\" \r\n                placeholder=\"Track a Package\" \r\n                width=\"184px\" \r\n              /></HBox><HBox class=\"subwrapper\" alignItems=\"Center\"><Link text=\"Send a Parcel\" class=\"header__link link\" /><Link text=\"Become a Courier\" class=\"header__link link\" /><Button \r\n                class=\"header__login button\"\r\n                icon=\"/assets/images/header/lock.svg\"\r\n              /></HBox></HBox></HBox><HBox \r\n          class=\"header-small\" \r\n          width=\"100%\" \r\n          height=\"64px\"\r\n          alignItems=\"Center\" \r\n          justifyContent=\"SpaceBetween\" \r\n          visible=\"{= ${AppMainModel>/typeSize} &lt; 1366}\"><Image class=\"header-small__profile\" src=\"/assets/images/header/profile.svg\" press=\"\"/><Image class=\"header-small__logo\" width=\"120px\" src=\"/assets/images/header/logo.svg\" /><Image class=\"header-small__menu-btn\" src=\"/assets/images/header/menu.svg\" press=\"onToggleSideMenu\"/></HBox><HBox id=\"screenWrapper\" class=\"screen-wrapper\" width=\"{= ${AppMainModel>/sideMenu/isClosed} ? '0' : '100%'}\" height=\"100%\"><VBox \r\n          id=\"tapBox\"\r\n          class=\"tap-box\"\r\n          width=\"100%\"\r\n          height=\"100vh\"></VBox><VBox id=\"sideMenu\" class=\"side-menu\" width=\"274px\" height=\"100vh\" justifyContent=\"SpaceBetween\" alignItems=\"Center\"><VBox class=\"side-menu__wrapper\" width=\"100%\"><HBox class=\"side-menu-header\" width=\"100%\" height=\"64px\" alignItems=\"Center\" justifyContent=\"SpaceBetween\"><Select class=\"header__city\" width=\"200px\" items=\"{AppMainModel>/states}\" selectedKey=\"{AppMainModel>/selectedKeyState}\"><core:ListItem key=\"{AppMainModel>id}\" text=\"{AppMainModel>code}, {AppMainModel>name}\" /></Select><Image class=\"side-menu__menu-btn\" src=\"/assets/images/header/x.svg\" press=\"onToggleSideMenu\"/></HBox><VBox class=\"side-menu__subwrapper\" width=\"100%\"><SearchField \r\n                class=\"side-menu__search search-field\" \r\n                placeholder=\"Track a Package\" \r\n                width=\"242px\" \r\n              /><Link text=\"Send a Parcel\" class=\"header__link link\" /><Link text=\"Become a Courier\" class=\"header__link link\" /><Link text=\"Affiliate Program\" class=\"header__link link\" /><Link text=\"Help &amp; Support\" class=\"header__link link\" /></VBox></VBox><Button \r\n                class=\"side-menu__button button text_h5\"\r\n                width=\"242px\"\r\n                text=\"Take a complex order\"\r\n              /></VBox></HBox></tnt:ToolHeader></tnt:header><tnt:mainContents><ScrollContainer width=\"100%\" vertical=\"true\" horizontal=\"false\"><VBox class=\"main-content\" width=\"100%\" height=\"100%\" alignItems=\"Center\" justifyContent=\"Center\"><layoutData><FlexItemData growFactor=\"1\" shrinkFactor=\"1\" /></layoutData><HBox class=\"offer\" justifyContent=\"Center\" width=\"100%\"><HBox class=\"content-wrapper\" width=\"100%\" alignItems=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? 'Center' : 'Inherit'}\" justifyContent=\"SpaceBetween\"><VBox class=\"left\" width=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '328px' : '375px'}\"><Text class=\"text text_h1\" text=\"Our service started work in New York\" /><Text class=\"left__text text\" width=\"100%\" text=\"We make delivery exactly at the time you need - we can start to fulfill the order a few minutes after it arrives, or we can deliver on a specific day and hour.\" /><Link class=\"left__link link_blue\" text=\"Read more\" /><Text class=\"text text_h3\" text=\"How it works\" /><HBox class=\"left__video\" width=\"100%\" height=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '200px' : '232px'}\"><html:iframe class=\"left__frame\" src=\"https://www.youtube.com/embed/sJSYeUTfW6o\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen=\"true\"></html:iframe></HBox></VBox><Image class=\"offer__graphic\" src=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '/assets/images/offer/city.svg' : '/assets/images/offer/graphic.svg'}\" /><VBox class=\"right\" width=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '328px' : '360px'}\"><VBox class=\"offer__form\" width=\"100%\" height=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '472px' : '500px'}\"><HBox class=\"offer__form-title\" alignItems=\"Center\"><Text class=\"text text_h3 sapUiSmallMarginEnd\" text=\"Send a Parcel\" /><Button class=\"button-clue\" icon=\"/assets/images/offer/clue.svg\" /></HBox><VBox class=\"offer__tabs\"><IconTabBar class=\"tabs\" selectedKey=\"Car\"><items><IconTabFilter\r\n                        key=\"Bike\"\r\n                        icon=\"assets/images/tabs/onFoot.svg\"\r\n                        text=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '' : 'up to 10lb'}\"\r\n                      /><IconTabFilter\r\n                        key=\"Car\"\r\n                        icon=\"assets/images/tabs/car.svg\"\r\n                        text=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '' : 'up to 130lb'}\"\r\n                      /><IconTabFilter\r\n                        key=\"Truck\"\r\n                        icon=\"assets/images/tabs/truck.svg\"\r\n                        text=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '' : 'over 130lb'}\"\r\n                      /></items></IconTabBar></VBox><VBox class=\"offer__form-inputs\"><HBox><VBox class=\"offer__form-side-icons\" alignItems=\"Center\"><Image src=\"assets/images/offer/circle.svg\" /><Image src=\"assets/images/offer/vdots.svg\" class=\"side-icon\"/><Image src=\"assets/images/offer/pin.svg\" /></VBox><VBox class=\"offer__form-text-inputs\" width=\"100%\"><VBox class=\"input-pair\"><Text class=\"input-title text\" text=\"Pickup location\" /><Input class=\"input\" placeholder=\"location\" /></VBox><VBox class=\"input-pair\"><Text class=\"input-title text\" text=\"Drop location\" /><Input \r\n                          class=\"input\" \r\n                          placeholder=\"location\" \r\n                          showSuggestion=\"true\" \r\n                          suggestionItems=\"{AppMainModel>/autoFill}\"><suggestionItems><core:ListItem text=\"{AppMainModel>text}\" /></suggestionItems></Input></VBox></VBox></HBox><VBox class=\"offer__form-buttons\" alignItems=\"Center\" width=\"100%\"><Button class=\"button\" text=\"Order\" width=\"100%\" /><Button \r\n                      class=\"button button_transparent\" \r\n                      text=\"Clear All\" \r\n                      icon=\"assets/images/offer/clear.svg\" /></VBox></VBox></VBox><VBox class=\"track\" width=\"100%\" height=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '128px' : '144px'}\"><Text class=\"text text_h3\" text=\"Track a package\" /><SearchField \r\n                  class=\"track__search search-field\"\r\n                  placeholder=\"Enter code\"  \r\n                  width=\"100%\"\r\n                /></VBox></VBox></HBox></HBox><VBox class=\"express\" width=\"100%\" alignItems=\"Center\"><Text class=\"text text_h1\" textAlign=\"Center\" text=\"Express delivery market revolution\" /><Text class=\"text text_h4\" textAlign=\"Center\" width=\"100%\" text=\"Express courier service in the city. We are a reliable logistics partner for delivery services for online stores and restaurants!\" /><f:GridList\r\n            class=\"pads\"\r\n            items=\"{AppMainModel>/expressPads}\"\r\n            width=\"100%\"\r\n          ><f:GridListItem class=\"item\"><VBox class=\"item__pad\" height=\"100%\" justifyContent=\"SpaceBetween\"><layoutData><FlexItemData growFactor=\"1\" shrinkFactor=\"0\" /></layoutData><Text class=\"text text_h3\" text=\"{AppMainModel>title}\" /><HBox class=\"item__image\"><HBox class=\"circle-pad\" ><Image src=\"{AppMainModel>icon}\" /></HBox><Image src=\"{AppMainModel>icon2}\" /></HBox><Text class=\"text\" text=\"{AppMainModel>text}\" /></VBox></f:GridListItem></f:GridList></VBox><HBox class=\"parcel\" width=\"100%\" justifyContent=\"Center\"><HBox class=\"parcel__image\"><Image src=\"/assets/images/parcel.svg\"/></HBox></HBox><VBox class=\"partners\" width=\"100%\" alignItems=\"Center\"><Text class=\"text text_h1\" text=\"Our Partners\" /><HBox \r\n            class=\"partners-slider\" \r\n            width=\"100%\" \r\n            items=\"{AppMainModel>/partners}\"><HBox \r\n              class=\"monochrome\"\r\n              width=\"188px\" \r\n              height=\"56px\" \r\n              justifyContent=\"Center\"\r\n              alignItems=\"Center\"><Image class=\"partners-slider__logo\" src=\"{AppMainModel>logo}\" /></HBox></HBox><HBox class=\"collaborate\"><Button \r\n            class=\"collaborate__button button\" \r\n            icon=\"/assets/images/partners/collaborate.svg\"\r\n            text=\"Let's collaborate\"  \r\n          /></HBox><HBox \r\n            class=\"logos\" \r\n            width=\"100%\" \r\n            items=\"{AppMainModel>/partners}\"\r\n            visible=\"{= ${AppMainModel>/typeSize} &gt; 1024}\"><layoutData><FlexItemData maxWidth=\"1104px\" /></layoutData><HBox class=\"monochrome\" alignItems=\"Center\"><Image class=\"logos__logo\" src=\"{AppMainModel>logo}\" /></HBox></HBox></VBox><VBox class=\"what-we-do\" width=\"100%\" alignItems=\"Center\"><HBox class=\"what-we-do__bgimage\"><Image src=\"/assets/images/what-we-do/city.png\" /></HBox><Text class=\"text text_h1\" textAlign=\"Center\" text=\"What we do\" /><Text class=\"text text_h4\" textAlign=\"Center\" width=\"100%\" text=\"Express courier service in the city. We are a reliable logistics partner for delivery services for online stores and restaurants!\" /><HBox class=\"pads\" items=\"{AppMainModel>/whatWeDo}\"><VBox \r\n              class=\"pad\" \r\n              width=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '328px' : '300px'}\"\r\n              height=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '212px' : '236px'}\"\r\n            ><HBox class=\"circle-pad circle-pad_small\"><Image src=\"{AppMainModel>icon}\" width=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? '32px' : '40px'}\" /></HBox><HBox class=\"pad__title\" alignItems=\"Center\"><Text class=\"text text_h3\" text=\"{AppMainModel>title}\" /><Link class=\"link link_blue link_blue_underlined\" text=\"{AppMainModel>link}\" /></HBox><Text class=\"text\" textAlign=\"{= ${AppMainModel>/typeSize} &lt; 1024 ? 'Center' : 'Left'}\" text=\"{AppMainModel>text}\" /></VBox></HBox><Button class=\"what-we-do__button button\" text=\"Get started!\" width=\"296px\" /></VBox><VBox class=\"payment\" width=\"100%\" alignItems=\"Center\"><Text class=\"text text_h1\" text=\"Payment methods\" /><HBox class=\"slider\" width=\"100%\" items=\"{AppMainModel>/payment}\"><layoutData><FlexItemData maxWidth=\"1172px\" /></layoutData><Image src=\"{AppMainModel>logo}\" width=\"84px\" /></HBox></VBox><HBox class=\"parcel\" width=\"100%\" justifyContent=\"Center\"><HBox class=\"parcel__image\"><Image src=\"/assets/images/parcel.svg\"/></HBox></HBox><VBox class=\"info\" alignItems=\"Center\"><VBox class=\"info__text\" width=\"100%\" alignItems=\"End\"><Text id=\"info__test\" class=\"text\" binding=\"{AppMainModel>/infoText}\" text=\"{= ${AppMainModel>text} + (!!${AppMainModel>isVisible} ? ('\\n\\n' + ${AppMainModel>textHideable}) : '' )}\" /><Button class=\"info__etc\" width=\"25px\" icon=\"/assets/images/info/etc.svg\" press=\"onInfoToggle\"/><layoutData><FlexItemData maxWidth=\"1160px\" /></layoutData></VBox></VBox></VBox><VBox class=\"footer\" justifyContent=\"Center\" alignItems=\"Center\" busy=\"{AppUiModel>/isLoading}\" busyIndicatorDelay=\"0\"><HBox \r\n          class=\"wrapper\" \r\n          width=\"100%\" \r\n          alignItems=\"{= ${AppMainModel>/typeSize} &lt; 1240 ? 'Center' : 'Start'}\" \r\n          justifyContent=\"SpaceBetween\"\r\n        ><VBox class=\"column\"><HBox class=\"title title_lineless\"><Text text=\"About Whoosh\" /></HBox><HBox class=\"content\"><Image src=\"/assets/images/footer/two-pins.svg\" class=\"content__two-pins\" /><Text width=\"240px\" text=\"{AppMainModel>/footer/about}\" /></HBox></VBox><HBox class=\"links\"><VBox class=\"links-column\"><HBox class=\"title\" ><Text text=\"Menu\" /></HBox><List items=\"{AppMainModel>/footer/menu}\"><StandardListItem class=\"link\" title=\"{AppMainModel>title}\"/></List></VBox><VBox class=\"links-column\"><HBox class=\"title\"><Text text=\"Services\" /></HBox><List items=\"{AppMainModel>/footer/services}\"><StandardListItem class=\"link\" title=\"{AppMainModel>title}\"/></List></VBox></HBox><VBox class=\"column\" width=\"{= ${AppMainModel>/typeSize} &lt; 1240 ? '100%' : 'auto'}\"><HBox class=\"title\"><Text text=\"Contact Us\" /></HBox><VBox class=\"content\"><Text class=\"phone\" text=\"{AppMainModel>/footer/phone}\" /><HBox><Image class=\"footer__icon\" src=\"/assets/images/footer/pin-blue.svg\"/><Text class=\"footer__icon-text\" text=\"{AppMainModel>/footer/address}\"/></HBox><HBox class=\"social\" width=\"100%\" items=\"{AppMainModel>/footer/socials}\"><Button \r\n                  class=\"button\"\r\n                  icon=\"{AppMainModel>icon}\"\r\n                  press=\"onNavSocial\"\r\n                ><customData><core:CustomData key=\"socialLink\" value=\"{AppMainModel>icon}\" /></customData><layoutData><FlexItemData styleClass=\"social-button\" /></layoutData></Button></HBox></VBox></VBox></HBox><VBox class=\"madeby\" width=\"100%\"><layoutData><FlexItemData maxWidth=\"1160px\" /></layoutData><HBox \r\n              justifyContent=\"Center\" \r\n              alignItems=\"Center\"\r\n              width=\"100%\"\r\n              visible=\"{= ${AppMainModel>/typeSize} &lt; 1240}\"><Image src=\"/assets/images/footer/pyrobyte_red.svg\" /></HBox><Text class=\"madeby__line\" text=\"Made by\"/><HBox class=\"madeby__content\" justifyContent=\"Center\" alignItems=\"Center\"><HBox \r\n              class=\"madeby__text madeby__text_left\" \r\n              justifyContent=\"Center\" \r\n              width=\"{= ${AppMainModel>/typeSize} &lt; 1240 ? '100%' : '25%'}\"\r\n            ><Text text=\"© 2022. All rights reserved.\" /></HBox><HBox \r\n              justifyContent=\"Center\" \r\n              width=\"50%\"\r\n              visible=\"{= ${AppMainModel>/typeSize} &gt; 1240}\"><Image src=\"/assets/images/footer/pyrobyte.svg\" /></HBox><HBox \r\n              class=\"madeby__text madeby__text_right\" \r\n              justifyContent=\"Center\" \r\n              width=\"{= ${AppMainModel>/typeSize} &lt; 1240 ? '100%' : '25%'}\"\r\n            ><Image class=\"footer__icon\" src=\"/assets/images/footer/flower.svg\" /><Text class=\"footer__icon-text\" text=\"Privacy policy\" /></HBox></HBox></VBox></VBox></ScrollContainer></tnt:mainContents></tnt:ToolPage></mvc:View>",
		"webapp/helpers/functions/trackExec.js": "sap.ui.define([],()=>async({cb:a,errCb:i,finalCb:r,noThrow:t=!1})=>{try{return await a()}catch(a){if(i&&await i(a),!t)throw a}finally{r&&await r()}});",
		"webapp/services/Common/Fragments/Fragments.js": "sap.ui.define([\"sap/ui/core/Fragment\",\"App/constants/index\",\"App/services/Common/Fragments/Maps/Dialogs\",\"App/services/Common/Fragments/Maps/Popovers\"],(i,{FRAGMENT_TYPES:p},a,e)=>({_dialogFragmentsDataMap:a,_popoverFragmentsDataMap:e,async loadFragment(e,t){var a=this.getView(),r=e.callbacks;let s=e.eventSource;var n=this.byId(e.id),o=a=>{if(t===p.DIALOG)a.open();else{if(t!==p.POPOVER)throw new Error(\"Некорректный тип фрагмента!\");a.openBy(s)}};return n?r&&r.forEach(a=>this[a](s,e.id)):(n=await i.load({id:a.getId(),name:e.path,controller:this}),a.addDependent(n),r&&r.forEach(a=>this[a](s,e.id))),o(n),n},getFragmentData(a,e){return this[`_${a}FragmentsDataMap`][e]}}));",
		"webapp/services/Common/Fragments/Maps/Dialogs.js": "sap.ui.define([],()=>({}));",
		"webapp/services/Common/Fragments/Maps/Popovers.js": "sap.ui.define([],()=>({}));"
	}
});