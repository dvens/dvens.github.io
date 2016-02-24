app.service('discover-service', ['pageLoader', 'api', function(

	pageLoader,
	api,
	$config,
	$tools

){

	var _endPoint = 'discover/movie';
	var discoverService = {};

	discoverService.getMovies = function(query) {

		var _url = _endPoint + '?api_key=';
		return api.get(_url);

	}

	return discoverService;

}]);