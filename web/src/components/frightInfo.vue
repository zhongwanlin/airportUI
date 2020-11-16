<template>
    <view >
        <template v-if="isFright">
            <view class="frightMasker"></view>
            <view class="frightWrap animate__animated" :class="{'animate__backInUp': isFright,'animate__backOutDown': !isFright}">
                <view class="frightInfo">
                    <view class="title">航班信息如下</view>
                    <view class="content">
                        <view class="info">
                            <view class="item address">{{frightInfo["route_cn_list"][0]}}</view>
                            <view class="item label">航班号</view>
                            <view class="item number">{{frightInfo["flight_no"]}}</view>
                        </view>
                        <view class="info">
                            <template v-if="systemInfo.screenWidth<=1024">
                            <svg t="1605357376884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="80" height="80"><path d="M912.2 498.6c-10.2-6.3-22.8-12.9-38.2-19.4-8.9 4.2-22.5 6.8-39.7 6.8-22.2 0-23.9 32.6 2.3 33.4 30.7 1 63.2-9.1 75.6-20.8z m-195.4-2.2c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3s21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3 11.7 0 21.3-9.6 21.3-21.3z m-72.6 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.3 9.5-21.3 21.3 0 11.7 9.6 21.3 21.3 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m-72.7 0c0-11.7-9.5-21.3-21.3-21.3s-21.4 9.5-21.4 21.3c0 11.7 9.5 21.3 21.4 21.3 11.8 0 21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.4 9.5-21.4 21.3 0 11.7 9.6 21.3 21.4 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m541.4 28.3c-3.6 30.3-77.1 45.7-116.6 45.7H681.8L313.6 809.8l-68.3 0.1s97.2-122.2 115.6-147.1c17-23 43.9-53.3 44-92.3h-31.1c-84.9 0-200.9-54.6-268.6-80.5-41-15.6-34.8-58.2-0.5-58.2h0.6l-48-163.9h52.6S173.1 350 194.8 376c29.1 34.8 65.5 53 119.6 55.8h446.7c31.5 0 62.7 6 90.9 15.1 50.8 16.9 85.3 38.9 104.7 58 8.8 8.4 11.8 14.8 11.2 19.8zM581.2 403.4L401.4 257.6l-68.2-0.1s58.1 118.5 70.2 145.9h177.8z m90.9 215.2c-1.4-0.5-3-1-5-1h-3.9l-103.6 67.3c12.8 11.8 35.2 20.4 63.2 20.4 14.2 0 33-0.1 44.3-0.1 2 0 3.6-0.5 5-1-9.3-8-15.5-23.7-15.5-42.8-0.1-19.2 6.1-34.9 15.5-42.8z m14.1 14.1c-2.4 0-9.8 10.2-9.8 28.6s7.3 28.6 9.8 28.6c2.4 0 9.8-10.2 9.8-28.6s-7.4-28.6-9.8-28.6z m-2.8-242.6c-1.6 0-5.5 4.7-7.8 13.3h15.6c-2.4-8.6-6.2-13.3-7.8-13.3z m-28.2 13.3c2.3-12.1 7.3-21.7 14-27.4-1.4-0.5-3-1-5-1-11.3-0.1-30.1-0.1-44.3-0.1-9.2 0-17.7 1-25.5 2.6l32 26h28.8zM121.8 527.3l43.6 17.4-41.9 32.7-32.2-0.2 30.5-49.9z" fill="#00A7F7" p-id="5229"></path></svg>
                            </template>
                            <template v-else>
                                <svg t="1605357376884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="200" height="200"><path d="M912.2 498.6c-10.2-6.3-22.8-12.9-38.2-19.4-8.9 4.2-22.5 6.8-39.7 6.8-22.2 0-23.9 32.6 2.3 33.4 30.7 1 63.2-9.1 75.6-20.8z m-195.4-2.2c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3s21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3 11.7 0 21.3-9.6 21.3-21.3z m-72.6 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.3 9.5-21.3 21.3 0 11.7 9.6 21.3 21.3 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m-72.7 0c0-11.7-9.5-21.3-21.3-21.3s-21.4 9.5-21.4 21.3c0 11.7 9.5 21.3 21.4 21.3 11.8 0 21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.4 9.5-21.4 21.3 0 11.7 9.6 21.3 21.4 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m541.4 28.3c-3.6 30.3-77.1 45.7-116.6 45.7H681.8L313.6 809.8l-68.3 0.1s97.2-122.2 115.6-147.1c17-23 43.9-53.3 44-92.3h-31.1c-84.9 0-200.9-54.6-268.6-80.5-41-15.6-34.8-58.2-0.5-58.2h0.6l-48-163.9h52.6S173.1 350 194.8 376c29.1 34.8 65.5 53 119.6 55.8h446.7c31.5 0 62.7 6 90.9 15.1 50.8 16.9 85.3 38.9 104.7 58 8.8 8.4 11.8 14.8 11.2 19.8zM581.2 403.4L401.4 257.6l-68.2-0.1s58.1 118.5 70.2 145.9h177.8z m90.9 215.2c-1.4-0.5-3-1-5-1h-3.9l-103.6 67.3c12.8 11.8 35.2 20.4 63.2 20.4 14.2 0 33-0.1 44.3-0.1 2 0 3.6-0.5 5-1-9.3-8-15.5-23.7-15.5-42.8-0.1-19.2 6.1-34.9 15.5-42.8z m14.1 14.1c-2.4 0-9.8 10.2-9.8 28.6s7.3 28.6 9.8 28.6c2.4 0 9.8-10.2 9.8-28.6s-7.4-28.6-9.8-28.6z m-2.8-242.6c-1.6 0-5.5 4.7-7.8 13.3h15.6c-2.4-8.6-6.2-13.3-7.8-13.3z m-28.2 13.3c2.3-12.1 7.3-21.7 14-27.4-1.4-0.5-3-1-5-1-11.3-0.1-30.1-0.1-44.3-0.1-9.2 0-17.7 1-25.5 2.6l32 26h28.8zM121.8 527.3l43.6 17.4-41.9 32.7-32.2-0.2 30.5-49.9z" fill="#00A7F7" p-id="5229"></path></svg>
                            </template>
                        </view>
                        <view class="info">
                            <view class="item address">{{frightInfo["route_cn_list"][1]}}</view>
                            <view class="item label">登机口</view>
                            <view class="item number">{{frightInfo["real_gate_name"]}}</view>
                        </view>
                    </view>
                    <view class="bottom">
                        <text>预计
                            <template v-if="timeInfo.hour>0">{{timeInfo.hour}}小时</template>
                            {{timeInfo.minute}}分钟后开始登记</text>
                    </view>
                    <view class="statu" :style="{backgroundColor: $config.status['_'+frightInfo.status]['color']}">{{$config.status['_'+frightInfo.status]["name"]}}</view>
                    <view class="close" @click="setIsFright(false)">X</view>
                </view>
                
                <view class="frightList">
                    <view class="header">
                        <view class="tableCell">计划时间</view>
                        <view class="tableCell">航班号</view>
                        <view class="tableCell">航站楼</view>
                        <view class="tableCell">登机口</view>
                        <view class="tableCell">状态</view>
                    </view>
                    <scroll-view :style="{maxHeight: (systemInfo.screenHeight/3+50)+'px'}" scroll-y="true">
                    <view class="tableBody">
                        <!-- <template v-for="i in 30"> -->
                        <template v-for="(item, index) in flightList">
                            <view class="tableRow" :key="index" @click="setFrightInfo(item)">
                                <view class="tableCell">{{item.plan_take_off}}</view>
                                <view class="tableCell">{{item.flight_no}}</view>
                                <view class="tableCell">{{item.terminal}}</view>
                                <view class="tableCell">{{item.plan_gate_name}}</view>
                                <view class="tableCell" :style="{color: $config.status['_'+item.status]['color']}">{{$config.status['_'+item.status]["name"]}}</view>
                            </view>
                        </template>
                        <!-- </template> -->
                    </view>
                    </scroll-view>
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
            timeInfo: "",
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState(["isFright", "flightList", "frightInfo"])
    },
    watch: {
        frightInfo(){
            let self = this;
            if(!!self.frightInfo.real_open_time) {
                self.timeInfo = self.$utility.timeDiff(self.frightInfo.real_open_time);
            }
        }
    },
    methods: {
        ...mapMutations(["setIsFright", "setFrightInfo"]),
	},
	created() {
        let self = this;
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;
    },
	mounted() {
        let self = this;
        
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.frightMasker {
	position: fixed;
	z-index: 1000000;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(241,241,244,.8);
}
.frightWrap {
	position: fixed;
	z-index: 100000000;
	left: 5%;
	right: 5%;
	top: 8%;
	.frightInfo {
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
			.info {
				flex: 1;
				.item {
					padding-bottom: 30px;
					&.address {
						font-size: 56px;
						font-weight: bolder;
					}
					&.number {
						font-size: 36px;
					}
				}
			}
		}
		.bottom {
			padding: 20px;
			color: #fff;
			font-size: 36px;
			background-image: linear-gradient(to right, #3282fd, #c0d9fe);
		}
		.statu {
			position: absolute;
			z-index: 0;
			top: 0;
			right: 0;
			padding: 20px;
			font-size: 32px;
			color: #fff;
			border-radius: 0 0 0 20px;
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
				
				.tableCell {
					flex: 1;
					padding: 20px 0;
					color: #2a71b1;
					&.error {
						color: red;
					}
				}
				&:nth-child(2n) {
					background-color: #b3cff9;
				}
			}
		}
	}
}

@media screen and (max-width: 1024px) {

	.frightWrap {
		top: 13%;
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
				.info {
					flex: 1;
					.item {
						padding-bottom: 10px;
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
			.bottom {
				padding: 10px;
				color: #fff;
				font-size: 18px;
			}
			.statu {
				padding: 10px;
				font-size: 14px;
				border-radius: 0 0 0 10px;
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
					}
				}
			}
		}
	}
}

@media screen and (max-width: 400px) {
	.frightWrap {
		top: 10%;
	}
}

</style>
