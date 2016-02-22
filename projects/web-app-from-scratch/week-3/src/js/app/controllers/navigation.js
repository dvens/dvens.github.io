'use strict';

app.controller('navigation', [function(

	$tools

) {

	var _subMenu = Ld('.header__menu-text span');
	var _body = Ld('body');
    var _menuText = Ld('.header__menu-text p');
    var _menuOpen = false;
    var _menu = Ld('.header__menu-trigger');
    var _elNav = document.querySelectorAll('.navigation ul li a, .header__logo');
    
	function init() {

		initEvents();

	}

	function initEvents() {

		window.addEventListener('load', function(){
	        setMenuText();
	        setMenu();
	    });

	    window.addEventListener('hashchange', function(){
	        setMenuText();
	        setMenu();
	    });
	}

	function setMenuText () {

		var _location = window.location.hash.slice(1).split('/') || 'home';
		var _text;

		if( _location[1] ) {

			_text = _location[1];

		} else {

			_text = 'home';

		}

		_subMenu.html(_text);

	}

	function setMenu() {

		_menu.addListener('click', function(e){

            if(!_menuOpen) {

                _menuOpen = true;
                _menuText.html('close');
                _body.addClass('menu-open');

            } else {
                
                _menuOpen = false;
                _menuText.html('menu');
                _body.removeClass('menu-open');

            }

        });

        for(var i = 0; i < _elNav.length; i++){
            
            _elNav[i].addEventListener('click', function(e){

                _body.removeClass('menu-open');
                _menuText.html('menu');

            });

        }

	}

	init();

}]);