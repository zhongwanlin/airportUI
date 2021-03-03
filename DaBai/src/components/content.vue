<template>
    <view>
        <view class="mainWrap">


			<!--  v-if="!isVoiceModal" -->
			<template>
			
				<view class="title">
					<view class="label hi">Hi</view>
					<view class="label">我是首都机场</view>
				</view>

			</template>

		</view>

		 <!-- v-show="isVoiceModal" -->
		<template>
			<view>
				<view class="loading">
					<div id="siri-container"></div>
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
// import tagcloud from '../common/tagcloud.js';
import SiriWave from "siriwave";
export default {
    components: {

    },
    data() {
        return {
            locale: "",
			systemInfo: uni.getSystemInfoSync(),
			siriWave: null
        };
    },
    computed: {
        ...mapState(["isFright", "isLoading", "isVoiceModal"])
    },
    watch: {
        isFright(value){
            let self = this;
            if(value == false) {
            }
		},
		isLoading(value){
			let self = this;
			if(value == true) {
				// setTimeout(()=>{
				// 	var siriWave = new SiriWave({
				// 		container: document.getElementById("siri-container"),
				// 		width: window.innerWidth,
				// 		height: 200,
				// 		color: "#1b63dd",
				// 		style: "ios9"
				// 	});
				// }, 2000);
			}
		}
    },
    methods: {
		...mapMutations([
            "setIsVoiceing"
        ]),
        refleshPage(){
            let self = this;
            window.location.href = self.$config.pageUrl+"index.html?t=" + Date.parse(new Date());
		},
		setVoicingDoing(){
			let self = this;
			// self.setIsVoiceing(true);
		}
    },
	created() {
        let self = this;
        window.airport = self.$config.airport;
		self.locale = self.$i18n.locale;
		self.setIsVoiceing(true);
    },
	mounted() {
        let self = this;

		self.siriWave = new SiriWave({
			container: document.getElementById("siri-container"),
			width: window.innerWidth,
			height: 100,
			color: "#1b63dd",
			style: "ios9",
			speed: .7,
			lerpSpeed: 1,
			amplitude: 5
		});
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.mainWrap {
	.title {
		padding-top: 50px;
		text-align: center;
		color: #3fb5d9;
		font-size: 24px;
		opacity: .6;
		.label {
			padding-bottom: 10px;
			text-shadow: 0 0 30px #51c2e4;
			&.hi {
				 font-size: 32px;
				 font-family: sans-serif;
			}
		}
	}
	.info {
		text-align: center;
		font-size: 32px;
		padding-top: 30px;
		color: #9d9d9d;
	}
}
.loading {
	position: absolute;
	z-index: 10;
	bottom: 0;
	left: 0;
	text-align: center;
}

</style>
