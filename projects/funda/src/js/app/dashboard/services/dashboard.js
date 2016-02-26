app.service('dashboard-service', ['pageLoader', 'api', function(

	pageLoader,
	api,
	$config,
	$tools

){

	var _endPoint = '/koop/';
	var dashboardService = {};

	dashboardService.getHouse = function(id) {	

		var url = _endPoint + id;
		var prefix = '/detail/'
		return api.get(url, prefix);

	}

	return dashboardService;

}]);