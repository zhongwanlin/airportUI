(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba3a7cbc"],{"20fd":function(e,a,t){},5479:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"page"},[t("div",{staticClass:"searchWrap"},[t("div",{staticClass:"search"},[t("table",[t("tr",[t("td",[e._v("\n                        \n                          区域\n                        "),[t("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.searchInfo.area_name,callback:function(a){e.$set(e.searchInfo,"area_name",a)},expression:"searchInfo.area_name"}},e._l(e.areaList,(function(a){return t("Option",{key:a.id,attrs:{value:a.name}},[e._v(e._s(a.name))])})),1)],e._v("\n                          设备号\n                        "),[t("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.searchInfo.mac_id,callback:function(a){e.$set(e.searchInfo,"mac_id",a)},expression:"searchInfo.mac_id"}},e._l(e.marchineList,(function(a){return t("Option",{key:a.id,attrs:{value:a.id}},[e._v(e._s(a.mac_id)+"("+e._s(a.name)+")")])})),1)],e._v("\n                          时间\n                        "),[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"daterange",placeholder:"选择时间"},on:{"on-change":e.dateChange}})]],2)])])])]),t("div",{staticClass:"tableList"},[[t("Table",{attrs:{height:e.height-100,border:"",stripe:"",loading:e.isLoading,columns:e.columnsRealTime,data:e.realTimeDataList}})]],2),t("div",{staticClass:"pageWrap"},[[t("Page",{attrs:{total:e.count,"page-size":50,"page-size-opts":[50,100,150],"show-sizer":"",showTotal:""},on:{"on-change":e.pageSizeChange,"on-page-size-change":e.pageRowChange}})]],2)])},i=[],o={name:"deviceReport",components:{},data:function(){return{userInfo:null,height:window.innerHeight,isLoading:!1,count:0,pageInfo:{pageIndex:0,pageSize:50},searchInfo:{area_name:"",begDate:"",endDate:"",mac_id:"",mac_model_id:""},columnsRealTime:[{align:"center",title:"序号",type:"index",width:60},{title:"模组",align:"center",key:"name"},{title:"请求数量",align:"center",key:"e_name"},{title:"区域名称",align:"center",key:"create_time"},{title:"调用状态",align:"center",key:"create_time"}],realTimeDataList:[],areaList:[],marchineList:[]}},methods:{pageSizeChange:function(e){var a=this;a.pageInfo.pageIndex=parseInt(e,10),a.getList(!0)},pageRowChange:function(e){var a=this;a.pageInfo.pageSize=parseInt(e,10),a.getList(!1)},reflesh:function(){var e=this;e.getList(!0)},getList:function(e){var a=this;1==e&&(a.isLoading=!0,a.pageInfo.pageIndex=0),a.axios({method:"get",headers:{token:a.userInfo.token},url:a.$config.action.marchineLog,params:{pageNum:a.pageInfo.pageIndex,pageSize:a.pageInfo.pageSize,area_name:a.searchInfo.area_name,begDate:a.searchInfo.begDate,endDate:a.searchInfo.endDate,mac_id:a.searchInfo.mac_id,mac_model_id:a.searchInfo.mac_model_id}}).then((function(e){a.realTimeDataList=e.data.list,a.count=e.data.total,a.isLoading=!1})).catch((function(e){console.log(e),a.isLoading=!1}))},getAreaList:function(e){var a=this;a.axios({method:"get",headers:{token:a.userInfo.token},url:a.$config.action.areaList,params:{pageNum:1,pageSize:1e4,e_name:"",name:""}}).then((function(e){a.areaList=e.data.list,a.count=e.data.total,a.isLoading=!1})).catch((function(e){console.log(e),a.isLoading=!1}))},getDeviceList:function(){var e=this;e.axios({method:"get",headers:{token:e.userInfo.token},url:e.$config.action.marchineList,params:{pageNum:1,pageSize:1e4,area_id:"",dep_status:"",mac_id:"",status:"",version:"",name:""}}).then((function(a){e.marchineList=a.data.list})).catch((function(e){console.log(e)}))},dateChange:function(e){var a=this;console.log(e),e&&e.length>0&&(a.searchInfo.begDate=e[0],a.searchInfo.endDate=e[1])}},created:function(){var e=this,a=null;e.userInfo=e.$utility.getLocalStorage("userInfo"),e.getList(!0),e.getAreaList(),e.getDeviceList(),e.$watch("searchInfo",(function(){clearTimeout(a),a=setTimeout((function(){e.getList(!0)}),200)}),{deep:!0})},mounted:function(){var e=this,a=null;window.onresize=function(){clearTimeout(a),a=setTimeout((function(){e.height=window.innerHeight}),500)}},beforeDestroy:function(){clearInterval(window.recordTime)}},s=o,c=(t("e65f"),t("5d22")),r=Object(c["a"])(s,n,i,!1,null,null,null);a["default"]=r.exports},e65f:function(e,a,t){"use strict";t("20fd")}}]);
//# sourceMappingURL=chunk-ba3a7cbc.dfaada44.js.map