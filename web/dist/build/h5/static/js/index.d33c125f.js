(function(e){function t(t){for(var a,r,s=t[0],c=t[1],u=t[2],l=0,f=[];l<s.length;l++)r=s[l],o[r]&&f.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={index:0},i=[];function r(e){return s.p+"static/js/"+({"pages-index":"pages-index"}[e]||e)+"."+{"pages-index":"26a42d01"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=o[e]=[t,a]}));t.push(n[2]=a);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=r(e),i=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+i+")");r.type=a,r.request=i,n[1](r)}o[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1990:function(e,t,n){var a=n("9f54");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=n("4f06").default;o("042e8737",a,!0,{sourceMap:!1,shadowMode:!1})},"1eda":function(e,t,n){"use strict";var a,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},i=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}))},"23be":function(e,t,n){"use strict";n.r(t);var a=n("3b4e"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},"3b4e":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={onLaunch:function(e){},onShow:function(e){},onHide:function(){console.log("App Hide")}};t.default=a},"3dfd":function(e,t,n){"use strict";n.r(t);var a=n("1eda"),o=n("23be");for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n("7c55");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=c.exports},4360:function(e,t,n){"use strict";var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("e143")),i=a(n("2f62"));o.default.use(i.default);var r=new i.default.Store({state:{isFright:!1,isLoading:!1,isRestart:!1,isNoInput:!1,currentIndex:-1,totalCount:0,pressPage:"",detailInfo:"",frightInfo:{airlineNameCn:"",arrdep:"",bltDisp:"",cntDisp:"",contractId:0,destAirportCn:"",destAirportCode:"",destSdt:"",destTime:"",destTimeName:"",endCityCn:"",firstBltOt:"",firstCntOt:"",firstGatOt:"",fltId:"",fltNo:"",follow:!1,gatDisp:"",iata:"",relFltDesc:"",relFltNos:"",routeStationSdtArrTime:[],routeStationSdtDepTime:[],securityDur:"",securityState:"-",startActTime:"",startAirportCn:"",startAirportCode:"",startCityCn:"",startSdt:"",startTime:"",startTimeName:"",stateCn:"",stateColor:"",taxiWait:"",term:"",terminal:""},flightList:[],suggestAnswer:[],passenger:"国内出发",sessionId:Date.parse(new Date)},mutations:{setDetailInfo:function(e,t){e.detailInfo=t},setCurrentIndex:function(e,t){e.currentIndex=t},setTotalCount:function(e,t){e.totalCount=t},setPressPage:function(e,t){e.pressPage=t},setIsRestart:function(e,t){e.isRestart=t,e.isFright=!1,e.currentIndex=-1},setIsNoInput:function(e,t){e.isNoInput=t},setIsFright:function(e,t){e.isFright=t,e.isRestart=!1,e.currentIndex=-1},setFlightList:function(e,t){e.flightList=t},setFrightInfo:function(e,t){e.frightInfo=t},setPassenger:function(e,t){e.passenger=t},setIsLoading:function(e,t){e.isLoading=t},setSessionId:function(e,t){e.sessionId=t},setSuggestAnswer:function(e,t){e.suggestAnswer.push(t)},setIndexSuggestAnswer:function(e,t,n){e.suggestAnswer[t]["suggestAnswer"]=n},initSuggestAnswer:function(e,t){e.suggestAnswer=t},deleteSuggestAnswer:function(e,t){e.suggestAnswer.splice(t,1)},clearSuggestAnswer:function(e){e.suggestAnswer=[],e.frightInfo={airlineNameCn:"",arrdep:"",bltDisp:"",cntDisp:"",contractId:0,destAirportCn:"",destAirportCode:"",destSdt:"",destTime:"",destTimeName:"",endCityCn:"",firstBltOt:"",firstCntOt:"",firstGatOt:"",fltId:"",fltNo:"",follow:!1,gatDisp:"",iata:"",relFltDesc:"",relFltNos:"",routeStationSdtArrTime:[],routeStationSdtDepTime:[],securityDur:"",securityState:"-",startActTime:"",startAirportCn:"",startAirportCode:"",startCityCn:"",startSdt:"",startTime:"",startTimeName:"",stateCn:"",stateColor:"",taxiWait:"",term:"",terminal:""}},editSuggestAnswer:function(e,t){e.suggestAnswer[t]["animate"]="animate__backOutUp animate__delay-5s"}},actions:{}}),s=r;t.default=s},"56d7":function(e,t,n){"use strict";var a=n("4ea4");n("8e6e"),n("ac6a"),n("456d");var o=a(n("bd86"));n("cadf"),n("551c"),n("f751"),n("097d"),n("6cdc"),n("1c31"),n("921b");var i=a(n("e143")),r=a(n("b059")),s=a(n("3dfd")),c=a(n("4360")),u=a(n("a49b")),l=a(n("b71b")),d=a(n("7f74")),f=a(n("78e7"));function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}n("a1c5"),i.default.use(r.default),i.default.config.productionTip=!1,i.default.prototype.$utility=l.default,i.default.prototype.$store=c.default,i.default.prototype.$config=u.default,s.default.mpType="app";var p=new r.default({locale:"zh-CN",messages:{"zh-CN":d.default,"en-US":f.default}});window.utility=l.default,window.uni=uni,window.appInfo={_0:{},_1:{},_2:{},_3:{},_4:{},_5:{},_6:{}};var h=new i.default(m({store:c.default,config:u.default,utility:l.default,i18n:p},s.default));h.$mount()},5768:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={pages:{"pages/index":{navigationStyle:"custom",navigationBarTitleText:"首都机场终端"}},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"首都机场终端",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8",backgroundColorTop:"#F4F5F6",backgroundColorBottom:"#F4F5F6"}};t.default=a},"6cdc":function(e,t,n){"use strict";(function(e){var t=n("4ea4"),a=t(n("e143"));e["____417FD0B____"]=!0,delete e["____417FD0B____"],e.__uniConfig={easycom:{"^u-(.*)":"uview-ui/components/u-$1/u-$1.vue","^page-meta$":"@dcloudio/uni-cli-shared/components/page-meta.vue","^navigation-bar$":"@dcloudio/uni-cli-shared/components/navigation-bar.vue"},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"首都机场终端",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8",backgroundColorTop:"#F4F5F6",backgroundColorBottom:"#F4F5F6"}},e.__uniConfig.router={mode:"hash",base:"/"},e.__uniConfig.publicPath="/",e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},e.__uniConfig.sdkConfigs={},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},a.default.component("pages-index",(function(e){var t={component:n.e("pages-index").then(function(){return e(n("9261"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),e.__uniRoutes=[{path:"/",alias:"/pages/index",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationStyle:"custom",navigationBarTitleText:"首都机场终端"})},[e("pages-index",{slot:"page"})])}},meta:{id:1,name:"pages-index",isNVue:!1,pagePath:"pages/index",isQuit:!0,isEntry:!0,windowTop:0}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,n("c8ba"))},"6e27":function(e,t,n){e.exports=n.p+"static/img/bg.32bb90c6.png"},"78e7":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={welcome:"Welcome To Baiyun Airport",welcome1:"Welcome",facing:"In Face Recognition, Please Look At The Camera At The Top Of The Screen",facingNo:"Face Recognition, Please See The Camera At The Top Of The Screen",notRecognized:"Your Flight Information Is Not Recognized.Try Another Way",nav1:"Flight Service",nav2:"Video Customer Servic",nav3:"Airport Services",tab1:"Boarding Gate",tab2:"Check-in Counter",tab3:"Security Lines",qrCode:"Scan Code To Save Map To Mobile Phone",iDCard:"ID Card Recognition",ticket:"Ticket Recognition",search:"Search",searchPlacehold:"Input Flight Number And City Name For Query",freedBack:"Feedback And Suggestions",freedBackPlacehold:"Your Opinions And Suggestions Are Our Most Valuable Wealth!",environment:"Environment",service:"Service",submit:"Submit",characters:"Characters",terminal:"Terminal",flightSearch:"Flight Search",selectFligth:"Click To Select The Flight You Want To Follow",mainN1:"International Flights",mainN2:"Domestic Flights",mainN3:"International Flights",mainN4:"Domestic Flights",scene:"Scenario",hall1:"Departure Hall For International Flights",hall2:"Departure Hall For Domestic Flights",hall3:"Arrival Hall For International Flights",hall4:"Arrival Hall For Domestic Flights",managerBtn:"Save And Exit Management Mode",secondExit:"Exit Administrator Mode Without Operation Within 15 Seconds, Click Exit Immediately",modal:"Administrator Mode",flightInfo:"Your flight information",destination:"destination",takeOffTime:"Take Off Time",boardingTime:"Boarding Time",ddTime:"Arrival Time",state:"State",putMore:"Flight Details",expandMore:"Expand More Details",switchingFaces:"Switching Faces",dd01:"Long Distance Bus Terminal",dd02:"Urban Passenger Transport Terminal",dd03:"Airport Subway",dd04:"Car Park",zz00:"Transfer Navigation",zz01:"Domestic Transfer",zz02:"International-Domestic Transfer",zz03:"Domestic-International Transfer",zz04:"International Transfer",zz:"Transfer Flight",dd:"Arrival Flight",cf:"Set Out Flight",menu:"Menu",voiceSssistant:"Voice",index:"Home",noFace:"You Can Find The Flight Through Face Recognition, Scanning The Ticket, ID Card And Voice Assistant",voiceInfo:"Welcome To Voice Assistant, Please Say The Service You Are Looking For"};t.default=a},"7c55":function(e,t,n){"use strict";var a=n("1990"),o=n.n(a);o.a},"7f74":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={welcome:"白云机场欢迎您",welcome1:"欢迎您",facing:"人脸识别中，请看屏幕上方的摄像头",facingNo:"人脸识别，请看屏幕上方的摄像头",notRecognized:"未识别到您的航班信息，试试其他方式吧",nav1:"航班服务",nav2:"视频客服",nav3:"机场服务",tab1:"登机口",tab2:"值机柜台",tab3:"安检通道",qrCode:"扫码保存地图到手机",iDCard:"身份证识别",ticket:"机票识别",search:"查找",searchPlacehold:"请输入航班号、城市名称查询",freedBack:"反馈意见和建议",freedBackPlacehold:"您的意见与建议，就是我们最宝贵的财富！",environment:"环境",service:"服务",submit:"提交",characters:"字",terminal:"航站楼",flightSearch:"航班搜索",selectFligth:"点击选择您要关注的航班",mainN1:"国际航班乘机",mainN2:"国内航班乘机",mainN3:"国际航班乘机",mainN4:"国内航班乘机",scene:"适用场景",hall1:"国际航班出发大厅",hall2:"国内航班出发大厅",hall3:"国际航班到达大厅",hall4:"国内航班到达大厅",managerBtn:"保存并退出管理模式",secondExit:"15秒内无操作即退出管理员模式，点击立刻退出",modal:"管理员模式",flightInfo:"您的航班信息",destination:"目的地",takeOffTime:"预计起飞时间",boardingTime:"预计登机时间",ddTime:"预计到达时间",state:"当前状态",putMore:"航班详情",expandMore:"展开更多详情",switchingFaces:"切换人脸",zz:"中转航班",dd:"到达航班",cf:"出发航班",dd01:"省内大巴",dd02:"市区大巴",dd03:"机场地铁",dd04:"停车场",zz00:"中转导航",zz01:"国内中转国内",zz02:"国内中转国际",zz03:"国际中转国内",zz04:"国际中转国际",menu:"菜单",voiceSssistant:"语音助手",index:"首页",noFace:"您可以通过人脸识别、扫机票、扫身份证、语音助手查找航班",voiceInfo:"欢迎使用语音助手,请说出您要找的服务"};t.default=a},"9f54":function(e,t,n){var a=n("24fb"),o=n("1de5"),i=n("6e27");t=a(!1);var r=o(i);t.push([e.i,'html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nuni-form,\nuni-label,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\nuni-canvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\nuni-audio,\nuni-video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:initial}\n/* HTML5 display-role reset for older browsers */article,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection{display:block}body{font-family:微软雅黑,Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}ol,\nul{list-style:none}blockquote,\nq{quotes:none}blockquote:before,\nblockquote:after,\nq:before,\nq:after{content:"";content:none}table{width:100%;border-collapse:collapse;border-spacing:0}body uni-toast .uni-toast{background-color:initial}uni-page-body{color:#666;background:url('+r+") no-repeat 50%;background-size:cover;background-color:#f3f7fd;max-width:1080px;margin:0 auto;font-family:PingFang SC Medium,Helvetica Neue,Helvetica,微软雅黑,STHeiTi,sans-serif}::-webkit-scrollbar{width:4px;height:4px;background-color:#f1f1f4}\n/*定义滚动条轨道 内阴影+圆角*/::-webkit-scrollbar-track{box-shadow:12px 0 0 3px #f5f9fa;border-radius:8px;background-color:#f1f1f4}\n/*定义滑块 内阴影+圆角*/::-webkit-scrollbar-thumb{border-radius:8px;box-shadow:inset 0 0 6px #f5f9fa;background-color:#cbcbcb}@media screen and (max-width:1024px){uni-page-body{max-width:100%}}body.?%PAGE?%{background:url("+r+") no-repeat 50%;background-size:cover;background-color:#f3f7fd}",""]),e.exports=t},a49b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){return e.pageUrl="http://47.106.235.8:8889/",e.hostName="http://47.106.235.8:8888",e.static=e.pageUrl+"static/",e.timeNum=15,e.action={getColumns:e.hostName+"/api/Airport_Service/column",getArticle:e.hostName+"/api/Airport_Service/article",getArticleList:e.hostName+"/api/Airport_Service/articleList",getLogWrite:e.hostName+"/api/log/write",comment:e.hostName+"/api/Comment",faceSearch:e.hostName+"/api/Face/search",map:e.hostName+"/api/Map",asp:e.hostName+"/api/Asp",writeLog:e.hostName+"/api/log/write",flightSearch:e.hostName+"/api/flight/search",emergencyList:e.hostName+"/sys/emergency/list",terminalVoice:e.hostName+"/api/terminal/voice",flightDetail:e.hostName+"/api/terminal/flightDetail",baiduQuery:e.hostName+"/api/v2/core/query",aiBLog:e.hostName+"/api/terminal/aiBLog",asrLog:e.hostName+"/api/terminal/asrLog"},e}(a||{}),o=a;t.default=o},b71b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("ac6a"),n("a481"),n("3b2b"),n("4917"),n("28a5"),n("386d");var a=function(e){return e.getQueryParams=function(e){for(var t=e?e.slice(e.indexOf("?")+1):location.search.length>0?location.search.substring(1):"",n={},a=t.split("&"),o=null,i=null,r=null,s=0,c=a.length;s<c;s++)o=a[s].split("="),i=o[0],r=o[1],n[i]=r;return n},e.setcookie=function(e,t){var n=30,a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3),document.cookie=e+"="+escape(t)+";expires="+a.toGMTString()},e.getcookie=function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=t?t[2]:""},e.delcookie=function(e){var t=new Date;t.setTime(t.getTime()-1);var n=this.getcookie(e);null!=n&&(document.cookie=e+"="+n+";expires="+t.toGMTString())},e.setSessionStorage=function(t,n){var a=null;if(n){if("string"==typeof n)a=n;else for(var o in a=e.getSessionStorage(t)||{},n)n.hasOwnProperty(o)&&(a[o]=n[o]);window.sessionStorage.setItem(t,encodeURI(JSON.stringify(a)))}else window.sessionStorage.setItem(t,n)},e.getSessionStorage=function(e){return JSON.parse(decodeURI(window.sessionStorage.getItem(e)))},e.cleanSessionStorage=function(){window.sessionStorage.clear()},e.setLocalStorage=function(t,n){var a=null;if(n){if("string"==typeof n)a=n;else for(var o in a=e.getLocalStorage(t)||{},n)n.hasOwnProperty(o)&&(a[o]=n[o]);window.localStorage.setItem(t,encodeURI(JSON.stringify(a)))}else window.localStorage.setItem(t,n)},e.getLocalStorage=function(e){return JSON.parse(decodeURI(window.localStorage.getItem(e)))},e.cleanLocalStorage=function(){window.localStorage.clear()},e.trim=function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},e.checkLen=function(e,t){return e.length<=t},e.checkName=function(e){return!!e.match(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/)},e.checkPhone=function(e){return!!e.match(/^(13|14|15|16|17|18)[0-9]{8}[0-9]$/)},e.checkPass=function(e){return!!e.match(/^[a-zA-Z]\w{7,18}$/)},e.checkBankCard=function(e){return!!e.match(/^([1-9]{1})(\d{14}|\d{18})$/)},e.checkNumber=function(e){return!!e.match(/^(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/)},e.checkEmail=function(e){return!!e.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)},e.checkIdentityNo=function(e){var t=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,n=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,a=!1;return(15==e.length&&e.match(t)||18==e.length&&e.match(n))&&(a=!0),a},e.getCurrentTimeInfo=function(e){var t="undefined"!=typeof e?new Date(e):new Date,n=t.getFullYear(),a=t.getMonth()+1,o=t.getDate(),i=t.getDay(),r=t.getHours(),s=t.getMinutes(),c=t.getSeconds(),u=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],l=["Monday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return{year:n,month:a<10?"0"+a:a,date:o<10?"0"+o:o,hour:r<10?"0"+r:r,min:s<10?"0"+s:s,second:c<10?"0"+c:c,day:i,weekDay:u[i],"zh-CN":u[i],"en-US":l[i],ymr:n+"-"+(a<10?"0"+a:a)+"-"+(o<10?"0"+o:o),ymrhsm:n+"-"+(a<10?"0"+a:a)+"-"+(o<10?"0"+o:o)+" "+(r<10?"0"+r:r)+":"+(s<10?"0"+s:s)+":"+(c<10?"0"+c:c)}},e.formatTimeDiff=function(t){return t.forEach((function(n,a){var o=e.timeDiff(n["createTime"]),i=e.getCurrentTimeInfo(n["createTime"].replace(/\-/g,"/")),r=e.getCurrentTimeInfo(new Date);0==o.day?r.year==i.year&&r.month==i.month&&r.date==i.date?t[a]["createTime"]="今天"+n["createTime"].split(" ")[1]:t[a]["createTime"]="昨天"+n["createTime"].split(" ")[1]:t[a]["createTime"]=n["createTime"]})),t},e.convertImgToBase64=function(e,t,n){var a=document.createElement("CANVAS"),o=a.getContext("2d"),i=new Image;i.crossOrigin="Anonymous",i.onload=function(){a.height=i.height,a.width=i.width,o.drawImage(i,0,0);var e=a.toDataURL(n||"image/png");t.call(this,e),a=null},i.src=e},e.addDate=function(e,t){void 0!=t&&""!=t||(t=1);var n=new Date(e.replace(/\-/g,"/"));n.setDate(n.getDate()+t);var a=n.getFullYear(),o=n.getMonth()+1,i=n.getDate(),r=n.getHours(),s=n.getMinutes(),c=n.getSeconds();return o<=9&&(o="0"+o),i<=9&&(i="0"+i),r<=9&&(r="0"+r),s<=9&&(s="0"+s),c<=9&&(c="0"+c),a+"-"+o+"-"+i+" "+r+":"+s+":"+c},e.timeDiff=function(e,t){var n=e?new Date(e.replace(/\-/g,"/")).getTime():(new Date).getTime(),a=t?new Date(t.replace(/\-/g,"/")).getTime():(new Date).getTime(),o=Math.abs(n-a),i=Math.floor(o/864e5),r=o%864e5,s=Math.floor(r/36e5),c=r%36e5,u=Math.floor(c/6e4),l=c%6e4,d=Math.round(l/1e3);return{isOver:n<a,day:i,hour:s,minute:u,second:d}},e.generateRandomData=function(e){for(var t=["0","1","2","3","4","5","6","7","8","9"],n="",a=0;a<e;a++){var o=Math.ceil(10*Math.random());n+=t[o]}return n},e.formatBase64CodeList=function(e){for(var t=[],n=0,a=1e4,o=e.length,i=0;n<=o;i++)t[i]=e.substring(n,n+a),n+=a;return t},e.getObjectURL=function(e){var t=null;return void 0!=window.createObjectURL?t=window.createObjectURL(e):void 0!=window.URL?t=window.URL.createObjectURL(e):void 0!=window.webkitURL&&(t=window.webkitURL.createObjectURL(e)),t},e}(a||{}),o=a;t.default=o},ecd6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={appid:"__UNI__417FD0B"};t.default=a}});