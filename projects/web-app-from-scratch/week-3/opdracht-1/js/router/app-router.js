var APP = APP || {};
APP.router = APP.router || {};

(function(){

	'use strict';

	APP.router = {
		
		init: function() {

			// TODO Add controller like Angular instead of function callback
			Peach.router('/', function() {

				APP.renderView.home();

			});


			Peach.router('/discover', function() {

				APP.renderView.discover();

			});

			Peach.router('/genres', function() {

				APP.renderView.genres();

			});

			Peach.router('/genres/:id/', function() {

				APP.renderView.genreDetail();

			});

		}

	};

}());