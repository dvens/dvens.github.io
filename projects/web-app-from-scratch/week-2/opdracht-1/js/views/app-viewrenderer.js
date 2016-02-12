var APP = APP || {};
APP.renderView = APP.renderView || {};

(function(){

	'use strict';

	var AppConfig = APP.config;

	APP.renderView = {
		
		// TODO: Cleanup Controllers in sep files

		home: function() {

			function init() {

				var data = {
					title: 'Home',
					content: 'Search on your favorite movies'
				};

				Peach.render(AppConfig.routing.home.template, data);
				initEvents();

			}

			function initEvents() {

				var searchField = document.querySelector('.search__input');
				
				searchField.addEventListener('input', function() {
					
					var _value = this.value;
					search(_value);

				});

			}

			function search(input) {

				var searchResults = document.querySelector('.search__results');
				
				if(!input) { searchResults.innerHTML = ''; return } 

				var endPoint = 'search/multi';
				var query = '?query=' + input;
				var url = APP.config.APIUrl + endPoint + query +'&api_key=' + APP.config.APIkey;

				APP.api.get(url).then(function(response){

					var data = {
						movies: response.results
					};

					searchResults.innerHTML = Peach.render('results', data, 'render');

				});

			}

			init();

		}, 

		discover: function() {

			var endPoint = 'discover/movie';
			var url = APP.config.APIUrl + endPoint +'?api_key=' + APP.config.APIkey;

			APP.api.get(url).then(function(response){

				APP.filters.orderByNumberDesc(response.results, 'vote_average');

				var data = {
					title : 'Discover new movies',
					movies: response.results
				};

				Peach.render(AppConfig.routing.discover.template, data);

			});

		},

		genres: function() {

			var data = {
				title: 'Genres',
				content: 'Choose your genre'
			};

			Peach.render(AppConfig.routing.genres.template, data);

		},

		genreDetail: function() {

			var data = {
				title: 'Genre detail page',
				content: 'This is example genre'
			};

			Peach.render(AppConfig.routing.genreDetail.template, data);

		}

	};

}());