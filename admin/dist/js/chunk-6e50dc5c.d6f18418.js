(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e50dc5c"],{"159d":function(e,t,a){"use strict";a("99a8")},"99a8":function(e,t,a){},d867:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"searchWrap"},[a("div",{staticClass:"search"},[a("table",[a("tr",[a("td",[e._v("\n                        \n                          区域\n                        "),[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.searchInfo.area_name,callback:function(t){e.$set(e.searchInfo,"area_name",t)},expression:"searchInfo.area_name"}},e._l(e.areaList,(function(t){return a("Option",{key:t.id,attrs:{value:t.name}},[e._v(e._s(t.name))])})),1)],e._v("\n                          设备号\n                        "),[a("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.searchInfo.mac_id,callback:function(t){e.$set(e.searchInfo,"mac_id",t)},expression:"searchInfo.mac_id"}},e._l(e.marchineList,(function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.mac_id)+"("+e._s(t.name)+")")])})),1)],e._v("\n                          时间\n                        "),[a("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"daterange",placeholder:"选择时间"},on:{"on-change":e.dateChange}})]],2)])])])]),a("div",{staticClass:"tableList"},[[a("Table",{attrs:{height:e.height-100,border:"",stripe:"",loading:e.isLoading,columns:e.columnsRealTime,data:e.realTimeDataList}})]],2),a("div",{staticClass:"pageWrap"},[[a("Page",{attrs:{total:e.count,"page-size":50,"page-size-opts":[50,100,150],"show-sizer":"",showTotal:""},on:{"on-change":e.pageSizeChange,"on-page-size-change":e.pageRowChange}})]],2)])},i=[],o={name:"deviceReport",components:{},data:function(){return{userInfo:null,height:window.innerHeight,isLoading:!1,count:0,pageInfo:{pageIndex:0,pageSize:50},searchInfo:{area_name:"",begDate:"",endDate:"",mac_id:"",mac_model_id:""},columnsRealTime:[{align:"center",title:"序号",type:"index",width:60},{title:"内容ID",align:"center",key:"name"},{title:"内容名称",align:"center",key:"e_name"},{title:"区域ID",align:"center",key:"create_time"},{title:"区域",align:"center",key:"create_time"},{title:"栏目ID",align:"center",key:"create_time"},{title:"栏目名称",align:"center",key:"create_time"},{title:"设备号",align:"center",key:"create_time"},{title:"次数",align:"center",key:"create_time"}],realTimeDataList:[],areaList:[],marchineList:[]}},methods:{pageSizeChange:function(e){var t=this;t.pageInfo.pageIndex=parseInt(e,10),t.getList(!0)},pageRowChange:function(e){var t=this;t.pageInfo.pageSize=parseInt(e,10),t.getList(!1)},reflesh:function(){var e=this;e.getList(!0)},getList:function(e){var t=this;1==e&&(t.isLoading=!0,t.pageInfo.pageIndex=0),t.axios({method:"get",headers:{token:t.userInfo.token},url:t.$config.action.marchineSumUsed,params:{pageNum:t.pageInfo.pageIndex,pageSize:t.pageInfo.pageSize,area_name:t.searchInfo.area_name,begDate:t.searchInfo.begDate,endDate:t.searchInfo.endDate,mac_id:t.searchInfo.mac_id,mac_model_id:t.searchInfo.mac_model_id}}).then((function(e){t.realTimeDataList=e.data.list,t.count=e.data.total,t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))},getAreaList:function(e){var t=this;t.axios({method:"get",headers:{token:t.userInfo.token},url:t.$config.action.areaList,params:{pageNum:1,pageSize:1e4,e_name:"",name:""}}).then((function(e){t.areaList=e.data.list,t.count=e.data.total,t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))},getDeviceList:function(){var e=this;e.axios({method:"get",headers:{token:e.userInfo.token},url:e.$config.action.marchineList,params:{pageNum:1,pageSize:1e4,area_id:"",dep_status:"",mac_id:"",status:"",version:"",name:""}}).then((function(t){e.marchineList=t.data.list})).catch((function(e){console.log(e)}))},dateChange:function(e){var t=this;console.log(e),e&&e.length>0&&(t.searchInfo.begDate=e[0],t.searchInfo.endDate=e[1])}},created:function(){var e=this,t=null;e.userInfo=e.$utility.getLocalStorage("userInfo"),e.getList(!0),e.getAreaList(),e.getDeviceList(),e.$watch("searchInfo",(function(){clearTimeout(t),t=setTimeout((function(){e.getList(!0)}),200)}),{deep:!0})},mounted:function(){var e=this,t=null;window.onresize=function(){clearTimeout(t),t=setTimeout((function(){e.height=window.innerHeight}),500)}},beforeDestroy:function(){clearInterval(window.recordTime)}},s=o,c=(a("159d"),a("5d22")),r=Object(c["a"])(s,n,i,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-6e50dc5c.d6f18418.js.map