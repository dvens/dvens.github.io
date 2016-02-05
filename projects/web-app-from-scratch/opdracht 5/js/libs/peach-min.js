// @author: wwww.dylanvens.com
// @Version: 1.0
(function(){
  'use strict';

  // Global object 
  var Peach = {
    name: 'Peach',
    version : '1.0',
    author: 'Dylan Vens',
    routes : {},
    container : document.querySelector('[peach-view]')
  };

  Peach.render = function(el, data, opt_in) {
    
    var source = document.getElementById(el).innerHTML;
    
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

      Peach.container.innerHTML += this.source(data);

    } else if ( opt_in === 'render') {

      return this.source(data);

    } else {

      Peach.container.innerHTML = this.source(data);

    }
    
  }

  Peach.router = function(path, fn) {
    
    window.addEventListener('hashchange', this.router.load);  
    window.addEventListener('load', this.router.load);  

    this.routes[path] = { 
      fn : fn
    };

  }

  Peach.router.load = function() {
    
    var url = window.location.hash.slice(1) || '/';
    var error = document.getElementById('error');
    var route = Peach.routes[url];
        
    if(url in Peach.routes){
      
      new route.fn();
      error.innerHTML = '';
      error.classList.remove('active');

    } else { 
      
      error.innerHTML = '<h1> 404: Page not found </h1> <br> <p> This page does not exist <a href="/" class="link"> Go back to home </a> ';
      Peach.container.innerHTML = '';
      error.classList.add('active');

    }

    window.scroll(0, 0);

  }

  if (typeof module !== 'undefined' && module.exports) {
    
    module.exports = Peach;

  } else {

    window.Peach = Peach;

  }
  
})();