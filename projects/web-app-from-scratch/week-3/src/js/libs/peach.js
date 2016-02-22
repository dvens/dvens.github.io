(function(){
	
	'use strict';

	// Private variables
	var _body = document.querySelector('body');
	var _view = document.querySelector('[peach-view]');
	var _newViewHolder = document.querySelector('[peach-view-holder]');

	/**
	 * Creates a new Peach object
	 * @param baseUrl {string}
	 * @constructor
	 * TODO: Implement singleton check
	 */

	var Peach = function() {

		var _this = this;
		
		/**
		 * Creates global params holder
		 * @name params
 		 */

		_this.params;

		/**
		 * Creates config holder
		 * Config holder is set by setAppConfig
		 * @name peach config
 		 */
		
		_this.config;

		/**
		 * Creates routes Holder
		 * @name peach routes
 		 */

 		_this.routes = [];

 		/**
		 * Creates service Holder
		 * @name peach services
 		 */

 		_this.serviceHolder = {};

 		/**
 		 * Creates controllers holder
 		 * @name peach controller
 		 */

 		_this.controllerHolder = {};

 		/**
 		 * Creates controllerDependencies holder
 		 * @name peach controller
 		 */

 		_this.controllerDependencies = {};

 		/**
 		 * Creates module holder
 		 * @name peach controller
 		 */

 		_this.moduleHolder = {};
 		
 		/**
 		 * Creates a new Peach object
 		 * @param fn {function}
 		 * @ Function setAppConfig
 		 */

 		_this.setAppConfig = function(fn) {

 			_this.config = fn();

 		}

 		/**
 		 * Init application
 		 * @param fn {function}
 		 * @param name {string}
 		 * @ Function run
 		 */

 	 	_this.run = function(name, fn) {

 	 		var config = _this.config;

 	 		if( name === 'init' ) {
 	 			
 	 			fn(config);	

 	 			window.addEventListener('hashchange', _this.routeMatch.bind(this));
				window.addEventListener('load', _this.routeMatch.bind(this));


 	 		} else {

 	 			fn(config);

 	 		}		

 	 	}
    	
	}

	/**
	 * Adds routing
	 * @param route {object (url, template, controller)}
	 * @Function route 
	 */
	Peach.prototype.route = function(route) {

		var _this = this;

		_this.routes.push(route);

		return this;

	}

	/**
	 * Adds controllers
	 * @param name {string}
	 * @param fn {function}
	 * @Function controller 
	 */
	Peach.prototype.controller = function(name, array) {	
		
		var _this = this;
		var _controllers = [].slice.call(_body.querySelectorAll('[peach-controller=' + name + ']'));

		var _fn = array[array.length - 1];
		var _dependencies = array.slice(0, -1);

		// Check if _fn is function
		if( typeof _fn === 'function' ) {

			_this.controllerHolder[name] = _fn;
			_this.controllerDependencies[name] = _dependencies;
			

		} else {

			console.warn('_fn is not a function: '. _fn);

		}

		// Check if there are any inline controllers
		if( _controllers.length ) {


			_controllers.forEach(function(controller) {

				_this.parse(controller, name);

			});

		}

	}

	/**
	 * Adds services
	 * @param name {string}
	 * @param array {array}
	 * @Function service 
	 */

	Peach.prototype.service = function(name, array) {

		var _this = this;
		var _fn = array[array.length - 1];
		var _dependencies = array.slice(0, -1);
		var _loadDependency;

		// Check if _fn is function
		if( typeof _fn === 'function' ) {

			var scope = {
				$xhr: _this.request,
				$render : this.renderTemplate
			};

			_loadDependency = this.loadDependencies(_dependencies);
			_loadDependency.push(_this.config, scope);
		
			_this.serviceHolder[name] = _fn.apply(this, _loadDependency);
			

		} else {

			console.warn('_fn is not a function: ', _fn);

		}

	}

	/**
	 * Adds modules
	 * @param name {string}
	 * @param array {array}
	 * @Function module 
	 */

	Peach.prototype.module = function(name, array) {

		var _this = this;
		var _fn = array[array.length - 1];
		var _dependencies = array.slice(0, -1);
		var _loadDependency;

		// Check if _fn is function
		if( typeof _fn === 'function' ) {

			var scope = {
				$xhr: _this.request,
				$render : this.renderTemplate
			};

			_loadDependency = this.loadDependencies(_dependencies);
			_loadDependency.push(_this.config, scope);

			_this.moduleHolder[name] = _fn.apply(this, _loadDependency);
			

		} else {

			console.warn('_fn is not a function: ', _fn);

		}

	}

	/**
	 * Peach loading dependencies
	 * @param array {array}
	 * @Function loadDependencies 
	 */

	Peach.prototype.loadDependencies = function(array) {

		var _dependencies = [];

		if ( !array ) {
			console.warn('No controller or dependency is set: ', array);
			return;
		}

		for( var i = 0; i < array.length; i++ ) {

			if (typeof array[i] === "string") {

				// search in modules
				if( this.moduleHolder.hasOwnProperty(array[i]) ) {

					_dependencies.push( this.loadModule(array[i]) );

				} else {

					// Search in services
					if( this.serviceHolder.hasOwnProperty(array[i]) ) {
							
						_dependencies.push( this.loadService(array[i]) );

					} else {

						console.warn('Could not find: ' + array[i]);

					}

				}

			}

		}

		return _dependencies;

	}

	/**
	 * Init inlinecontrollers
	 * @Function loadInlineController 
	 * @Param obj {object}
	 * @Param element {html element}
	 */

	Peach.prototype.loadInlineController = function(obj, element, name) {

		var _this = this;
		var _fn = _this.serviceHolder[obj.service];

		_this.initRouteController(_fn, element, name);	

	}

	/**
	 * Peach loading module
	 * @param name {string}
	 * @Function loadModule 
	 */

	Peach.prototype.loadModule = function(name) {

		return this.moduleHolder[name];

	}

	/**
	 * Peach loading service
	 * @param name {string}
	 * @Function loadService 
	 */

	Peach.prototype.loadService = function(name) {

		return this.serviceHolder[name];
		
	}

	/**
	 * Check and matchroutes
	 * @Function matchRoutes 
	 */

	Peach.prototype.routeMatch = function() {
		
		var _this = this; 
		var _url = window.location.hash.slice(1) || '/';
		var _noMatches = [];

		// Loop through all the routes
		for( var i = 0; i < _this.routes.length; i++ ) {

			var _route = _this.routes[i];

			var _regExp = _route.url.replace(/:[a-z]+/g, '([a-z0-9-]+)');
			
			// Add '^' and '$' to escape the slash route (/)
			var _regex = new RegExp('^' + _regExp + '$');

			// Check if route url matches window.location.url;
			if( _regex.test(_url) ) {
				
				var _currentRoute = _route.url.split('/');
				var _currentUrl = _url.split('/');
				var _params = {};

				if(_currentRoute.length !== _currentUrl.length ) return;

				for( var i = 0; i < _currentRoute.length; i++ ) {
					
					var value = _currentUrl[i];
					var key = _currentRoute[i].replace(':', '');

					if( key !== value ) {
					
						_params[key] = value;

					}

				}

				_route.params = _params;
				_this.initService(_route);

	
			} else {

				// If the route does not match push it in container
				_noMatches.push(_route);

			}

		}

		// If matches are equal to the current amount of routes show 404
		if(_noMatches.length === _this.routes.length) {
				
			_view.innerHTML = '404 page not found';

		}

	}

	/**
	 * Init services
	 * @Function initService 
	 * @Param route {object}
	 */

	Peach.prototype.initService = function(route) {

		var _this = this;
		var _service = _this.serviceHolder[route.service];

		_view.classList.add('peach-transition');
		
		_this.initRouteController(_service, route);

	}

	/**
	 * Parse inline controllers and services and execute them
	 * @Function parse 
	 * @Param element {obj}
	 */

	Peach.prototype.parse = function(element, name) {

		var _this = this;
		
		if( element.getAttribute ) {
			
			var _controller = element.getAttribute('peach-controller');
			
			var _element = {
				controller: _controller,
				name: name
			};

			_this.loadInlineController(_element, element, name);

		}

	}
	
	/**
	 * Get data function
	 * @Function request 
	 * @Param method {POST, PUT & GET}
	 * @Param url {string}
	 * @Param data {object}
	 * @Param element {html element}
	 */

	Peach.prototype.request = function(method, url, data, contentType) {

		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);

			xhr.onload = function() {

				if (this.status >= 200 && this.status < 300) {
			        
			        resolve(xhr.response);
			    
			    } else {
				    
				    var error = {
				    	status: this.status,
				    	message: xhr.statusText
				    };

				    reject(error);	
				}

			}

			xhr.send();
		
		});

	}

	Peach.prototype.initRouteController = function(service, route, name) {

		var _this = this;
		var _config = _this.config;
		var _route = route;
		var _url = _config.templateUrl + '/' + route.template;
		var _loadDependency;
		var _loadInlineDependency;

		// Check if route is html element
		if ( !route.getAttribute ) {

			var scope = {
				$route: _route,
				$render : this.renderTemplate
			};
			
			// Init controller and apply dependencies
			_loadDependency = _this.loadDependencies(_this.controllerDependencies[_route.controller]);
			_loadDependency.push(scope);
			
			_this.controllerHolder[_route.controller].apply(this, _loadDependency);

		} else {

			//If controller is inline controller
			var scope = {
				$render : function(el, data, opt_in) {
					this.renderTemplate(el, data, opt_in);
				}
			};
			
			_loadInlineDependency = _this.loadDependencies(_this.controllerDependencies[name]);
			_loadInlineDependency.push(scope);
			_this.controllerHolder[name].apply(this, _loadInlineDependency);
			

		}
		
	}

	/**
	 * Render data
	 * @Function renderTemplate 
	 * @Param el {html element or string}
	 * @Param data {json}
	 * @Param opt_in {render, add}
	 * @Param type {string or bool}
	 */

	Peach.prototype.renderTemplate = function(el, data, opt_in) {
		
		var source = document.querySelector('[peach-template='+ el +']').innerHTML;	

		if ( !data ) {
			console.warn('No data is set: ', data);
			return;
		}

		source  = "var r = []; with(obj){r.push('"
		        + source.replace(/[\r\n]/g," ")
		        .replace('&lt;', '<')
		        .replace('&gt;', '>')
		        .replace(/\{\{(.*?)\}\}/g,"');r.push($1);r.push('")
		        .replace(/\{\%/g,"');")
		        .replace(/\%\}/g, "r.push('")
		        + "');}return r.join('');";

		this.source = new Function('obj', source);

		if( opt_in === 'add') {

		  _view.innerHTML += this.source(data);

		} else if ( opt_in === 'render') {

		  return this.source(data);

		} else {

		  _view.innerHTML = this.source(data);

		}

	}

	window.Peach = Peach;

}());