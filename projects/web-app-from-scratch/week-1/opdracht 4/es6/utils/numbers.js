'use strict';

export function isNumber = function(n) {

	return !isNaN(parseFloat(n)) && isFinite(n);

}

export function isFunction(fn) {
	
	return typeof fn === 'function';

}

export function isDate(date) {
	
	return toString.call(date) === '[object Date]';

}

export function isFile(obj) {
	
	return toString.call(obj) === '[object File]';
	
}