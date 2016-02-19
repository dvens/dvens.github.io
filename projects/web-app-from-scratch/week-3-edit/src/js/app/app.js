'use strict';

var app = new Peach();

app.setAppConfig(function() {

	var config = {};

	config.templateUrl = 'views';

	config.name = 'Web App From Scratch';
	config.APIkey = '6cb38eaa7fe8c8602cce052374cdf3ad';
	config.APIUrl = 'http://api.themoviedb.org/3/';

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

		genres: {
			title: 'Genres',
			url: '/genres',
			template: 'genres.html',
			templateId: 'genres',
			controller: 'genres'
		},

		detail: {
			title: 'Detail',
			url: '/detail/:id',
			template: 'detail.html',
			templateId: 'detail',
			controller: 'detail'
		}

	};

	return config;

});