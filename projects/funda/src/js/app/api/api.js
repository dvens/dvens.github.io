app.service('api', ['pageLoader', function(

	pageLoader,
	$config,
	$tools

){	
	
	var api = {};

	api.get = function(url, prefix) {

		pageLoader.toggleLoader('show');

		if( prefix ) {

			return $tools.$xhr('GET', $config.apiUrl + prefix + $config.apiKey + url);
				
		} else {

			return $tools.$xhr('GET', $config.apiUrl + $config.apiKey + url);

		}
		

	}

	api.post = function(url, data, contentType) {

		pageLoader.toggleLoader('show');
		return $tools.$xhr('POST', $config.apiUrl + $config.apiKey + url, data, contentType);

	}

	api.put = function(url, data, contentType) {

		pageLoader.toggleLoader('show');
		return $tools.$xhr('PUT', $config.apiUrl + $config.apiKey + url, data, contentType);

	}

	api.getGoogleApi = function(url) {

		pageLoader.toggleLoader('show');
		return $tools.$xhr('GET', $config.googleApiUrl + url + $config.googleApiKey);

	}

	return api;

}]);