app.service('search-service', ['pageLoader', 'api', function(

	pageLoader,
	api,
	$config,
	$tools

){

	var endPoint = 'search/movie';

	function getSearch(input) {

		var query = '?query=' + input;
		var url = endPoint + query + '&api_key=';

		return api.get(url);

	}

	return {
		getSearch: getSearch
	}

}]);