// In the promise show and hide loader;
var APP = APP || {};
APP.api = APP.api || {};

(function(){

	'use strict';

	APP.api = {

		get: function(url) {

			return APP.xhr.request('get', url);

		},

		post: function(url, data) {

			// In process
			//return APP.api.xhr('post', url, data);

		}

	};

}());
