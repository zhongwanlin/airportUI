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
        
        <div ref="logInfo" style="position: fixed; bottom: 0;z-index: 10;font-size: 12px;color: #000;min-height: 100px;width: 100%; padding-bottom: 20px; max-height: 600px; overflow-y: auto;" @click="isLog=!isLog">
            <template v-if="isLog">
                <div style="padding-bottom: 10px;">日志信息: <p v-html="logInfo.join('')"></p></div>
                <div>ErrorCode: {{errorCode.join(",")}}</div>
                <div>收音调用次数: {{timeNum3}} 次</div>
                <div>计数器：{{voiceingNum}}次 </div>
                <div>正在收音：{{isVoiceing}} </div>
            </template>
        </div>

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
            errorCode: [],
            timeNum0: 0,
            timeNum1: 0,
            timeNum2: 0,
            timeNum3: 0,
            source: "",
            voiceTxtInfo: [],
            flgVoiceList: [],
            logInfo: [],
            isLog: false,
            isVoiceDone: false,
            isVoiceing: false,
            voiceingNum: 0,
            voiceInterval: null,
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
        isFright(value) {
            // let self = this;
            // window.appInfo["_2"]["stopVoice"]();
            // clearInterval(window.appInfo["_2"]["intervalTime"]);
            // setTimeout(() => {
            //     window.appInfo["_2"]["userVoice"]();
            // }, 50);
        },
        // 如果语言播报完后
        isVoiceDone(value){
            let self = this;
            if(value == true) {
                clearInterval(window.appInfo["_2"]["intervalTime"]);
                window.appInfo["_2"]["userVoice"]();

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

                window.appInfo["_0"]["setTimeNum0"]();
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

        // 
        aiBLog(callback) {
            var self = this;
            uni.request({
                header: {
                    gomstoken: "866822030391163", //(window.appInfo["_1"]["imei"] || "866822030391163")
                },
                url: self.$config.action.aiBLog,
                method: "POST",
                success(res, statusCode, header) {
                    callback && callback();
                },
                fail(error) {
                    console.log(error);
                    callback && callback();
                }
            });

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
                    "content": restart || ((self.voiceTxtShow.split("time")[0]).replace(/@"\p{P}|\s"/g, "") || ""),
                    "sessionId": self.sessionId,
                    "flag": (typeof restart != 'undefined' && restart == "错误_count") ? 3 : 0
                    // self.isFright ? 2 :
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
                            window.appInfo["_2"]["txtToVoice"](voiceInfo||"");

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
                    } else if (res.data.code == "99") {
                        window.appInfo["_2"]["txtToVoice"](res.data.msg);
                    }
                },
                fail(error) {
                    console.log(error);
                    // clearInterval(window.appInfo["_2"]["intervalTime"]);
                    // window.appInfo["_2"]["stopVoice"]();
                    // window.appInfo["_2"]["userVoice"]();
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
                },
                fail(error) {
                    console.log(error);
                    // window.appInfo["_2"]["stopVoice"]();
                    // window.appInfo["_2"]["userVoice"]();
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
                clearInterval(window.appInfo["_2"]["intervalTime"]);
                window.appInfo["_2"]["stopVoice"]();
                // 销毁语音
                window.jsBridge.hxpApi(
                    12,
                    JSON.stringify({}),
                    function (res) {}.toString()
                );
                setTimeout(()=>{
                    // 退出
                    window.jsBridge.hxpApi(
                        13,
                        JSON.stringify({}),
                        function (res) {}.toString()
                    );
                }, 1500);
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

                if(self.isVoiceDone == false) {
                    return;
                }

                window.appInfo["_0"]["setTimeNum3"]();

                setTimeout(()=>{
                    if (!!window.jsBridge) {
                        self.setIsLoading(true);
                        window.jsBridge.hxpApi(
                            5,
                            JSON.stringify({"receiveMode": "Final"}),
                            function (res) {
                                var res = JSON.parse(res);

                                window.appInfo["_0"]["setErrorCode"](res.errorCode);

                                // var voiceStr = res["voiceStr"];
                                // let voiceTxt = window.appInfo["_0"]["resetNumber"](voiceStr);
                                // window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceTxt);
                                // window.appInfo["_2"]["setSuggestAnswerInfo"]({
                                //     type: 1,
                                //     suggestAnswer: voiceTxt.slice(0, voiceTxt.length - 1)
                                // });
                                // window.appInfo["_0"]["setFlightSearch"]();

                                if(typeof res.errorCode != "undefined") {
                                    if(res.errorCode == 0) {
                                        let voiceStr = res["voiceStr"];
                                        let voiceTxt = window.appInfo["_0"]["resetNumber"](voiceStr);
                                        window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceTxt);
                                        window.appInfo["_2"]["setVoiceTxtList"](voiceTxt);
                                        window.appInfo["_2"]["setSuggestAnswerInfo"]({
                                            type: 1,
                                            suggestAnswer: voiceTxt.slice(0, voiceTxt.length - 1)
                                        });
                                        window.appInfo["_0"]["setFlightSearch"]();
                                        window.appInfo["_0"]["setTimeNum1"]();
                                    }
                                } else {
                                    var voiceStr = res["voiceStr"];
                                    let voiceTxt = window.appInfo["_0"]["resetNumber"](voiceStr);
                                    window.appInfo["_2"]["setShowVoiceTxtInfo"](voiceTxt);
                                    window.appInfo["_2"]["setSuggestAnswerInfo"]({
                                        type: 1,
                                        suggestAnswer: voiceTxt.slice(0, voiceTxt.length - 1)
                                    });
                                    window.appInfo["_0"]["setFlightSearch"]();
                                    window.appInfo["_0"]["setTimeNum1"]();
                                }

                            }.toString()
                        );
                    }
                }, 0);
            };
        },

        // 暂停语音
        stopVoice() {
            let self = this;
            return function (callback) {
                self.voiceingNum = 0;
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
                clearInterval(window.appInfo["_2"]["intervalTime"]);
                window.appInfo["_2"]["stopVoice"]();
                window.appInfo["_0"]["setIsVoiceDone"](false);
                if (!!window.jsBridge) {
                    window.jsBridge.hxpApi(
                        11,
                        JSON.stringify({
                            "ctx": txt,
                            speed: 5
                        }),
                        function (res) {

                            window.appInfo["_0"]["setIsVoiceDone"](true);

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
            return function (txt) {
                self.voiceTxtInfo.push(txt);
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
                let currentTimeInfo = self.$utility.getCurrentTimeInfo(new Date());
                window.appInfo["_2"]["userVoice"]();
                self.saveLogInfo(currentTimeInfo.ymrhsm);
                window.appInfo['_0']['setLog'](currentTimeInfo.ymrhsm);
                setTimeout(()=>{
                    window.appInfo["_2"]["stopVoice"]();
                    self.setIsLoading(true);
                    self.flightSearch();
                }, 250);

            };
        },

        // log
        setLog(){
            let self = this;
            return function (logInfo) {
                self.logInfo.push(logInfo);
                self.$nextTick(() => {
                    self.$refs.logInfo.scrollTop = self.$refs.logInfo.scrollHeight;
                });

                // 如果有错误编码
                if(logInfo.indexOf("subErrorCode")!=-1) {
                    self.saveLogInfo(logInfo);
                    window.appInfo["_0"]["setIsVoiceing"](false);
                    // 长时间没对话
                    if(
                        logInfo.indexOf("subErrorCode:3101") != -1 ||
                        logInfo.indexOf("subErrorCode:8001")!=-1 ||
                        logInfo.indexOf("subErrorCode:3001")!=-1
                    ) {
                        self.voiceingNum++;
                    } else if( 
                        logInfo.indexOf("subErrorCode:1") != -1 ||
                        logInfo.indexOf("subErrorCode:2") != -1 ||
                        logInfo.indexOf("subErrorCode:3") != -1 ||
                        logInfo.indexOf("subErrorCode:4") != -1
                    ) {
                        self.voiceingNum = 0;
                    }
                }
                // 一轮对话生命周期
                // onAsrReady
                // onAsrBegin
                // 日志正在录音：640
                // 日志正在录音：640
                // 日志正在录音：640
                // 日志正在录音：640
                // 日志正在录音：640
                // 日志正在录音：640
                // 日志正在录音：640
                // ......
                // 可能有错误编码......
                // onAsrEnd
                // onAsrFinalReslut
                // onAsrFinish
                // onAsrExit

                // 录音中...
                if(logInfo.indexOf("640") != -1) {
                    window.appInfo["_0"]["setIsVoiceing"](true);
                    self.voiceingNum++;
                }

                if(self.voiceingNum > 16) {
                    window.appInfo["_0"]["setIsVoiceing"](true);
                    window.appInfo["_2"]["stopVoice"]();
                    setTimeout(()=>{
                        window.appInfo["_2"]["userVoice"]();
                    }, 50);
                }
            };
        },

        setTimeNum0(){
            let self = this;
            return function () {
                self.timeNum0++
            };
        },
        setTimeNum1(){
            let self = this;
            return function () {
                self.timeNum1++
            };
        },
        setTimeNum2(){
            let self = this;
            return function () {
                self.timeNum2++
            };
        },
        setTimeNum3(){
            let self = this;
            return function () {
                self.timeNum3++
            };
        },
        setErrorCode(){
            let self = this;
            return function (errorCode) {
                self.errorCode.push(errorCode); // 使用摄像头
            };
        },
        setIsVoiceDone(){
            let self = this;
            return function (isVoiceDone) {
                self.isVoiceDone = isVoiceDone // 使用摄像头
                return isVoiceDone;
            };
        },
        setIsVoiceing(){
            let self = this;
            return function (isVoiceing) {
                self.isVoiceing = isVoiceing;
            };
        },
        getIsVoiceing(){
            let self = this;
            return function () {
                return self.isVoiceing;
            };
        },

        // 获取航班
        saveLogInfo(logInfo) {
            var self = this;
            uni.request({
                header: {
                    gomstoken: "866822030391163", //(window.appInfo["_1"]["imei"] || "866822030391163")
                },
                url: self.$config.action.asrLog,
                method: "POST",
                data: {
                    "content": logInfo,
                    "sessionId": self.sessionId,
                    "flag": 0
                },
                success(res, statusCode, header) {},
                fail(error) {
                    console.log(error);
                }
            });

        },

    },
    created() {
        let self = this;
        let userTimeOut = null;

        window.appInfo["_0"]["init"] = self.init(); // 初始化 暂时没用到
        window.appInfo["_0"]["resetNumber"] = self.resetNumber(); // 把中文数字转为阿拉伯数字
        window.appInfo["_0"]["setFlightSearch"] = self.setFlightSearch(); // 查航班
        window.appInfo["_0"]["backActionNav"] = self.backActionNav(); // 回退
        window.appInfo["_0"]["isExit"] = false; // 标记是否退出

        window.appInfo["_2"]["userVoice"] = self.userVoice(); // 使用语音模块
        window.appInfo["_2"]["stopVoice"] = self.stopVoice(); // 停止语音模块
        window.appInfo["_2"]["setShowVoiceTxtInfo"] = self.setShowVoiceTxtInfo(); // 拼接语音内容
        window.appInfo["_2"]["txtToVoice"] = self.txtToVoice(); // 文字转语音
        window.appInfo["_2"]["setVoiceTxtList"] = self.setVoiceTxtList(); // 文字内容

        window.appInfo["_2"]["setSuggestAnswerInfo"] = self.setSuggestAnswerInfo(); // 设置对话内容
        window.appInfo["_2"]["editSuggestAnswerInfo"] = self.editSuggestAnswerInfo(); // 修改对话内容
        window.appInfo["_2"]["getSuggestAnswerInfo"] = self.getSuggestAnswerInfo(); // 获取对话内容
        window.appInfo["_2"]["setSuggestAnswerByIndex"] = self.setSuggestAnswerByIndex(); // 根据索引获取对话内容

        // 收音定时器
        window.appInfo["_2"]["intervalTime"] = null;

        // 记录日志
        window.appInfo['_0']['setLog'] = self.setLog();
        window.appInfo["_0"]["setTimeNum0"] = self.setTimeNum0();
        window.appInfo["_0"]["setTimeNum1"] = self.setTimeNum1();
        window.appInfo["_0"]["setTimeNum2"] = self.setTimeNum2();
        window.appInfo["_0"]["setTimeNum3"] = self.setTimeNum3();
        window.appInfo["_0"]["setErrorCode"] = self.setErrorCode();
        window.appInfo["_0"]["setIsVoiceDone"] = self.setIsVoiceDone(); // 设置是否播报完
        window.appInfo["_0"]["setIsVoiceing"] = self.setIsVoiceing(); // 设置是否正在收音
        window.appInfo["_0"]["getIsVoiceing"] = self.getIsVoiceing(); // 获取是否正在收音
        window.appInfo["_0"]["setFlgVoiceList"] = self.setFlgVoiceList(); //

        // 初始化
        window.appInfo["_0"]["init"]();

    },
    mounted() {
        let self = this;
    },
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
</style>
