'use strict';

app.controller('home', ['pageLoader', 'search-service' , function(

	pageLoader,
	searchService,
	$tools

) {

	var home = {};

	home.init = function() {

		this.loadTemplate();

	}

	home.loadTemplate = function() {

		var _this = this;
		var data = {
			title: 'Home',
			content: 'Search for your favorite movies'
		};

		pageLoader.toggleLoader('show');
		
		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function(){
			
			_this.initEvents();

		});
		
	}

	home.initEvents = function() {
		
		var _this = this;
		var searchField = document.querySelector('.search__input');
		
		searchField.addEventListener('input', function() {
			
			var _value = this.value;
			_this.search(_value);

		});

	}

	home.search = function(value) {

		var searchResults = document.querySelector('.search__results');
		if(!value) { searchResults.innerHTML = ''; return }

		searchResults.classList.remove('is-active');

		searchService.getSearch(value).then(function(response){

			var _response = JSON.parse(response);

			var data = {
				movies: _response.results
			};

			searchResults.innerHTML = $tools.$render('results', data, 'render');
		
		}).then(function(){

			searchResults.classList.add('is-active');
			pageLoader.toggleLoader('hide');

		});

	}

	home.init();

}]);