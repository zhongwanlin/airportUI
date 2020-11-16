<template>
    <view>
		<view class="spendLog" @click="isLog=!isLog">>></view>
		<template v-if="isLog">
			<view class="logWrap">
				日志
				<view class="box">
					<view class="title">语音</view>
					<view class="info">
						{{voiceTxtShow}}
					</view>
				</view>
				<view class="box">
					<view class="title">结果</view>
					<view class="info">
						{{JSON.stringify(logInfo)}}
					</view>
				</view>
				<view class="clearout" @click="clearout"><button size="mini" type="primary">清空</button></view>
			</view>
		</template>
		
    </view>
</template>

<script>
import error from "../common/error";
export default {
    props: {
        voiceTxtShow: String,
        logInfo: Object
    },
    components: {},
    data() {
        return {
			userInfo: null,
			locale: "",
            isLog: false,
            txt: "",
            info: {},
            systemInfo: uni.getSystemInfoSync(),
        };
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
		clearout(){
			var self = this;
			self.voiceTxtShow = "";
			self.logInfo = {};
		}
	},
	created() {
        let self = this;

    }
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
</style>
