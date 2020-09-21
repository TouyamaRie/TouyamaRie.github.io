"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(window.Ribbons=function(){var h=window,a=document.body,r=document.documentElement,d=function t(){if(arguments.length===1){if(Array.isArray(arguments[0])){var i=Math.round(t(0,arguments[0].length-1));return arguments[0][i]}return t(0,arguments[0])}else if(arguments.length===2){return Math.random()*(arguments[1]-arguments[0])+arguments[0]}return 0},e=function t(i){var n=Math.max(0,h.innerWidth||r.clientWidth||a.clientWidth||0);var o=Math.max(0,h.innerHeight||r.clientHeight||a.clientHeight||0);var s=Math.max(0,h.pageXOffset||r.scrollLeft||a.scrollLeft||0)-(r.clientLeft||0);var e=Math.max(0,h.pageYOffset||r.scrollTop||a.scrollTop||0)-(r.clientTop||0);return{width:n,height:o,ratio:n/o,centerx:n/2,centery:o/2,scrollx:s,scrolly:e}},t=function t(i){var n=e(i);var o=i?Math.max(0,i.pageX||i.clientX||0):0;var s=i?Math.max(0,i.pageY||i.clientY||0):0;return{mousex:o,mousey:s,centerx:o-n.width/2,centery:s-n.height/2}},u=function t(i,n){this.x=0;this.y=0;this.set(i,n)};u.prototype={constructor:u,set:function t(i,n){this.x=i||0;this.y=n||0},copy:function t(i){this.x=i.x||0;this.y=i.y||0;return this},multiply:function t(i,n){this.x*=i||1;this.y*=n||1;return this},divide:function t(i,n){this.x/=i||1;this.y/=n||1;return this},add:function t(i,n){this.x+=i||0;this.y+=n||0;return this},subtract:function t(i,n){this.x-=i||0;this.y-=n||0;return this},clampX:function t(i,n){this.x=Math.max(i,Math.min(this.x,n));return this},clampY:function t(i,n){this.y=Math.max(i,Math.min(this.y,n));return this},flipX:function t(){this.x*=-1;return this},flipY:function t(){this.y*=-1;return this}};var i=function t(i){this._canvas=null;this._context=null;this._sto=null;this._width=0;this._height=0;this._scroll=0;this._ribbons=[];this._options={colorSaturation:"80%",colorBrightness:"60%",colorAlpha:.65,colorCycleSpeed:6,verticalPosition:"center",horizontalSpeed:150,ribbonCount:5,strokeSize:5,parallaxAmount:-.5,animateSections:true};this._onDraw=this._onDraw.bind(this);this._onResize=this._onResize.bind(this);this._onScroll=this._onScroll.bind(this);this.setOptions(i);this.init()};return i.prototype={constructor:i,setOptions:function(t){if("object"===_typeof(t))for(var i in t)t.hasOwnProperty(i)&&(this._options[i]=t[i])},init:function(){try{this._canvas=document.createElement("canvas"),this._canvas.style.display="block",this._canvas.style.position="fixed",this._canvas.style.margin="0",this._canvas.style.padding="0",this._canvas.style.border="0",this._canvas.style.outline="0",this._canvas.style.left="0",this._canvas.style.top="0",this._canvas.style.width="100%",this._canvas.style.height="100%",this._canvas.style["z-index"]="-1",this._onResize(),this._context=this._canvas.getContext("2d"),this._context.clearRect(0,0,this._width,this._height),this._context.globalAlpha=this._options.colorAlpha,window.addEventListener("resize",this._onResize),window.addEventListener("scroll",this._onScroll),document.body.appendChild(this._canvas)}catch(t){return void console.warn("Canvas Context Error: "+t.toString())}this._onDraw()},addRibbon:function(){var t,i,n=5<Math.round(d(1,9))?"right":"left",o=1e3,s=this._width+200,e="right"==n?-200:s,h=Math.round(d(0,this._height));/^(top|min)$/i.test(this._options.verticalPosition)?h=200:/^(middle|center)$/i.test(this._options.verticalPosition)?h=this._height/2:/^(bottom|max)$/i.test(this._options.verticalPosition)&&(h=this._height-200);for(var a=[],r=new u(e,h),l=new u(e,h),c=null,p=Math.round(d(0,360)),_=0;!(o<=0);){if(o--,t=Math.round((Math.random()-.2)*this._options.horizontalSpeed),i=Math.round((Math.random()-.5)*(.25*this._height)),(c=new u).copy(l),"right"==n){if(c.add(t,i),l.x>=s)break}else if("left"==n&&(c.subtract(t,i),l.x<=-200))break;a.push({point1:new u(r.x,r.y),point2:new u(l.x,l.y),point3:c,color:p,delay:_,dir:n,alpha:0,phase:0}),r.copy(l),l.copy(c),_+=4,p+=this._options.colorCycleSpeed}this._ribbons.push(a)},_drawRibbonSection:function(t){if(t){if(1<=t.phase&&t.alpha<=0)return!0;var i;t.delay<=0?(t.phase+=.02,t.alpha=+Math.sin(t.phase),t.alpha=t.alpha<=0?0:t.alpha,t.alpha=1<=t.alpha?1:t.alpha,this._options.animateSections&&(i=.1*Math.sin(1+t.phase*Math.PI/2),"right"===t.dir?(t.point1.add(i,0),t.point2.add(i,0),t.point3.add(i,0)):(t.point1.subtract(i,0),t.point2.subtract(i,0),t.point3.subtract(i,0)),t.point1.add(0,i),t.point2.add(0,i),t.point3.add(0,i))):t.delay-=.5;var n=this._options.colorSaturation,o=this._options.colorBrightness,s="hsla("+t.color+", "+n+", "+o+", "+t.alpha+" )";this._context.save(),0!==this._options.parallaxAmount&&this._context.translate(0,this._scroll*this._options.parallaxAmount),this._context.beginPath(),this._context.moveTo(t.point1.x,t.point1.y),this._context.lineTo(t.point2.x,t.point2.y),this._context.lineTo(t.point3.x,t.point3.y),this._context.fillStyle=s,this._context.fill(),0<this._options.strokeSize&&(this._context.lineWidth=this._options.strokeSize,this._context.strokeStyle=s,this._context.lineCap="round",this._context.stroke()),this._context.restore()}return!1},_onDraw:function(){for(var t=0,i=this._ribbons.length;t<i;++t)this._ribbons[t]||this._ribbons.splice(t,1);this._context.clearRect(0,0,this._width,this._height);for(var n=0;n<this._ribbons.length;++n){for(var o=this._ribbons[n],s=o.length,e=0,h=0;h<s;++h)this._drawRibbonSection(o[h])&&e++;s<=e&&(this._ribbons[n]=null)}this._ribbons.length<this._options.ribbonCount&&this.addRibbon(),requestAnimationFrame(this._onDraw)},_onResize:function(t){var i=e(t);this._width=i.width,this._height=i.height,this._canvas&&(this._canvas.width=this._width,this._canvas.height=this._height,this._context&&(this._context.globalAlpha=this._options.colorAlpha))},_onScroll:function(t){var i=e(t);this._scroll=i.scrolly}},i}());var cn=document.getElementById("ribbon_piao"),mb=cn.getAttribute("mobile");"false"==mb&&/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)||new Ribbons({colorSaturation:"60%",colorBrightness:"50%",colorAlpha:.5,colorCycleSpeed:5,verticalPosition:"random",horizontalSpeed:200,ribbonCount:3,strokeSize:0,parallaxAmount:-.2,animateSections:!0});