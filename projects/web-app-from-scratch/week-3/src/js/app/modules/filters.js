app.module('filters', [function(

	$config,
	$tools

){

	var filters = {};

	// Largest to smallest
	filters.orderByNumberAsc = function(array, key) {

		var input = array;

		input.sort(function(a, b) {
			return a[key] - b[key];
		});

	}

	// Smallest to largest
	filters.orderByNumberDesc = function(array, key) {

		var input = array;

		input.sort(function(a, b) {
			return b[key] - a[key];
		});

	}

	return filters;

}]);