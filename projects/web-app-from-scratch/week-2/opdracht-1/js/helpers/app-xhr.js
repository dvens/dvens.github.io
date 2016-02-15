var APP = APP || {};
APP.xhr = APP.xhr || {};

(function(){

	'use strict';
	// TODO implement post;
	APP.xhr = {

		request: function(method, url, data, contentType) {

			return new Promise(function(resolve, reject) {

				var xhr = new XMLHttpRequest();
				xhr.open(method, url, true);

				xhr.onload = function() {

					if (this.status >= 200 && this.status < 300) {
				        
				        resolve(JSON.parse(xhr.response));
				    
				    } else {
					    
					    var error = {
					    	status: this.status,
					    	message: xhr.statusText
					    };

					    reject(error);	
					}

				}

					

				xhr.send();
			
			});

		}

	}
			
}());