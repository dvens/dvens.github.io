app.service('search-service', ['pageLoader', function(

	pageLoader,
	$config,
	$tools

){

	var endPoint = 'search/multi';

	function getSearch(input) {

		var query = '?query=' + input;
		var url = $config.APIUrl + endPoint + query +'&api_key=' + $config.APIkey;

		console.log(url);

		pageLoader.toggleLoader('show');

		return $tools.$xhr('get', url);

	}

	return {
		getSearch: getSearch
	}

}]);