<template>
    <view class="content">

        <view class="header">
			<view class="box">
				<view class="nav">
					<image style="width: 60px;height: 60px;" src="../static/icon06.png"></image>
				</view>
				<view class="icon">
					<image style="width: 80px;height: 80px;" src="../static/icon05.png"></image>
				</view>
				<view class="label">
					<text>说“刷脸”享受专属服务</text>
				</view>
			</view>
		</view>

        <view class="mainWrap">
			<view class="title">
				<view class="label">嗨，我是小美，</view>
				<view class="label">您的语音小助手。</view>
			</view>
			<view class="info">我懂得可多了，号称百事通，快来问我吧！</view>
			
			<view class="bgWrap">
				<image style="width: 750px;height: 760px;" src="../static/bg.png"></image>
				<view class="voiceGif"><image class="imgGif" style="width: 300px;height: 200px;" src="../static/yuyin.gif"></image></view>
			</view>
			<div class="tagcloudWrap">
				<div class="tagcloud">
					<span>“有什么好吃的”</span>
					<span>“停车场收费”</span>
					<span>“医疗室在哪”</span>
					<span>“南航 7645”</span>
					<span>“买礼物”</span>
					<span>“预约大巴”</span>
					<span>“哪些东西不能带上飞机”</span>
					<span>“我的航班”</span>
				</div>
			</div>
		</view>

        <view class="footer">
            <view class="listWrap">
                <view class="list">
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image style="width: 80px;height: 80px;" src="../static/icon01.png"></image>
							</view>
							<view class="label">
								<text>航班查询</text>
							</view>
						</view>
                    </view>
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image style="width: 80px;height: 80px;" src="../static/icon02.png"></image>
							</view>
							<view class="label">
								<text>旅客指南</text>
							</view>
						</view>
                    </view>
                </view>
                <view class="list">
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image style="width: 80px;height: 80px;" src="../static/icon03.png"></image>
							</view>
							<view class="label">
								<text>交通信息</text>
							</view>
						</view>
                    </view>
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image style="width: 80px;height: 80px;" src="../static/icon04.png"></image>
							</view>
							<view class="label">
								<text>机场商业</text>
							</view>
						</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 紧急预案处理 -->
        <template v-if="isOnline">
            <view class="onlineWrap">
                <template v-if="errorImgList.length>0">
                    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :style="{height: systemInfo.screenHeight+'px'}">
                        <template v-for="(item, index) in errorImgList">
                            <swiper-item :key="index" :style="{height: systemInfo.screenHeight+'px'}">
                                <view :style="{height: systemInfo.screenHeight+'px'}">
                                    <img :src="item" :style="{height: systemInfo.screenHeight+'px'}"/>
                                </view>
                            </swiper-item>
                        </template>
                    </swiper>
                </template>
                <template v-else>
                    <img :src="errorImg"/>
                </template>
            </view>
        </template>
    </view>
</template>

