<template>
    <div class="message" id="message" :style="{maxHeight: (systemInfo.windowHeight-240)+'px'}">
        <div class="list" ref="message" :style="{maxHeight: (systemInfo.windowHeight-240)+'px'}">
            <template v-for="(item, index) in suggestAnswer">
                <!-- 旅客问题 -->
                <template v-if="item.type==1">
                    <!--  :class="(suggestAnswer.length>=3&&index<suggestAnswer.length-1)?item.animate:''" -->
                    <div :key="index" class="item szItem animate__animated">
                        <div class="lable" v-html="item.suggestAnswer"></div>
                        <span class="angle"></span>
                    </div>
                </template>

                <!-- 语音回答 -->
                <template v-if="item.type==2">
                    <template v-if="!!item.suggestAnswer">
                        <!--  :class="(suggestAnswer.length>=3&&index<suggestAnswer.length-1)?item.animate:''" -->
                        <div :key="index" class="item meItem animate__animated">
                            <!--  :style="{'maxWidth': isFright?'100%':'1000px', 'boxShadow': isFright?'none':'0 0 20px rgba(0,0,0,.5)','width':isFright?'100%':'auto','padding': '0'}" -->
                            <div class="lable">
                                <template v-if="!isFright">
                                    <div v-html="item.suggestAnswer" :class="{'htmlInfo': item.suggestAnswer.indexOf('font')!=-1}"></div>
                                    <!-- <span class="angle"></span> -->
                                </template>
                                <template v-if="isFright && index == (suggestAnswer.length - 1)">
                                    <view class="frightInfoWrap" :key="index">
                                        <template v-if="flightList.length > 0">
                                            <view class="frightList">  
                                                <view class="frightListWrap">
                                                    <!-- <span class="angle"></span> -->
                                                    <view class="listWrap">
                                                        <!-- <view class="header">
                                                            <view class="total">共 {{flightList.length}} 条</view>
                                                            <view class="spreed">
                                                                展开
                                                            </view>
                                                        </view> -->
                                                        <template v-for="(info, i) in flightList">
                                                            <view class="item" :key="i" @click="getFrightInfo(info,i)">
                                                                <view class="title">
                                                                    <span class="airline">{{info.airlineNameCn}}</span>
                                                                    <span class="fltNo">{{info.fltNo}}</span>
                                                                    <view class="state" :style="{backgroundColor: info.stateColor||'#4883f9'}">{{info.stateCn}}</view>
                                                                </view>
                                                                <view class="time">预计到达：{{info.destSdt}}</view>
                                                                <view class="info">
                                                                    <view class="left">{{info.startAirportCn}}<span class="time">{{info.startSdt}}</span></view>
                                                                    <view class="iconWrap"><svg t="1614581388475" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2774" width="32" height="32"><path d="M606.8736 361.1648h22.25152c18.83136 0 28.28288-7.9872 28.28288-24.2688 0-18.432-17.53088-27.7504-52.55168-27.7504h-36.67968l-55.47008-73.8304h26.2144c17.50016 0 26.27584-8.0896 26.27584-24.1664 0-18.6368-12.1856-27.8528-36.6592-27.8528H475.0336Q382.33088 58.4192 358.06208 58.368a43.49952 43.49952 0 0 0-24.4736 9.216 25.088 25.088 0 0 0-13.11744 19.5584q0 10.4448 27.93472 53.76a1414.144 1414.144 0 0 1 81.27488 162.0992q53.32992 118.7328 53.248 143.4624c0 10.5472-15.83104 16.384-47.616 17.408q-156.4672 0.9216-224.4096 14.848a441.21088 441.21088 0 0 1-38.912-50.2784q-31.01696-43.4688-42.62912-51.6096a76.032 76.032 0 0 0-41.35936-8.192 35.65568 35.65568 0 0 0-21.31968 4.5056q0 19.2 47.04256 139.264-47.104 109.056-47.04256 139.264a35.65568 35.65568 0 0 0 21.31968 4.5056 75.776 75.776 0 0 0 41.09312-7.9872q11.45856-7.8336 42.62912-51.5072a448.18432 448.18432 0 0 1 39.13728-50.5856 934.61504 934.61504 0 0 0 157.32736 13.312c59.58656 0.8192 93.70624 2.4576 102.0416 5.3248a14.78656 14.78656 0 0 1 12.65664 13.5168q0 24.4224-53.248 143.2576-53.248 119.04-81.27488 162.304-27.9552 43.4688-27.93472 53.8624a24.36096 24.36096 0 0 0 13.11744 19.2512 44.63616 44.63616 0 0 0 24.4736 9.0112q24.36096 0 116.97152-124.416h53.504c24.4736 0 36.6592-9.3184 36.6592-27.7504 0-16.2816-8.77568-24.3712-26.27584-24.3712h-26.2144l55.47008-73.728h36.67968c35.0208 0 52.55168-9.3184 52.55168-27.7504 0-16.2816-9.45152-24.3712-28.28288-24.3712h-22.25152l88.18688-104.5504h114.98496q147.05664 0 147.0976-49.0496c0-12.9024-19.72224-23.552-59.25888-31.744a482.22208 482.22208 0 0 0-87.83872-12.3904H695.06048z" fill="#297194" p-id="2775"></path></svg></view>
                                                                    <view class="right"><span class="time">{{info.destSdt}}</span>{{info.destAirportCn}}</view>
                                                                </view>
                                                            </view>
                                                        </template>
                                                    </view>
                                                </view>
                                            </view>
                                        </template>
                                    </view>
                                </template>
                            </div>
                            
                        </div>
                        
                    </template>
                </template>
            </template>
        </div>

    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    props: {
        
    },
    components: {},
    data() {
        return {
			userInfo: null,
			locale: "",
            isLog: false,
            txt: "",
            info: {},
            currentIndex: 0,
            suggestAnswerList: [],
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState([
            "suggestAnswer", 
            "frightInfo", 
            "isFright", 
            "flightList"
        ])
    },
    watch: {
        
    },
    onLoad() {
        let self = this;
    },
    onShow() {
        let self = this;
    },
    methods: {
        ...mapMutations([
            "setFrightInfo", 
            "setCurrentIndex",
            "setIsLoading", 
            "setIsFright", 
            "deleteSuggestAnswer", 
            "initSuggestAnswer"
        ]),
		// 获取航班
        getFrightInfo(item, index){
            var self = this;

            uni.showLoading();

            uni.request({
			    header: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.flightDetail,
			    method: "POST",
			    data: {
                    "fltId": item.fltId,
                    "arrdep": item.arrdep
			    },
			    success(res, statusCode, header) {
                    if(res.data.code == "0") {
                        let timeInfo = self.$utility.getCurrentTimeInfo();
						let info = res.data.rst;
                        info["destActTimeInfo"] = self.$utility.timeDiff(timeInfo.year+"-"+info.destSdt);
                        info["destSdtInfo"] = self.$utility.timeDiff(timeInfo.year+"-"+info.destSdt);
                        info["startSdtInfo"] = self.$utility.timeDiff(timeInfo.year+"-"+info.startSdt);
                        self.setFrightInfo(info);
						uni.hideLoading();
                        self.setCurrentIndex(index || 0);
                    }
			    },
			    fail(error) {
                    console.log(error);
                    uni.hideLoading();
			    }
            });

        },
	},
	created() {
        let self = this;
        let userTimeOut = null;

        self.$watch('suggestAnswer', function () {
            clearTimeout(userTimeOut);
            let list = [];
            userTimeOut = setTimeout(() => {
                
                self.$nextTick(() => {
                    self.$refs.message.scrollTop = self.$refs.message.scrollHeight;
                });

                setTimeout(()=>{
                    if(self.suggestAnswer.length >= 2) {
                        list.push(self.suggestAnswer[self.suggestAnswer.length - 2]);
                        list.push(self.suggestAnswer[self.suggestAnswer.length - 1]);
                        self.initSuggestAnswer(list);
                    }
                }, 5000);
                self.$("#message").find(".htmlInfo img").attr("style", "width: 100%");
            }, 200);
        }, {
            deep: true
        });
    },
    mounted(){
        let self = this;
    }
};
</script>

