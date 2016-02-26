'use strict';

var app = new Peach();

app.setAppConfig(function() {

	var config = {};

	config.apiKey = 'e2d60e885b8742d4b0648300e3703bd7';
	config.apiUrl = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/';

	config.googleApiKey = 'AIzaSyDskMnSpzHcm1uziTw8t5GixzS0BYSiqPQ';
	config.googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

	config.templateUrl = 'views';

	config.appTitle = 'Funda Huizen Dashboard';

	config.routing = {

		home: {
			title: 'Home',
			url: '/',
			controller: 'home'
		},

		detail: {
			title: 'House Detail',
			url: '/house/:id',
			template: 'dashboard.html',
			templateId: 'dashboard',
			controller: 'dashboard'
		}

	};

	return config;

});