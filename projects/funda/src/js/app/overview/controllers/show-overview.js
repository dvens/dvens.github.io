'use strict';

app.controller('home', ['pageLoader', 'overview-service', 'gApi', 'filters' , function(

	pageLoader,
	overviewService,
	gapi,
	filters,
	$tools

) {

	var overview = {};

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
		console.log(_postal);
		overviewService.getHouses('/' + _postal + '/+2km').then(function(response){

			var _data = JSON.parse(response);
			_this.loadTemplate(_data)

		});

	}

	overview.loadTemplate = function(data) {

		console.log(data);

		var _this = this;
		var data = {
			title: 'Woningen op jouw locatie',
			houses: data.Objects
		};

		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function(){
			
			_this.initEvents();

		});
		
	}

	overview.initEvents = function() {

		var h1 = document.querySelector('h1');
		console.log(h1);

	}

	overview.init();

}]);