app.service('detail-service', ['pageLoader', function(

	pageLoader,
	$config,
	$tools

){

	var endPoint = 'movie/';

	function getMovie(id) {

		var query = id;
		var url = $config.APIUrl + endPoint + query +'&api_key=' + $config.APIkey;

		console.log(url);

		pageLoader.toggleLoader('show');

		return $tools.$xhr('get', url);

	}

	return {
		getMovie: getMovie
	}

}]);