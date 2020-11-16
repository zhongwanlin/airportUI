<template>
    <view>
        <view class="mainWrap">
			
            <view class="title">
				<view class="label">嗨，我是小美，</view>
				<view class="label">您的语音小助手。</view>
			</view>
			<view class="info">我懂得可多了，号称百事通，快来问我吧！</view>
			
			<view class="bgWrap" :style="{width: systemInfo.screenWidth<=1024?'300px':'750px',height:systemInfo.screenWidth<=1024?'320px':'760px'}">
				<image :style="{width: systemInfo.screenWidth<=1024?'300px':'750px',height:systemInfo.screenWidth<=1024?'320px':'760px'}" src="../static/bg.png"></image>
				<view class="voiceGif" @click="refleshPage">
                    <template v-if="isLoading"><view class="loading"><i class="uni-icon_toast uni-loading"></i></view></template>
                    <image class="imgGif" style="width: 300px;height: 200px;" src="../static/yuyin.gif"></image>
                </view>
			</view>

            <template v-if="!isFright">
                <div class="tagcloudWrap">
                    <div class="tagcloud">
                        <span>“有什么好吃的”<i class="triangle-down"></i></span>
                        <span>“停车场收费”<i class="triangle-down"></i></span>
                        <span>“医疗室在哪”<i class="triangle-down"></i></span>
                        <span>“南航 7645”<i class="triangle-down"></i></span>
                        <span>“买礼物”<i class="triangle-down"></i></span>
                        <span>“预约大巴”<i class="triangle-down"></i></span>
                        <span>“哪些东西不能带上飞机”<i class="triangle-down"></i></span>
                        <span>“我的航班”<i class="triangle-down"></i></span>
                    </div>
                </div>
            </template>
		</view>
    </view>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import tagcloud from '../common/tagcloud.js';
export default {
    components: {

    },
    data() {
        return {
            locale: "",
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState(["isFright", "isLoading"])
    },
    watch: {
        isFright(value){
            let self = this;
            if(value == false) {
                // setTimeout(()=>{
                //     let tagcloudFun = tagcloud({
                //         selector: ".tagcloud",//元素选择器
                //         fontsize: 18,//基本字体大小, 单位px
                //         radius: self.systemInfo.screenWidth/4,//滚动半径, 单位px
                //         mspeed: "slow",//滚动最大速度, 取值: slow, normal(默认), fast
                //         ispeed: "slow",//滚动初速度, 取值: slow, normal(默认), fast
                //         direction: 0,
                //         keep: true //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
                //     });
                // }, 1500);
            }
        }
    },
    methods: {
        refleshPage(){
            let self = this;
            window.location.href = self.$config.pageUrl+"index.html?t=" + Date.parse(new Date());
        }
    },
	created() {
        let self = this;
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;
    },
	mounted() {
        let self = this;
        setTimeout(()=>{
			let tagcloudFun = tagcloud({
				selector: ".tagcloud",//元素选择器
				fontsize: 18,//基本字体大小, 单位px
				radius: self.systemInfo.screenWidth/4,//滚动半径, 单位px
				mspeed: "slow",//滚动最大速度, 取值: slow, normal(默认), fast
				ispeed: "slow",//滚动初速度, 取值: slow, normal(默认), fast
				direction: 0,
				keep: true //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
			});
		}, 1500);
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.mainWrap {
	.title {
		padding-top: 100px;
		text-align: center;
		color: #000;
	}
	.info {
		text-align: center;
		font-size: 32px;
		padding-top: 30px;
		color: #9d9d9d;
	}
	.bgWrap {
		position: relative;
		z-index: 0;
		text-align: center;
		margin: 0 auto;
		margin-top: 100px;
		.voiceGif {
			position: absolute;
			z-index: 10;
			top: 311px;
			left: 305px;
			width: 150px;
			height: 150px;
			border-radius: 50%;
			overflow: hidden;
			text-align: center;
			.imgGif {
				position: relative;
				z-index: 0;
				left: -75px;
				top: -30px;
			}
			.loading {
				position: absolute;
				z-index: 10;
				top: 0;
				width: 150px;
				height: 150px;
				background-color: rgba(0,0,0,.5);
				text-align: center;
				.uni-loading {
					position: relative;
					z-index: 10;
					top: 20px;
					width: 70px;
					height: 70px;
				}
			}
		}
	}
}

.tagcloudWrap {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 30%;
	bottom: 30%;
	left: 20%;
	right: 0;
	margin: 0 auto;
	.tagcloud { 
		position: relative;
		z-index: 0;
		span { 
			position: relative;
			z-index: 0;
			padding: 20px 40px;  
			color: #70a1dd; 
			border: 1px solid #c3dbfe; 
			border-radius: 20px; 
			background-color: #f2f4f8; 
			text-decoration: none; 
			white-space: nowrap;
			font-size: 24px;
			&:hover { 
				color: #3385cf; 
			} 
			.triangle-down {
				position: absolute;
				z-index: 0;
				bottom: -16px;
				right: 15px;
			    width: 0;
			    height: 0;
			    border-left: 20px solid transparent;
			    border-right: 20px solid transparent;
			    border-top: 20px solid #f2f4f8;
			}
		}
	}
}

@media screen and (max-width: 1024px) {
	.mainWrap {
		.title {
			padding-top: 30px;
			font-size: 32px;
		}
		.info {
			font-size: 14px;
			padding-top: 10px;
		}
		.bgWrap {
			position: relative;
			z-index: 0;
			margin-top: 100px;
			text-align: center;
			transform: scale(1.5);
			.voiceGif {
				position: absolute;
				z-index: 10;
				top: 124px;
				left: 120px;
				width: 73px;
				height: 75px;
				border-radius: 50%;
				overflow: hidden;
				text-align: center;
				.imgGif {
					position: relative;
					z-index: 0;
					left: -112px;
					top: -60px;
				}
				.loading {
					width: 75px;
					height: 75px;
					.uni-loading {
						top: 5px;
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}
	.tagcloudWrap {
		.tagcloud { 
			position: relative;
			z-index: 0;
			span { 
				padding: 10px 20px;  
				font-size: 16px;
				&:hover { 
					color: #3385cf; 
				} 
				.triangle-down {
					bottom: -6px;
				    border-left: 10px solid transparent;
				    border-right: 20px solid transparent;
				    border-top: 10px solid #f2f4f8;
				}
			}
		}
	}
}

@media screen and (max-width: 400px) {
	.mainWrap {
		.bgWrap {
			margin-top: 30px;
			transform: scale(1);
			.voiceGif {
				left: 120px;
				.loading {
					width: 75px;
					height: 75px;
					.uni-loading {
						top: 20px;
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}
}

</style>
