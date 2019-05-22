!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,c=t[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var i=function(t){return null!=t?t.constructor:null},u=function(t,e){return!!(t&&e&&t instanceof e)},c=function(t){return null==t},s=function(t){return i(t)===Object},a=function(t){return i(t)===String},l=function(t){return Array.isArray(t)},h=function(t){return u(t,NodeList)},f={nullOrUndefined:c,object:s,number:function(t){return i(t)===Number&&!Number.isNaN(t)},string:a,boolean:function(t){return i(t)===Boolean},function:function(t){return i(t)===Function},array:l,nodeList:h,element:function(t){return u(t,Element)},event:function(t){return u(t,Event)},empty:function(t){return c(t)||(a(t)||l(t)||h(t))&&!t.length||s(t)&&!Object.keys(t).length}},g={facebook:{domain:"facebook.com",url:function(t){return"https://graph.facebook.com/?id=".concat(t,"&fields=og_object{engagement}")},shareCount:function(t){return t.og_object.engagement.count},popup:{width:640,height:360}},twitter:{domain:"twitter.com",url:function(){return null},shareCount:function(){return null},popup:{width:640,height:240}},pinterest:{domain:"pinterest.com",url:function(t){return"https://widgets.pinterest.com/v1/urls/count.json?url=".concat(t)},shareCount:function(t){return t.count},popup:{width:830,height:700}},github:{domain:"github.com",url:function(t,e){return"https://api.github.com/repos/".concat(t).concat(f.string(e)?"?access_token=".concat(e):"")},shareCount:function(t){return t.data.stargazers_count}},youtube:{domain:"youtube.com",url:function(t,e){return"https://www.googleapis.com/youtube/v3/channels?part=statistics&id=".concat(t,"&key=").concat(e)},shareCount:function(t){if(!f.empty(t.error))return null;var e=o(t.items,1)[0];return f.empty(e)?null:e.statistics.subscriberCount}}},p={debug:!1,wrapper:{className:"shr"},count:{className:"shr__count",displayZero:!0,format:!0,position:"after",increment:!0},tokens:{github:"",youtube:""},storage:{enabled:!0,key:"shr",ttl:3e5}};var d=function(){},m=function(){function e(){var n=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0];t(this,e),this.enabled=window.console&&n,this.enabled&&this.log("Debugging enabled")}return n(e,[{key:"log",get:function(){return this.enabled?Function.prototype.bind.call(console.log,console):d}},{key:"warn",get:function(){return this.enabled?Function.prototype.bind.call(console.warn,console):d}},{key:"error",get:function(){return this.enabled?Function.prototype.bind.call(console.error,console):d}}]),e}();function w(t,e,n){var r=document.createElement(t);return f.object(e)&&function(t,e){!f.element(t)||f.empty(e)||Object.entries(e).filter(function(t){var e=o(t,2)[1];return!f.nullOrUndefined(e)}).forEach(function(e){var n=o(e,2),r=n[0],i=n[1];return t.setAttribute(r,i)})}(r,e),f.string(n)&&(r.innerText=n),r}function y(){for(var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length,n=Array(1<e?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];if(!n.length)return t;var i=n.shift();return f.object(i)?(Object.keys(i).forEach(function(e){f.object(i[e])?(!Object.keys(t).includes(e)&&Object.assign(t,r({},e,{})),y(t[e],i[e])):Object.assign(t,r({},e,i[e]))}),y.apply(void 0,[t].concat(n))):t}var b=function(){function e(n,r){var o=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];t(this,e),this.enabled=o&&e.supported,this.key=n,this.ttl=r}return n(e,[{key:"get",value:function(t){if(!e.supported||!this.enabled)return null;var n=window.localStorage.getItem(this.key);if(f.empty(n))return null;var r=window.localStorage.getItem("".concat(this.key,"_ttl"));if(f.empty(r)||r<Date.now())return null;var o=JSON.parse(n);return f.string(t)&&t.length?o[t]:o}},{key:"set",value:function(t){if(e.supported&&this.enabled&&f.object(t)){var n=this.get();f.empty(n)&&(n={}),y(n,t),window.localStorage.setItem(this.key,JSON.stringify(n)),window.localStorage.setItem("".concat(this.key,"_ttl"),Date.now()+this.ttl)}}}],[{key:"supported",get:function(){try{return"localStorage"in window&&(window.localStorage.setItem("___test","___test"),window.localStorage.removeItem("___test"),!0)}catch(t){return!1}}}]),e}();(function(){function e(n,r){var o=this;t(this,e),this.elements={count:null,trigger:null,popup:null},f.element(n)?this.elements.trigger=n:f.string(n)&&(this.elements.trigger=document.querySelector(n)),f.element(this.elements.trigger)&&f.empty(this.elements.trigger.shr)&&(this.config=y({},p,r,{networks:g}),this.console=new m(this.config.debug),this.storage=new b(this.config.storage.key,this.config.storage.ttl,this.config.storage.enabled),this.getCount().then(function(t){return o.updateDisplay(t)}).catch(function(){}),this.listeners(!0),this.elements.trigger.shr=this)}return n(e,[{key:"destroy",value:function(){this.listeners(!1)}},{key:"listeners",value:function(){var t=this,e=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0]?"addEventListener":"removeEventListener";this.elements.trigger[e]("click",function(e){return t.share(e)},!1)}},{key:"share",value:function(t){var e=this;this.openPopup(t),this.getCount().then(function(t){return e.updateDisplay(t,e.config.increment)}).catch(function(){})}},{key:"openPopup",value:function(t){if(!f.empty(this.network)&&this.networkConfig.popup){f.event(t)&&t.preventDefault();var e=this.networkConfig.popup,n=e.width,r=e.height,o="shr-popup--".concat(this.network);if(this.popup&&!this.popup.closed)this.popup.focus(),this.console.log("Popup re-focused.");else{var i=void 0===window.screenLeft?window.screen.left:window.screenLeft,u=void 0===window.screenTop?window.screen.top:window.screenTop,c=window.screen.width/2-n/2+i,s=window.screen.height/2-r/2+u;this.popup=window.open(this.href,o,"top=".concat(s,",left=").concat(c,",width=").concat(n,",height=").concat(r)),!this.popup||this.popup.closed||!f.boolean(this.popup.closed)?this.console.error("Popup blocked."):(this.popup.focus(),this.console.log("Popup opened."))}}}},{key:"getCount",value:function(){var t=this,e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];return new Promise(function(n,o){var i=t.apiUrl;if(f.empty(i))o(new Error("No URL available for ".concat(t.network,".")));else{if(e){var u=t.storage.get(t.target);if(!f.empty(u)&&Object.keys(u).includes(t.network))return n(u[t.network]),void t.console.log("getCount for '".concat(t.target,"' for '").concat(t.network,"' resolved from cache"))}(function(t){return new Promise(function(e,n){var r="jsonp_callback_".concat(Math.round(1e5*Math.random())),o=document.createElement("script");o.addEventListener("error",function(t){return n(t)}),window[r]=function(t){delete window[r],document.body.removeChild(o),e(t)};var i=new URL(t);i.searchParams.set("callback",r),o.setAttribute("src",i.toString()),document.body.appendChild(o)})})(i).then(function(e){var o=0,i=t.elements.trigger.getAttribute("data-shr-display");o=f.empty(i)?t.networkConfig.shareCount(e):e[i],f.empty(o)&&(o=0),o=parseInt(o,10),t.storage.set(r({},t.target,r({},t.network,o))),n(o)}).catch(o)}})}},{key:"updateDisplay",value:function(t){var e=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],n=this.config,r=n.count,o=n.wrapper,i=e?t+1:t,u=r.position.toLowerCase();if(0<i||r.displayZero){var c=function(t){return Math.round(i/t*10)/10},s=function(t){var e=/\./.test(1.1.toLocaleString())?".":",",n=new RegExp("\\".concat(e,"\\d+$"));return Math.round(t).toLocaleString().replace(n,"")}(i);r.format&&(1e6<i?s="".concat(c(1e6),"M"):1e3<i&&(s="".concat(c(1e3),"K"))),f.element(this.elements.count)?this.elements.count.textContent=s:(function(t,e){var n=t.length?t:[t];Array.from(n).reverse().forEach(function(t,n){var r=0<n?e.cloneNode(!0):e,o=t.parentNode,i=t.nextSibling;r.appendChild(t),i?o.insertBefore(r,i):o.appendChild(r)})}(this.elements.trigger,w("span",{class:o.className})),this.elements.count=w("span",{class:"".concat(r.className," ").concat(r.className,"--").concat(u)},s),this.elements.trigger.insertAdjacentElement("after"===u?"afterend":"beforebegin",this.elements.count))}}},{key:"href",get:function(){return f.element(this.elements.trigger)?this.elements.trigger.href:null}},{key:"network",get:function(){var t=this;if(!f.element(this.elements.trigger))return null;var e=this.config.networks;return Object.keys(e).find(function(n){return function(t){var e=new URL(t).hostname,n=e.split("."),r=n.length;return 2<r&&(e="".concat(n[r-2],".").concat(n[r-1]),2===n[r-2].length&&2===n[r-1].length&&(e="".concat(n[r-3],".").concat(e))),e}(t.href)===e[n].domain})}},{key:"networkConfig",get:function(){return f.empty(this.network)?null:this.config.networks[this.network]}},{key:"target",get:function(){if(f.empty(this.network))return null;var t=new URL(this.href);switch(this.network){case"facebook":return t.searchParams.get("u");case"github":return t.pathname.substring(1);case"youtube":return t.pathname.split("/").pop();default:return t.searchParams.get("url")}}},{key:"apiUrl",get:function(){if(f.empty(this.network))return null;var t=this.config.tokens;switch(this.network){case"github":return this.networkConfig.url(this.target,t.github);case"youtube":return this.networkConfig.url(this.target,t.youtube);default:return this.networkConfig.url(encodeURIComponent(this.target))}}}],[{key:"setup",value:function(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=null;if(f.string(t)?r=Array.from(document.querySelectorAll(t)):f.element(t)?r=[t]:f.nodeList(t)?r=Array.from(t):f.array(t)&&(r=t.filter(f.element)),f.empty(r))return null;var o=Object.assign({},p,n);f.string(t)&&o.watch&&new MutationObserver(function(n){Array.from(n).forEach(function(n){Array.from(n.addedNodes).forEach(function(n){f.element(n)&&function(t,e){return function(){return Array.from(document.querySelectorAll(e)).includes(this)}.call(t,e)}(n,t)&&new e(n,o)})})}).observe(document.body,{childList:!0,subtree:!0});return r.map(function(t){return new e(t,n)})}}]),e})().setup(".js-shr",{debug:!0,tokens:{youtube:"AIzaSyDrNwtN3nLH_8rjCmu5Wq3ZCm4MNAVdc0c"}})}();
//# sourceMappingURL=app.js.map
