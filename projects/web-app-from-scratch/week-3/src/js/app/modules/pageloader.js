app.module('pageLoader', [function(
	
	$config,
	$tools

){

	var _view = document.querySelector('[peach-view]');
	var _newViewHolder = document.querySelector('[peach-view-holder]');
	var _loader = document.querySelector('.loader');
	var _body = document.querySelector('html');
	
	function load(templateUrl, templateId, data, callback) {

		var _url = $config.templateUrl + '/' + templateUrl;

		// start transition and loader;
		_view.classList.add('peach-transition');
		
		app.request('GET', _url).then(function(response){
	
			_newViewHolder.innerHTML = response;

		}).then(function() {

			// Watch transitionend of the view element to execute a setData function
			_view.addEventListener('transitionend', setData, false);

			function setData() {
				
				var _data = data;	
				
				$tools.$render(templateId, _data);
				_view.classList.remove('peach-transition');
				toggleLoader('hide');
				_newViewHolder.innerHTML = '';
				_view.removeEventListener('transitionend', setData);
				callback();

			}

		});

	}

	function toggleLoader(elementShow) {

		if(elementShow == 'show') {

            _loader.classList.add('is-visible');
            _body.classList.add('cursor-wait');
            return;

        }

        if(elementShow == 'hide') {

            _loader.classList.remove('is-visible');
            _body.classList.remove('cursor-wait');
            return;

        }

	}

	return {
		loadTemplate: load,
		toggleLoader: toggleLoader
	}

}]);