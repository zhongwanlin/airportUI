const config = (function (config) {
	config.imgPath = "http://47.106.235.8:8888/";
	config.assets = "http://47.106.235.8:8888/assets/";
	// 测试环境
	if (process.env.NODE_ENV === 'development') {
		config.hostName = "http://47.106.235.8:8888";
		console.log("development");
	} else if (process.env.NODE_ENV === 'production') {
		config.hostName = "http://47.106.235.8:8888";
		console.log("production");
	}

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
	};

	config.status = {
		"_0": "未知",
		"_1":"本站起飞",
		"_2":"本站到达",
		"_3":"开始登机",
		"_4":"催促登机",
		"_5":"登机口关闭（结束登机）",
		"_6":"过站登机",
		"_7":"延误",
		"_8":"取消",
		"_9":"前方起飞",
		"_10":"备降",
		"_11":"返航",
		"_12":"值机开始",
		"_13":"值机截止"
	};

	// 航空公司
	config.airport = {
		"AAT": "阿勒泰",
		"ACX": "兴义",
		"ADL": "阿德雷德",
		"AEB": "百色",
		"AHJ": "阿坝",
		"AKL": "奥克兰",
		"AKU": "阿克苏",
		"ALA": "阿拉木图",
		"AMS": "阿姆斯特丹",
		"ANC": "安克雷奇",
		"AOG": "鞍山",
		"AQG": "安庆",
		"ARN": "斯德哥尔摩",
		"ASB": "阿什哈巴德",
		"ATH": "雅典",
		"AVA": "黄果树",
		"AXF": "阿拉善盟左旗",
		"BAR": "琼海",
		"BAV": "包头",
		"BCN": "巴塞罗纳",
		"BFJ": "毕节",
		"BHY": "北海",
		"BKI": "哥打基纳巴卢",
		"BKK": "曼谷",
		"BNE": "布里斯班",
		"BOM": "孟买",
		"BOS": "波士顿",
		"BPE": "秦皇岛",
		"BPL": "博乐",
		"BPX": "昌都",
		"BRU": "布鲁塞尔",
		"BSD": "保山",
		"BUD": "布达佩斯",
		"BWN": "文莱",
		"BZX": "巴中",
		"CAI": "开罗",
		"CAN": "广州",
		"CCU": "加尔格达",
		"CDE": "承德",
		"CDG": "巴黎",
		"CEB": "宿雾",
		"CEI": "清迈",
		"CGD": "常德",
		"CGK": "雅加达",
		"CGO": "郑州",
		"CGQ": "长春",
		"CHC": "克赖斯特彻奇",
		"CHG": "朝阳",
		"CIF": "赤峰",
		"CIH": "长治",
		"CJJ": "清州",
		"CJU": "济州",
		"CKG": "重庆",
		"CMB": "科伦坡",
		"CNS": "凯恩斯",
		"CNX": "清迈",
		"CPH": "哥本哈根",
		"CRK": "克拉克",
		"CSX": "长沙",
		"CTS": "扎幌",
		"CTU": "成都",
		"CWJ": "沧源",
		"CXR": "芽庄",
		"CZX": "常州",
		"DAC": "达卡",
		"DAD": "岘港",
		"DAT": "大同",
		"DAX": "达县",
		"DBC": "白城",
		"DCY": "稻城亚丁",
		"DDG": "丹东",
		"DEL": "新德里",
		"DFW": "达拉斯",
		"DIG": "中甸",
		"DLC": "大连",
		"DLU": "大理",
		"DMK": "曼谷",
		"DNH": "敦煌",
		"DOH": "多哈",
		"DOY": "东营",
		"DPS": "巴厘岛",
		"DQA": "大庆",
		"DRW": "达尔文",
		"DSN": "鄂尔多斯市",
		"DTU": "五大连池",
		"DUB": "都柏林",
		"DUS": "杜塞尔多夫",
		"DVO": "达沃",
		"DXB": "迪拜",
		"DYG": "张家界",
		"DYU": "杜尚别",
		"EDI": "爱丁堡",
		"EJN": "阿拉善盟额济纳旗",
		"ENH": "恩施",
		"ENY": "延安",
		"ERL": "二连浩特",
		"EWR": "纽约",
		"FCO": "罗马",
		"FNJ": "平壤",
		"FOC": "福州",
		"FRA": "法兰克福",
		"FRU": "比什凯克",
		"FSZ": "富士山静冈",
		"FUG": "阜阳",
		"FUK": "福冈",
		"FUO": "佛山",
		"FYJ": "抚远",
		"FYN": "富蕴",
		"GMP": "首尔",
		"GMQ": "格尔木",
		"GOQ": "格尔木",
		"GRU": "圣堡罗",
		"GVA": "日内瓦",
		"GXH": "夏河",
		"GYD": "巴库",
		"GYS": "广元",
		"GYU": "夏固原六盘山机场",
		"GZG": "甘孜",
		"HAK": "海口",
		"HAN": "河内",
		"HAV": "哈瓦那",
		"HBQ": "海北",
		"HCJ": "河池",
		"HDG": "邯郸",
		"HEK": "黑河",
		"HEL": "赫尔辛基",
		"HET": "呼和浩特",
		"HFE": "合肥",
		"HGH": "杭州",
		"HIA": "淮安",
		"HIJ": "广岛",
		"HJJ": "怀化",
		"HKG": "香港",
		"HKT": "普吉",
		"HLD": "海拉尔",
		"HLH": "乌兰浩特",
		"HMI": "哈密",
		"HNA": "盛冈",
		"HND": "东京",
		"HNL": "火奴鲁鲁",
		"HNY": "衡阳",
		"HPG": "神农架",
		"HPH": "",
		"HRB": "哈尔滨",
		"HSN": "舟山",
		"HTA": "赤塔",
		"HTN": "和田",
		"HTT": "花土沟",
		"HUN": "花莲",
		"HUO": "霍林郭勒",
		"HUZ": "惠州",
		"HXD": "德令哈",
		"HYN": "黄岩",
		"HZG": "汉中",
		"HZH": "黎平县　",
		"IAD": "华盛顿",
		"IAH": "休斯顿",
		"ICN": "首尔",
		"IKA": "德黑兰",
		"IKT": "伊尔库茨克",
		"INC": "银川",
		"IQM": "且末",
		"IQN": "庆阳",
		"ISB": "伊斯兰堡",
		"IST": "伊斯坦布尔",
		"JDZ": "景德镇",
		"JED": "吉达",
		"JFK": "纽约",
		"JGD": "加格达奇",
		"JGN": "嘉峪关",
		"JGS": "井冈山",
		"JHG": "西双版纳",
		"JIC": "晋城",
		"JIQ": "重庆黔江",
		"JJN": "晋江",
		"JMJ": "澜沧",
		"JMU": "佳木斯",
		"JNB": "约翰内斯堡",
		"JNG": "济宁",
		"JNZ": "锦州",
		"JSJ": "建三江",
		"JUH": "九华山",
		"JUZ": "衢州",
		"JXA": "鸡西",
		"KBV": "喀比",
		"KCA": "库车",
		"KGT": "康定",
		"KHG": "喀什",
		"KHH": "高雄",
		"KHI": "卡拉奇",
		"KHN": "南昌",
		"KIJ": "新潟",
		"KJH": "凯里",
		"KJI": "喀纳斯",
		"KLO": "卡利波",
		"KMG": "昆明",
		"KMQ": "小松",
		"KOJ": "鹿儿岛",
		"KOS": "西哈努克市",
		"KOW": "赣州",
		"KRL": "库尔勒",
		"KRY": "克拉玛依",
		"KTM": "加德满都",
		"KUL": "吉隆坡",
		"KWE": "贵阳",
		"KWL": "桂林",
		"LAS": "拉斯维加斯",
		"LAX": "洛杉矶",
		"LBD": "苦盏",
		"LCX": "联城",
		"LDS": "伊春",
		"LED": "圣彼得堡",
		"LFQ": "临汾",
		"LGK": "兰卡威",
		"LGW": "伦敦",
		"LHE": "拉合尔",
		"LHR": "伦敦",
		"LJG": "丽江",
		"LLB": "荔波",
		"LLV": "吕梁",
		"LNJ": "临沧",
		"LNL": "陇南",
		"LPF": "六盘水",
		"LPQ": "琅勃拉邦",
		"LUM": "芒市",
		"LXA": "拉萨",
		"LYA": "洛阳",
		"LYG": "连云港",
		"LYI": "临沂",
		"LZH": "柳州",
		"LZO": "泸州",
		"LZY": "林芝",
		"MAD": "马德里",
		"MAN": "曼彻斯特",
		"MDG": "牡丹江",
		"MDL": "安尼沙通",
		"MED": "麦迪纳",
		"MEL": "墨尔本",
		"MEX": "墨西哥城",
		"MFM": "澳门",
		"MIG": "绵阳",
		"MLE": "马累",
		"MNL": "马尼拉",
		"MSQ": "明斯克",
		"MUC": "慕尼黑",
		"MWX": "光州",
		"MXP": "米兰",
		"MXZ": "梅州",
		"MYJ": "松山",
		"NAO": "南充",
		"NAY": "北京",
		"NBO": "内罗毕",
		"NBS": "长白山",
		"NDG": "齐齐哈尔",
		"NGB": "宁波",
		"NGO": "名古屋",
		"NGQ": "阿里昆莎",
		"NGS": "长崎",
		"NKG": "南京",
		"NLH": "宁蒗",
		"NLT": "那拉提",
		"NNG": "南宁",
		"NNY": "南阳",
		"NTG": "南通",
		"NYT": "内比都",
		"NZH": "满洲里",
		"NZL": "扎兰屯",
		"OHE": "漠河",
		"OKA": "冲绳",
		"OKJ": "冈山",
		"ORD": "芝加哥",
		"OSA": "大阪",
		"OSL": "奥斯陆",
		"PEK": "北京",
		"PEN": "槟城",
		"PER": "珀斯",
		"PKX": "北京",
		"PNH": "金边",
		"PQC": "富国",
		"PRG": "布拉格",
		"PTY": "巴拿马 城",
		"PUS": "釜山",
		"PVG": "上海",
		"PZI": "攀枝花",
		"QSZ": "莎车",
		"REP": "暹粒",
		"RGN": "仰光",
		"RHT": "阿拉善盟右旗",
		"RIZ": "日照",
		"RKZ": "日喀则",
		"RLK": "巴彦淖尔",
		"RMQ": "台中",
		"RQA": "若羌",
		"RUH": "利雅德",
		"RUN": "圣丹尼斯（留尼汪）",
		"SDJ": "仙台",
		"SEA": "西雅图",
		"SFO": "旧金山",
		"SGN": "胡志明市",
		"SHA": "上海",
		"SHE": "沈阳",
		"SIA": "西安",
		"SIN": "新加坡",
		"SJC": "圣何塞",
		"SJW": "石家庄",
		"SPN": "赛班",
		"SQD": "上饶",
		"SQJ": "三明市",
		"SVO": "莫斯科",
		"SWA": "汕头",
		"SYD": "悉尼",
		"SYM": "思茅",
		"SYX": "三亚",
		"SZX": "深圳",
		"TAE": "大丘",
		"TAO": "青岛",
		"TAS": "塔什干",
		"TBS": "第比利斯",
		"TCG": "塔城",
		"TCZ": "腾冲",
		"TEN": "铜仁",
		"TGO": "通辽",
		"THQ": "甘肃天水",
		"TIJ": "蒂华那",
		"TLQ": "吐鲁番",
		"TLV": "特拉维夫",
		"TNA": "济南",
		"TNH": "通化",
		"TNR": "安塔那那利佛",
		"TOY": "富山",
		"TPE": "台北",
		"TSA": "台北",
		"TSE": "阿斯塔纳",
		"TSN": "天津",
		"TVS": "唐山",
		"TWC": "图木舒克",
		"TXL": "柏林",
		"TXN": "黄山",
		"TYN": "太原",
		"TYO": "东京",
		"UCB": "乌兰察布",
		"ULN": "乌兰巴托",
		"URC": "乌鲁木齐",
		"URT": "素叻他尼（万伦）",
		"USM": "苏梅岛",
		"UTP": "乌塔堡",
		"UYN": "榆林",
		"VDO": "广宁",
		"VIE": "维也纳",
		"VTE": "万象",
		"VVO": "海参崴",
		"WAW": "华沙",
		"WDS": "十堰",
		"WEH": "威海",
		"WGN": "邵阳武冈",
		"WMT": "遵义",
		"WNH": "文山",
		"WNZ": "温州",
		"WUA": "乌海",
		"WUH": "武汉",
		"WUS": "武夷山",
		"WUT": "五台山",
		"WUX": "无锡",
		"WUZ": "梧州",
		"WXN": "万县",
		"XAI": "郑州",
		"XFN": "襄樊",
		"XIC": "西昌",
		"XIL": "锡林浩特",
		"XMN": "厦门",
		"XNN": "西宁",
		"XUZ": "徐州",
		"XYI": "三沙",
		"YBP": "宜宾",
		"YCU": "运城",
		"YGJ": "米子",
		"YIC": "宜春",
		"YIE": "阿尔山",
		"YIH": "宜昌",
		"YIN": "伊宁",
		"YIW": "义乌",
		"YKH": "营口",
		"YNJ": "延吉",
		"YNT": "烟台",
		"YNZ": "盐城",
		"YSQ": "松原市",
		"YTY": "扬州",
		"YUL": "蒙特利尔",
		"YUS": "玉树巴塘",
		"YVR": "温哥华",
		"YYA": "岳阳",
		"YYC": "卡城",
		"YYZ": "多伦多",
		"YZY": "张掖",
		"ZAT": "昭通",
		"ZGC": "兰州",
		"ZHA": "湛江",
		"ZHY": "中卫(香山、沙坡头)",
		"ZQZ": "张家口",
		"ZRH": "苏黎士",
		"ZUH": "珠海",
		"ZYI": "遵义"
	};

	return config;
}(config || {}));

export default config;