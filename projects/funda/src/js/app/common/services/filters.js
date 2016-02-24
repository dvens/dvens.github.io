app.service('filters', [function(

	$config,
	$tools

){

	var filters = {};
	
	filters.getDutchPostal = function(string) {

		var _postal;
		var _string = string.split(',');
			_string = _string[1].split(' ');
			_string = _string[3] + '/' + _string[1] + _string[2];

		return _postal = _string.toLowerCase();

	}

	filters.toFundaPostal = function(string) {



	}

	return filters;

}]);