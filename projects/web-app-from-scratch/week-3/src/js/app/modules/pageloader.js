app.module('pageLoader', [function(
	
	$config,
	$tools

){

	var _view = document.querySelector('[peach-view]');
	var _newViewHolder = document.querySelector('[peach-view-holder]');
	var _loader = document.querySelector('.loader');
	var _html = document.querySelector('html');
	
	function load(templateUrl, templateId, data, callback) {

		var _url = $config.templateUrl + '/' + templateUrl;
		var _page = {
			url: _url,
			templateId: templateId,
			data: data,
			callback: callback
		};

		toggleLoader('show');

		loadNewContent(_page);

	}

	function loadNewContent(page) {

		app.request('GET', page.url).then(function(response){
	
			_newViewHolder.innerHTML = response;

		}).then(function() {

			animateTransition(page);

		});

	}

	function animateTransition(page) {

		_view.classList.add('peach-transition');
		setNewCurrent(page);

	}

	function setNewCurrent(page) {

		_view.addEventListener('transitionend', setContent, false);

		function setContent() {

			toggleLoader('hide');
			$tools.$render(page.templateId, page.data);
			_view.classList.remove('peach-transition');
			
			if( page.callback ) {

				page.callback();	
				
			}
			
			_newViewHolder.innerHTML = '';
			_view.removeEventListener('transitionend', setContent);

		}
	}


	function toggleLoader(elementShow) {

		if(elementShow == 'show') {

            _loader.classList.add('is-visible');
            _html.classList.add('cursor-wait');
            return;

        }

        if(elementShow == 'hide') {

            _loader.classList.remove('is-visible');
            _html.classList.remove('cursor-wait');
            return;

        }

	}

	return {
		loadTemplate: load,
		toggleLoader: toggleLoader
	}

}]);