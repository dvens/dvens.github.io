var APP = APP || {};
APP.router = APP.router || {};

(function(){

	'use strict';

	APP.router = {
		
		init: function() {

			Peach.router('/home', function() {

				APP.renderView.home();

			});

			Peach.router('/about', function() {

				APP.renderView.about();

			});

		}

	};

}());