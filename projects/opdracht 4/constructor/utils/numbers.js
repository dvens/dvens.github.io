'use strict';

var numberUtils = {};

numberUtils.isNumber = function(n) {

	return !isNaN(parseFloat(n)) && isFinite(n);

}

module.exports = numberUtils;
