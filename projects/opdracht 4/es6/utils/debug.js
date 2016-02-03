'use strict';

let debugUtils = {};

// DebugUtils properties
debugUtils.customDebugging = false;
debugUtils.debugId = false;

debugUtils.geoErrorHandler = function(code, message) {

	debugUtils.debugMessage('geo.js error ' + code + ': ' + message);

}

debugUtils.debugMessage = function() {

	(debugUtils.customDebugging && debugUtils.debugId)?document.getElementById(debugId).innerHTML:console.log(message);

}

debugUtils.setCustomDebugging = function(id) {

	debugUtils.debugId = this.debugId;
	debugUtils.debugId = true;

}

export default debugUtils;