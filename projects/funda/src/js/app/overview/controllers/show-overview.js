'use strict';

app.controller('home', ['pageLoader', 'overview-service', 'gApi', 'filters' , function(

	pageLoader,
	overviewService,
	gapi,
	filters,
	$tools

) {

	var overview = {};
	var $rootscope = this;

	overview.init = function() {

		pageLoader.toggleLoader('show');
		this.getLongLang();

	}

	overview.getLongLang = function() {

		var _this = this;

		gapi.getLongLang(function(position){

			var _position = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			_this.getLocation(_position);

		});

	}

	overview.getLocation = function(pos) {

		var _this = this;
		var _query = pos.lat + ',' + pos.lng;
		
		gapi.getLocation(_query).then(function(response) {

			var _response = JSON.parse(response);
			
			_this.loadData(_response.results[0]);	

		});

	}

	overview.loadData = function(res) {

		var _this = this;
		var _postal = filters.getDutchPostal(res.formatted_address);
	
		overviewService.getHouses('/' + _postal + '/+2km').then(function(response){

			var _data = JSON.parse(response);
			_this.loadPage(_data)

		});

	}

	overview.loadPage = function(data) {

		var _ids = data.Objects.map(function(obj) {

			return obj.Id;

		});

		var i = parseInt(Math.random()*(_ids.length-1));

		$rootscope.data = _ids;
		
		window.location = '#/house/' + _ids[i];
		
	}

	overview.init();

}]);