var APP = APP || {};

(function(){

	'use strict';

	APP.controller = {

		init: function() {

			window.location = '#/home';
			APP.router.init();

		}

	}

	APP.controller.init();

}());
