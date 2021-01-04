import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isFright: false,
		isLoading: false,
		isRestart: false,
		isNoInput: false,
		currentIndex: -1,
		totalCount: 0,
		pressPage: "",
		detailInfo: "",
		frightInfo: {
			"airlineNameCn": "",		//航空公司中文描述
			"arrdep": "",		//进出港标识
			"bltDisp": "",		//行李转盘资源编号
			"cntDisp": "",		//直接柜台编号
			"contractId": 0,		//订阅编号
			"destAirportCn": "",		//目的机场中文描述
			"destAirportCode": "",		//目的机场三字码
			"destSdt": "",		//目的城市计划到达时间
			"destTime": "",		//目的城市显示时间
			"destTimeName": "",		//目的城市显示时间字段的中文字段
			"endCityCn": "",		//目的城市中文描述
			"firstBltOt": "",		//行李转盘实际开放时间
			"firstCntOt": "",		//值机柜台实际关闭时间
			"firstGatOt": "",		//登机口实际开放时间
			"fltId": "",		//航班唯一标识
			"fltNo": "",		//航班号
			"follow": false,		//是否关注该航班（false未关注/true已关注）
			"gatDisp": "",		//登机口编号
			"iata": "",		//航空公司二字码
			"relFltDesc": "",		//忽略
			"relFltNos": "",		//忽略
			"routeStationSdtArrTime": [],		//忽略
			"routeStationSdtDepTime": [],		//忽略
			"securityDur": "",		//安检等待时长
			"securityState": "-",		//安检状态
			"startActTime": "",		//出发城市实际起飞时间
			"startAirportCn": "",		//出发机场中文描述
			"startAirportCode": "",		//出发机场三字码
			"startCityCn": "",		//出发城市中文描述
			"startSdt": "",		//出发城市计划起飞时间
			"startTime": "",		//出发时间
			"startTimeName": "",		//出发展示时间字段属性
			"stateCn": "",		//状态
			"stateColor": "",		//状态颜色
			"taxiWait": "",		//出租车等待时长
			"term": "",		//航站楼
			"terminal": ""		//航站楼
		},
		flightList: [],
		suggestAnswer: [],
		passenger: "国内出发",
		sessionId: Date.parse(new Date())
	},
	mutations: {
		setDetailInfo(state, detailInfo){
			state.detailInfo = detailInfo;
		},
		setCurrentIndex(state, currentIndex){
			state.currentIndex = currentIndex;
		},
		setTotalCount(state, totalCount){
			state.totalCount = totalCount;
		},
		setPressPage(state, pressPage){
			state.pressPage = pressPage;
		},
		setIsRestart(state, isRestart){
			state.isRestart = isRestart;
			state.isFright = false;
			state.currentIndex = -1;
		},
		setIsNoInput(state, isNoInput){
			state.isNoInput = isNoInput;
		},
		setIsFright(state, isFright){
			state.isFright = isFright;
			state.isRestart = false;
			state.currentIndex = -1;
		},
		setFlightList(state, flightList){
			state.flightList = flightList;
		},
		setFrightInfo(state, frightInfo){
			state.frightInfo = frightInfo;
		},
		setPassenger(state, passenger){
			state.passenger = passenger;
		},
		setIsLoading(state, isLoading){
			state.isLoading = isLoading;
		},
		setSessionId(state, sessionId){
			state.sessionId = sessionId;
		},
		setSuggestAnswer(state, suggestAnswer){
			state.suggestAnswer.push(suggestAnswer);
		},
		setIndexSuggestAnswer(state, index, suggestAnswer){
			state.suggestAnswer[index]["suggestAnswer"] = suggestAnswer;
		},
		initSuggestAnswer(state, list){
			state.suggestAnswer = list;
		},
		deleteSuggestAnswer(state, index){
			state.suggestAnswer.splice(index, 1);;
		},
		clearSuggestAnswer(state){
			state.suggestAnswer = [];
			state.frightInfo = {
				"airlineNameCn": "",		//航空公司中文描述
				"arrdep": "",		//进出港标识
				"bltDisp": "",		//行李转盘资源编号
				"cntDisp": "",		//直接柜台编号
				"contractId": 0,		//订阅编号
				"destAirportCn": "",		//目的机场中文描述
				"destAirportCode": "",		//目的机场三字码
				"destSdt": "",		//目的城市计划到达时间
				"destTime": "",		//目的城市显示时间
				"destTimeName": "",		//目的城市显示时间字段的中文字段
				"endCityCn": "",		//目的城市中文描述
				"firstBltOt": "",		//行李转盘实际开放时间
				"firstCntOt": "",		//值机柜台实际关闭时间
				"firstGatOt": "",		//登机口实际开放时间
				"fltId": "",		//航班唯一标识
				"fltNo": "",		//航班号
				"follow": false,		//是否关注该航班（false未关注/true已关注）
				"gatDisp": "",		//登机口编号
				"iata": "",		//航空公司二字码
				"relFltDesc": "",		//忽略
				"relFltNos": "",		//忽略
				"routeStationSdtArrTime": [],		//忽略
				"routeStationSdtDepTime": [],		//忽略
				"securityDur": "",		//安检等待时长
				"securityState": "-",		//安检状态
				"startActTime": "",		//出发城市实际起飞时间
				"startAirportCn": "",		//出发机场中文描述
				"startAirportCode": "",		//出发机场三字码
				"startCityCn": "",		//出发城市中文描述
				"startSdt": "",		//出发城市计划起飞时间
				"startTime": "",		//出发时间
				"startTimeName": "",		//出发展示时间字段属性
				"stateCn": "",		//状态
				"stateColor": "",		//状态颜色
				"taxiWait": "",		//出租车等待时长
				"term": "",		//航站楼
				"terminal": ""		//航站楼
			};
		},
		editSuggestAnswer(state, index){
			state.suggestAnswer[index]["animate"] = "animate__backOutUp animate__delay-5s";
		},
	},
	actions: {
	}
})

export default store
