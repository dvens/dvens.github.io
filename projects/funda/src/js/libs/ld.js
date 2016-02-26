// @author: Dylan Vens
// @Version: 0.8 
/*  @To-do-list: 
    - Fixing IE8 and IE9 classList
    - Adding get and setAttribute
    - Default attachEvent for IE8 
*/ 
var Ld = function(el) {   
    // prevent conflicts with other libs..
    if (window === this) {
        return new Ld(el);
    }
    this.element = document.querySelector(el);
    return this;
}

Ld.prototype = {
	hide: function(){
		this.element.style.display = "none";
		return this;
	},

    show: function(){
        this.element.style.display = "block";
        return this;
    },

    addClass: function(el){
        this.element.classList.add(el);
        return this;
    }, 

    removeClass: function(el){
        this.element.classList.remove(el);
        return this;
    },

    hasClass: function(el){
        return this.element.classList.contains(el);
    },

    toggleClass: function(el){
        this.element.classList.toggle(el);
        return this;
    },

    append: function(el,content){
        var n = document.createElement(el);
        n.innerHTML = content;
        this.element.appendChild(n);
        return this;
    }, 

    appendTo: function(el){
        this.element.appendChild(el);
        return this;
    }, 
    
    css: function(styles){
        for (var s in styles){
           this.element.style[s] = styles[s]; 
        }
        return this;
    },

    offsetTop: function(){
        var top = this.element.offsetTop;
        return top;
    }, 

    offsetLeft: function(){
        var left = this.element.offsetLeft;
        return left;
    },

    addListener: function(evt, func) {
        this.element.addEventListener(evt, func, false);
        return this;
    },

    html: function(text) {
        this.element.innerHTML = text;
        return this; 
    }, 

    attr: function(el){
        return this.element.getAttribute(el);
    }, 

    setAttribute: function(el, data){
        this.element.setAttribute(el, data);
        return this;
    }, 

    removeAttribute: function(el){
        this.element.removeAttribute(el);
        return this;
    }

};
