!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Shr",e):t.Shr=e()}(this,function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=function(t){return null!=t?t.constructor:null},i=function(t,e){return!!(t&&e&&t instanceof e)},c=function(t){return null==t},u=function(t){return o(t)===Object},s=function(t){return o(t)===String},a=function(t){return Array.isArray(t)},l=function(t){return i(t,NodeList)},h={nullOrUndefined:c,object:u,number:function(t){return o(t)===Number&&!Number.isNaN(t)},string:s,boolean:function(t){return o(t)===Boolean},function:function(t){return o(t)===Function},array:a,nodeList:l,element:function(t){return i(t,Element)},event:function(t){return i(t,Event)},empty:function(t){return c(t)||(s(t)||a(t)||l(t))&&!t.length||u(t)&&!Object.keys(t).length}},f={facebook:{domain:"facebook.com",url:function(t){return"https://graph.facebook.com/?id=".concat(t)},shareCount:function(t){return t.share.share_count}},twitter:{domain:"twitter.com",url:function(){return null},shareCount:function(){return null}},pinterest:{domain:"pinterest.com",url:function(t){return"https://widgets.pinterest.com/v1/urls/count.json?url=".concat(t)},shareCount:function(t){return t.count}},github:{domain:"github.com",url:function(t,e){return"https://api.github.com/repos".concat(t).concat(h.string(e)?"?access_token=".concat(e):"")},shareCount:function(t){return t.data.stargazers_count}},youtube_subscribe:{domain:"youtube.com",url:function(t,e){return"https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=".concat(t,"&key=").concat(e)},shareCount:function(t){return h.empty(t.error)?t.items[0].statistics.subscriberCount:null}}},g={debug:!1,count:{classname:"shr-count",displayZero:!0,format:!0,position:"after",increment:!0,html:function(t,e,n){return'<span class="'.concat(e," ").concat(e,"--").concat(n,'">').concat(t,"</span>")}},networks:{facebook:{popup:{width:640,height:270}},twitter:{popup:{width:640,height:240}},pinterest:{popup:{width:750,height:550}},github:{tokens:{}},youtube_subscribe:{channel:"",key:""}},storage:{enabled:!0,key:"shr",ttl:3e5}};var d=function(){},w=function(){function e(){var n=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0];t(this,e),this.enabled=window.console&&n,this.enabled&&this.log("Debugging enabled")}return n(e,[{key:"log",get:function(){return this.enabled?Function.prototype.bind.call(console.log,console):d}},{key:"warn",get:function(){return this.enabled?Function.prototype.bind.call(console.warn,console):d}},{key:"error",get:function(){return this.enabled?Function.prototype.bind.call(console.error,console):d}}]),e}();var m=function(){function e(n,r){var o=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];t(this,e),this.enabled=o&&e.supported,this.key=n,this.ttl=r}return n(e,[{key:"get",value:function(t){if(!e.supported||!this.enabled)return null;var n=window.localStorage.getItem(this.key);if(h.empty(n))return null;var r=window.localStorage.getItem("".concat(this.key,"_ttl"));if(h.empty(r)||r>Date.now())return null;var o=JSON.parse(n);return h.string(t)&&t.length?o[t]:o}},{key:"set",value:function(t){if(e.supported&&this.enabled&&h.object(t)){var n=this.get();h.empty(n)&&(n={}),function t(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length,o=Array(1<n?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];if(!o.length)return e;var c=o.shift();return h.object(c)?(Object.keys(c).forEach(function(n){h.object(c[n])?(!Object.keys(e).includes(n)&&Object.assign(e,r({},n,{})),t(e[n],c[n])):Object.assign(e,r({},n,c[n]))}),t.apply(void 0,[e].concat(o))):e}(n,t),window.localStorage.setItem(this.key,JSON.stringify(n)),window.localStorage.setItem("".concat(this.key,"_ttl"),Date.now()+this.ttl)}}}],[{key:"supported",get:function(){try{return"localStorage"in window&&(window.localStorage.setItem("___test","___test"),window.localStorage.removeItem("___test"),!0)}catch(t){return!1}}}]),e}();return function(){function e(n,r){t(this,e),this.elements={count:null,trigger:null},h.element(n)?this.elements.trigger=n:h.string(n)&&(this.elements.trigger=document.querySelector(n)),h.element(this.elements.trigger)&&h.empty(this.elements.trigger.shr)&&(this.config=Object.assign({},g,r,{networks:f}),this.init())}return n(e,[{key:"init",value:function(){var t=this;this.console=new w(this.config.debug),this.storage=new m(this.config.storage.key,this.config.storage.ttl,this.config.storage.enabled),this.getCount().then(function(e){return t.displayCount(e)}).catch(function(){}),this.elements.trigger.shr=this}},{key:"share",value:function(t){if(h.event(t)&&!h.empty(this.network)&&this.networkConfig.popup){t.preventDefault();var e=this.networkConfig.popup,n=e.width,r=e.height,o="window-".concat(this.network);if(window[o]&&!window[o].closed)window[o].focus();else{var i=void 0===window.screenLeft?window.screen.left:window.screenLeft,c=void 0===window.screenTop?window.screen.top:window.screenTop,u=window.screen.width/2-n/2+i,s=window.screen.height/2-r/2+c;window[o]=window.open(this.href,this.network,"top=".concat(s,",left=").concat(u,",width=").concat(n,",height=").concat(r)),window[o].focus()}window[o].opener=null}}},{key:"getCount",value:function(){var t=this;return new Promise(function(e,n){var o=t.apiUrl;if(!h.empty(o)){var i=t.url,c=t.storage.get(i);return h.empty(c)?void function(t){return new Promise(function(e,n){var r="jsonp_callback_".concat(Math.round(1e5*Math.random())),o=document.createElement("script");o.addEventListener("error",function(t){return n(t)}),window[r]=function(t){delete window[r],document.body.removeChild(o),e(t)};var i=new URL(t);i.searchParams.set("callback",r),o.setAttribute("src",i.toString()),document.body.appendChild(o)})}(o).then(function(n){t.storage.set(r({},i,n)),e(n)}).catch(n):void e(c)}n(new Error("No URL available for ".concat(t.network,".")))})}},{key:"displayCount",value:function(t){var e=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],n=0,r=this.elements.trigger.getAttribute("data-shr-display");n=h.empty(r)?this.networkConfig.shareCount(t):t[r],h.empty(n)&&(n=0),n=parseInt(n,10),e&&(h.element(this.elements.count)&&(n=parseInt(this.elements.count.innerText,10)),n+=1),this.count=n;var o=this.config.count.position.toLowerCase();if(0<n||this.config.count.displayZero){var i,c="after"===o;i=this.config.count.format&&1e6<n?"".concat(Math.round(n/1e6),"M"):this.config.count.format&&1e3<n?"".concat(Math.round(n/1e3),"K"):function(t){var e=/\./.test(1.1.toLocaleString())?".":",",n=new RegExp("\\".concat(e,"\\d+$"));return Math.round(t).toLocaleString().replace(n,"")}(n),h.element(this.elements.count)?this.elements.count.textContent=i:(this.elements.trigger.insertAdjacentHTML(c?"afterend":"beforebegin",this.config.count.html(i,this.config.count.classname,o)),this.elements.count=this.elements.trigger[c?"nextSibling":"previousSibling"])}}},{key:"href",get:function(){return h.element(this.elements.trigger)?this.elements.trigger.href:null}},{key:"network",get:function(){var t=this;if(!h.element(this.elements.trigger))return null;var e=this.config.networks;return Object.keys(e).find(function(n){return function(t){var e=new URL(t).hostname,n=e.split("."),r=n.length;return 2<r&&(e="".concat(n[r-2],".").concat(n[r-1]),2===n[r-2].length&&2===n[r-1].length&&(e="".concat(n[r-3],".").concat(e))),e}(t.href)===e[n].domain})}},{key:"networkConfig",get:function(){return h.empty(this.network)?null:this.config.networks[this.network]}},{key:"url",get:function(){var t=this;if(h.empty(this.network))return null;var e=function(e){return new URL(t.href).searchParams.get(e)};switch(this.network){case"facebook":return e("u");case"github":case"youtube_subscribe":return this.href.pathname;default:return e("url")}}},{key:"apiUrl",get:function(){if(h.empty(this.network))return null;switch(this.network){case"github":return this.networkConfig.url(this.href,this.networkConfig.tokens);case"youtube_subscribe":return this.networkConfig.url(this.networkConfig.channel,this.networkConfig.key);default:return this.networkConfig.url(encodeURIComponent(this.href))}}}],[{key:"setup",value:function(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=null;if(h.string(t)?r=Array.from(document.querySelectorAll(t)):h.element(t)?r=[t]:h.nodeList(t)?r=Array.from(t):h.array(t)&&(r=t.filter(h.element)),h.empty(r))return null;var o=Object.assign({},g,n);h.string(t)&&o.watch&&new MutationObserver(function(n){Array.from(n).forEach(function(n){Array.from(n.addedNodes).forEach(function(n){h.element(n)&&function(t,e){return function(){return Array.from(document.querySelectorAll(e)).includes(this)}.call(t,e)}(n,t)&&new e(n,o)})})}).observe(document.body,{childList:!0,subtree:!0});return r.map(function(t){return new e(t,n)})}}]),e}()});