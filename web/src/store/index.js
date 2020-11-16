import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isFright: false,
		isLoading: false,
		frightInfo: {
			"plan_end_time": "",//	int	计划结束登机时间
			"plan_gate_name": "",//	string	计划登机口
			"plan_open_time":  "",//	int	计划开始登机时间
			"plan_take_off":  "",//	int	计划起飞时间
			"real_end_time": "",//	int	实际结束登机时间
			"real_gate_name": "",//	string	实际登机口
			"real_open_time": "",//	int	实际开始登机时间
			"real_take_off": "",//	int	实际起飞时间
			"route_cn_list": ["",""],//	string list	中文航线，城市用-连接
			"route_en_list": ["",""],//	string list	英文航线，城市用-连接
			"route_code_list": ["",""],//	string list	机场三字码，用-连接
			"status": 0,//	int	0: 未知；1：本站起飞；2：本站到达；3：开始登机；4：催促登机；5：登机口关闭（结束登机）；6：过站登机 7：延误；8：取消，9：前方起飞， 10：备降， 11：返航 ， 12：值机开始 ， 13： 值机截止
			"exit_gate": "",//	string	航班出口
			"plan_landing_time": "",//	int	计划降落时间
			"alter_landing_time": "",//	int	修改降落时间
			"real_landing_time": "",//	int	实际降落时间
			"terminal": "",//	string	航站楼
			"flight_no": "",//	string	航站楼
		},
		flightList: [],
		passenger: "国内出发",
	},
	mutations: {
		setIsFright(state, isFright){
			state.isFright = isFright;
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
	},
	actions: {
	}
})

export default store
