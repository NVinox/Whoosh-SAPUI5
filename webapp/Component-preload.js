jQuery.sap.registerPreloadedModules({
	"name": "webapp.Component-preload",
	"version": "2.0",
	"modules": {
		"webapp/Component.js": "sap.ui.define([\"App/base/BaseComponent\",\"App/constants/index\",\"sap/ui/Device\"],function(e,t,n){\"use strict\";return e.extend(\"App.Compoment\",{metadata:{manifest:\"json\"},createContent(){return sap.ui.view({id:\"app\",viewName:\"App.core.view.App\",async:!0,type:\"XML\"})},init(){e.prototype.init.apply(this,arguments),n.media.initRangeSet(\"MainRangeSet\",[t.BREAKPOINT.X,t.BREAKPOINT.XS,t.BREAKPOINT.S,t.BREAKPOINT.M,t.BREAKPOINT.L,t.BREAKPOINT.XL],\"px\",[\"X\",\"XS\",\"S\",\"M\",\"L\",\"XL\"])}})});",
		"webapp/API/index.js": "sap.ui.define([\"App/API/APISections/Location\",\"App/API/APISections/Reference\"],(e,n)=>({get location(){return e},get reference(){return n}}));",
		"webapp/base/BaseComponent.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],e=>{\"use strict\";return e.extend(\"App.base.BaseComponent\",{init(){e.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});",
		"webapp/base/BaseController.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/Core\",\"App/constants/index\",\"App/services/Common/Fragments/Fragments\",\"sap/ui/core/UIComponent\"],(e,t,{FRAGMENT_TYPES:n},a,r)=>e.extend(\"App.base.BaseController\",{onOpenDialog(e){var t=e.getSource().data(\"dialog-fragment-name\");this.openFragment(e,t,n.DIALOG)},onOpenPopover(e){var t=e.getSource().data(\"popover-fragment-name\");this.openFragment(e,t,n.POPOVER)},getRouter(){return r.getRouterFor(this)},async openFragment(e,t,r=n.DIALOG){t=a.getFragmentData(r,t);if(r===n.POPOVER){var o=this.byId(t.id);if(o?.isOpen())return void o.close()}return a.loadFragment.call(this,{...t,eventSource:e.getSource()},r)},getModel(e){return(\"i18n\"===e?t:this.getView()).getModel(e)},setModel(e,t){return this.getView().setModel(e,t)}}));",
		"webapp/base/BaseModel.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\"],t=>t.extend(\"App.base.BaseModel\",{_initialModel:null,constructor:function(){t.prototype.constructor.apply(this,arguments),this.init()},init(){this._setInitialModel()},_setInitialModel(){this._initialModel=JSON.stringify(this.getData())},getInitialModel(){return JSON.parse(this._initialModel)},getClearingItemInInitialModel(t,i,e){var l=e[0];1===e.length?this.setProperty(i,t[l]):this.getClearingItemInInitialModel(t[l],i,e.slice(1))},clear(t){var i,e;t?(i=t.split(\"/\").slice(1),e=this.getInitialModel(),this.getClearingItemInInitialModel(e,t,i)):this.setProperty(\"/\",this.getInitialModel())}}));",
		"webapp/constants/index.js": "sap.ui.define([],()=>({FRAGMENT_TYPES:{DIALOG:\"dialog\",POPOVER:\"popover\"},SCREEN:{XS:\"XS\",S:\"S\",M:\"M\",L:\"L\",XL:\"XL\",XXL:\"XXL\"},BREAKPOINT:{X:360,XS:500,S:768,M:1024,L:1240,XL:1366}}));",
		"webapp/helpers/index.js": "sap.ui.define([\"App/helpers/functions/trackExec\"],e=>({trackExec:e}));",
		"webapp/services/App.js": "sap.ui.define([\"App/API/index\"],r=>({async getCompanyCities(){return r.location.companyCities()},async getNavigation(){var e=await r.reference.navigation();return this.parseNavigations(e)},async getPromo(){var e=await r.reference.promo();return this.parsePromo(e)},parseNavigations(e){var r=e.menus.reduce((e,r)=>(e[r.menu]=r.items,e),{});return{about:e.about,address:e.address,phone:e.contactUs,socials:e.socials,menu:r.menu,services:r.service}},parsePromo(e){var r=e.deliveryWays.reduce((e,r)=>{return e[r.code.slice(3).toLowerCase()]=r,e},{});return{offer:{backgroundImage:e.backgroundImage,promoTextBlock:e.promoTextBlock,video:e.video,promoParcelHint:e.promoParcelHint,deliveryWays:r},whatWeDoText:e.whatWeDoText,expressDeliveryText:e.expressDeliveryText,partners:e.partners,paymentMethods:e.paymentMethods}}}));",
		"webapp/API/APISections/Location.js": "sap.ui.define([],()=>{const t=axios.create({baseURL:\"https://api.whoosh.dev.pyrobyte.ru/api/location/\"});return{async companyCities(){var a=(await t.get(\"company-cities\"))[\"data\"];return a}}});",
		"webapp/API/APISections/Reference.js": "sap.ui.define([],()=>{const e=axios.create({baseURL:\"https://api.whoosh.dev.pyrobyte.ru/api/reference/\"});return{async navigation(){var a=(await e.get(\"navigation\"))[\"data\"];return a},async promo(){var a=(await e.get(\"promo\"))[\"data\"];return a}}});",
		"webapp/base/App/BaseMainPageController.js": "sap.ui.define([\"App/base/BaseController\",\"App/base/App/BaseMainPageModel\",\"App/services/App\",\"sap/ui/Device\",\"App/helpers/index\"],function(e,t,s,i,n){return e.extend(\"App.base.BaseMainPageController\",{onInit(){this.setModels(),i.media.attachHandler(this.sizeChanged,this,\"MainRangeSet\"),this.sizeChanged(i.media.getCurrentRange(\"MainRangeSet\")),this.setMainInfo(),setTimeout(this.slidersInit.bind(this),1e3)},setModels(){this.setModel(t.ui,\"BaseUiModel\"),this.setModel(t.main,\"BaseMainModel\")},onAfterRendering(){this.slidersInit()},slidersInit(){this.partnersSliderInit(),this.sliderInit()},sizeChanged(e){t.main.setProperty(\"/typeSize\",e.from)},setMainInfo(){t.ui.setProperty(\"/isLoading\",!0),n.trackExec({cb:async()=>{var e=await s.getNavigation(),i=await s.getPromo();t.main.setProperty(\"/footer\",e),t.main.setProperty(\"/pageInfo\",i)},errCb:e=>{e=e?.response?.data?.errors?.[0]?.text;throw new Error(e)},finalCb:()=>{t.ui.setProperty(\"/isLoading\",!1)}})},partnersSliderInit(){$(\".partners-slider:not(.slick-initialized)\").each(function(){$(this).slick({centerMode:!0,slidesToShow:1,arrows:!1,centerPadding:\"77px\",initialSlide:2})})},sliderInit(){var e=$(\".slider:not(.slick-initialized)\");let i=1e3*+t.main.getProperty(\"/pageInfo/paymentMethods/sliderTimeout\");e.each(function(){$(this).slick({slidesToShow:5,swipeToSlide:!0,autoplay:!0,autoplaySpeed:i,prevArrow:'<Button class=\"button button_left\" ><img src=\"/assets/images/payment/left.svg\" /></button>',nextArrow:'<Button class=\"button button_right\" ><img src=\"/assets/images/payment/right.svg\" /></button>',responsive:[{breakpoint:1024,settings:{arrows:!1,slidesToShow:3}}]})})},onInfoToggle(){var e=t.main.getProperty(\"/infoText/isVisible\");t.main.setProperty(\"/infoText/isVisible\",!e)},onNavSocial(e){e=e.getSource().data().socialLink;window.open(e)}})});",
		"webapp/base/App/BaseMainPageModel.js": "sap.ui.define([\"App/base/BaseModel\"],e=>({ui:new e({isLoading:!1}),main:new e({typeSize:\"\",sliders:{isInit:0},footer:{},pageInfo:{},autoFill:[{text:\"502 86th St, Brooklyn, NY 11209\"},{text:\"523 Fake Street. Seattle, WA 98112\"},{text:\"516 SW. Country Ave. Bethpage, NY\"},{text:\"578 Spring Street Hanover, PA 1733\"},{text:\"516 SW. Country Ave. Bethpage, NY\"}],expressPads:[{title:\"Become a Courier\",icon:\"/assets/images/express-delivery/courier.svg\",icon2:\"/assets/images/express-delivery/route.svg\",text:\"You choose a schedule. You decide how much and when to earn. Earnings from day one\"},{title:\"Help & Support\",icon:\"/assets/images/express-delivery/support.svg\",text:\"Door-to-door delivery \\nin 90 minutes or at your convenience\"},{title:\"Affiliate Program\",icon:\"/assets/images/express-delivery/case.svg\",text:\"Use our service and feel \\nnew quality of this traditional service!\"}],whatWeDo:[{title:\"Online\",link:\"calculation\",icon:\"/assets/images/what-we-do/calculation.svg\",text:\"Instant calculation of the cost in the order form, the price is updated in the process of filling out the form\"},{title:\"Minimum paperwork\",icon:\"/assets/images/what-we-do/paperwork.svg\",text:\"You can place an order for courier or freight delivery without registration and contract.\"},{title:\"Convenient payment\",icon:\"/assets/images/what-we-do/payment.svg\",text:\"You can pay for delivery by card or in cash at any of the order addresses. For legal entities non-cash is available.\",more:\"/assets/images/what-we-do/arrow.svg\"}],infoText:{isVisible:!1,text:`Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.\n          \n          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`,textHideable:`Since 2019, LibertyWalk has successfully provided express courier delivery services in the city for both individuals and legal entities, and is also a reliable logistics partner for delivery services for online stores and restaurants! Express delivery of documents and parcels for organizations, express delivery of correspondence, purchases, flowers, food, gifts and goods up to 1.5 tons - the most frequent orders in our company.\n          \n          But at the same time, we do not limit the range of courier services and without problems we can buy and bring goods and products from the online store, arrange delivery for the online store, cafe, supermarket, restaurant or any other business. Around the clock on our website you can call a courier in just a minute and arrange an express courier delivery without unnecessary bureaucracy, negotiations and calls to the call center.`}})}));",
		"webapp/core/controller/App.controller.js": "sap.ui.define([\"App/base/BaseController\",\"App/core/model/App\",\"App/services/App\",\"App/helpers/index\",\"sap/ui/Device\"],function(e,t,s,i,o){return e.extend(\"App.core.controller.App\",{onInit(){this.setModels(),o.media.attachHandler(this.sizeChanged,this,\"MainRangeSet\"),this.sizeChanged(o.media.getCurrentRange(\"MainRangeSet\")),this.setPageInfo()},setModels(){this.setModel(t.main,\"AppMainModel\"),this.setModel(t.ui,\"AppUiModel\")},setPageInfo(){let e=this.getModel(\"AppUiModel\"),t=this.getModel(\"AppMainModel\");e.setProperty(\"/isLoading\",!0),i.trackExec({cb:async()=>{var e=await s.getCompanyCities();t.setProperty(\"/states\",e)},errCb:e=>{e=e?.response?.data?.errors?.[0]?.text;throw new Error(e)},finalCb:()=>{e.setProperty(\"/isLoading\",!1)}})},sizeChanged(e){this.getModel(\"AppMainModel\").setProperty(\"/typeSize\",e.from)},onAfterRendering(){this.byId(\"tapBox\").addEventDelegate({onclick:()=>this.onToggleSideMenu()})},onToggleSideMenu(){var e=this.getModel(\"AppMainModel\"),t=this.byId(\"sideMenu\"),s=e.getProperty(\"/sideMenu/isClosed\"),i=e=>e?\"side-menu_closed\":\"side-menu_opened\";e.setProperty(\"/sideMenu/isClosed\",!s),t.addStyleClass(i(!s)),t.removeStyleClass(i(s))},onLogoPress(){this.getRouter().navTo(\"Main\")},onSendPress(){this.getRouter().navTo(\"Send\")}})});",
		"webapp/core/controller/Main.controller.js": "sap.ui.define([\"App/base/App/BaseMainPageController\"],function(e){return e.extend(\"App.core.controller.Main\",{})});",
		"webapp/core/controller/Send.controller.js": "sap.ui.define([\"App/base/App/BaseMainPageController\"],function(e){return e.extend(\"App.core.controller.Send\",{})});",
		"webapp/core/view/App.view.xml": "<mvc:View controllerName=\"App.core.controller.App\"\r\n  xmlns:core=\"sap.ui.core\"\r\n  xmlns:mvc=\"sap.ui.core.mvc\"\r\n  xmlns=\"sap.m\"\r\n  xmlns:tnt=\"sap.tnt\"\r\n  xmlns:f=\"sap.f\"\r\n  displayBlock=\"true\"><tnt:ToolPage class=\"tool-page\"><tnt:header><tnt:ToolHeader class=\"header\"\r\n        busy=\"{AppUiModel>/isLoading}\"\r\n        busyIndicatorDelay=\"0\"><HBox width=\"100%\"\r\n          justifyContent=\"Center\"\r\n          visible=\"{= ${AppMainModel>/typeSize} &gt; 1240}\"><HBox class=\"wrapper\"\r\n            width=\"100%\"\r\n            height=\"80px\"\r\n            justifyContent=\"SpaceBetween\"\r\n            alignItems=\"Center\"><HBox class=\"subwrapper\"\r\n              alignItems=\"Center\"><Image class=\"header__logo\"\r\n                mode=\"InlineSvg\"\r\n                src=\"/assets/images/header/logo.svg\"\r\n                press=\"onLogoPress\" /><ToolbarSpacer width=\"66px\" /><Select class=\"header__city\"\r\n                width=\"200px\"\r\n                items=\"{AppMainModel>/states}\"\r\n                selectedKey=\"{AppMainModel>/selectedKeyState}\"><core:ListItem key=\"{AppMainModel>id}\"\r\n                  text=\"{AppMainModel>code}, {AppMainModel>name}\" /></Select></HBox><HBox class=\"subwrapper\"\r\n              alignItems=\"Center\"><SearchField class=\"header__search search-field\"\r\n                placeholder=\"Track a Package\"\r\n                width=\"184px\" /></HBox><HBox class=\"subwrapper\"\r\n              alignItems=\"Center\"><Link text=\"Send a Parcel\"\r\n                class=\"header__link link\"\r\n                press=\"onSendPress\" /><Link text=\"Become a Courier\"\r\n                class=\"header__link link\" /><Button class=\"header__login button\"\r\n                icon=\"/assets/images/header/lock.svg\" /></HBox></HBox></HBox><HBox class=\"header-small\"\r\n          width=\"100%\"\r\n          height=\"64px\"\r\n          alignItems=\"Center\"\r\n          justifyContent=\"SpaceBetween\"\r\n          visible=\"{= ${AppMainModel>/typeSize} &lt; 1366}\"><Image class=\"header-small__profile\"\r\n            src=\"/assets/images/header/profile.svg\"\r\n            press=\"\" /><Image class=\"header-small__logo\"\r\n            width=\"120px\"\r\n            src=\"/assets/images/header/logo.svg\"\r\n            press=\"onLogoPress\" /><Image class=\"header-small__menu-btn\"\r\n            src=\"/assets/images/header/menu.svg\"\r\n            press=\"onToggleSideMenu\" /></HBox><HBox id=\"screenWrapper\"\r\n          class=\"screen-wrapper\"\r\n          width=\"{= ${AppMainModel>/sideMenu/isClosed} ? '0' : '100%'}\"\r\n          height=\"100%\"><VBox id=\"tapBox\"\r\n            class=\"tap-box\"\r\n            width=\"100%\"\r\n            height=\"100vh\"></VBox><VBox id=\"sideMenu\"\r\n            class=\"side-menu\"\r\n            width=\"274px\"\r\n            height=\"100vh\"\r\n            justifyContent=\"SpaceBetween\"\r\n            alignItems=\"Center\"><VBox class=\"side-menu__wrapper\"\r\n              width=\"100%\"><HBox class=\"side-menu-header\"\r\n                width=\"100%\"\r\n                height=\"64px\"\r\n                alignItems=\"Center\"\r\n                justifyContent=\"SpaceBetween\"><Select class=\"header__city\"\r\n                  width=\"200px\"\r\n                  items=\"{AppMainModel>/states}\"\r\n                  selectedKey=\"{AppMainModel>/selectedKeyState}\"><core:ListItem key=\"{AppMainModel>id}\"\r\n                    text=\"{AppMainModel>code}, {AppMainModel>name}\" /></Select><Image class=\"side-menu__menu-btn\"\r\n                  src=\"/assets/images/header/x.svg\"\r\n                  press=\"onToggleSideMenu\" /></HBox><VBox class=\"side-menu__subwrapper\"\r\n                width=\"100%\"><SearchField class=\"side-menu__search search-field\"\r\n                  placeholder=\"Track a Package\"\r\n                  width=\"242px\" /><Link text=\"Send a Parcel\"\r\n                  class=\"header__link link\"\r\n                  press=\"onSendPress\" /><Link text=\"Become a Courier\"\r\n                  class=\"header__link link\" /><Link text=\"Affiliate Program\"\r\n                  class=\"header__link link\" /><Link text=\"Help &amp; Support\"\r\n                  class=\"header__link link\" /></VBox></VBox><Button class=\"side-menu__button button text_h5\"\r\n              width=\"242px\"\r\n              text=\"Take a complex order\" /></VBox></HBox></tnt:ToolHeader></tnt:header><tnt:mainContents><App id=\"app\"\r\n        autoFocus=\"false\"\r\n        backgroundColor=\"#FFFFFF\" /></tnt:mainContents></tnt:ToolPage></mvc:View>",
		"webapp/core/view/Main.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\"\r\n    xmlns:mvc=\"sap.ui.core.mvc\"\r\n    xmlns=\"sap.m\"\r\n    xmlns:f=\"sap.f\"\r\n    xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n    xmlns:grid=\"sap.ui.layout.cssgrid\"\r\n    displayBlock=\"true\"><VBox height=\"100%\"\r\n        class=\"part\"><mvc:XMLView viewName=\"App.core.view.Parts.MainPage\" /></VBox></mvc:View>",
		"webapp/core/view/Send.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\"\r\n    xmlns:mvc=\"sap.ui.core.mvc\"\r\n    xmlns=\"sap.m\"\r\n    xmlns:f=\"sap.f\"\r\n    xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n    xmlns:grid=\"sap.ui.layout.cssgrid\"\r\n    displayBlock=\"true\"><VBox height=\"100%\"\r\n        class=\"part\"><mvc:XMLView viewName=\"App.core.view.Parts.MainPage\" /></VBox></mvc:View>",
		"webapp/core/model/App.js": "sap.ui.define([\"App/base/BaseModel\"],e=>({ui:new e({isLoading:!1}),main:new e({typeSize:\"\",sideMenu:{isClosed:!0},states:[]})}));",
		"webapp/helpers/functions/trackExec.js": "sap.ui.define([],()=>async({cb:a,errCb:i,finalCb:r,noThrow:t=!1})=>{try{return await a()}catch(a){if(i&&await i(a),!t)throw a}finally{r&&await r()}});",
		"webapp/core/view/Parts/MainPage.view.xml": "<mvc:View controllerName=\"App.core.controller.Main\"\r\n    xmlns:core=\"sap.ui.core\"\r\n    xmlns:mvc=\"sap.ui.core.mvc\"\r\n    xmlns=\"sap.m\"\r\n    xmlns:f=\"sap.f\"\r\n    xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n    xmlns:grid=\"sap.ui.layout.cssgrid\"\r\n    displayBlock=\"true\"><VBox class=\"main-wrapper\"\r\n        height=\"100%\"\r\n        width=\"100%\"><VBox class=\"busy-overlay\"\r\n            width=\"100%\"\r\n            height=\"100vh\"\r\n            visible=\"{= ${BaseUiModel>/isLoading}}\"\r\n            busy=\"{BaseUiModel>/isLoading}\"\r\n            busyIndicatorDelay=\"0\" /><VBox class=\"main-content\"\r\n            width=\"100%\"\r\n            alignItems=\"Center\"\r\n            justifyContent=\"Center\"><layoutData><FlexItemData growFactor=\"1\"\r\n                    shrinkFactor=\"1\" /></layoutData><HBox class=\"offer\"\r\n                justifyContent=\"Center\"\r\n                width=\"100%\"><HBox class=\"content-wrapper\"\r\n                    width=\"100%\"\r\n                    alignItems=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? 'Center' : 'Inherit'}\"\r\n                    justifyContent=\"SpaceBetween\"><VBox class=\"left\"\r\n                        width=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '328px' : '375px'}\"><Text class=\"text text_h1\"\r\n                            text=\"{BaseMainModel>/pageInfo/offer/promoTextBlock/title}\" /><Text class=\"left__text text\"\r\n                            width=\"100%\"\r\n                            text=\"{BaseMainModel>/pageInfo/offer/promoTextBlock/text}\" /><Link class=\"left__link link_blue\"\r\n                            text=\"Read more\" /><Text class=\"text text_h3\"\r\n                            text=\"{BaseMainModel>/pageInfo/offer/video/title}\" /><HBox class=\"left__video\"\r\n                            width=\"100%\"\r\n                            height=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '200px' : '232px'}\"><html:iframe src=\"https://player.vimeo.com/video/452448160?h=7690ed6dd4\"\r\n                                frameborder=\"0\"\r\n                                allowfullscreen=\"true\"></html:iframe></HBox></VBox><Image class=\"offer__graphic\"\r\n                        src=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '/assets/images/offer/city.svg' : ${BaseMainModel>/pageInfo/offer/backgroundImage}}\" /><VBox class=\"right\"\r\n                        width=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '328px' : '360px'}\"><VBox class=\"offer__form\"\r\n                            width=\"100%\"\r\n                            height=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '472px' : '500px'}\"><HBox class=\"offer__form-title\"\r\n                                alignItems=\"Center\"><Text class=\"text text_h3 sapUiSmallMarginEnd\"\r\n                                    text=\"Send a Parcel\" /><Button class=\"button-clue\"\r\n                                    icon=\"/assets/images/offer/clue.svg\"\r\n                                    press=\"onOpenPopover\"><customData><core:CustomData key=\"popover-fragment-name\"\r\n                                            value=\"hint\" /></customData></Button></HBox><VBox class=\"offer__tabs\"><IconTabBar class=\"tabs\"\r\n                                    selectedKey=\"{BaseMainModel>/pageInfo/offer/deliveryWays/car/code}\"><items><IconTabFilter key=\"{BaseMainModel>/pageInfo/offer/deliveryWays/foot/code}\"\r\n                                            icon=\"assets/images/tabs/onFoot.svg\"\r\n                                            text=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '' : 'up to '+ ${BaseMainModel>/pageInfo/offer/deliveryWays/foot/maximumWeight} +'lb'}\" /><IconTabFilter key=\"{BaseMainModel>/pageInfo/offer/deliveryWays/car/code}\"\r\n                                            icon=\"assets/images/tabs/car.svg\"\r\n                                            text=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '' : 'up to ' + ${BaseMainModel>/pageInfo/offer/deliveryWays/car/maximumWeight} + 'lb'}\" /><IconTabFilter key=\"{BaseMainModel>/pageInfo/offer/deliveryWays/truck/code}\"\r\n                                            icon=\"assets/images/tabs/truck.svg\"\r\n                                            text=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '' : 'over ' + ${BaseMainModel>/pageInfo/offer/deliveryWays/truck/maximumWeight} + 'lb'}\" /></items></IconTabBar></VBox><VBox class=\"offer__form-inputs\"><HBox><VBox class=\"offer__form-side-icons\"\r\n                                        alignItems=\"Center\"><Image src=\"assets/images/offer/circle.svg\" /><Image src=\"assets/images/offer/vdots.svg\"\r\n                                            class=\"side-icon\" /><Image src=\"assets/images/offer/pin.svg\" /></VBox><VBox class=\"offer__form-text-inputs\"\r\n                                        width=\"100%\"><VBox class=\"input-pair\"><Text class=\"input-title text\"\r\n                                                text=\"Pickup location\" /><Input class=\"input\"\r\n                                                placeholder=\"location\" /></VBox><VBox class=\"input-pair\"><Text class=\"input-title text\"\r\n                                                text=\"Drop location\" /><Input class=\"input\"\r\n                                                placeholder=\"location\"\r\n                                                showSuggestion=\"true\"\r\n                                                suggestionItems=\"{BaseMainModel>/autoFill}\"><suggestionItems><core:ListItem text=\"{BaseMainModel>text}\" /></suggestionItems></Input></VBox></VBox></HBox><VBox class=\"offer__form-buttons\"\r\n                                    alignItems=\"Center\"\r\n                                    width=\"100%\"><Button class=\"button\"\r\n                                        text=\"Order\"\r\n                                        width=\"100%\" /><Button class=\"button button_transparent\"\r\n                                        text=\"Clear All\"\r\n                                        icon=\"assets/images/offer/clear.svg\" /></VBox></VBox></VBox><VBox class=\"track\"\r\n                            width=\"100%\"\r\n                            height=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '128px' : '144px'}\"><Text class=\"text text_h3\"\r\n                                text=\"Track a package\" /><SearchField class=\"track__search search-field\"\r\n                                placeholder=\"Enter code\"\r\n                                width=\"100%\" /></VBox></VBox></HBox></HBox><VBox class=\"express\"\r\n                width=\"100%\"\r\n                alignItems=\"Center\"><Text class=\"text text_h1\"\r\n                    textAlign=\"Center\"\r\n                    text=\"Express delivery market revolution\" /><Text class=\"text text_h4\"\r\n                    textAlign=\"Center\"\r\n                    width=\"100%\"\r\n                    text=\"{BaseMainModel>/pageInfo/expressDeliveryText}\" /><f:GridList class=\"pads\"\r\n                    items=\"{BaseMainModel>/expressPads}\"\r\n                    width=\"100%\"><f:GridListItem class=\"item\"><VBox class=\"item__pad\"\r\n                            height=\"100%\"\r\n                            justifyContent=\"SpaceBetween\"><layoutData><FlexItemData growFactor=\"1\"\r\n                                    shrinkFactor=\"0\" /></layoutData><Text class=\"text text_h3\"\r\n                                text=\"{BaseMainModel>title}\" /><HBox class=\"item__image\"><HBox class=\"circle-pad\"><Image src=\"{BaseMainModel>icon}\" /></HBox><Image src=\"{BaseMainModel>icon2}\" /></HBox><Text class=\"text\"\r\n                                text=\"{BaseMainModel>text}\" /></VBox></f:GridListItem></f:GridList></VBox><HBox class=\"parcel\"\r\n                width=\"100%\"\r\n                justifyContent=\"Center\"><HBox class=\"parcel__image\"><Image src=\"/assets/images/parcel.svg\" /></HBox></HBox><VBox class=\"partners\"\r\n                width=\"100%\"\r\n                alignItems=\"Center\"><Text class=\"text text_h1\"\r\n                    text=\"Our Partners\" /><HBox class=\"partners-slider\"\r\n                    width=\"100%\"\r\n                    items=\"{BaseMainModel>/pageInfo/partners}\"><HBox class=\"monochrome\"\r\n                        width=\"188px\"\r\n                        height=\"56px\"\r\n                        justifyContent=\"Center\"\r\n                        alignItems=\"Center\"><Image class=\"partners-slider__logo\"\r\n                            src=\"{BaseMainModel>image}\" /></HBox></HBox><HBox class=\"collaborate\"><Button class=\"collaborate__button button\"\r\n                        icon=\"/assets/images/partners/collaborate.svg\"\r\n                        text=\"Let's collaborate\" /></HBox><HBox class=\"logos\"\r\n                    width=\"100%\"\r\n                    items=\"{BaseMainModel>/pageInfo/partners}\"\r\n                    visible=\"{= ${BaseMainModel>/typeSize} &gt; 1024}\"><layoutData><FlexItemData maxWidth=\"1104px\" /></layoutData><HBox class=\"monochrome\"\r\n                        alignItems=\"Center\"><Image class=\"logos__logo\"\r\n                            src=\"{BaseMainModel>image}\" /></HBox></HBox></VBox><VBox class=\"what-we-do\"\r\n                width=\"100%\"\r\n                alignItems=\"Center\"><HBox class=\"what-we-do__bgimage\"><Image src=\"/assets/images/what-we-do/city.png\" /></HBox><Text class=\"text text_h1\"\r\n                    textAlign=\"Center\"\r\n                    text=\"What we do\" /><Text class=\"text text_h4\"\r\n                    textAlign=\"Center\"\r\n                    width=\"100%\"\r\n                    text=\"{BaseMainModel>/pageInfo/whatWeDoText}\" /><HBox class=\"pads\"\r\n                    items=\"{BaseMainModel>/whatWeDo}\"><VBox class=\"pad\"\r\n                        width=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '328px' : '300px'}\"\r\n                        height=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '212px' : '236px'}\"><HBox class=\"circle-pad circle-pad_small\"><Image src=\"{BaseMainModel>icon}\"\r\n                                width=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? '32px' : '40px'}\" /></HBox><HBox class=\"pad__title\"\r\n                            alignItems=\"Center\"><Text class=\"text text_h3\"\r\n                                text=\"{BaseMainModel>title}\" /><Link class=\"link link_blue link_blue_underlined\"\r\n                                text=\"{BaseMainModel>link}\" /></HBox><Text class=\"text\"\r\n                            textAlign=\"{= ${BaseMainModel>/typeSize} &lt; 1024 ? 'Center' : 'Left'}\"\r\n                            text=\"{BaseMainModel>text}\" /></VBox></HBox><Button class=\"what-we-do__button button\"\r\n                    text=\"Get started!\"\r\n                    width=\"296px\" /></VBox><VBox class=\"payment\"\r\n                width=\"100%\"\r\n                alignItems=\"Center\"><Text class=\"text text_h1\"\r\n                    text=\"Payment methods\" /><HBox class=\"slider\"\r\n                    width=\"100%\"\r\n                    items=\"{BaseMainModel>/pageInfo/paymentMethods/items}\"><layoutData><FlexItemData maxWidth=\"1172px\" /></layoutData><Image src=\"{BaseMainModel>image}\"\r\n                        width=\"84px\" /></HBox></VBox><HBox class=\"parcel\"\r\n                width=\"100%\"\r\n                justifyContent=\"Center\"><HBox class=\"parcel__image\"><Image src=\"/assets/images/parcel.svg\" /></HBox></HBox><VBox class=\"info\"\r\n                alignItems=\"Center\"><VBox class=\"info__text\"\r\n                    width=\"100%\"\r\n                    alignItems=\"End\"><Text id=\"info__test\"\r\n                        class=\"text\"\r\n                        binding=\"{BaseMainModel>/infoText}\"\r\n                        text=\"{= ${BaseMainModel>text} + (!!${BaseMainModel>isVisible} ? ('\\n\\n' + ${BaseMainModel>textHideable}) : '' )}\" /><Button class=\"info__etc\"\r\n                        width=\"25px\"\r\n                        icon=\"/assets/images/info/etc.svg\"\r\n                        press=\"onInfoToggle\" /><layoutData><FlexItemData maxWidth=\"1160px\" /></layoutData></VBox></VBox></VBox><VBox class=\"footer\"\r\n            justifyContent=\"Center\"\r\n            alignItems=\"Center\"\r\n            busy=\"{BaseUiModel>/isLoading}\"\r\n            busyIndicatorDelay=\"0\"><HBox class=\"wrapper\"\r\n                width=\"100%\"\r\n                alignItems=\"{= ${BaseMainModel>/typeSize} &lt; 1240 ? 'Center' : 'Start'}\"\r\n                justifyContent=\"SpaceBetween\"><VBox class=\"column\"><HBox class=\"title title_lineless\"><Text text=\"About Whoosh\" /></HBox><HBox class=\"content\"><Image src=\"/assets/images/footer/two-pins.svg\"\r\n                            class=\"content__two-pins\" /><Text width=\"240px\"\r\n                            text=\"{BaseMainModel>/footer/about}\" /></HBox></VBox><HBox class=\"links\"><VBox class=\"links-column\"><HBox class=\"title\"><Text text=\"Menu\" /></HBox><List items=\"{BaseMainModel>/footer/menu}\"><StandardListItem class=\"link\"\r\n                                title=\"{BaseMainModel>title}\" /></List></VBox><VBox class=\"links-column\"><HBox class=\"title\"><Text text=\"Services\" /></HBox><List items=\"{BaseMainModel>/footer/services}\"><StandardListItem class=\"link\"\r\n                                title=\"{BaseMainModel>title}\" /></List></VBox></HBox><VBox class=\"column\"\r\n                    width=\"{= ${BaseMainModel>/typeSize} &lt; 1240 ? '100%' : 'auto'}\"><HBox class=\"title\"><Text text=\"Contact Us\" /></HBox><VBox class=\"content\"><Text class=\"phone\"\r\n                            text=\"{BaseMainModel>/footer/phone}\" /><HBox><Image class=\"footer__icon\"\r\n                                src=\"/assets/images/footer/pin-blue.svg\" /><Text class=\"footer__icon-text\"\r\n                                text=\"{BaseMainModel>/footer/address}\" /></HBox><HBox class=\"social\"\r\n                            width=\"100%\"\r\n                            items=\"{BaseMainModel>/footer/socials}\"><Button class=\"button\"\r\n                                icon=\"{BaseMainModel>icon}\"\r\n                                press=\"onNavSocial\"><customData><core:CustomData key=\"socialLink\"\r\n                                        value=\"{BaseMainModel>icon}\" /></customData><layoutData><FlexItemData styleClass=\"social-button\" /></layoutData></Button></HBox></VBox></VBox></HBox><VBox class=\"madeby\"\r\n                width=\"100%\"><layoutData><FlexItemData maxWidth=\"1160px\" /></layoutData><HBox justifyContent=\"Center\"\r\n                    alignItems=\"Center\"\r\n                    width=\"100%\"\r\n                    visible=\"{= ${BaseMainModel>/typeSize} &lt; 1240}\"><Image src=\"/assets/images/footer/pyrobyte_red.svg\" /></HBox><Text class=\"madeby__line\"\r\n                    text=\"Made by\" /><HBox class=\"madeby__content\"\r\n                    justifyContent=\"Center\"\r\n                    alignItems=\"Center\"><HBox class=\"madeby__text madeby__text_left\"\r\n                        justifyContent=\"Center\"\r\n                        width=\"{= ${BaseMainModel>/typeSize} &lt; 1240 ? '100%' : '25%'}\"><Text text=\"© 2022. All rights reserved.\" /></HBox><HBox justifyContent=\"Center\"\r\n                        width=\"50%\"\r\n                        visible=\"{= ${BaseMainModel>/typeSize} &gt; 1240}\"><Image src=\"/assets/images/footer/pyrobyte.svg\" /></HBox><HBox class=\"madeby__text madeby__text_right\"\r\n                        justifyContent=\"Center\"\r\n                        width=\"{= ${BaseMainModel>/typeSize} &lt; 1240 ? '100%' : '25%'}\"><Image class=\"footer__icon\"\r\n                            src=\"/assets/images/footer/flower.svg\" /><Text class=\"footer__icon-text\"\r\n                            text=\"Privacy policy\" /></HBox></HBox></VBox></VBox></VBox></mvc:View>",
		"webapp/services/Common/Fragments/Fragments.js": "sap.ui.define([\"sap/ui/core/Fragment\",\"App/constants/index\",\"App/services/Common/Fragments/Maps/Dialogs\",\"App/services/Common/Fragments/Maps/Popovers\"],(i,{FRAGMENT_TYPES:p},a,e)=>({_dialogFragmentsDataMap:a,_popoverFragmentsDataMap:e,async loadFragment(e,t){var a=this.getView(),r=e.callbacks;let s=e.eventSource;var n=this.byId(e.id),o=a=>{if(t===p.DIALOG)a.open();else{if(t!==p.POPOVER)throw new Error(\"Некорректный тип фрагмента!\");a.openBy(s)}};return n?r&&r.forEach(a=>this[a](s,e.id)):(n=await i.load({id:a.getId(),name:e.path,controller:this}),a.addDependent(n),r&&r.forEach(a=>this[a](s,e.id))),o(n),n},getFragmentData(a,e){return this[`_${a}FragmentsDataMap`][e]}}));",
		"webapp/core/view/Fragments/Popovers/Hint.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\"\r\n  xmlns:core=\"sap.ui.core\"><Popover id=\"hintPopover\"\r\n    class=\"hint-popover\"\r\n    placement=\"VerticalPreferredBottom\"\r\n    horizontalScrolling=\"false\"\r\n    verticalScrolling=\"false\"\r\n    showHeader=\"false\"\r\n    showArrow=\"false\"\r\n    contentMinWidth=\"250px\"\r\n    offsetY=\"8\"><HBox class=\"hint-popover__wrapper\"\r\n      width=\"250px\"><Text class=\"text\"\r\n        text=\"{BaseMainModel>/pageInfo/offer/promoParcelHint}\"></Text></HBox></Popover></core:FragmentDefinition>\r\n",
		"webapp/services/Common/Fragments/Maps/Dialogs.js": "sap.ui.define([],()=>({}));",
		"webapp/services/Common/Fragments/Maps/Popovers.js": "sap.ui.define([],()=>({hint:{id:\"hintPopover\",path:\"App/core/view/Fragments/Popovers/Hint\"}}));"
	}
});