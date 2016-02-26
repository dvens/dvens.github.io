app.controller('dashboard', ['pageLoader', 'dashboard-service', 'filters', 'browser', function(

	pageLoader,
	dashboardService,
	filters,
	browser,
	$tools

){
	
	var dashboard = {};
	var $rootscope = this;
	var _houses = $rootscope.data;
	var _html = Ld('html');
	var _slideControlLeft = Ld('.dashboard__control--left a');
	var _slideControlRight = Ld('.dashboard__control--right a');
	var _houseContent = Ld('.dashboard__house-content');
	var _photoContent = Ld('.dashboard__photos');
	var _infoBtn = Ld('.navigation__button--info');
	var _imgBtn = Ld('.navigation__button--images');
	var _currentIndex;
	var _nextIndex;
	var _prevIndex;

	dashboard.init = function() {

		if(_houses) {

			this.loadData();

		} else {

			window.location = '#/';

		}

	}

	dashboard.loadData = function() {

		var _this = this;
		var _data;

		dashboardService.getHouse($tools.$route.params.id).then(function(response){

			_data = JSON.parse(response);
			_this.loadTemplate(_data);

		});

	}

	dashboard.loadTemplate = function(data) {

		var _this = this;

		var data = {
			title: 'House Detail: ' + $tools.$route.params.id,
			house: data,
			price: filters.commaSeparateNumber(data.Koopprijs) + ' k.k'
		};

		data.photos = filters.replaceArray(data.house['Media-Foto'], 'klein', 'groot')
		

		_houseContent.html($tools.$render('house-content', data, 'render'));
		_photoContent.html($tools.$render('photo-overview', data, 'render'));

		pageLoader.loadTemplate($tools.$route.template, $tools.$route.templateId, data, function(){
			
			_this.setControls();

		});
		
	}

	dashboard.setControls = function() {

		_currentIndex = _houses.indexOf($tools.$route.params.id);
		_nextIndex = _currentIndex + 1;
		_prevIndex = _currentIndex - 1;

		if(_currentIndex === _houses.length -1){

			_slideControlRight.setAttribute('href', '#/house/' + _houses[0]);	

		} else {

			_slideControlRight.setAttribute('href', '#/house/' + _houses[_nextIndex]);

		}

		if(_currentIndex === 0) {

			_slideControlLeft.setAttribute('href', '#/house/' + _houses[_houses.length]);	

		} else {

			_slideControlLeft.setAttribute('href', '#/house/' + _houses[_prevIndex]);

		}

		this.initEvents();

	}

	dashboard.initEvents = function() {

		var _this = this;
		var _closeBtn = Ld('.dashboard__house-content .dashboard__close-btn');
		var _closeBtnImg = Ld('.dashboard__photos .dashboard__close-btn');
		
		_infoBtn.addListener('click', function(e){

			e.preventDefault();
			_this.toggleInfo('open');

		});

		_imgBtn.addListener('click', function(e){

			e.preventDefault();
			_this.toggleImages('open');

		});

		_closeBtn.addListener('click', function(e){

			e.preventDefault();
			_this.toggleInfo('close');

		});

		_closeBtnImg.addListener('click', function(e){

			e.preventDefault();
			_this.toggleImages('close');

		});

		window.addEventListener('keydown', _this.setKey, false);	
		
		if(!browser.isMobile()) {
			//window.addEventListener('mousemove', _this.toggleInterface, false);	
		}
		
	}

	dashboard.setKey = function(e) {
		
        switch (e.keyCode) {
            
            case 37: // Move to left
                dashboard.slide('left');    
            break;

            case 39: // Move to right
                dashboard.slide('right');
            break;
 
        }
        
	}

	dashboard.slide = function(target) {

		if(target === 'left') {

			window.location = _slideControlLeft.attr('href');
			_slideControlLeft.addClass('is-pressed');

		}

		if(target === 'right') {

			window.location = _slideControlRight.attr('href');
			_slideControlRight.addClass('is-pressed');
		}

		_timer = setTimeout(function(){

			_slideControlLeft.removeClass('is-pressed');
			_slideControlRight.removeClass('is-pressed');
			clearTimeout(_timer);

		}, 600);

	}

	dashboard.toggleInterface = function() {

		if(_html.hasClass('ui-hidden')) {

			_html.removeClass('ui-hidden');

		} else {

			_interfaceTimer = setTimeout(function(){

				_html.addClass('ui-hidden');
				clearTimeout(_interfaceTimer);

			}, 8000);
			
		}

	}

	dashboard.toggleInfo = function(target) {
		
		if(target === 'open') {

			_houseContent.addClass('is-visible');

		} else {

			_houseContent.removeClass('is-visible');

		}

	}

	dashboard.toggleImages = function(target) {

		if(target === 'open') {

			_photoContent.addClass('is-visible');

		} else {

			_photoContent.removeClass('is-visible');

		}

	}

	dashboard.init();

}]);