<script>
import error from "../common/error";
import tagcloud from '../common/tagcloud.js';
export default {
    components: {

    },
    data() {
        return {
			userInfo: null,
			locale: "",
			isOnline: false,
			errorImg: error.errorImg,
			errorImgList: [],
			emergencyList: [],
			flightNo: "",
			flightList: [],
			voiceTxtShow: "",
            paramsInfo: {},
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    watch: {

    },
    onLoad() {
        let self = this;
		
		
    },
    onShow() {
        let self = this;
    },
    onReachBottom() {},
	onShareAppMessage(){},
	onShareTimeline(){},
    methods: {
        // 获取应急预案
        getEmergencyList(){
            var self = this;
            uni.request({
			    headers: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.emergencyList,
			    method: "GET",
			    data: {
					"pageNum": 1,
                    "pageSize": 1000,
                    "name": "",
                    "dep_status": "",
			    },
			    success(res, statusCode, header) {
					self.errorImgList = [];
                    for(var i = 0, len = res.data.list.length; i < len; i++) {
                        if(res.data.list[i]["status"] == 1) {
                            self.emergencyList = JSON.parse(res.data.list[i]["url"]);
                            break;
                        }
                    }
                    self.emergencyList.forEach(item => {
                        self.$utility.convertImgToBase64(item,(dataURL)=>{
                            self.errorImgList.push(dataURL);
                        });
                    });
			    },
			    fail(error) {
			        console.log(error);
			        uni.hideLoading();
			    }
            });
            
        },

        // 获取航班
        flightSearch(){
            var self = this;

            uni.request({
			    headers: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.flightSearch,
			    method: "GET",
			    data: {
					"flightNo": self.flightNo
			    },
			    success(res, statusCode, header) {
					self.errorImgList = res.data;
			    },
			    fail(error) {
			        console.log(error);
			        uni.hideLoading();
			    }
            });

        },

        // 获取设备信息
        getTerminalInfo(){
            window.jsBridge.hxpApi(
                1,
                JSON.stringify({}),
                function (res) {
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
                    // alert("扫身份证："+res);
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
                    window.jsBridge.hxpApi(
                        5,
                        JSON.stringify({}),
                        function (res) {
                            var bool = true;
                            var voiceStr = JSON.parse(res)["voiceStr"];
                            let voiceTxtInfo = "";
                            clearTimeout(window.appInfo["_2"]["intervalTime"]);
                            clearTimeout(window.appInfo["_2"]["overVoice2"]);
                            clearTimeout(window.appInfo["_2"]["overVoice3"]);
                            window.appInfo["_2"]["setShowVoiceTxtInfo"]("");
                            window.appInfo["_2"]["overVoice2"] = setTimeout(()=>{
                                window.appInfo["_2"]["setVoiceTxtInfo"]("", false);
                            }, 2000);
                            window.appInfo["_2"]["overVoice3"] = setTimeout(()=>{
                                voiceTxtInfo = window.appInfo["_2"]["setVoiceTxtInfo"](voiceStr, true);
                                window.appInfo["_2"]["setVoiceTxt"]("");
                                window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceStr);
                            }, 0);

                            if(voiceStr.length != 0) {
                                
                            }
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
                        function (res) {
                            alert(res);
                        }.toString()
                    );
                }
            };
        },

        // 文字转语音
        txtToVoice() {
            let self = this;
    
            return function(txt) {
                if(!!window.jsBridge && self.isShowDetail==false) {
                    window.jsBridge.hxpApi(
                        11,
                        JSON.stringify(
                            {"ctx": txt, speed: 7}
                        ),
                        function (res) {}.toString()
                    );

                    setTimeout(()=>{
                        window.appInfo["_2"]["stopVoice"]();
                    }, 1000);
                    
                    clearTimeout(window.appInfo["_2"]["userVoiceIntervl"]);
                    window.appInfo["_2"]["userVoiceIntervl"] = setTimeout(()=>{
                        window.appInfo["_2"]["userVoice"]();
                        window.appInfo["_2"]["writeLog"]();
                    }, txt.length/4*1000);

                    clearTimeout(window.appInfo["_2"]["overVoice1"]);
                    window.appInfo["_2"]["overVoice1"] = setTimeout(()=>{
                        window.appInfo["_2"]["setVoiceTxtInfo"]("", false);
                        window.appInfo["_2"]["setShowVoiceTxtInfo"]("");
                        window.appInfo["_2"]["setVoiceTxt"]("欢迎使用语音助手,请说出您要找的服务");
                    }, txt.length/4*1000+5000);
                    
                }
            };
        },

        // 显示返回的结果
        setVoiceTxt(){
            let self = this;
            return function(txt) {
                self.htmlTxt = txt;
            }
        },

        setVoiceTxtInfo(){
            let self = this;
            return function(txt, bool) {
                if(bool == true) {
                    self.voiceTxtInfo.push(txt); 
                } else {
                    self.voiceTxtInfo = [];
                }
                return self.voiceTxtInfo;
            }
        },

        // 设置显示在页面上的数据
        setShowVoiceTxtInfo(){
            let self = this;
            return function(txt) {
                self.voiceTxtShow = txt;
            }
        },

        // 把语音数据提交到服务器
        uploadVoice(){
            let self = this;
            return function(voiceInfo) {
                var xmlHttp = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("content", voiceInfo);
                window.appInfo["_2"]["setShowVoiceTxtInfo"]("");
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var data = xmlHttp.responseText;
                        var jsonData = JSON.parse(data);
                        if (jsonData.code == 0) {
                            if(window.appInfo["_2"]["tips"] != jsonData.data.reply_content) {
                                window.appInfo["_2"]["tips"] = jsonData.data.reply_content;
                                window.appInfo["_2"]["txtToVoice"](jsonData.data.reply_content);
                                window.appInfo["_2"]["voiceInfo"] = jsonData.data.reply_content;
                            }
                            window.appInfo["_2"]["setVoiceTxt"](jsonData.data.reply_content);
                            if(!!jsonData.data.action_data.jump_url) {
                                window.appInfo["_2"]["getArticle"]({id: parseInt(jsonData.data.action_data.jump_url)});
                            }
                        } else {
                            window.appInfo["_2"]["setVoiceTxtInfo"]("", false);
                            if(window.appInfo["_2"]["errorNum"] == 0) {
                                window.appInfo["_2"]["errorNum"]++;
                                window.appInfo["_2"]["txtToVoice"]("抱歉,暂时没有找到您想要的服务");
                            }
                        }
                    }
                }
                xmlHttp.open("POST", self.$config.action.asp, true);
                xmlHttp.setRequestHeader("gomstoken", window.utility.getLocalStorage('gomstoken'));
                xmlHttp.send(formData);
            };
        },

        init(){
            let self = this;
            return function() {
                self.userCamera(self); // 使用摄像头
                self.$utility.setSessionStorage("faceInfo", null);
            };
        },

        // 判断网络状态
        onLine(){
            let self = this;
            var img = new Image();
            // img.src = self.$config.hostName + "/assets/error.png?t" + Date.now();
            img.src = "http://air.cityeasyplay.com:8080/terminal/static/中国1.png?t" + Date.now();
            console.log(img.src);
            img.onload=function(){
                self.isOnline = false;       
            };
            img.onerror=function(){
                self.isOnline = true;     
            };
        }	

	},
	created() {
        let self = this;
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;

        window.appInfo["_0"]["init"] = self.init();

        // 语音模块
        window.appInfo["_2"]["userVoice"] = self.userVoice(); // 使用语音模块
        window.appInfo["_2"]["stopVoice"] = self.stopVoice(); // 停止语音模块
        window.appInfo["_2"]["setVoiceTxt"] = self.setVoiceTxt(); // 把语音转换成文字 
        window.appInfo["_2"]["setVoiceTxtInfo"] = self.setVoiceTxtInfo(); // 拼接语音内容
        window.appInfo["_2"]["txtToVoice"] = self.txtToVoice(); // 文字转语音
        window.appInfo["_2"]["uploadVoice"] = self.uploadVoice(); // 提交语音内容到后台
        window.appInfo["_2"]["intervalTime"] = null;
        window.appInfo["_2"]["overVoice1"] = null;
        window.appInfo["_2"]["overVoice2"] = null;
        window.appInfo["_2"]["overVoice3"] = null;
        window.appInfo["_2"]["userVoiceIntervl"] = null;

        // window.utility.setLocalStorage("gomstoken", "866822030391163");

        if (!!window.jsBridge) {
           // 获取设备信息
            self.getTerminalInfo();

            // 人脸识别
            // self.userCamera(self);

            // 扫机票
            // self.sweepTicket();
            
            // 扫身份证
            // self.scanIDCard();
        }

        // 获取航班
        self.flightSearch();

        // 预案处理
        self.getEmergencyList();
        setInterval(()=>{
            self.onLine();
        }, 5000);
    },
	mounted() {
		let self = this;
		setTimeout(()=>{
			let tagcloudFun = tagcloud({
				selector: ".tagcloud",//元素选择器
				fontsize: 32,//基本字体大小, 单位px
				radius: self.systemInfo.screenWidth/4,//滚动半径, 单位px
				mspeed: "slow",//滚动最大速度, 取值: slow, normal(默认), fast
				ispeed: "slow",//滚动初速度, 取值: slow, normal(默认), fast
				direction: 0,
				keep: true //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
			});
		}, 1500);
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
</style>
