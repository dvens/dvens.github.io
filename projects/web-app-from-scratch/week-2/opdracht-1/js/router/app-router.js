var APP = APP || {};
APP.router = APP.router || {};

(function(){

	'use strict';

	APP.router = {
		
		init: function() {

			Peach.router('/', function() {

				// first render data then renderview;
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