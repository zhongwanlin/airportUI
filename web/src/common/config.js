const config = (function (config) {
	// // 测试环境
	// config.pageUrl = "http://47.106.235.8:8889/"; // 测试
	// config.assets = "http://47.106.235.8:8888/assets/"; // 测试
	// if (process.env.NODE_ENV === 'development') {
	// 	config.hostName = "http://47.106.235.8:8888"; // 测试
	// 	console.log("development");
	// } else if (process.env.NODE_ENV === 'production') {
	// 	config.hostName = "http://47.106.235.8:8888"; // 测试
	// 	console.log("production");
	// }

	// 现网环境
	config.pageUrl = "http://10.40.19.180/ht/"; // 现网
	config.assets = "http://10.40.19.180/ht/assets/"; // 现网
	if (process.env.NODE_ENV === 'development') {
		config.hostName = "http://10.40.19.180/ht";// 现网
		console.log("development");
	} else if (process.env.NODE_ENV === 'production') {
		config.hostName = "http://10.40.19.180/ht"; // 现网
		console.log("production");
	}

	config.timeNum = 15;

	//接口动作
	config.action = {
		"getColumns": config.hostName + "/api/Airport_Service/column",
		"getArticle": config.hostName + "/api/Airport_Service/article",
		"getArticleList": config.hostName + "/api/Airport_Service/articleList",
		"getLogWrite": config.hostName + "/api/log/write",
		"comment": config.hostName + "/api/Comment", // web-反馈
		"faceSearch": config.hostName + "/api/Face/search", // web-人脸识别
		"map": config.hostName + "/api/Map", // web-获取导航图
		"asp": config.hostName + "/api/Asp", // 终端-语音识别
		"writeLog": config.hostName + "/api/log/write", // 终端-调用模块记录
		"flightSearch": config.hostName + "/api/flight/search", // 航班查询
		"emergencyList": config.hostName+"/sys/emergency/list", // 版本列表
		"terminalVoice": config.hostName+"/api/terminal/voice", // web-语音文字处理
		"flightDetail": config.hostName+"/api/terminal/flightDetail", // web-语音文字处理
		"baiduQuery": config.hostName+"/api/v2/core/query", //航班查询
	};

	return config;
}(config || {}));

export default config;