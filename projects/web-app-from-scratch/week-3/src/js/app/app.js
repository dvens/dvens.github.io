'use strict';

var app = new Peach();

app.setAppConfig(function() {

	var config = {};

	config.templateUrl = 'views';

	config.name = 'Web App From Scratch';
	config.apiKey = '6cb38eaa7fe8c8602cce052374cdf3ad';
	config.apiUrl = 'http://api.themoviedb.org/3/';

	config.routing = {

		home: {
			title: 'Home',
			url: '/',
			template: 'home.html',
			templateId: 'home',
			controller: 'home'
		},

		discover: {
			title: 'Discover',
			url: '/discover',
			template: 'discover.html',
			templateId: 'discover',
			controller: 'discover'
		},

		detail: {
			title: 'Detail',
			url: '/movie/:id',
			template: 'detail-page.html',
			templateId: 'detail-page',
			controller: 'detail-page'
		}

	};

	return config;

});