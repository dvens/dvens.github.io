app.service('detail-service', ['pageLoader', 'api', function(

	pageLoader,
	api,
	$config,
	$tools

){

	var _endPoint = 'movie/';
	var detailService = {};

	detailService.getMovie = function(id) {

		var _url = _endPoint + id + '?api_key=';
		return api.get(_url);

	}

	return detailService;

}]);