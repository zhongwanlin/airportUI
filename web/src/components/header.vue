<template>
    <view>
        <template v-if="isTime">
            <text class="timeNum">({{timeNum}})秒后自动退出</text>
        </template>
        <view class="header">
            
			<view class="box">
				<view class="nav" @click="backActionNav">
					<image :style="{width: systemInfo.screenWidth<=1024?'30px':'60px',height:systemInfo.screenWidth<=1024?'30px':'60px'}" src="../static/icon06.png"></image>
                    <text class="backInfo">返回</text>
				</view>
				<view class="icon">
					<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}" src="../static/icon05.png"></image>
				</view>
				<view class="label">
					<text>航班查询</text>
				</view>
			</view>
		</view>

        <template v-if="isSubTime">
            <view class="showModalMasker"></view>
            <view class="showModal">
                <view class="tipsInfo">{{timeSubNum}} 秒后退出</view>
                <view class="btnList">
                    <view class="btnItem" @click="cancelAction">取消</view>
                    <view class="btnItem" @click="backActionNav">确定</view>
                </view>
            </view>
        </template>

    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    components: {

    },
    data() {
        return {
            locale: "",
            isOpen: false,
            isTime: false,
            isSubTime: false,
            timeNum: 30,
            timeInterval: null,
            timeOut: null,
            timeSubInterval: null,
            timeSubNum: 5,
            worker: null,
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    watch: {
        isLoading(value){
            let self = this;
            self.timeNum = 30;
            self.isTime = false;

            clearInterval(self.timeInterval);
            clearInterval(self.timeSubInterval);
            clearInterval(self.timeOut);
            self.setIsNoInput(false);

            if(!!self.worker) {
                self.worker.postMessage('stop');
                self.worker = null;
            }

            if(value == true) {
               self.doTimeCountAction();
            }
        }
    },
    computed: {
        ...mapState(["passenger", "isLoading", "isFright"])
    },
    methods: {
        ...mapMutations(["setPassenger", "setIsNoInput"]),
        refleshPage(){
            let self = this;
            window.location.href = self.$config.pageUrl+"index.html?t=" + Date.parse(new Date());
        },
        // 关闭
        backActionNav(){
            let self = this;
            clearInterval(self.timeInterval);
            clearInterval(self.timeSubInterval);
            clearInterval(self.timeOut);
            if(!!window.jsBridge) {
                window.jsBridge.hxpApi(
                    13,
                    JSON.stringify({}),
                    function (res) {

                    }.toString()
                );
            }
        },
        // 取消退出
        cancelAction(){
            let self = this;
            self.timeNum = 30;
            self.timeSubNum = 5;
            self.isTime = false;
            self.isSubTime = false;
            clearInterval(self.timeInterval);
            clearInterval(self.timeSubInterval);
            clearInterval(self.timeOut);
            self.doTimeCountAction();
        },
        // 按下物理返回键
        showbackModal() {
            let self = this;
            self.isSubTime = true;
            self.timeSubInterval = setInterval(()=>{
                if(self.timeSubNum != 0) {
                    self.timeSubNum--;
                }
                if (self.timeSubNum <= 0) {
                    clearInterval(self.timeSubInterval);
                    self.backActionNav();
                }
            },1000);
        },
        // 执行倒计时
        doTimeCountAction() {
            let self = this;
            let time = 60000;

            if(self.isFright == true) {
                time = 60000;
            }

            self.timeOut = setTimeout(()=>{
                self.isTime = true;
                self.worker = new Worker(self.$config.pageUrl+'static/worker.js');
                self.worker.postMessage('start');
                self.worker.onmessage = function (event) {
                    if(self.timeNum != 0) {
                        self.timeNum--;
                    }
                    if(self.timeNum <= 25) {
                        self.setIsNoInput(true);
                    }
                    if (self.timeNum <= 0) {
                        self.backActionNav();
                        self.worker.postMessage('stop');
                        self.worker.terminate();
                    }
                }
                // self.isTime = true;
                // self.timeInterval = setInterval(()=>{
                //     if(self.timeNum != 0) {
                //         self.timeNum--;
                //     }
                //     if(self.timeNum <= 25) {
                //         self.setIsNoInput(true);
                //     }
                //     if (self.timeNum <= 0) {
                //         self.backActionNav();
                //     }
                // },1000);
            }, time);

        }
	},
	created() {
        let self = this;

        // self.doTimeCountAction();
    },
	mounted() {
        let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.showModalMasker {
	position: fixed;
	z-index: 100000000000;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
}
.showModal {
    position: fixed;
	z-index: 1000000000000;
	left: 20%;
	right: 20%;
	top: 30%;
	overflow-x: hidden;
	overflow-y: auto;
    background-color: #fff;
    border-radius: 30px;
    .tipsInfo {
        padding: 40px 0;
        text-align: center;
        font-size: 48px;
    }
    .btnList {
        display: flex;
        padding: 20px;
        .btnItem {
            flex: 1;
            text-align: center;
            font-size: 36px;
            &:last-child {
                color: #4883f9;
            }
        }
    }
}
.timeNum {
    position: fixed;
    z-index: 1000000000000000 !important;
    font-size: 24px;
    top: 10px;
    left: 200px;
    padding-left: 20px;
    color: rgba(255, 255, 255, .7);
}
.header {
	.box {
		width: 90%;
		margin: 0 auto;
		color: #fff;
		border-radius: 0 0 20px 20px;
		background-color: #4883f9;
		overflow: hidden;
		font-size: 32px;
		padding: 10px 0;
    }
    .backInfo {
        position: relative;
        z-index: 0;
        top: -5px;
        padding-left: 20px;
        font-size: 24px;
    }
	.wellcome {
		display: inline-block;
		padding-top: 20px;
		padding-left: 30px;
	}
	.nav {
		float: left;
		position: relative;
		z-index: 0;
		top: 10px;
        left: 20px;
    }
	.label,
	.icon {
		float: right;
		margin-right: 20px;
	}
	.label {
		text {
			position: relative;
			z-index: 0;
			top: 0;
		}
	}
}
.swichPage {
    position: fixed;
    z-index: 1000000000;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.4);
    .list {
        padding-top: 130px;
        width: 100%;
        text-align: center;
        .item {
            width: 50%;
            font-size: 32px;
            color: #fff;
            margin: 0 auto 30px auto;
            border-radius: 20px;
            padding: 40px 0;
            text-shadow: 0 0 3px rgba(0,0,0,.6);
            background: #fff url("~@/static/bg.jpg") no-repeat left bottom;
            background-size: cover;
            &.item2 {
                background-position: left -700px;
            }
            &.item3 {
                background-position: right -800px;
            }
            &.item4 {
                background-position: center -900px;
            }
            &.item5 {
                background-position: center -1000px;
            }
        }
        .close {
            width: 50px;
            height: 50px;
            line-height: 50px;
            margin: 0 auto;
            border-radius: 50%;
            text-align: center;
            background-color: rgba(241,241,244,.8);
            font-size: 32px;
        }
    }
}

@media screen and (max-width: 1024px) {
	.header {
		.box {
			font-size: 18px;
		}
		.nav {
			top: 0px;
		}
		
		.label {
			text {
				position: relative;
				z-index: 0;
				top: 5px;
			}
		}
	}
}
@media screen and (max-width: 1090px) {
    .swichPage {
        .list {
            padding-top: 180px;
            width: 100%;
            text-align: center;
            .item {
                width: 80%;
                font-size: 48px;
                color: #fff;
                margin: 0 auto 20px auto;
                border-radius: 10px;
                padding: 40px 0;
                &.item2 {
                    background-position: left -100px;
                }
                &.item3 {
                    background-position: right -600px;
                }
                &.item4 {
                    background-position: center -900px;
                }
                &.item5 {
                    background-position: center -200px;
                }
            }
            .close {
                width: 80px;
                height: 80px;
                line-height: 80px;
                font-size: 56px;
            }
        }
    }
}
@media screen and (max-width: 400px) {
	.header {
		.label {
			text {
				top: 5px;
			}
        }
        .nav {
            .timeNum {
                top: -8px;
                padding-left: 10px;
            }
        }
    }
    .swichPage {
        .list {
            padding-top: 80px;
            width: 100%;
            text-align: center;
            .item {
                width: 80%;
                font-size: 18px;
                color: #fff;
                margin: 0 auto 10px auto;
                border-radius: 10px;
                padding: 20px 0;
                &.item2 {
                    background-position: left -240px;
                }
                &.item3 {
                    background-position: right -190px;
                }
                &.item4 {
                    background-position: center -280px;
                }
                &.item5 {
                    background-position: center -220px;
                }
            }
            .close {
                width: 30px;
                height: 30px;
                line-height: 30px;
                font-size: 18px;
            }
        }
    }
}

</style>
