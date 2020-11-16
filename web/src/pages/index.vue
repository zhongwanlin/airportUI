<template>
    <view class="content">

        <!-- 头部组件 -->
        <Header/>

        <!-- 语音 -->
        <Content/>

        <!-- 航班信息 -->
        <FrightInfo/>

        <!-- 底部 -->
        <Footer/>
        
        <!-- 应急预案组件 -->
        <Error/>
		
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import Error from "@/components/error.vue";
import Header from "@/components/header.vue";
import Content from "@/components/content.vue";
import FrightInfo from "@/components/frightInfo.vue";
import Footer from "@/components/footer.vue";
export default {
    components: {
        Error,
        Header,
        Content,
        FrightInfo,
        Footer
    },
    data() {
        return {
			userInfo: null,
			locale: "",
			voiceTxtShow: "",
            voiceTxtInfo: [],
            isLog: false,
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState(["isFright", "flightList", "frightInfo"])
    },
    watch: {
		voiceTxtShow(value){
            let self = this;
            if(value.length > 0) {
                uni.hideLoading();
                self.flightSearch();
            }
        },
        isFright(value){
            let self = this;
            if(value == false) {
                clearInterval(window.appInfo["_2"]["intervalTime"]);
                window.appInfo["_2"]["txtToVoice"]("请说出您要找的航班");
            }
        }
    },
    methods: {
        ...mapMutations(["setIsFright", "setFlightList", "setFrightInfo", "setIsLoading"]),

        // 获取航班
        flightSearch(){
            var self = this;

            self.setIsLoading(false);
            uni.showLoading({
                title: '获取航班信息...'
            });

            uni.request({
			    header: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.terminalVoice,
			    method: "POST",
			    data: {
					"content": (self.voiceTxtShow.split("time")[0]).replace(/@"\p{P}|\s"/g,"")||""
			    },
			    success(res, statusCode, header) {
                    let list = [];
                    uni.hideLoading();
                    uni.hideToast();
                    if(res.data.code == 0) {
                        if(res.data.data.data.length > 0) {
                            res.data.data.data.forEach((item)=>{
                                let plan_open_time = self.$utility.getCurrentTimeInfo(item.plan_open_time);
                                let plan_end_time = self.$utility.getCurrentTimeInfo(item.plan_end_time);
                                let real_open_time = self.$utility.getCurrentTimeInfo(item.real_open_time);
                                let real_end_time = self.$utility.getCurrentTimeInfo(item.real_end_time);
                                
                                let plan_take_off = self.$utility.getCurrentTimeInfo(item.plan_take_off);
                                let real_take_off = self.$utility.getCurrentTimeInfo(item.real_take_off);

                                let plan_landing_time = self.$utility.getCurrentTimeInfo(item.plan_landing_time);
                                let real_landing_time = self.$utility.getCurrentTimeInfo(item.real_landing_time);
                                let alter_landing_time = self.$utility.getCurrentTimeInfo(item.alter_landing_time);
                                
                                list.push({
                                    "plan_end_time": plan_end_time.hour+":"+plan_end_time.min,//	int	计划结束登机时间
                                    "plan_gate_name": item.plan_gate_name,//	string	计划登机口
                                    "plan_open_time":  plan_open_time.hour+":"+plan_open_time.min,//	int	计划开始登机时间
                                    "plan_take_off":  plan_take_off.hour+":"+plan_take_off.min,//	int	计划起飞时间
                                    "real_end_time": real_end_time.hour+":"+real_end_time.min,//	int	实际结束登机时间
                                    "real_gate_name": item.real_gate_name,//	string	实际登机口
                                    "real_open_time": real_open_time.year+"/"+real_open_time.month+"/"+real_open_time.date+" "+real_open_time.hour+":"+real_open_time.min+":"+real_open_time.second,//	int	实际开始登机时间
                                    "real_take_off": real_take_off.hour+":"+real_take_off.min,//	int	实际起飞时间
                                    "route_cn_list": item.route_cn_list,//	string list	中文航线，城市用-连接
                                    "route_en_list": item.route_en_list,//	string list	英文航线，城市用-连接
                                    "route_code_list": item.route_code_list,//	string list	机场三字码，用-连接
                                    "status": item.status,//	int	0: 未知；1：本站起飞；2：本站到达；3：开始登机；4：催促登机；5：登机口关闭（结束登机）；6：过站登机 7：延误；8：取消，9：前方起飞， 10：备降， 11：返航 ， 12：值机开始 ， 13： 值机截止
                                    "exit_gate": item.exit_gate,//	string	航班出口
                                    "plan_landing_time": plan_landing_time.hour+":"+plan_landing_time.min,//	int	计划降落时间
                                    "alter_landing_time": alter_landing_time.hour+":"+alter_landing_time.min,//	int	修改降落时间
                                    "real_landing_time": real_landing_time.hour+":"+real_landing_time.min,//	int	实际降落时间
                                    "terminal": item.terminal,//	string	航站楼
                                    "flight_no": item.flight_no,//	string	航站楼
                                });
                            });
                            self.setFlightList(list);
                            self.setFrightInfo(list[0]);
                            self.setIsFright(true);
                            clearInterval(window.appInfo["_2"]["intervalTime"]);
                        } 
                    } else {
                        clearInterval(window.appInfo["_2"]["intervalTime"]);
                        window.appInfo["_2"]["txtToVoice"](res.data.msg);
                    }
			    },
			    fail(error) {
			        console.log(error);
                    uni.hideLoading();
                    uni.hideToast();
                    window.appInfo["_2"]["userVoice"]();
			    }
            });

        },

        // 获取设备信息
        getTerminalInfo(){
            window.jsBridge.hxpApi(
                1,
                JSON.stringify({}),
                function (res) {
                    alert(res);
                    window.appInfo["_1"] = JSON.parse(res);
                    window.utility.setLocalStorage(
                        "gomstoken", (window.appInfo["_1"]["imei"] || "866822030391163")
                    );
                }.toString()
            );
        },

        // 调用摄像头
        userCamera(self){
            if(!window.jsBridge) {
                return;
            }
            window.jsBridge.hxpApi(
                2,
                JSON.stringify({
                    left: 0.017,
                    top: 0.23,
                    right: 0.327,
                    bottom: 0.63
                }), (function (res) {
                    window.appInfo["_1"]["base64"] = res.replace('{"imgBase64Strs":["', '').replace('"]}', '').replace(/\s+/g, "");
                    window.appInfo["_1"]["imgBase64Strs"] = "data:image/jpeg;base64," + window.appInfo["_1"]["base64"];
                    if(window.appInfo["_1"]["base64"].length > 0) {
                        
                    } else {

                    }
                }).toString());
        },

        // 隐藏人脸识别窗口
        hiddenCamera(){
            if(!window.jsBridge) {
                return;
            }
            window.jsBridge.hxpApi(
                7,
                JSON.stringify({}),
                function (res) {
                    
                }.toString()
            );
        },
        
        // 调用扫机票
        sweepTicket(){
            window.jsBridge.hxpApi(
                3,
                JSON.stringify({}),
                function (res) {

                }.toString()
            );
        },
        
        // 扫身份证
        scanIDCard(){
            window.jsBridge.hxpApi(
                4,
                JSON.stringify({}),
                function (res) {
                    alert("扫身份证："+res);
                    // var demoMatch = window.mock.demoMatch;
                    // var info = {
                    //     code: demoMatch[Math.floor(Math.random()*demoMatch.length)] || "CZ3337",
                    //     name: JSON.parse(res.replace(/\s+/g, "").slice(1, res.length-1))["name"]
                    // };
                    
                }.toString()
            );
        },
        
        // 通过人脸获取航班信息
        searchDetailByFace() {
            let self = this;
            return function() {
                var xmlHttp = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("image", window.appInfo["_2"]["imgBase64Strs"]);

                xmlHttp.onreadystatechange = function () {
                    if(self.isScaning) {
                        return;
                    }
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var data = xmlHttp.responseText;
                        var jsonData = JSON.parse(data);
                        
                        if (jsonData.code == 0) {
                            var faceInfo = jsonData.data;
                            var localeSession = self.$utility.getSessionStorage("faceInfo");
                            var demoMatch = window.mock.demoMatch;
                            var info = {
                                code: demoMatch[Math.floor(Math.random()*demoMatch.length)] || "CZ3337",
                                name: faceInfo.name
                            };
                            if(!!localeSession) {
                                if(localeSession.name != faceInfo.name) {

                                }
                            } else {

                            }
                           self.$utility.setSessionStorage("faceInfo", faceInfo);
                        } else {

                        }
                    }
                }
                xmlHttp.open("POST", self.$config.action.faceSearch, true);
                xmlHttp.setRequestHeader("gomstoken", self.$utility.getLocalStorage('gomstoken'));
                xmlHttp.send(formData);
            };
        },

        // 语音模组
        userVoice() {
            let self = this;
            return function(){
                if(!!window.jsBridge) {
                    self.setIsLoading(true);
                    window.jsBridge.hxpApi(
                        5,
                        JSON.stringify({}),
                        function (res) {
                            var voiceStr = JSON.parse(res)["voiceStr"];
                            window.uni.hideToast();
                            window.uni.showToast({
                                title: voiceStr,
                                icon: "none",
                                duration: 3000
                            });
                            setTimeout(function() {
                                window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceStr.replace(/@"\p{P}"/g,"")+'time'+Date.parse(new Date()));
                            }, 500);
                        }.toString()
                    );
                }
            };
        },

        // 暂停语音
        stopVoice() {
            let self = this;
            return function(){
                if(!!window.jsBridge) {
                    window.jsBridge.hxpApi(
                        10,
                        JSON.stringify({}),
                        function (res) {}.toString()
                    );
                }
            };
        },

        // 文字转语音
        txtToVoice() {
            let self = this;
    
            return function(txt) {
                if(!!window.jsBridge) {
                    let time = txt.length/4;
                    window.jsBridge.hxpApi(
                        11,
                        JSON.stringify(
                            {"ctx": txt, speed: 7}
                        ),
                        function (res) {
                            setTimeout(()=>{
                                window.appInfo["_2"]["userVoice"]();
                            }, 100);
                            clearInterval(window.appInfo["_2"]["intervalTime"]);
                            window.appInfo["_2"]["intervalTime"] = setInterval(()=>{
                                window.appInfo["_2"]["userVoice"]();
                            }, 8000);
                        }.toString()
                    );

                }
            };
        },

        // 设置显示在页面上的数据
        setShowVoiceTxtInfo(){
            let self = this;
            return function(txt) {
                self.voiceTxtShow = txt;
            }
        },

        init(){
            let self = this;
            return function() {
                self.userCamera(self); // 使用摄像头
                self.$utility.setSessionStorage("faceInfo", null);
            };
        },	

	},
	created() {
        let self = this;
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;

        window.appInfo["_0"]["init"] = self.init();
        window.appInfo["_2"]["userVoice"] = self.userVoice(); // 使用语音模块
        window.appInfo["_2"]["stopVoice"] = self.stopVoice(); // 停止语音模块
        window.appInfo["_2"]["setShowVoiceTxtInfo"] = self.setShowVoiceTxtInfo(); // 拼接语音内容
        window.appInfo["_2"]["txtToVoice"] = self.txtToVoice(); // 文字转语音
        window.appInfo["_2"]["intervalTime"] = null;
        window.appInfo["_2"]["overVoice1"] = null;
        window.appInfo["_2"]["overVoice2"] = null;
        window.appInfo["_2"]["overVoice3"] = null;
        window.appInfo["_2"]["userVoiceIntervl"] = null;

        // window.utility.setLocalStorage("gomstoken", "866822030391163");

        if (!!window.jsBridge) {
           // 获取设备信息
            // self.getTerminalInfo();
			
			// 文字转语音
			window.appInfo["_2"]["txtToVoice"]("请说出您要找的航班，比如HU708");
			
            // // 人脸识别
            // self.userCamera(self);

            // // 扫机票
            // self.sweepTicket();
            
            // // 扫身份证
            // self.scanIDCard();
        }

    },
	mounted() {
		let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";

</style>
