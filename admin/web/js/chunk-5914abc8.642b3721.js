(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5914abc8"],{"159d":function(e,t,i){"use strict";var a=i("5de9"),n=i.n(a);n.a},"5de9":function(e,t,i){},d867:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"page"},[i("div",{staticClass:"searchWrap"},[i("div",{staticClass:"search"},[i("table",[i("tr",[i("td",[e._v("\n                            区域\n                            "),[i("Select",{staticStyle:{width:"120px"},attrs:{clearable:"",placeholder:"选择是否满意"},model:{value:e.searchInfo.satisfiedFlag,callback:function(t){e.$set(e.searchInfo,"satisfiedFlag",t)},expression:"searchInfo.satisfiedFlag"}},[i("Option",{attrs:{value:1}},[e._v("满意")]),i("Option",{attrs:{value:2}},[e._v("不满意")])],1)],e._v("\n                              时间\n                            "),[i("DatePicker",{staticStyle:{width:"120px"},attrs:{type:"daterang",clearable:"",options:e.dataPickOption,placeholder:"请选择时间"},on:{"on-change":e.setBeginTime}})],e._v("\n\t\t\t\t\t\t\t  设备号\n\t\t\t\t\t\t\t"),[i("Input",{staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入标题"},model:{value:e.searchInfo.roleName,callback:function(t){e.$set(e.searchInfo,"roleName",t)},expression:"searchInfo.roleName"}})],[i("div",{staticClass:"searchBtnList"},[i("Button",{attrs:{icon:"ios-refresh-circle"},on:{click:function(t){return e.reflesh(!0)}}},[e._v("刷新")])],1)]],2)])])])]),i("div",{staticClass:"tableList"},[[i("Table",{attrs:{height:e.height-100,stripe:"",border:"",loading:e.isLoading,columns:e.columns,data:e.dataList}})]],2),i("div",{staticClass:"pageWrap"},[[i("Page",{attrs:{total:e.count,"page-size":50,"page-size-opts":[50,100,150],"show-sizer":"",showTotal:""},on:{"on-change":e.pageSizeChange,"on-page-size-change":e.pageRowChange}})]],2)])},n=[],s={name:"lostAndFound",data:function(){return{userInfo:null,height:window.innerHeight,isLoading:!1,isDetail:!1,disable:!1,dateInfo:[],count:0,pageInfo:{pageIndex:1,pageSize:50},searchInfo:{satisfiedFlag:"",beginTime:"",endTime:""},itemInfo:{id:0,paraId:0,lostRegId:0,lostUserName:"",userPhone:"",lostUserId:"",serviceLevel:"",satisfiedFlag:"",clientSuggestion:"",replyInfo:"",modifyUserId:""},columns:[{title:"序号",align:"center",type:"index",width:60},{title:"内容名称",align:"center",key:"lostUserName"},{title:"区域",align:"center",key:"userPhone"},{title:"栏目名称",align:"center",key:"serviceLevel"},{title:"设备号",align:"center",key:"serviceLevel"},{title:"次数",align:"center",key:"serviceLevel"}],areaCodeList:[],dataList:[],dataPickOption:{disabledDate:function(e){return e&&e.valueOf()>Date.now()}}}},methods:{setBeginTime:function(e){var t=this;t.searchInfo.beginTime=e},setEndTime:function(e){var t=this;t.searchInfo.endTime=e},reflesh:function(e){var t=this;t.getLostCustomerEvaluationList(e)},pageSizeChange:function(e){var t=this;t.pageInfo.pageIndex=parseInt(e,10),t.getLostCustomerEvaluationList(!0)},pageRowChange:function(e){var t=this;t.pageInfo.pageSize=parseInt(e,10),t.getLostCustomerEvaluationList(!1)},getLostCustomerEvaluationList:function(e){var t=this;t.isLoading=!0,1==e&&(t.pageInfo.pageIndex=1),t.axios({method:"post",headers:t.$utility.setHeader(t.$config.service.evaluationService),url:t.$config.action.getLostCustomerEvaluationList,data:t.$qs.stringify({pageNum:t.pageInfo.pageIndex,pageSize:t.pageInfo.pageSize,satisfiedFlag:t.searchInfo.satisfiedFlag,beginTime:t.searchInfo.beginTime,endTime:t.searchInfo.endTime})}).then((function(e){"200"==e.data.code?(t.dataList=e.data.data,t.count=e.data.count):"9003"==e.data.code?t.utility.loginTimeOut(t):t.$Message.error(e.data.message),t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))},showNewOrEdit:function(e){var t=this;t.itemInfo=e,t.isDetail=!0},saveLostCustomerEvaluation:function(){var e=this;0!=e.itemInfo.replyInfo.trim().length?e.axios({method:"post",headers:e.$utility.setHeader(e.$config.service.evaluationService),url:e.$config.action.saveLostCustomerEvaluation,data:e.$qs.stringify({id:e.itemInfo.id||0,paraId:e.itemInfo.paraId||0,lostRegId:e.itemInfo.lostRegId,lostUserName:e.itemInfo.lostUserName,userPhone:e.itemInfo.userPhone,lostUserId:e.itemInfo.lostUserId,serviceLevel:e.itemInfo.serviceLevel,satisfiedFlag:e.itemInfo.satisfiedFlag,clientSuggestion:e.itemInfo.clientSuggestion,replyInfo:e.itemInfo.replyInfo,modifyUserId:e.userInfo.id})}).then((function(t){"200"==t.data.code?(e.getLostCustomerEvaluationList(!0),e.isDetail=!1):"9003"==t.data.code?e.utility.loginTimeOut(e):e.$Message.error(t.data.message),e.isLoading=!1})).catch((function(t){console.log(t),e.isLoading=!1})):e.$Message.error("请输入回复的内容")}},created:function(){var e=this,t=null;e.userInfo=e.$utility.getLocalStorage("lostFoundUserInfo"),e.getLostCustomerEvaluationList(!0),e.$watch("searchInfo",(function(){clearTimeout(t),t=setTimeout((function(){e.getLostCustomerEvaluationList(!0)}),200)}),{deep:!0})},mounted:function(){var e=this,t=null;window.onresize=function(){clearTimeout(t),t=setTimeout((function(){e.height=window.innerHeight}),500)}},beforeDestroy:function(){clearInterval(window.recordTime)}},o=s,r=(i("159d"),i("2877")),l=Object(r["a"])(o,a,n,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-5914abc8.642b3721.js.map