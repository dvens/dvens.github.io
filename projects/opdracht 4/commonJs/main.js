var APP = APP = {};

(function() {

	'use strict';

	APP.init = function() {

		var map = new CmdGeo();
		var element = document.querySelector('main');

		var options = {
			start: 12,
			name: 'Amsterdam',
			data: 'data.json'
		};

		map.init();
		map.generateMap(options, element);

	}

	APP.init();

});