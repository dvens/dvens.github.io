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
		console.log(url);
		return api.get(url);

	}

	return overviewService;

}]);