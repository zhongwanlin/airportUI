<template>
    <div id="voiceComponent">
        <div class="faceAndVideo">
           
            <div class="voiceTips">
                <template v-if="voiceTxtInfo.length>0">
                    <div class="spinWrap">
                        <Spin>
                            <Icon type="ios-loading" size="140" class="demo-spin-icon-load"></Icon>
                        </Spin>
                    </div>
                </template>
            </div>

            <div class="swiperList" v-show="isShow" v-trigger>
                <div class="tagcloudWrap">
                    <div class="tagcloud">
                        <template v-for="(item, index) in cloumnsList">
                            <span @click="getArticle()(item)" :key="'-'+index">{{locale=='zh-CN'?item.title:item.e_title}}</span>
                        </template>
                    </div>
                </div>
            </div>

            <template v-if="isShowDetail">
                <div class="articleWrap">
                    <div class="articleClose" @click="closeDetail">X</div>
                    <div class="articleTitle">
                        {{locale=='zh-CN'?cloumnsItem.title:cloumnsItem.e_title}}
                    </div>
                    <div class="articleContent">
                        <div v-html="locale=='zh-CN'?cloumnsItem.con:cloumnsItem.e_con"></div>
                    </div>
                </div>
            </template>

            <div class="close" @click="toggleFaceVideo">
                <span>X</span>
            </div>

            <div class="voiceTxt">
                <div>{{voiceTxtShow}}</div>
                <div v-html="htmlTxt"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import tagcloud from '../../common/tagcloud.js';
