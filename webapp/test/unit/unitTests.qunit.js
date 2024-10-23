/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsnetwbs/z_wbs_inst_cal/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
