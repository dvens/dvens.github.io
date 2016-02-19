var APP = APP || {};
APP.filters = APP.filters || {};

(function(){

	'use strict';
	
	APP.filters = {

		// Largest to smallest
		orderByNumberAsc: function(array, key) {

			var input = array;

			input.sort(function(a, b) {
				return a[key] - b[key];
			});

		},

		// Smallest to largest
		orderByNumberDesc: function(array, key) {

			var input = array;

			input.sort(function(a, b) {
				return b[key] - a[key];
			});

		}

	}
			
}());