export default {
    name: "voiceComponent",
    components: {},
    data: () => ({
        height: window.innerHeight,
        locale: "",
        isShow: false,
        cloumnsList: [],
        cloumnsItem: {},
        isShowDetail: false,
        detail: {},
        id: "",
        voiceDetial: [],
        airport: {},
        voiceTxtInfo: [],
        voiceTxtShow: "",
        htmlTxt: ""
    }),
    computed: {
        ...mapState([])
    },
    directives:{
        trigger:{
            inserted(el,binging){
                setTimeout(()=>{
                    el.click();
                }, 3000);
            }
        }
    },
    methods: {
        ...mapMutations([]),
        toggleFaceVideo() {
            let self = this;
            self.setFaceVideo(!self.isFaceVideo);
        },
        closeDetail(){
            let self = this;
            self.isShowDetail = false;
            self.cloumnsItem = {};
            window.appInfo["_0"]["userVoice"]();
            window.appInfo["_0"]["setVoiceTxt"]("欢迎使用语音助手,请说出您要找的服务");
        },
        
        setInfoDetail(){
            let self = this;
            return function(faceInfo) {
                self.setFaceInfoDetail(null);
                self.setFaceInfo(true);
                self.setIsScaning(true);
                self.setIsSwitchScan(false);
                self.setFaceInfoDetail(faceInfo);
                self.setSpreed(true);
                
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
                            var demoList = window.mock.demoList;
                            let voiceTxtInfo = "";
                            clearTimeout(window.appInfo["_0"]["intervalTime"]);
                            clearTimeout(window.appInfo["_0"]["overVoice2"]);
                            clearTimeout(window.appInfo["_0"]["overVoice3"]);
                            window.appInfo["_0"]["setShowVoiceTxtInfo"]("");
                            window.appInfo["_0"]["overVoice2"] = setTimeout(()=>{
                                window.appInfo["_0"]["setVoiceTxtInfo"]("", false);
                            }, 2000);
                            window.appInfo["_0"]["overVoice3"] = setTimeout(()=>{
                                voiceTxtInfo = window.appInfo["_0"]["setVoiceTxtInfo"](voiceStr, true);
                                window.appInfo["_0"]["setVoiceTxt"]("");
                                window.appInfo["_0"]["setShowVoiceTxtInfo"](voiceStr);
                            }, 0);

                            if(voiceStr.length != 0) {
                                window.appInfo["_0"]["intervalTime"] = setTimeout(()=>{
                                    for(var i = 0, len = demoList.length; i < len; i++) {
                                        if(voiceTxtInfo.join('').indexOf(demoList[i])!=-1) {
                                            var key = window.mock.demoMatch[i];
                                            var faceInfo = window.mock.demoInfo[key];
                                            var htmlTxt = "您要找的是从"+ (airport[faceInfo.starting]||faceInfo.starting) + "飞往" + (airport[faceInfo.destination]||faceInfo.destination) +"的";
                                            var voiceTxt = "您要找的是从"+ (airport[faceInfo.starting]||faceInfo.starting) + "飞往" + (airport[faceInfo.destination]||faceInfo.destination) +"的";
                                            window.appInfo["_0"]["setShowVoiceTxtInfo"]("");
                                            window.appInfo["_0"]["setInfoDetail"](faceInfo);
                                            if(faceInfo.type==1) {
                                                voiceTxt = voiceTxt + "出发航班航班号:" + faceInfo.airline_num +(faceInfo.boarding_gate!="--"?"登机口:" + faceInfo.boarding_gate : "") +(faceInfo.checkIn_counter!="--"?"值机柜台:"+ faceInfo.checkIn_counter : "") +(faceInfo.security_check!="--"?"安检口:" + faceInfo.security_check : "") +"预计登机时间:"+ faceInfo.register_time.replace(":", "点") +  "分" +"预计起飞时间:"+ faceInfo.departure_time.replace(":", "点") +"分";
                                                htmlTxt = htmlTxt + "出发航班，航班号:" + faceInfo.airline_num + " " +(faceInfo.boarding_gate!="--"?"登机口:" + faceInfo.boarding_gate : "") +  " " +(faceInfo.checkIn_counter!="--"?"值机柜台:"+ faceInfo.checkIn_counter : "") +  " " +(faceInfo.security_check!="--"?"安检口:" + faceInfo.security_check : "") +  " " +"预计登机时间:"+ faceInfo.register_time.replace(":", "点") +  "分" + " " +"预计起飞时间:"+ faceInfo.departure_time.replace(":", "点") +"分";

                                            } else if(faceInfo.type==2) {
                                                voiceTxt = voiceTxt + "到达航班，航班号：" + faceInfo.airline_num +"预计到达时间:"+ faceInfo.register_time.replace(":", "点") + "分";
                                                htmlTxt = htmlTxt + "到达航班，航班号：" + faceInfo.airline_num +  " " +"预计到达时间:"+ faceInfo.register_time.replace(":", "点") + "分";

                                            } else if(faceInfo.type==3) {
                                                voiceTxt = voiceTxt + "中转航班，航班号：" + faceInfo.airline_num +(faceInfo.boarding_gate!="--"?"登机口:" + faceInfo.boarding_gate : "") +(faceInfo.checkIn_counter!="--"?"值机柜台:"+ faceInfo.checkIn_counter : "") +(faceInfo.security_check!="--"?"安检口:" + faceInfo.security_check : "") +"预计登机时间:"+ faceInfo.register_time.replace(":", "点") +  "分" +"预计起飞时间:"+ faceInfo.departure_time.replace(":", "点")+ "分";
                                                htmlTxt = htmlTxt + "中转航班，航班号：" + faceInfo.airline_num +  " " +(faceInfo.boarding_gate!="--"?"登机口:" + faceInfo.boarding_gate : "") +  " " +(faceInfo.checkIn_counter!="--"?"值机柜台:"+ faceInfo.checkIn_counter : "") +  " " +(faceInfo.security_check!="--"?"安检口:" + faceInfo.security_check : "") +  " " +"预计登机时间:"+ faceInfo.register_time.replace(":", "点") +  "分" + " " + "预计起飞时间:"+ faceInfo.departure_time.replace(":", "点")+ "分";
                                            }
                                            window.appInfo["_0"]["txtToVoice"](voiceTxt);
                                            window.appInfo["_0"]["voiceInfo"] = voiceTxt;
                                            window.appInfo["_0"]["setVoiceTxt"]("<div style='text-align: left;padding: 0 30px 0 60px;'>"+htmlTxt+"</div>");
                                            window.appInfo["_0"]["errorNum"] = 0;
                                            bool = true;
                                            setTimeout(()=>{window.appInfo["_0"]["setCRouter"]("detail");}, 500);
                                            break;
                                        } else {
                                            window.appInfo["_0"]["setShowVoiceTxtInfo"]("");
                                            bool = false;
                                        }
                                    }

                                    if(bool == false) {
                                        window.appInfo["_0"]["uploadVoice"](voiceStr);
                                    }
                                }, 2000);
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
                        window.appInfo["_0"]["stopVoice"]();
                    }, 1000);
                    
                    clearTimeout(window.appInfo["_0"]["userVoiceIntervl"]);
                    window.appInfo["_0"]["userVoiceIntervl"] = setTimeout(()=>{
                        window.appInfo["_0"]["userVoice"]();
                        window.appInfo["_0"]["writeLog"]();
                    }, txt.length/4*1000);

                    clearTimeout(window.appInfo["_0"]["overVoice1"]);
                    window.appInfo["_0"]["overVoice1"] = setTimeout(()=>{
                        window.appInfo["_0"]["setVoiceTxtInfo"]("", false);
                        window.appInfo["_0"]["setShowVoiceTxtInfo"]("");
                        window.appInfo["_0"]["setVoiceTxt"]("欢迎使用语音助手,请说出您要找的服务");
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
                window.appInfo["_0"]["setShowVoiceTxtInfo"]("");
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        var data = xmlHttp.responseText;
                        var jsonData = JSON.parse(data);
                        if (jsonData.code == 0) {
                            if(window.appInfo["_0"]["tips"] != jsonData.data.reply_content) {
                                window.appInfo["_0"]["tips"] = jsonData.data.reply_content;
                                window.appInfo["_0"]["txtToVoice"](jsonData.data.reply_content);
                                window.appInfo["_0"]["voiceInfo"] = jsonData.data.reply_content;
                            }
                            window.appInfo["_0"]["setVoiceTxt"](jsonData.data.reply_content);
                            if(!!jsonData.data.action_data.jump_url) {
                                window.appInfo["_0"]["getArticle"]({id: parseInt(jsonData.data.action_data.jump_url)});
                            }
                        } else {
                            window.appInfo["_0"]["setVoiceTxtInfo"]("", false);
                            if(window.appInfo["_0"]["errorNum"] == 0) {
                                window.appInfo["_0"]["errorNum"]++;
                                window.appInfo["_0"]["txtToVoice"]("抱歉,暂时没有找到您想要的服务");
                            }
                        }
                    }
                }
                xmlHttp.open("POST", self.$config.action.asp, true);
                xmlHttp.setRequestHeader("gomstoken", window.utility.getLocalStorage('gomstoken'));
                xmlHttp.send(formData);
            };
        },

        // 获取栏目
        getColumns(id, callback){
            let self = this;

            self.axios({
                method: 'post',
                url: self.$config.action.getArticleList,
                headers: {
                    'gomstoken': self.$utility.getLocalStorage('gomstoken')
                },
                data: {
                    c_id: id
                }
            }).then(function (data) {
                if(data.data.code == 0) {
                    !!callback && callback(data.data.data);
                }
            }).catch(function () {
                console.log();
            });
        },

        // 获取详情
        getArticle(){
            let self = this;
            return function(item) {
                //发送异步请求
                //1.创建ajax引擎对象----所有操作都是由ajax引擎完成
                var xmlHttp = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("article_id", item.id);

                //2.为引擎对象绑定监听事件
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        //5.接收响应信息
                        var data = xmlHttp.responseText;
                        var jsonData = JSON.parse(data);
                        // 如果有人脸数据
                        if (jsonData.code == 0) {
                            self.isShowDetail = true;
                            self.cloumnsItem = jsonData.data;
                            self.cloumnsItem["con"] = self.cloumnsItem["con"].replace(/line-height: 25px/g, "");
                            self.cloumnsItem["e_con"] = self.cloumnsItem["e_con"].replace(/line-height: 25px/g, "");
                        } else {
                            window.appInfo["_0"]["txtToVoice"](jsonData.msg);
                            window.appInfo["_0"]["voiceInfo"] = jsonData.msg;
                        }
                    }
                }

                //3.绑定服务器地址
                //第一个参数：请求方式GET/POST
                //第二个参数：后台服务器地址
                //第三个参数：是否是异步 true--异步   false--同步
                xmlHttp.open("POST", self.$config.action.getArticle, true);
                xmlHttp.setRequestHeader("gomstoken", window.utility.getLocalStorage('gomstoken'));
                //4.发送请求
                xmlHttp.send(formData);
            };
        },

        writeLog() {
            let self = this;

            return function(info) {
                self.axios({
                    method: "post",
                    url: self.$config.action.writeLog,
                    headers: {
                        'gomstoken': self.$utility.getLocalStorage('gomstoken')
                    },
                    data: {
                        mac_model_id: 5,
                        sdk_name: "hxpApi11",
                        versions: window.navigator.appVersion.split(" ")[0],
                        run_status: 2,
                        info: {
                            "文字内容": window.appInfo["_0"]["voiceInfo"]
                        },
                    }
                }).then(function (data) {
                    
                });
            }
        },

        // 页面跳转
        setCRouter() {
            let self = this;
            return function(router) {
                self.$router.push({
                    name: router
                });
            };
        },
    },
    created() {
        let self = this;
        self.locale = self.$i18n.locale;
        self.airport = self.$config.airport;

        console.log(window.navigator.appVersion);

        window.appInfo["_0"]["txtToVoice"] = self.txtToVoice(); // 文字转语音
        window.appInfo["_0"]["uploadVoice"] = self.uploadVoice(); // 提交语音内容到后台
        window.appInfo["_0"]["getArticle"] = self.getArticle(); // 获取文章
        window.appInfo["_0"]["setInfoDetail"] = self.setInfoDetail(); // 设置航班信息
        window.appInfo["_0"]["setVoiceTxt"] = self.setVoiceTxt(); // 把语音转换成文字 
        window.appInfo["_0"]["setVoiceTxtInfo"] = self.setVoiceTxtInfo(); // 拼接语音内容
        window.appInfo["_0"]["setShowVoiceTxtInfo"] = self.setShowVoiceTxtInfo(); // 显示语音回复内容
        window.appInfo["_0"]["userVoice"] = self.userVoice(); // 使用语音模块
        window.appInfo["_0"]["stopVoice"] = self.stopVoice(); // 停止语音模块
        window.appInfo["_0"]["setCRouter"] = self.setCRouter(); // 设置路由
        window.appInfo["_0"]["writeLog"] = self.writeLog(); // 提交日志
        window.appInfo["_0"]["intervalTime"] = null;
        window.appInfo["_0"]["overVoice1"] = null;
        window.appInfo["_0"]["overVoice2"] = null;
        window.appInfo["_0"]["overVoice3"] = null;
        window.appInfo["_0"]["userVoiceIntervl"] = null;
        window.appInfo["_0"]["errorNum"] = 0;
        window.appInfo["_0"]["tips"] = "";
        window.appInfo["_0"]["voiceInfo"] = "";

        window.appInfo["_0"]["txtToVoice"]("欢迎使用语音助手,请说出您要找的服务");
        window.appInfo["_0"]["setVoiceTxt"]("欢迎使用语音助手,请说出您要找的服务");
        // window.appInfo["_0"]["userVoice"]();

        [1,4].forEach((id)=>{
            self.getColumns(id, (columns)=>{
                columns.forEach((cItem)=>{
                    self.cloumnsList.push(cItem);
                });
            });
        });
    },
    mounted() {
        let self = this;
        setTimeout(()=>{
            self.isShow = true;
            let tagcloudFun = tagcloud({
                selector: ".tagcloud",//元素选择器
                fontsize: 60,//基本字体大小, 单位px
                radius: self.height/3,//滚动半径, 单位px
                mspeed: "slow",//滚动最大速度, 取值: slow, normal(默认), fast
                ispeed: "slow",//滚动初速度, 取值: slow, normal(默认), fast
                direction: 0,
                keep: true //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
            });
        }, 1500);
    },
    beforeDestroy() {
        let self = this;
        window.appInfo["_0"]["stopVoice"]();
        clearInterval(window.appInfo["_0"]["intervalTime"]);
        clearInterval(window.appInfo["_0"]["overVoice1"]);
        clearInterval(window.appInfo["_0"]["overVoice2"]);
        clearInterval(window.appInfo["_0"]["overVoice3"]);
        clearInterval(window.appInfo["_0"]["userVoiceIntervl"]);
        window.appInfo["_0"]["errorNum"] = 0;
        window.appInfo["_0"]["voiceInfo"] = "";
    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
</style>