<style lang="less" scoped>
.message {
    position: fixed;
	z-index: 1000;
	left: 3%;
	right: 3%;
	top: 20%;
	overflow-x: hidden;
	overflow-y: auto;
	border-radius: 20px;
    .list {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 5%;
        .item {
            position: relative;
            z-index: 0;
            margin: 20px;
            text-align: center;
            &.itemListWrap {
                margin: 25px 50px;
                &.currentItem {
                    transform: scale(1.08);
                    .itemList {
                        background-image: linear-gradient(to left, #3282fd, #c0d9fe);
                         .itemWrap {
                             color: #fff;
                             &:last-child {
                                background-color: transparent;
                                color: #fff;
                            }
                         }
                    }
                    .angle {
                        border-right-color: #c0d8fc;
                    }
                }
                .itemList {
                    display: flex;
                    border-radius: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 15px rgba(0,0,0,.25);
                    font-size: 24px;
                    text-align: center;
                    overflow: hidden;
                    .itemWrap {
                        flex: 1;
                        padding: 30px;
                        &:last-child {
                            background-color: #3282fd;
                            color: #fff;
                        }
                        .airlineNameCn {
                            font-size: 28px;
                            font-weight: bolder;
                        }
                        .fltNo {
                            color: #3282fd;
                            font-weight: bolder;
                            font-size: 48px;
                        }
                        .stateCn {
                            padding-top: 10px;
                            text {
                                display: inline-block;
                                padding: 10px 15px;
                                border-radius: 5px;
                                font-size: 28px;
                            }
                        }
                        .txt {
                            padding-top: 10px;
                            font-size: 32px;
                            font-weight: bold;
                        }
                    }   
                }
            }
            &.szItem {
                text-align: right;
                .lable {
                    color: #FFF;
                }
                .angle {
                    display: none;
                    position: absolute;
                    right: -15px;
                    top: 25px;
                    width:0; 
                    height:0; 
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent; 
                    border-left: 25px solid #4883f9;
                    transform: rotate(18deg);
                }
            }
            &.meItem{
                .lable {
                    color: #3fb5d9;
                    text-shadow: 0 0 5px #51c2e4;
                }
                .angle {
                    display: none;
                    position: absolute;
                    left: -15px;
                    top: 25px;
                    width:0; 
                    height:0; 
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent; 
                    border-right: 25px solid #fff;
                    transform: rotate(-18deg);
                    &.frightAngle {
                        border-right-color: #4883f9;
                    }
                }
                .frightInfoWrap {
                    .angle {
                        position: absolute;
                        left: -28px;
                        top: 15px;
                        width:0; 
                        height:0; 
                        border-top: 30px solid transparent;
                        border-bottom: 15px solid transparent; 
                        border-right: 48px solid#4883f9;
                        transform: rotate(-25deg);
                    }
                }
            }
            
            .lable {
                // display: inline-block;
                // max-width: 1000px;
                font-size: 16px;
                // padding: 15px;
                // border-radius: 20px;
                text-align: center;
                line-height: 1.2;
                color: #FFF;
                // box-shadow: 0 0 20px rgba(255, 255, 255, .5);
                
                .htmlInfo {
                    display: inline-block;
                    text-align: left;
                    color: #3fb5d9;
                    background-color: #fff;
                    line-height: 1.5;
                    box-shadow: 0 0 20px rgba(255, 255, 255, .2);
                    font {
                        color: #FFF !important;
                    }
                    img {
                        width: 100% !important;
                    }
                }
            }
        }
    }

    .frightInfo {
        position: relative;
        z-index: 0;
        font-size: 24px;
        text-align: center;
        border-radius: 20px 20px 0 0;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0,0,0,.25);
        font-size: 24px;
        overflow: hidden;
        .title {
            // text-align: left;
            font-size: 36px;
            padding: 20px 10px 40px 10px;
        }
        .content {
            display: flex;
            padding: 20px 0 0  0;
            .info {
                flex: 1;
                &:first-child {
                    text-align: left; 
                    padding-left: 40px;
                }
                &:last-child {
                    text-align: right; 
                    padding-right: 40px;
                }
                .item {
                    margin: 0;
                    // padding-bottom: 30px;
                    &.address {
                        font-size: 32px;
                        font-weight: bolder;
                    }
                    &.number {
                        font-weight: bolder;
                        font-size: 32pxpx;
                    }
                }
            }
        }
        .destInfo {
            padding: 0 10px 20px 40px;
            text-align: left;
            .des {
                height: 56px;
                line-height: 56px;
                &:first-child {
                    .icon {
                        transform: rotate(-30deg);
                    }
                }
                &:last-child {
                    .icon {
                        transform: rotate(30deg);
                    }
                }
                .icon {
                    position: relative;
                    z-index: 0;
                    top: 2px;
                }
                .t {
                    color: #9E9E9E;
                    font-size: 20px;
                    padding-left: 10px;
                }
                .l {
                    font-weight: bold;
                    font-size: 30px;
                    padding-left: 10px;
                }
                .c {
                    position: relative;
                    z-index: 0;
                    top: 5px;
                    float: right;
                    font-size: 30px;
                    padding-right: 20px;
                }
            }
        }
        .bottom {
            padding: 10px 20px;
            color: #fff;
            font-size: 24px;
            text-align: left;
            background-image: linear-gradient(to right, #3282fd, #c0d9fe);
        }
        .statu {
            position: absolute;
            z-index: 0;
            bottom: 0;
            right: 0;
            padding: 14px;
            font-size: 32px;
            color: #fff;
            border-radius: 20px 0 0 0;
            font-weight: bolder;
            background-color: red;
        }
        .close {
            position: absolute;
            z-index: 0;
            bottom: 0;
            right: 0;
            padding: 15px 30px;
            font-size: 32px;
            color: #fff;
            border-radius: 0 0 20px 0;
            font-weight: bolder;
            background-color: #3282fd;
        }
    }

    .frightInfoWrap {
        padding-top: 10px;
    }
    
    .frightList {
        font-size: 16px;
        text-align: center;
        background-color: transparent;
        
        .frightListWrap {
            position: relative;
            z-index: 0;
            
            .listWrap {
                border-radius: 20px;
                overflow: hidden;
                box-shadow: none;
                .header {
                    position: relative;
                    z-index: 0;
                    border-radius: 0;
                    padding: 15px 20px;
                    color: #fff;
                    font-size: 13px;
                    .spreed {
                        position: absolute;
                        z-index: 0;
                        right: 20px;
                        top: 15px;
                    }
                    
                }
                .item {
                    margin: 0;
                    padding: 10px 20px;
                    text-align: left;
                    border-bottom: 1px solid #40a6de;
                    box-shadow: none;
                    color: #fff;
                    &:last-child {
                        border: none;
                    }
                    .title {
                        position: relative;
                        z-index: 0;
                        font-size: 14px;
                        .airline {
                            padding-right: 10px;
                        }
                        .fltNo {
                            font-size: 16px;
                            font-weight:bold;
                        }
                        .state {
                            position: absolute;
                            z-index: 0;
                            right: 0;
                            top: 0;
                            border-radius: 6px;
                            background-color: #4883f9;
                            color: #fff;
                            // height: 32px;
                            // line-height: 30px;
                            padding: 5px 8px;
                            font-size: 12px;
                        }
                    }
                    .time {
                        padding: 10px 0;
                        font-size: 14px;
                        color: #40a6de;
                    }
                    .info {
                        position: relative;
                        z-index: 0;
                        font-size: 14px;
                        height: 24px;
                        font-weight: bold;
                        .time {
                            display: none;
                            font-size: 13px;
                            padding: 0 10px;
                            font-weight: normal;
                        }
                        .left {
                            float: left;
                        }
                        .right {
                            float: right;
                        }
                        .iconWrap {
                            position: absolute;
                            z-index: 10;
                            top: -5px;
                            width: 100%;
                            height: 24px;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .header {
            display: flex;
            border-radius: 20px 20px 0 0;
            // background-color: #080c39;
            font-size: 18px;
            .tableCell {
                flex: 1;
                padding: 5px 0;
                color: #fff;
                font-weight: bold;
                &.tableCell--num {
                    flex: .5;
                }
                &.tableCell--fltNo {
                    flex: .7;
                }
            }
        } 
        .listWrap {
            border-radius: 0 0 20px 20px;
            box-shadow: 0 0 15px rgba(0,0,0,.25);
            // background-color: #fff;
        }
        .tableBody {
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 50px;
            .tableRow {
                display: flex;
                &.currentItem {
                    .tableCell {
                        color: #fff;
                    }
                    // border-radius: 100px;
                    background-image: linear-gradient(to right, #3282fd, #c0d9fe);
                }
                .tableCell {
                    flex: 1;
                    padding: 5px 0;
                    color: #2a71b1;
                    vertical-align: middle;
                    &.tableCell--num {
                        flex: .5;
                    }
                    &.tableCell--fltNo {
                        flex: .7;
                    }
                    .time {
                        font-size: 18px;
                    }
                    .num {
                        position: relative;
                        z-index: 0;
                        top: 15px;
                        font-size: 16px;
                    }
                    .la {
                        position: relative;
                        z-index: 0;
                        top: 15px;
                        font-size: 16px;
                        text {
                            color: #fff;
                            display: inline-block;
                            padding: 10px 15px;
                            border-radius: 5px;
                            font-size: 20px;
                        }
                    }
                    .txt {
                        font-size: 14px;
                    }
                    &.error {
                        color: red;
                    }
                }
                &:nth-child(2n) {
                    border-bottom: 1px solid #b3cff9;
                    border-top: 1px solid #b3cff9;
                }
            }
        }
    }
}

</style>
