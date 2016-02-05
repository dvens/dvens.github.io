var APP = APP || {};

(function(){

	'use strict';

	APP.controller = {

		init: function() {

			// Set window location to home on first entry
			window.location = '#/home';
			APP.router.init();

		}

	}

	APP.controller.init();

}());
