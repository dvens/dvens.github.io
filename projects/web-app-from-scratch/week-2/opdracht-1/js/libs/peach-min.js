// !function(){"use strict";var e={name:"Peach",version:"1.0",author:"Dylan Vens",routes:{},container:document.querySelector("[peach-view]")};e.render=function(r,n,o){var t=document.querySelector("[peach-template="+r+"]").innerHTML;if(t="var r = []; with(obj){r.push('"+t.replace(/[\r\n]/g," ").replace("&lt;","<").replace("&gt;",">").replace(/\{\{(.*?)\}\}/g,"');r.push($1);r.push('").replace(/\{\%/g,"');").replace(/\%\}/g,"r.push('")+"');}return r.join('');",this.source=new Function("obj",t),"add"===o)e.container.innerHTML+=this.source(n);else{if("render"===o)return this.source(n);e.container.innerHTML=this.source(n)}},e.router=function(e,r){window.addEventListener("hashchange",this.router.load),window.addEventListener("load",this.router.load),this.routes[e]={fn:r}},e.router.load=function(){var r=window.location.hash.slice(1)||"/",n=document.getElementById("error"),o=e.routes[r];r in e.routes?(new o.fn,n.innerHTML="",n.classList.remove("active")):(n.innerHTML='<h1> 404: Page not found </h1> <br> <p> This page does not exist <a href="/" class="link"> Go back to home </a> ',e.container.innerHTML="",n.classList.add("active")),window.scroll(0,0)},"undefined"!=typeof module&&module.exports?module.exports=e:window.Peach=e}();
(function(){
  'use strict';

  var Peach = {
    name: 'Peach',
    version : '1.0',
    author: 'Dylan Vens',
    routes : {},
    container : document.querySelector('[peach-view]')
  };

  Peach.render = function(el, data, opt_in) {
    
    var source = document.querySelector('[peach-template='+ el +']').innerHTML;
    
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