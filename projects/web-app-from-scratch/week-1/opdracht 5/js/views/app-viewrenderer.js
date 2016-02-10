var APP = APP || {};
APP.renderView = APP.renderView || {};

(function(){

	'use strict';

	// TODO: Make new loader to get data and parse page
	// 

	APP.renderView = {
		
		home: function() {

			var data = {
				title: 'Home',
				content: 'This is home content'
			};

			Peach.render('home', data );

		}, 

		about: function() {

			var data = {
				title: 'About',
				content: 'This is about content'
			};

			Peach.render('about', data);

		},

		user: function() {

			var data = {
				title: 'User',
				content: 'This is user content'
			};

			Peach.render('user', data);

		}

	};

}());