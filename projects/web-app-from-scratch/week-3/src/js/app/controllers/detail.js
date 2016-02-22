'use strict';

app.controller('detail', ['pageLoader', 'detail-service', function(

	pageLoader,
	detailService,
	$tools

) {

	var _id = $tools.$route.params.id;
	console.log($tools.$route.params.id);

	function init() {

		loadTemplate();

	}

	function loadTemplate() {

		pageLoader.toggleLoader('show');


		detailService.getMovie(_id).then(function(response) {

			console.log(response);

		});

		var data = {
			title: 'Detail',
			content: ''
		};
		
		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function() {

		});

	}

	init();

}]);