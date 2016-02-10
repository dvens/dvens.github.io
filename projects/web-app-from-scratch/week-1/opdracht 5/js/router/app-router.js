var APP = APP || {};
APP.router = APP.router || {};

(function(){

	'use strict';

	APP.router = {
		
		init: function() {

			Peach.router('/', function() {

				APP.renderView.home();

			});

			Peach.router('/about', function(test) {

				console.log(test);
				APP.renderView.about();

			});

			Peach.router('/user/:id', function() {

				APP.renderView.user();

			});

		}

	};

}());