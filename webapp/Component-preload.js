jQuery.sap.registerPreloadedModules({
	"name": "webapp.Component-preload",
	"version": "2.0",
	"modules": {
		"webapp/Component.js": "",
		"webapp/core/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){return e.extend(\"App.core.controller.App\",{})});",
		"webapp/core/view/App.view.xml": "<mvc:View\r\n  controllerName=\"App.core.controller.App\"\r\n  xmlns:mvc=\"sap.ui.core.mvc\"\r\n  xmlns=\"sap.m\"\r\n  displayBlock=\"true\"></mvc:View>"
	}
});