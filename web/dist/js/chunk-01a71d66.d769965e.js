(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01a71d66"],{"190b":function(e,t,n){n("149f")&&"g"!=/./g.flags&&n("064e").f(RegExp.prototype,"flags",{configurable:!0,get:n("f1fe")})},"2b45":function(e,t,n){"use strict";n("190b");var o=n("69b3"),i=n("f1fe"),a=n("149f"),r="toString",c=/./[r],s=function(e){n("bf16")(RegExp.prototype,r,e,!0)};n("238a")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?s((function(){var e=o(this);return"/".concat(e.source,"/","flags"in e?e.flags:!a&&e instanceof RegExp?i.call(e):void 0)})):c.name!=r&&s((function(){return c.call(this)}))},"4ba2":function(e,t,n){var o=n("2ea2"),i=n("2f77"),a=n("69b3"),r=n("e7ad").Reflect;e.exports=r&&r.ownKeys||function(e){var t=o.f(a(e)),n=i.f;return n?t.concat(n(e)):t}},"5ab2":function(e,t,n){var o=n("e46b"),i=n("4ba2"),a=n("09b9"),r=n("dcb7"),c=n("ebc3");o(o.S,"Object",{getOwnPropertyDescriptors:function(e){var t,n,o=a(e),s=r.f,f=i(o),u={},p=0;while(f.length>p)n=s(o,t=f[p++]),void 0!==n&&c(u,t,n);return u}})},9261:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"index"}})},i=[];n("5ab2"),n("6d57"),n("e10e"),n("cc57"),n("f548"),n("2b45");function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=n("9f3a");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f={name:"index",components:{},data:function(){return{height:window.innerHeight,isDetail:!1,isDefault:!0,isFace:!0,isShowMenu:!0,currentMenu:1,navTitle:"",locale:"",searchData:[],timeNum:0,timeInterval:null}},computed:s({},Object(r["c"])([])),methods:s(s({},Object(r["b"])([])),{},{toggleMainMenu:function(){var e=this;e.setFaceVideo(!1),e.isShowMenu=!e.isShowMenu},refleshAction:function(){var e=this;e.hiddenCamera(),setTimeout((function(){e.userCamera(e)}),500)},formatSearchData:function(){var e=this;for(var t in e.searchData=[],window.mock.demoInfo)window.mock.demoInfo.hasOwnProperty(t)&&function(t){e.searchData.push(window.mock.demoInfo[t])}(t)},toggleFaceVideo:function(){var e=this;e.setFaceVideo(!0),e.setCRouter("voice")},setCRouter:function(e){var t=this;t.setFaceVideo(!1),t.isShowMenu=!1,t.setFaceVideo(!1),t.$router.push({name:e})},routerToPart:function(e){var t=this;t.setCRouter(e),t.toggleMainMenu(!1)},getLogWrite:function(){var e=this;e.axios({method:"post",url:e.$config.action.getLogWrite,headers:{gomstoken:e.$utility.getLocalStorage("gomstoken")},data:{mac_model_id:"",sdk_name:"",versions:"",run_status:""}}).then((function(e){})).catch((function(){console.log(catche)}))},getTerminalInfo:function(){window.jsBridge.hxpApi(1,JSON.stringify({}),function(e){window.appInfo["_1"]=JSON.parse(e),window.utility.setLocalStorage("gomstoken",window.appInfo["_1"]["imei"]||"866822030391163")}.toString())},userCamera:function(e){window.jsBridge&&window.jsBridge.hxpApi(2,JSON.stringify({left:.017,top:.23,right:.327,bottom:.63}),function(t){window.appInfo["_2"]["base64"]=t.replace('{"imgBase64Strs":["',"").replace('"]}',"").replace(/\s+/g,""),window.appInfo["_2"]["imgBase64Strs"]="data:image/jpeg;base64,"+window.appInfo["_2"]["base64"],window.appInfo["_2"]["base64"].length>0?window.appInfo["_0"]["searchByFace"]():(e.setFaceInfo(!1),e.setIsFace(!0),e.setCRouter("flight"))}.toString())},hiddenCamera:function(){window.jsBridge&&window.jsBridge.hxpApi(7,JSON.stringify({}),function(e){}.toString())},sweepTicket:function(){window.jsBridge.hxpApi(3,JSON.stringify({}),function(e){window.appInfo["_0"]["setDetailInfo"](3,e)}.toString())},scanIDCard:function(){window.jsBridge.hxpApi(4,JSON.stringify({}),function(e){var t=window.mock.demoMatch,n={code:t[Math.floor(Math.random()*t.length)]||"CZ3337",name:JSON.parse(e.replace(/\s+/g,"").slice(1,e.length-1))["name"]};window.appInfo["_0"]["setDetailInfo"](4,JSON.stringify(n))}.toString())},getDetal:function(){var e=this;return function(t){var n=window.mock.demoInfo;for(var o in n)if(n.hasOwnProperty(o)&&JSON.stringify(t).indexOf(o)>=0){t["name"]&&(n[o]["name"]=t["name"]),e.setFaceInfoDetail(null),e.setFaceInfo(!0),e.setIsScaning(!0),e.setIsSwitchScan(!1),e.setFaceInfoDetail(n[o]),e.setSpreed(!0),e.$router.push({name:"detail"});break}e.sweepTicket(),e.scanIDCard()}},setDetailInfo:function(){return function(e,t){window.mock.demoInfo;var n=JSON.parse(t.replace(/\s+/g,""));window.appInfo["_0"]["getDetal"](n)}},searchByFace:function(){var e=this;return function(){var t=new XMLHttpRequest,n=new FormData;n.append("image",window.appInfo["_2"]["imgBase64Strs"]),t.onreadystatechange=function(){if(!e.isScaning&&4==t.readyState&&200==t.status){var n=t.responseText,o=JSON.parse(n);if(0==o.code){var i=o.data,a=e.$utility.getSessionStorage("faceInfo"),r=window.mock.demoMatch,c={code:r[Math.floor(Math.random()*r.length)]||"CZ3337",name:i.name};a?a.name!=i.name&&window.appInfo["_0"]["getDetal"](c):window.appInfo["_0"]["getDetal"](c),e.$utility.setSessionStorage("faceInfo",i)}else e.setFaceInfo(!1),e.setIsFace(!0),e.setIsSwitchScan(!1),e.setCRouter("flight")}},t.open("POST",e.$config.action.faceSearch,!0),t.setRequestHeader("gomstoken",e.$utility.getLocalStorage("gomstoken")),t.send(n)}},init:function(){var e=this;return function(){e.setCRouter("flight"),e.setFaceInfoDetail(null),e.setFaceInfo(!1),e.setIsScaning(!1),e.userCamera(e),e.$utility.setSessionStorage("faceInfo",null),window.appInfo["_0"]&&window.appInfo["_0"]["stopVoice"]&&window.appInfo["_0"]["stopVoice"]()}}}),created:function(){var e=this;window.airport=e.$config.airport,e.locale=e.$i18n.locale,e.$Message.config({top:350,duration:10}),window.appInfo["_0"]["searchByFace"]=e.searchByFace(),window.appInfo["_0"]["getDetal"]=e.getDetal(),window.appInfo["_0"]["setDetailInfo"]=e.setDetailInfo(),window.appInfo["_0"]["init"]=e.init(),window.jsBridge&&(e.getTerminalInfo(),e.userCamera(e),e.sweepTicket(),e.scanIDCard())}},u=f,p=(n("cb9c"),n("c701")),d=Object(p["a"])(u,o,i,!1,null,null,null);t["default"]=d.exports},a081:function(e,t,n){},cb9c:function(e,t,n){"use strict";n("a081")},e10e:function(e,t,n){var o=n("008a"),i=n("80a9");n("f0cc")("keys",(function(){return function(e){return i(o(e))}}))},ebc3:function(e,t,n){"use strict";var o=n("064e"),i=n("cc33");e.exports=function(e,t,n){t in e?o.f(e,t,i(0,n)):e[t]=n}},f0cc:function(e,t,n){var o=n("e46b"),i=n("7ddc"),a=n("238a");e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],r={};r[e]=t(n),o(o.S+o.F*a((function(){n(1)})),"Object",r)}}}]);
//# sourceMappingURL=chunk-01a71d66.d769965e.js.map