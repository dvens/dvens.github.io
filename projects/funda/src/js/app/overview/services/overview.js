app.service('overview-service', ['pageLoader', 'api', function(

	pageLoader,
	api,
	$config,
	$tools

){

	var _endPoint = '/?type=koop&zo=';
	var overviewService = {};

	overviewService.getHouses = function(query) {	

		var url = _endPoint + query;
		return api.get(url);

	}

	return overviewService;

}]);