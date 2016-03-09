// @author: Dylan Vens
// @Version: 0.8 
/*  @To-do-list: 
    - Fixing IE8 and IE9 classList
    - Adding get and setAttribute
    - Default attachEvent for IE8 
*/ 
var Ld=function(t){return window===this?new Ld(t):(this.element=document.querySelector(t),this)};Ld.prototype={hide:function(){return this.element.style.display="none",this},show:function(){return this.element.style.display="block",this},addClass:function(t){return this.element.classList.add(t),this},removeClass:function(t){return this.element.classList.remove(t),this},hasClass:function(t){return this.element.classList.contains(t)},toggleClass:function(t){return this.element.classList.toggle(t),this},append:function(t,e){var n=document.createElement(t);return n.innerHTML=e,this.element.appendChild(n),this},appendTo:function(t){return this.element.appendChild(t),this},css:function(t){for(var e in t)this.element.style[e]=t[e];return this},offsetTop:function(){var t=this.element.offsetTop;return t},offsetLeft:function(){var t=this.element.offsetLeft;return t},addListener:function(t,e){return this.element.addEventListener(t,e,!1),this},html:function(t){return this.element.innerHTML=t,this},attr:function(t){return this.element.getAttribute(t)},setAttribute:function(t,e){return this.element.setAttribute(t,e),this},removeAttribute:function(t){return this.element.removeAttribute(t),this}};