var APP = APP || {};
APP.renderView = APP.renderView || {};

(function(){

	'use strict';

	var AppConfig = APP.config;

	APP.renderView = {
		
		home: function() {

			var data = {
				title: 'Home',
				content: 'This is home content'
			};

			Peach.render(AppConfig.routing.home.template, data);

		}, 

		discover: function() {

			var endPoint = 'discover/movie';
			var url = APP.config.APIUrl + endPoint +'?api_key=' + APP.config.APIkey;

			APP.api.get(url).then(function(response){

				var data = {
					title : 'Discover new movies',
					movies: response['page']
				};

				console.log(response);

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