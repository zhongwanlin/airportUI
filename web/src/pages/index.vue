<template>
    <view class="content">

        <!-- 头部组件 -->
        <Header />

        <!-- 语音 -->
        <Content />

        <!-- 航班信息 -->
        <FrightInfo />

        <!-- 冒泡提示 -->
        <Message />

        <!-- 底部 -->
        <!-- <Footer /> -->

        <!-- 应急预案组件 -->
        <Error />

        <!-- <div style="position: fixed; bottom: 0;z-index: 10000;font-size: 18px;color: #000;min-height: 100px;width: 100%; max-height: 600px; overflow-y: auto;" @click="isLog=!isLog">
            <template v-if="isLog"> -->
                <!-- <p>voiceTxtInfo:{{voiceTxtInfo}}</p>
                <p>voiceTxtShow:{{voiceTxtShow}}</p>
                <p>flgVoiceList:{{flgVoiceList.length}}</p>
                <p>res:{{res}}</p>
                <p>timeNum:{{timeNum}}</p> -->
                <!-- <p>actions:{{source}}</p> -->
            <!-- </template>
        </div> -->

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
// import Footer from "@/components/footer.vue";
import Message from "@/components/message.vue";
export default {
    components: {
        Error,
        Header,
        Content,
        FrightInfo,
        // Footer,
        Message
    },
    data() {
        return {
            userInfo: null,
            locale: "",
            voiceTxtShow: "",
            saidText: "",
            res: "",
            timeNum: 0,
            source: "",
            voiceTxtInfo: [],
            flgVoiceList: [],
            isLog: false,
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState([
            "isFright",
            "flightList",
            "frightInfo",
            "sessionId",
            "suggestAnswer",
            "isRestart",
            "totalCount",
            "pressPage",
            "detailInfo",
            "currentIndex",
            "isNoInput",
        ])
    },
    watch: {
        isNoInput(value) {
            let self = this;
            if (value == true) {
                // self.flightSearch("silent");
            }
        },
        isRestart(value) {
            let self = this;
            if (value == true) {
                self.flightSearch("restart");
            }
        },
        pressPage(value) {
            let self = this;
            if (value.length > 0) {
                self.flightSearch(value);
            }
        }
    },
    methods: {
        ...mapMutations([
            "setIsFright",
            "setFlightList",
            "setFrightInfo",
            "setIsLoading",
            "setSuggestAnswer",
            "editSuggestAnswer",
            "clearSuggestAnswer",
            "setCurrentIndex",
            "setTotalCount",
            "setPressPage",
            "setDetailInfo",
            "setIndexSuggestAnswer",
            "setIsNoInput",
        ]),

        // 将钟文数字转换成阿拉伯数字
        resetNumber() {
            return function (text) {
                let self = this;
                let str = text;
                let number = [/零/g, /一/g, /二/g, /三/g, /四/g, /五/g, /六/g, /七/g, /八/g, /九/g, /十/g];

                number.forEach((item, index) => {
                    str = str.replace(item, index);
                });
                return str;
            }
        },

        // setFlightSearch
        setFlightSearch() {
            var self = this;
            return function () {
                self.flightSearch();
            };
        },

        // 获取航班
        flightSearch(restart) {
            var self = this;
            self.setIsLoading(false);
            uni.request({
                header: {
                    gomstoken: "866822030391163", //(window.appInfo["_1"]["imei"] || "866822030391163")
                },
                url: self.$config.action.terminalVoice,
                method: "POST",
                data: {
                    "content": restart || (self.voiceTxtShow.split("time")[0]).replace(/@"\p{P}|\s"/g, "") || "",
                    "sessionId": self.sessionId,
                    "flag": (typeof restart != 'undefined' && restart == "错误_count") ? 3 : self.isFright ? 2 : 0
                },
                success(res, statusCode, header) {
                    if (res.data.code == "200") {
                        let list = [];
                        let actions = [];
                        let voiceInfo = "";
                        let suggestAnswer = "";
                        let timeInfo = self.$utility.getCurrentTimeInfo();

                        self.setTotalCount(!!res.data.data.context ? res.data.data.context.totalCount : 0);
                        self.setPressPage("");

                        if (typeof restart != 'undefined') {
                            voiceInfo = res.data.data.suggestAnswer;
                            suggestAnswer = res.data.data.suggestAnswer;
                            clearInterval(window.appInfo["_2"]["intervalTime"]);
                            window.appInfo["_2"]["stopVoice"]();
                            window.appInfo["_2"]["txtToVoice"](voiceInfo);

                            if (restart == "restart") {
                                self.clearSuggestAnswer();
                            }
                            if (restart == "silent") {
                                self.setIsNoInput(false);
                            }
                        }

                        if (!!res.data.data.source) {
                            if(res.data.data.source.toLocaleLowerCase() == "clarify") {
                                voiceInfo = res.data.data.clarifyQuestions.voice.content;
                                suggestAnswer = voiceInfo;
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_2"]["txtToVoice"](voiceInfo);
                            } else {
                                voiceInfo = res.data.data.suggestAnswer;
                                suggestAnswer = res.data.data.suggestAnswer;
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_2"]["txtToVoice"](res.data.data.suggestAnswer);
                            }
                        }

                        // 1：列表展示后，需要播报suggestAnswer，同时需要监听收收音
                        // 2：列表展示后，后面的交互中，如果返回的actions='Normal'，需要把列表关闭，同时播报suggestAnswer，这个不用发送restart指令
                        // 3：列表展示后，后面的交互中，如果返回的actions='ShowDetail',需要读取context.count值，用于展示列表的第几个航班，获取该行航班详情信息，如果context.count的值大于列表航班数，发送一个指令error count

                        if (!!res.data.data.actions && res.data.data.actions.length > 0) {
                            res.data.data.actions.forEach((item) => {
                                actions.push(item.toLocaleLowerCase());
                            });
                        }

                        if (actions.length > 0) {
                            let rst = !!res.data.data.context ? res.data.data.context.rst : null;

                            voiceInfo = res.data.data.suggestAnswer;
                            suggestAnswer = res.data.data.suggestAnswer;

                            if (actions.indexOf("normal") != -1) {
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_2"]["txtToVoice"](voiceInfo);
                                if(actions.length == 0) {
                                    self.setIsFright(false);
                                    self.setDetailInfo(suggestAnswer);
                                    self.setSuggestAnswer({
                                        type: 2,
                                        suggestAnswer: suggestAnswer
                                    });
                                    return;
                                }
                            }
                            if (actions.indexOf("showdetial") != -1) {
                                if (self.flightList.length > 0) {
                                    if (!!res.data.data.context && parseInt(res.data.data.context.count, 10) > self.flightList.length) {
                                        self.flightSearch("错误_count");
                                    } else {
                                        self.getFrightInfo(self.flightList[parseInt(res.data.data.context.count, 10) - 1], parseInt(res.data.data.context.count, 10) - 1);
                                    }
                                }
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_2"]["txtToVoice"](voiceInfo);
                                self.setDetailInfo(suggestAnswer);
                                self.setSuggestAnswer({
                                    type: 2,
                                    suggestAnswer: suggestAnswer
                                });
                                return;
                            }
                            if (actions.indexOf("exit") != -1) {
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_0"]["isExit"] = true;
                                window.appInfo["_2"]["txtToVoice"](voiceInfo);
                                self.setSuggestAnswer({
                                    type: 2,
                                    suggestAnswer: suggestAnswer
                                });
                                return;
                            }

                            if (actions.indexOf("hidemute") != -1) {
                                return;
                            }

                            if (actions.indexOf("listbyfltno") != -1) {
                                if (!!rst && !!rst.ARR) {
                                    rst.ARR.dataList.forEach((item) => {
                                        let info = item;
                                        info["destActTimeInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                                        info["destSdtInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                                        info["startSdtInfo"] = self.$utility.timeDiff(timeInfo.year + '/' + timeInfo.month + '/' + timeInfo.date + ' ' + info.startSdt);
                                        list.push(info);
                                    });
                                }
                                if (!!rst && !!rst.DEP) {
                                    rst.DEP.dataList.forEach((item) => {
                                        let info = item;
                                        info["destActTimeInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                                        info["destSdtInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                                        info["startSdtInfo"] = self.$utility.timeDiff(timeInfo.year + '/' + timeInfo.month + '/' + timeInfo.date + ' ' + info.startSdt);
                                        list.push(info);
                                    });
                                }
                            }

                            if (actions.indexOf("listbyplacecond") != -1) {
                                if (!!rst && !!rst.pageList) {
                                    rst.pageList.forEach((item) => {
                                        let info = item;
                                        info["destActTimeInfo"] = self.$utility.timeDiff(info.destActTime);
                                        info["destSdtInfo"] = self.$utility.timeDiff(info.destSdt);
                                        info["startSdtInfo"] = self.$utility.timeDiff(timeInfo.year + '/' + timeInfo.month + '/' + timeInfo.date + ' ' + info.startSdt);
                                        list.push(info);
                                    });
                                }
                            }

                            if (list.length >= 1) {
                                self.clearSuggestAnswer();
                                self.getFrightInfo(list[0], 0);
                                if (list.length > 1) {
                                    self.setFlightList(list);
                                } else {
                                    self.setFlightList([]);
                                }
                                clearInterval(window.appInfo["_2"]["intervalTime"]);
                                window.appInfo["_2"]["stopVoice"]();
                                window.appInfo["_2"]["txtToVoice"](voiceInfo);
                            } else {
                                self.setIsFright(false);
                            }
                            
                        } else {
                            voiceInfo = res.data.data.suggestAnswer;
                            suggestAnswer = res.data.data.suggestAnswer;
                            clearInterval(window.appInfo["_2"]["intervalTime"]);
                            window.appInfo["_2"]["stopVoice"]();
                            window.appInfo["_2"]["txtToVoice"](res.data.data.suggestAnswer);
                        }

                        self.setDetailInfo(suggestAnswer);
                        clearInterval(window.appInfo["_2"]["intervalTime"]);
                        self.setSuggestAnswer({
                            type: 2,
                            suggestAnswer: suggestAnswer //"为您查询到以下结果："
                        });
                    }
                },
                fail(error) {
                    console.log(error);
                    window.appInfo["_2"]["userVoice"]();
                }
            });

        },

        // 获取航班详情
        getFrightInfo(item, i) {
            var self = this;

            uni.request({
                header: {
                    gomstoken: "866822030391163", //(window.appInfo["_1"]["imei"] || "866822030391163")
                },
                url: self.$config.action.flightDetail,
                method: "POST",
                data: {
                    "fltId": item.fltId,
                    "arrdep": item.arrdep
                },
                success(res, statusCode, header) {
                    if (res.data.code == "0") {
                        let timeInfo = self.$utility.getCurrentTimeInfo();
                        let info = res.data.rst;
                        info["destActTimeInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                        info["destSdtInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.destSdt);
                        info["startSdtInfo"] = self.$utility.timeDiff(timeInfo.year + "-" + info.startSdt);
                        self.setFrightInfo(info);
                        self.setIsLoading(true);
                        self.setCurrentIndex(i);
                        if(self.isFright == false) {
                           self.setIsFright(true); 
                        }
                    }
                    // window.appInfo["_2"]["userVoice"]();
                },
                fail(error) {
                    console.log(error);
                    window.appInfo["_2"]["userVoice"]();
                }
            });

        },

        // 获取设备信息
        getTerminalInfo() {
            var self = this;
            if (!window.jsBridge) {
                return;
            }
            window.jsBridge.hxpApi(
                1,
                JSON.stringify({}),
                function (res) {
                    window.appInfo["_1"] = JSON.parse(res);
                }.toString()
            );
        },

        // 调用摄像头
        userCamera(self) {
            if (!window.jsBridge) {
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
                    if (window.appInfo["_1"]["base64"].length > 0) {

                    } else {

                    }
                }).toString());
        },

        // 退出
        backActionNav() {
            return function() {
                if (!window.jsBridge) {
                    return;
                }
                window.jsBridge.hxpApi(
                    13,
                    JSON.stringify({}),
                    function (res) {
                        alert('按下物理返回键');
                    }.toString()
                );
            };
        },

        // 隐藏人脸识别窗口
        hiddenCamera() {
            if (!window.jsBridge) {
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
        sweepTicket() {
            if (!window.jsBridge) {
                return;
            }
            window.jsBridge.hxpApi(
                3,
                JSON.stringify({}),
                function (res) {

                }.toString()
            );
        },

        // 扫身份证
        scanIDCard() {
            if (!window.jsBridge) { 
                return;
            }
            window.jsBridge.hxpApi(
                4,
                JSON.stringify({}),
                function (res) {
                    alert("扫身份证：" + res);
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
            return function () {
                var xmlHttp = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("image", window.appInfo["_2"]["imgBase64Strs"]);

                xmlHttp.onreadystatechange = function () {
                    if (self.isScaning) {
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
                                code: demoMatch[Math.floor(Math.random() * demoMatch.length)] || "CZ3337",
                                name: faceInfo.name
                            };
                            if (!!localeSession) {
                                if (localeSession.name != faceInfo.name) {

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
            return function () {
                if (!!window.jsBridge) {
                    self.setIsLoading(true);
                    //  "receiveMode": "Final"
                    // {"receiveMode":"Partial"} or {"receiveMode":"Final"}
                    window.jsBridge.hxpApi(
                        5,
                        JSON.stringify({"receiveMode": "Final"}),
                        function (res) {
                            var voiceStr = JSON.parse(res)["voiceStr"];
                            let voiceTxt = window.appInfo["_0"]["resetNumber"](voiceStr);

                            window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceTxt);
                            window.appInfo["_2"]["setSuggestAnswerInfo"]({
                                type: 1,
                                suggestAnswer: voiceTxt.slice(0, voiceTxt.length - 1)
                            });

                            window.appInfo["_0"]["setFlightSearch"]();

                        }.toString()
                    );
                }
            };
        },

        // 暂停语音
        stopVoice() {
            let self = this;
            return function (callback) {
                clearInterval(window.appInfo["_2"]["intervalTime"]);
                if (!!window.jsBridge) {
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

            return function (txt, type) {
                if (!!window.jsBridge) {
                    window.jsBridge.hxpApi(
                        11,
                        JSON.stringify({
                            "ctx": txt,
                            speed: 5
                        }),
                        function (res) {

                            setTimeout(() => {
                                window.appInfo["_2"]["userVoice"]();
                            }, 150);

                            clearInterval(window.appInfo["_2"]["intervalTime"]);
                            window.appInfo["_2"]["intervalTime"] = setInterval(() => {
                                window.appInfo["_2"]["userVoice"]();
                            }, 5000);

                            if(window.appInfo["_0"]["isExit"] == true) {
                                window.appInfo["_0"]["backActionNav"]();
                                window.appInfo["_0"]["isExit"] = false;
                            }

                            let list = window.appInfo["_2"]["getSuggestAnswerInfo"]();
                            if (!!list && list.length > 0) {
                                list.forEach((item, index) => {
                                    window.appInfo["_2"]["editSuggestAnswerInfo"](index);
                                });
                            }

                        }.toString()
                    );

                }
            };
        },

        // 设置显示在页面上的数据
        setShowVoiceTxtInfo() {
            let self = this;
            let uni = uni;
            return function (txt) {
                self.voiceTxtShow = txt;
            }
        },

        // 设置回复信息
        setSuggestAnswerInfo() {
            let self = this;
            return function (info) {
                self.setSuggestAnswer(info);
            }
        },

        // 设置回复信息
        editSuggestAnswerInfo() {
            let self = this;
            return function (index) {
                self.editSuggestAnswer(index);
            }
        },

        // 获取回复信息
        getSuggestAnswerInfo() {
            let self = this;
            return function () {
                return self.suggestAnswer;
            };
        },

        setSuggestAnswerByIndex() {
            let self = this;
            return function (index, suggestAnswer) {
                self.setIndexSuggestAnswer(index, suggestAnswer);
            };
        },

        // 设置录音列表数据
        setVoiceTxtList() {
            let self = this;
            return function (txt, bool) {
                if (bool == true) {
                    self.voiceTxtInfo.push(txt);
                } else {
                    self.voiceTxtInfo = [];
                }
                self.saidText = txt;
                return self.voiceTxtInfo;
            }
        },

        // 
        setFlgVoiceList() {
            let self = this;
            return function (txt) {
                self.flgVoiceList.push(txt);
            };
        },

        init() {
            let self = this;
            return function () {
                self.userCamera(self); // 使用摄像头
                self.$utility.setSessionStorage("faceInfo", null);
            };
        },

    },
    created() {
        let self = this;
        let userTimeOut = null;

        window.appInfo["_0"]["init"] = self.init();
        window.appInfo["_0"]["resetNumber"] = self.resetNumber();
        window.appInfo["_0"]["setFlightSearch"] = self.setFlightSearch();
        window.appInfo["_0"]["backActionNav"] = self.backActionNav();
        window.appInfo["_0"]["isExit"] = false;

        window.appInfo["_2"]["userVoice"] = self.userVoice(); // 使用语音模块
        window.appInfo["_2"]["stopVoice"] = self.stopVoice(); // 停止语音模块
        window.appInfo["_2"]["setShowVoiceTxtInfo"] = self.setShowVoiceTxtInfo(); // 拼接语音内容
        window.appInfo["_2"]["txtToVoice"] = self.txtToVoice(); // 文字转语音
        window.appInfo["_2"]["setVoiceTxtList"] = self.setVoiceTxtList(); // 文字内容

        window.appInfo["_2"]["setSuggestAnswerInfo"] = self.setSuggestAnswerInfo(); // 
        window.appInfo["_2"]["editSuggestAnswerInfo"] = self.editSuggestAnswerInfo(); // 
        window.appInfo["_2"]["getSuggestAnswerInfo"] = self.getSuggestAnswerInfo(); // 
        window.appInfo["_2"]["setSuggestAnswerByIndex"] = self.setSuggestAnswerByIndex(); // 

        window.appInfo["_2"]["setFlgVoiceList"] = self.setFlgVoiceList(); // 

        window.appInfo["_2"]["intervalTime"] = null;
        window.appInfo["_2"]["overVoiceList"] = null;
        window.appInfo["_2"]["overVoiceSubList"] = null;
        window.appInfo["_2"]["overVoiceSearch"] = null;
        window.appInfo["_2"]["userVoiceList"] = [];

        self.setIsLoading(true);
        // self.getTerminalInfo();
        self.flightSearch();
        // self.flightSearch("33333");

        if (!!window.jsBridge) {
            // 获取设备信息
            // self.getTerminalInfo();

            // self.flightSearch();

            // self.setSuggestAnswer({
            //     type: 2,
            //     suggestAnswer: "嗨，我是机场语音小助手"
            // });

            // // 文字转语音
            // window.appInfo["_2"]["txtToVoice"]("嗨，我是机场语音小助手");

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
