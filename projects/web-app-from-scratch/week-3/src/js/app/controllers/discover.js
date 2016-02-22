'use strict';

app.controller('discover', ['pageLoader', function(

	pageLoader,
	$tools

) {

	function orderByNumberAsc(array, key) {

		var input = array;

		input.sort(function(a, b) {
			return a[key] - b[key];
		});

	}

	// Smallest to largest
	function orderByNumberDesc(array, key) {

		var input = array;

		input.sort(function(a, b) {
			return b[key] - a[key];
		});

	}

	function init() {

		loadTemplate();

	}

	function loadTemplate() {

		var data = {
			title: 'Discover',
			content: ''
		};

		var endPoint = 'discover/movie';
		var url = 'http://api.themoviedb.org/3/' + endPoint +'?api_key=' + '6cb38eaa7fe8c8602cce052374cdf3ad';

		// console.log($tools);

		// $tools.$xhr(url).then(function(response){

		// 	var _reponse = JSON.parse(reponse)

		// 	orderByNumberDesc(_response.results, 'vote_average');

		// 	var data = {
		// 		title : 'Discover new movies',
		// 		movies: _response.results
		// 	};


		// });

		pageLoader.toggleLoader('show');
	
			pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function() {

		});


	}

	init();

}]);