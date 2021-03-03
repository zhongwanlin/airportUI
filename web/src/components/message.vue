<template>
    <div class="message" :style="{maxHeight: (systemInfo.windowHeight-220)+'px'}">
        <div class="list" v-show="!isFright" ref="message" :style="{maxHeight: (systemInfo.windowHeight-220)+'px'}">
            <template v-for="(item, index) in suggestAnswer">
                <!-- 旅客问题 -->
                <template v-if="item.type==1">
                    <div :key="index" class="item szItem animate__animated" :class="(suggestAnswer.length>=3&&index<suggestAnswer.length-1)?item.animate:''">
                        <div class="lable">
                            {{item.suggestAnswer}}
                        </div>
                        <span class="angle"></span>
                    </div>
                </template>

                <!-- 语音回答 -->
                <template v-if="item.type==2">
                    <!-- 语音内容 -->
                    <template v-if="!!item.suggestAnswer">
                        <div :key="index" class="item meItem animate__animated" :class="(suggestAnswer.length>=3&&index<suggestAnswer.length-1)?item.animate:''">
                            <div class="lable">
                                {{item.suggestAnswer}}
                            </div>
                            <span class="angle"></span>
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
        ...mapState(["suggestAnswer", "frightInfo", "isFright"])
    },
    watch: {
        // suggestAnswer(){
        //     let self = this;
        //     self.$nextTick(() => {
        //         self.$refs.message.scrollTop = self.$refs.message.scrollHeight;
        //     });
        //     for(var i = 0, len = self.suggestAnswer.length; i < len; i++) {
        //         if(!!self.suggestAnswer[i]["answerList"]&&self.suggestAnswer[i]["answerList"].length>0) {
        //             self.getFrightInfo(self.suggestAnswer[i]['answerList'][0]);
        //             break;
        //         }
        //     }
        //     setTimeout(()=>{
        //         self.suggestAnswer.forEach((element, index) => {
        //             if(!!element.animate) {
        //                 self.suggestAnswer.splice(index, 1);
        //             }
        //         });
        //     }, 6000);
        // }
    },
    onLoad() {
        let self = this;
    },
    onShow() {
        let self = this;
    },
    methods: {
        ...mapMutations(["setFrightInfo", "setIsLoading", "setIsFright", "deleteSuggestAnswer", "initSuggestAnswer"]),
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
                        info["destActTimeInfo"] = self.$utility.timeDiff(info.destActTime);
                        info["destSdtInfo"] = self.$utility.timeDiff(info.destSdt);
                        info["startSdtInfo"] = self.$utility.timeDiff(info.startActTime);
                        self.setFrightInfo(info);
                        self.setIsFright(true);
                        self.setIsLoading(true);
                        uni.hideLoading();
                        self.currentIndex = index || 0;
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
    z-index: 10;
    width: 100%;
    top: 60px;
    .frightInfo {
        display: none;
        position: relative;
        z-index: 0;
        font-size: 24px;
        text-align: center;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0,0,0,.25);
        margin-bottom: 50px;
        font-size: 28px;
        overflow: hidden;
        .title {
            // text-align: left;
            font-size: 36px;
            padding: 20px 10px 40px 10px;
        }
        .content {
            display: flex;
            padding: 30px  0;
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
                        font-size: 48px;
                        font-weight: bolder;
                    }
                    &.number {
                        font-weight: bolder;
                        font-size: 48px;
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
                    font-size: 32px;
                    padding-left: 10px;
                }
                .c {
                    position: relative;
                    z-index: 0;
                    top: 5px;
                    float: right;
                    font-size: 32px;
                    padding-right: 20px;
                }
            }
        }
        .bottom {
            padding: 20px;
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
            top: 0;
            left: 0;
            padding: 20px 30px;
            font-size: 32px;
            color: #fff;
            border-radius: 0 0 20px 0;
            font-weight: bolder;
            background-color: #3282fd;
        }
    }
    .frightList {
        display: none;
        font-size: 36px;
        text-align: center;
        padding: 0;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0 0 15px rgba(0,0,0,.25);
        overflow: hidden;
        .header {
            display: flex;
            background-color: #3282fd;
            .tableCell {
                flex: 1;
                padding: 25px 0;
                color: #fff;
                font-weight: bold;
            }
        } 
        .tableBody {
            overflow-y: auto;
            overflow-x: hidden;
            .tableRow {
                display: flex;
                &.currentItem {
                    .tableCell {
                        color: #fff;
                    }
                    .angle {
                        border-right-color: #c0d8fc;
                    }
                    background-image: linear-gradient(to left, #3282fd, #c0d9fe);
                }
                .tableCell {
                    flex: 1;
                    padding: 20px 0;
                    color: #2a71b1;
                    vertical-align: middle;
                    .la {
                        position: relative;
                        z-index: 0;
                        top: 15px;
                        text {
                            color: #fff;
                            display: inline-block;
                            padding: 10px 15px;
                            border-radius: 5px;
                            font-size: 28px;
                        }
                    }
                    .txt {
                        font-size: 24px;
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
    .topInfo {
        padding: 20px 60px;
        font-size: 18px;
        .txt {
            color: #000;
        }
    }
    .list {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 20px;
        .item {
            position: relative;
            z-index: 0;
            margin: 20px;
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
                    color: #fff;
                    background: #4883f9;
                }
                .angle {
                    position: absolute;
                    right: -16px;
                    bottom: 15px;
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
                    color: #4883f9;
                    background: #fff;
                }
                .angle {
                    position: absolute;
                    left: -15px;
                    bottom: 15px;
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
            }
            .lable {
                display: inline-block;
                max-width: 600px;
                font-size: 32px;
                padding: 20px;
                border-radius: 20px;
                text-align: left;
                line-height: 1.5;
                font-weight: bold;
                box-shadow: 0 0 20px rgba(0, 0, 0, .75);
            }
        }
    }
}

@media screen and (max-width: 400px) {
	.message {
        top: 10%;
        .topInfo {
            padding: 10px 10px 10px 20px;
            font-size: 13px;
            .txt {
                color: #000;
            }
        }
        .frightInfo {
            font-size: 12px;
            border-radius: 10px;
            margin-bottom: 20px;
            overflow: hidden;
            .title {
                font-size: 14px;
                padding: 10px 5px 20px 5px;
            }
            .content {
                padding: 10px 0;
                .info {
                    flex: 1;
                    &:first-child {
                        text-align: left; 
                        padding-left: 20px;
                    }
                    &:last-child {
                        text-align: right; 
                        padding-right: 20px;
                    }
                    .item {
                        &.address {
                            font-size: 24px;
                            font-weight: bolder;
                        }
                        &.number {
                            font-size: 20px;
                        }
                    }
                }
            }
            .destInfo {
                padding: 0 10px 20px 20px;
                text-align: left;
                .des {
                    height: 24px;
                    line-height: 24px;
                    .icon {
                        position: relative;
                        z-index: 0;
                        top: 2px;
                    }
                    .t {
                        font-size: 12px;
                    }
                    .l {
                        font-size: 16px;
                    }
                }
            }
            .bottom {
                padding: 10px;
                color: #fff;
                font-size: 14px;
            }
            .statu {
                padding: 10px;
                font-size: 14px;
                border-radius: 10px 0 0 0;
            }
            .close {
                padding: 10px 15px;
                font-size: 16px;
            }
        }
        .frightList {
            font-size: 14px;
            border-radius: 10px;
            .header {
                display: flex;
                background-color: #3282fd;
                .tableCell {
                    padding: 10px 0;
                }
            } 
            .tableBody {
                .tableRow {
                    display: flex;
                    .tableCell {
                        padding: 10px 0;
                        .la {
                            top: 8px;
                        }
                        .txt {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .list {
            padding: 0 10px;
            .item {
                margin: 10px;
                &.itemListWrap {
                    margin: 8px;
                    .itemList {
                        display: flex;
                        border-radius: 10px;
                        font-size: 12px;
                        .itemWrap {
                            flex: 1;
                            padding: 10px;
                            &:last-child {
                                background-color: #3282fd;
                                color: #fff;
                            }
                            .airlineNameCn {
                                font-size: 14px;
                                font-weight: bolder;
                            }
                            .fltNo {
                                color: #3282fd;
                                font-weight: bolder;
                                font-size: 24px;
                            }
                            .stateCn {
                                padding-top: 10px;
                                text {
                                    display: inline-block;
                                    padding: 5px;
                                    font-size: 12px;
                                }
                            }
                            .txt {
                                padding-top: 10px;
                                font-size: 18px;
                            }
                        }   
                    }
                }
                &.szItem {
                    .angle {
                        right: -10px;
                        bottom: 5px;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent; 
                        border-left: 15px solid #4883f9;
                    }
                }
                &.meItem{
                    .angle {
                        left: -8px;
                        bottom: 5px;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent; 
                        border-right: 15px solid #fff;
                    }
                }
                .lable {
                    max-width: 240px;
                    padding: 5px;
                    font-size: 16px;
                    border-radius: 6px;
                    box-shadow: 0 0 6px rgba(0, 0, 0, .5);
                }
            }
        }
    }
}
</style>
