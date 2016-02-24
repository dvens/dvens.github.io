'use strict';

app.controller('discover', ['pageLoader', 'discover-service', 'filters', function(

	pageLoader,
	discoverService,
	filters,
	$tools

) {

	var discover = {};

	discover.init = function() {

		this.loadData();

	}

	discover.loadData = function() {

		var _this = this;

		discoverService.getMovies().then(function(response){

			var _data = JSON.parse(response);
			filters.orderByNumberDesc(_data.results, 'vote_average');
			_this.loadTemplate(_data.results);

		});

	}

	discover.loadTemplate = function(data) {

		var _this = this;
		var data = {
			title: 'Discover new movies',
			movies: data
		};

		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data);

	}

	discover.init();

}]);