<template>
    <div id="index">
        


        <!-- 紧急预案处理 -->
        <template v-if="isOnline">
            <div class="onlineWrap">
                <template v-if="errorImgList.length>0">
                    <Carousel loop autoplay :height="height">
                        <template v-for="(item, index) in errorImgList">
                            <CarouselItem :key="index">
                                <div :style="{height: height+'px'}">
                                    <img :src="item"/>
                                </div>
                            </CarouselItem>
                        </template>
                    </Carousel>
                </template>
                <template v-else>
                    <img :src="errorImg"/>
                </template>
            </div>
        </template>

    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from "vuex";
import error from "../common/error";
export default {
    name: "index",
    components: {
    },
    data: () => ({
        height: window.innerHeight,
        isDetail: false,
        isDefault: true,
        isFace: true,
        isShowMenu: true,
        currentMenu: 1,
        navTitle: "",
        locale: "",
        isOnline: false,
        errorImg: error.errorImg,
        errorImgList: [],
        emergencyList: [],
        searchData: [],
        timeNum: 0,
        timeInterval: null,
    }),
    computed: {
        ...mapState([])
    },
    methods: {
        ...mapMutations([]),
        
        // 调用各个模块，例如摄像头等记录
        getEmergencyList(bool){
            var self = this;
            self.axios({
                method: 'get',
                headers: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.emergencyList,
                params: {
                    "pageNum": 1,
                    "pageSize": 1000,
                    "name": "",
                    "dep_status": "",
                }
            })
            .then(function (res) {
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

                console.log(self.errorImgList);
            })
            .catch(function (error) {
                console.log(error);
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
                    window.appInfo["_2"]["base64"] = res.replace('{"imgBase64Strs":["', '').replace('"]}', '').replace(/\s+/g, "");
                    window.appInfo["_2"]["imgBase64Strs"] = "data:image/jpeg;base64," + window.appInfo["_2"]["base64"];
                    if(window.appInfo["_2"]["base64"].length > 0) {
                        window.appInfo["_0"]["searchByFace"]();
                    } else {
                        self.setFaceInfo(false);
                        self.setIsFace(true);
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
                    window.appInfo["_0"]["setDetailInfo"](3, res);
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
                    var demoMatch = window.mock.demoMatch;
                    var info = {
                        code: demoMatch[Math.floor(Math.random()*demoMatch.length)] || "CZ3337",
                        name: JSON.parse(res.replace(/\s+/g, "").slice(1, res.length-1))["name"]
                    };
                    window.appInfo["_0"]["setDetailInfo"](4, JSON.stringify(info));
                }.toString()
            );
        },

        // 机票结果
        getDetal(){
            let self = this;
            return function (scanInfo) {
                let mockData = window.mock.demoInfo;
                for (let key in mockData) {
                    if (mockData.hasOwnProperty(key)) {
                        if (JSON.stringify(scanInfo).indexOf(key) >= 0) {
                            if(!!scanInfo["name"]) {
                                mockData[key]["name"] = scanInfo["name"];
                            }
                            self.setFaceInfoDetail(null);
                            self.setFaceInfo(true);
                            self.setIsScaning(true);
                            self.setIsSwitchScan(false);
                            self.setFaceInfoDetail(mockData[key]);
                            self.setSpreed(true);
                            self.$router.push({
                                name: "detail"
                            });

                            break;
                        }
                    }
                }
                // 机票
                self.sweepTicket();

                // 扫身份证
                self.scanIDCard();
            }
        },

        // 设置扫码结果
        setDetailInfo() {
            let self = this;
            return function(type, scanString) {
                let mockData = window.mock.demoInfo;
                let scanInfo = JSON.parse(scanString.replace(/\s+/g, ""));
                window.appInfo["_0"]["getDetal"](scanInfo);
            };
        },
        
        // 通过人脸获取航班信息
        searchByFace() {
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
                                    window.appInfo["_0"]["getDetal"](info);
                                }
                            } else {
                                window.appInfo["_0"]["getDetal"](info);
                            }
                           self.$utility.setSessionStorage("faceInfo", faceInfo);
                        } else {
                            self.setFaceInfo(false);
                            self.setIsFace(true);
                            self.setIsSwitchScan(false);
                        }
                    }
                }
                xmlHttp.open("POST", self.$config.action.faceSearch, true);
                xmlHttp.setRequestHeader("gomstoken", self.$utility.getLocalStorage('gomstoken'));
                xmlHttp.send(formData);
            };
        },

        init(){
            let self = this;
            return function() {
                self.setFaceInfoDetail(null);
                self.setFaceInfo(false);
                self.setIsScaning(false);
                self.userCamera(self);
                self.$utility.setSessionStorage("faceInfo", null);
                if(!!window.appInfo["_0"] && !!window.appInfo["_0"]["stopVoice"]) {
                    window.appInfo["_0"]["stopVoice"]();
                }
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

        self.$Message.config({
            top: 350,
            duration: 10
        });

        window.appInfo["_0"]["searchByFace"] = self.searchByFace();
        window.appInfo["_0"]["getDetal"] = self.getDetal();
        window.appInfo["_0"]["setDetailInfo"] = self.setDetailInfo();
        window.appInfo["_0"]["init"] = self.init();

        // window.utility.setLocalStorage("gomstoken", "866822030391163");

        if (!!window.jsBridge) {
           // 获取设备信息
            self.getTerminalInfo();

            // 人脸识别
            self.userCamera(self);

            // 扫机票
            self.sweepTicket();
            
            // 扫身份证
            self.scanIDCard();
        }

        // 预案处理
        self.getEmergencyList();
        setInterval(()=>{
            self.onLine();
        }, 5000);
    }
};
</script>

<style lang="less">
@import "~@/common/animate.min.css";
@import "~@/common/unit.less";
.onlineWrap {
    position: fixed;
    z-index: 10000000000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
