app.service('api', ['pageLoader', function(

	pageLoader,
	$config,
	$tools

){	
	
	var api = {};

	api.get = function(url) {
		
		pageLoader.toggleLoader('show');
		return $tools.$xhr('GET', $config.apiUrl + url + $config.apiKey);
			
	}

	api.post = function(url, data, contentType) {

		pageLoader.toggleLoader('show');
		return $tools.$xhr('POST', $config.apiUrl + url + $config.apiKey, data, contentType);

	}

	api.put = function(url, data, contentType) {

		pageLoader.toggleLoader('show');
		return $tools.$xhr('PUT', $config.apiUrl + url + $config.apiKey, data, contentType);

	}

	return api;

}]);