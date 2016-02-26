'use strict';

app.controller('navigation', ['browser', function(

	browser,
	$tools

) {

	var _fullscreenButton = Ld('.navigation__button--fullscreen');
	var navigation = {};

	navigation.init = function() {

		this.initEvents();

		if(browser.isMobile()) {
			_fullscreenButton.hide();
		}

	}

	navigation.initEvents = function() {

		var _this = this;
		_fullscreenButton.addListener('click', _this.toggleFullScreen);

	}

	navigation.toggleFullScreen = function(e) {

		e.preventDefault();
		// Thanks to http://stackoverflow.com/questions/3900701/onclick-go-full-screen
		if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		    
		    if (document.documentElement.requestFullScreen) {  
		    	
		    	document.documentElement.requestFullScreen();  

		    } else if (document.documentElement.mozRequestFullScreen) {  
		      
		    	document.documentElement.mozRequestFullScreen();  

		    } else if (document.documentElement.webkitRequestFullScreen) {  
		      
		    	document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  

		    }

		} else {  
		    
		    if (document.cancelFullScreen) {  
		    	
		    	document.cancelFullScreen();  

		    } else if (document.mozCancelFullScreen) {  
		      	
		      	document.mozCancelFullScreen();  

		    } else if (document.webkitCancelFullScreen) {  
		      	
		      	document.webkitCancelFullScreen();  

		    }  
		}  

	}

	navigation.init();

}]);