<template>
    <view>
        <template v-if="isTime">
            <text class="timeNum">({{timeNum}})秒后自动退出</text>
        </template>

        <view class="header">
            
			<view class="box">
				<view class="nav" @click="backActionNav">
                    <uni-icons class="infoIcon" type="arrowleft" color="#297194" size="60"></uni-icons>
					<!-- <image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}" :src="$config.static+'icon06.png'"></image> -->
				</view>
			</view>

		</view>

    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import uniIcons from '@/components/uni/uni-icons/uni-icons.vue';
export default {
    components: {
        uniIcons
    },
    data() {
        return {
            locale: "",
            isOpen: false,
            isTime: false,
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
            self.timeNum = self.$config.timeNum;
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
        ...mapState(["passenger", "isLoading", "isFright", "isVoiceModal"])
    },
    methods: {
        ...mapMutations(["setPassenger", "setIsNoInput", "setIsVoiceing", "clearSuggestAnswer"]),
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
            clearInterval(window.appInfo["_2"]["intervalTime"]);
            window.appInfo["_2"]["stopVoice"]();
            
            if(!!self.worker) {
                self.worker.postMessage('stop');
                self.worker.terminate();
            }
            self.worker = null;
            
            if(!!window.jsBridge) {
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
            }
        },
        // 取消退出
        cancelAction(){
            let self = this;
            self.timeNum = self.$config.timeNum;
            self.timeSubNum = 5;
            self.isTime = false;
            clearInterval(self.timeInterval);
            clearInterval(self.timeSubInterval);
            clearInterval(self.timeOut);
            self.doTimeCountAction();
        },
        // 按下物理返回键
        showbackModal() {
            let self = this;
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
            let time = 30000;

            if(self.isFright == true) {
                time = 30000;
            }

            self.timeOut = setTimeout(()=>{
                self.setIsVoiceing(false);
                self.isTime = true;
                self.worker = new Worker(self.$config.static+'worker.js');
                self.worker.postMessage('start');
                self.worker.onmessage = function (event) {
                    if(self.timeNum != 0) {
                        self.timeNum--;
                    }
                    if(self.timeNum <= 10) {
                        self.setIsNoInput(true);
                    }
                    if (self.timeNum <= 0) {
                        self.backActionNav();
                        self.worker.postMessage('stop');
                        self.worker.terminate();
                    }
                }
            }, time);

        }
	},
	created() {
        let self = this;
        self.timeNum = self.$config.timeNum;
    },
	mounted() {
        let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";

.timeNum {
    position: fixed;
    z-index: 1000000000000000 !important;
    font-size: 18px;
    top: 80px;
    left: 0;
    right: 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
}
.header {
    position: fixed;
    z-index: 10000;
    top: 40px;
    left: 20%;
	.box {
		width: 90%;
		margin: 0 auto;
		color: #4883f9;
		border-radius: 0 0 20px 20px;
		font-size: 32px;
		padding: 10px 0;
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


</style>
