<template>
    <view>
        <template v-if="isOnline">
            <view class="onlineMarsker"></view>
            <view class="onlineWrap">
                <view class="errorWrap">
                    <view class="errorTitle"><text>网络故障</text></view>
                    <view class="errorTitle"><text>{{timeNum}}秒后自动退出</text></view>
                </view>
            </view>
        </template>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isOnline: false,
            timeNum: 15,
            timeInterval: null,
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    watch: {
        isOnline(value){
            var self = this;
            if(value == true) {
                self.timeInterval = setInterval(()=>{
                    self.timeNum--;
                    if(self.timeNum <= 0) {
                        self.timeNum = 0; 
                        self.backActionNav();
                    }
                }, 1000);
            } else {
                self.timeNum = 15;
                clearInterval(self.timeInterval);
            }
        }
    },
    methods: {
        backActionNav() {
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
        },
        // 判断网络状态
        onLine(){
            let self = this;
            var img = new Image();
            img.src = self.$config.static + "favicon.ico?t=" + Date.now();
            img.onload=function(){
                self.isOnline = false; 
                self.timeNum = 15;
                clearInterval(self.timeInterval);      
            };
            img.onerror=function(){
                self.isOnline = true;
                self.onLine();   
            };
        }	
	},
	created() {
        let self = this;
        // window.airport = self.$config.airport;
        // self.locale = self.$i18n.locale;

        // 预案处理
        // self.getEmergencyList();
        setInterval(()=>{
            self.onLine();
        }, 15000);
    },
	mounted() {
		let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.onlineMarsker {
    position: fixed;
    z-index: 100000000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
}
.onlineWrap {
    position: fixed;
    z-index: 10000000000;
    left: 10%;
    right: 10%;
    top: 10%;
    bottom: 10%;
    // background-color: #deedfd;
    // border-radius: 20px;
    // box-shadow: 0 0 20px rgba(0, 0, 0, .25);
    .errorWrap {
        margin-top: 50%;
        line-height: 1;
        .errorTitle {
            font-size: 64px;
            text-align: center;
            line-height: 1;
            text {
                padding: 0 20px;
                color: #fff;
                background-color: red;
            }
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
