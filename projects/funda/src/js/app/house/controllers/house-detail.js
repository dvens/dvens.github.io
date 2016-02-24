app.controller('house-detail', ['pageLoader', 'house-service', function(

	pageLoader,
	houseService,
	$tools

){

	var houseDetail = {};

	houseDetail.init = function() {

		this.loadData();

	}

	houseDetail.loadData = function() {

		var _this = this;
		var _data;

		houseService.getHouse($tools.$route.params.id).then(function(response){

			_data = JSON.parse(response);
			_this.loadTemplate(_data)

		});

	}

	houseDetail.loadTemplate = function(data) {
		
		console.log(data);

		var _this = this;
		var data = {
			title: 'House Detail: ' + $tools.$route.params.id,
			house: data
		};
		
		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function(){
			
			_this.initEvents();

		});
		
	}

	houseDetail.initEvents = function() {

		console.log('init');

	}

	houseDetail.init();

}]);