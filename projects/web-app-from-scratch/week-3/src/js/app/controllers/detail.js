'use strict';

app.controller('detail-page', ['pageLoader', 'detail-service', 'ui-events', 'discover-service', function(

	pageLoader,
	detailService,
	uiEvents,
	discoverService,
	$tools

) {

	var _currentMovie;
	window.nextMovie = window.nextMovie || 0;

	var movieDetail = {};

	movieDetail.init = function() {

		this.loadData();

	}

	movieDetail.loadData = function() {

		var _this = this;

		detailService.getMovie($tools.$route.params.id).then(function(response){

			var _data = JSON.parse(response);
			_this.loadTemplate(_data);

		});

	}

	movieDetail.loadTemplate = function(data) {

		var _this = this;
		var data = {
			movie: data
		};

		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function(){

			_this.loadNextMovies();

		});

	}

	movieDetail.loadNextMovies = function() {

		var _this = this;

		discoverService.getMovies().then(function(response){

			var _data = JSON.parse(response);
			_this.initEvents(_data.results);

		});
		
	}

	movieDetail.initEvents = function(data) {

		var _this = this;

		pageLoader.toggleLoader('hide');

		uiEvents.swipe('right', function(){

			if(window.nextMovie <= 0) {
				
				window.location = '#/'

			} else {

				window.nextMovie--
				_this.showNextMovie(data);

			}
			
		});

		uiEvents.swipe('left', function(){

			window.nextMovie++
			_this.showNextMovie(data);
			
		});

	}

	movieDetail.showNextMovie = function(data) {

		window.location = '#/movie/' + data[window.nextMovie].id;

	}

	movieDetail.init();

}]);