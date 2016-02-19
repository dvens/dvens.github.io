'use strict';

app.run('init', function($config) {

	var _firsttime = true;
	var _body = document.querySelector('body');
	var _timer;

	firstLoad();

	app
		.route({
			url: $config.routing.home.url,
			template: $config.routing.home.template,
			templateId: $config.routing.home.templateId,
			controller: $config.routing.home.controller
		})

		.route({
			url: $config.routing.discover.url,
			template: $config.routing.discover.template,
			templateId: $config.routing.discover.templateId,
			controller: $config.routing.discover.controller
		})

		.route({
			url: $config.routing.genres.url,
			template: $config.routing.genres.template,
			templateId: $config.routing.genres.templateId,
			controller: $config.routing.genres.controller
		})

		.route({
			url: $config.routing.detail.url,
			template: $config.routing.detail.template,
			templateId: $config.routing.detail.templateId,
			controller: $config.routing.detail.controller
		});


	function firstLoad() {

		if( _firsttime ) {

			_timer = setTimeout(function(){
				
				_body.classList.add('loaded');
				_firsttime = false;
				clearTimeout(_timer);

			},700);
			
		}
		
	}

});