app.module('ui-events', [function(
	

){
	
	var _main = document.querySelector('main');
	var _swipe = new Hammer(_main);	

	var uiEvents = {};

	uiEvents.swipe = function(direction, callback) {

		_swipe.on('swipe' + direction, callback);

	}

	return uiEvents;


}]);