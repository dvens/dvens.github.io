'use strict';

app.run('init', function($config) {

	var _firsttime = true;
	var _body = document.querySelector('body');
	var _timer;

	var routing = {};

	routing.init = function() {

		this.setRouting();
		this.firstLoad();
		
	}

	routing.setRouting = function() {

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
				url: $config.routing.detail.url,
				template: $config.routing.detail.template,
				templateId: $config.routing.detail.templateId,
				controller: $config.routing.detail.controller
			});


	}

	routing.firstLoad = function() {

		if( _firsttime ) {

			_timer = setTimeout(function(){
				
				_body.classList.add('loaded');
				_firsttime = false;
				clearTimeout(_timer);

			},700);
			
		}
		
	}

	routing.init();

});