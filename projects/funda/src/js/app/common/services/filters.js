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

	filters.commaSeparateNumber = function(string) {
	   	
	   	while (/(\d+)(\d{3})/.test(string.toString())){
	    
	    	string = string.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');

	   	}
	   	
	   	return string;
	}

	filters.replaceStr = function(string, el, replace) {
    	
    	return string.split(el).join(replace);

	}

	filters.replaceArray = function(array, el, replace) {
		
		var _newArray = [];
		var _this = this;
		var _item;

		for(var i = 0; i < array.length; i++) {

			_item = _this.replaceStr(array[i], el, replace);
			_newArray.push(_item);
		}


		return _newArray;

	}

	return filters;

}]);


