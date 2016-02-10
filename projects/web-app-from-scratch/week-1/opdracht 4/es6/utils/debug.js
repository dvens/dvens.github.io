'use strict';

const debugUtils = {};

// DebugUtils properties
debugUtils.customDebugging = false;
debugUtils.debugId = false;

debugUtils.geoErrorHandler = function(code, message) {

	this.debugMessage('geo.js error ' + code + ': ' + message);

}

debugUtils.debugMessage = function() {

	(this.customDebugging && debugUtils.debugId)?document.getElementById(debugId).innerHTML:console.log(message);

}

debugUtils.setCustomDebugging = function(id) {

	this.debugId = this.debugId;
	this.debugId = true;

}

export default debugUtils;