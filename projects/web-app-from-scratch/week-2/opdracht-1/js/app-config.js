var APP = APP || {};
APP.config = APP.config || {};

(function(){

	'use strict';

	APP.config = {

		name: 'Web App From Scratch',
		APIkey: '6cb38eaa7fe8c8602cce052374cdf3ad',
		APIUrl: 'http://api.themoviedb.org/3/',

		routing: {

			home: {
				title: 'Home',
				template: 'home'
			},

			discover: {
				title: 'Discover',
				template: 'discover'
			},

			genres: {
				title: 'Genres',
				template: 'genres'
			},

			genreDetail: {
				title: 'Genre Detail',
				template: 'genre-detail'
			}

		}

	};

}());