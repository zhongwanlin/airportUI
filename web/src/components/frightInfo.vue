<template>
    <view >
        <template v-if="isFright">
            <!-- <view class="frightMasker"></view> -->
            <view class="frightWrap animate__animated" :style="{maxHeight: (systemInfo.windowHeight)+'px'}" :class="{'animate__backInUp': isFright,'animate__backOutDown': !isFright}">
				
				<div class="message">
					<div class="list" ref="message">
						<template v-for="(item, index) in suggestAnswer">
							<!-- 旅客问题 -->
							<template v-if="item.type==1">
								<div :key="index" class="item szItem animate__animated" :class="item.animate">
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
									<div :key="index" class="item meItem animate__animated" :class="item.animate">
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

				<template v-if="!!frightInfo['fltNo']">
					<view class="frightInfo">
						<view class="content">
							<view class="info">
								<view class="item label">航班号</view>
								<view class="item number">{{frightInfo["fltNo"]}}</view>
							</view>
							<view class="info">
								<view class="item label">
									值机柜台
								</view>
								<view class="item address">
									{{frightInfo.cntDisp}}
								</view>
							</view>
							<view class="info">
								<view class="item label">登机口</view>
								<view class="item number" style="color: #FF5722;">{{frightInfo["gatDisp"]}}</view>
							</view>
						</view>
						<view class="destInfo">
							<view class="des">
								<text class="icon">
									<svg t="1605357376884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="24" height="24"><path d="M912.2 498.6c-10.2-6.3-22.8-12.9-38.2-19.4-8.9 4.2-22.5 6.8-39.7 6.8-22.2 0-23.9 32.6 2.3 33.4 30.7 1 63.2-9.1 75.6-20.8z m-195.4-2.2c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3s21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3 11.7 0 21.3-9.6 21.3-21.3z m-72.6 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.3 9.5-21.3 21.3 0 11.7 9.6 21.3 21.3 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m-72.7 0c0-11.7-9.5-21.3-21.3-21.3s-21.4 9.5-21.4 21.3c0 11.7 9.5 21.3 21.4 21.3 11.8 0 21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.4 9.5-21.4 21.3 0 11.7 9.6 21.3 21.4 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m541.4 28.3c-3.6 30.3-77.1 45.7-116.6 45.7H681.8L313.6 809.8l-68.3 0.1s97.2-122.2 115.6-147.1c17-23 43.9-53.3 44-92.3h-31.1c-84.9 0-200.9-54.6-268.6-80.5-41-15.6-34.8-58.2-0.5-58.2h0.6l-48-163.9h52.6S173.1 350 194.8 376c29.1 34.8 65.5 53 119.6 55.8h446.7c31.5 0 62.7 6 90.9 15.1 50.8 16.9 85.3 38.9 104.7 58 8.8 8.4 11.8 14.8 11.2 19.8zM581.2 403.4L401.4 257.6l-68.2-0.1s58.1 118.5 70.2 145.9h177.8z m90.9 215.2c-1.4-0.5-3-1-5-1h-3.9l-103.6 67.3c12.8 11.8 35.2 20.4 63.2 20.4 14.2 0 33-0.1 44.3-0.1 2 0 3.6-0.5 5-1-9.3-8-15.5-23.7-15.5-42.8-0.1-19.2 6.1-34.9 15.5-42.8z m14.1 14.1c-2.4 0-9.8 10.2-9.8 28.6s7.3 28.6 9.8 28.6c2.4 0 9.8-10.2 9.8-28.6s-7.4-28.6-9.8-28.6z m-2.8-242.6c-1.6 0-5.5 4.7-7.8 13.3h15.6c-2.4-8.6-6.2-13.3-7.8-13.3z m-28.2 13.3c2.3-12.1 7.3-21.7 14-27.4-1.4-0.5-3-1-5-1-11.3-0.1-30.1-0.1-44.3-0.1-9.2 0-17.7 1-25.5 2.6l32 26h28.8zM121.8 527.3l43.6 17.4-41.9 32.7-32.2-0.2 30.5-49.9z" fill="#00A7F7" p-id="5229"></path></svg>
								</text>
								<text class="t">从</text>
								<text class="l">{{frightInfo.startAirportCn}}</text>
								<text class="c">{{frightInfo.startSdt}}</text>
							</view>
							<view class="des">
								<text class="icon">
									<svg t="1605357376884" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="24" height="24"><path d="M912.2 498.6c-10.2-6.3-22.8-12.9-38.2-19.4-8.9 4.2-22.5 6.8-39.7 6.8-22.2 0-23.9 32.6 2.3 33.4 30.7 1 63.2-9.1 75.6-20.8z m-195.4-2.2c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3s21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.5-21.3-21.3-21.3s-21.3 9.5-21.3 21.3c0 11.7 9.5 21.3 21.3 21.3 11.7 0 21.3-9.6 21.3-21.3z m-72.6 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.3 9.5-21.3 21.3 0 11.7 9.6 21.3 21.3 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m-72.7 0c0-11.7-9.5-21.3-21.3-21.3s-21.4 9.5-21.4 21.3c0 11.7 9.5 21.3 21.4 21.3 11.8 0 21.3-9.6 21.3-21.3z m-72.5 0c0-11.7-9.6-21.3-21.3-21.3-11.8 0-21.4 9.5-21.4 21.3 0 11.7 9.6 21.3 21.4 21.3 11.7-0.1 21.3-9.6 21.3-21.3z m541.4 28.3c-3.6 30.3-77.1 45.7-116.6 45.7H681.8L313.6 809.8l-68.3 0.1s97.2-122.2 115.6-147.1c17-23 43.9-53.3 44-92.3h-31.1c-84.9 0-200.9-54.6-268.6-80.5-41-15.6-34.8-58.2-0.5-58.2h0.6l-48-163.9h52.6S173.1 350 194.8 376c29.1 34.8 65.5 53 119.6 55.8h446.7c31.5 0 62.7 6 90.9 15.1 50.8 16.9 85.3 38.9 104.7 58 8.8 8.4 11.8 14.8 11.2 19.8zM581.2 403.4L401.4 257.6l-68.2-0.1s58.1 118.5 70.2 145.9h177.8z m90.9 215.2c-1.4-0.5-3-1-5-1h-3.9l-103.6 67.3c12.8 11.8 35.2 20.4 63.2 20.4 14.2 0 33-0.1 44.3-0.1 2 0 3.6-0.5 5-1-9.3-8-15.5-23.7-15.5-42.8-0.1-19.2 6.1-34.9 15.5-42.8z m14.1 14.1c-2.4 0-9.8 10.2-9.8 28.6s7.3 28.6 9.8 28.6c2.4 0 9.8-10.2 9.8-28.6s-7.4-28.6-9.8-28.6z m-2.8-242.6c-1.6 0-5.5 4.7-7.8 13.3h15.6c-2.4-8.6-6.2-13.3-7.8-13.3z m-28.2 13.3c2.3-12.1 7.3-21.7 14-27.4-1.4-0.5-3-1-5-1-11.3-0.1-30.1-0.1-44.3-0.1-9.2 0-17.7 1-25.5 2.6l32 26h28.8zM121.8 527.3l43.6 17.4-41.9 32.7-32.2-0.2 30.5-49.9z" fill="#00A7F7" p-id="5229"></path></svg>
								</text>
								<text class="t">往</text>
								<text class="l">{{frightInfo.destAirportCn}}</text>
								<text class="c">{{frightInfo.destSdt}}</text>
							</view>
						</view>
						<view class="bottom">
								<!-- 到达航班 -->
								<template v-if="frightInfo.arrdep=='A'">
									<text>
										<template v-if="frightInfo.startSdtInfo.isOver">已在 {{frightInfo.desTime}} 到达</template>
										<template v-else>
											预计
											<template v-if="frightInfo.destActTimeInfo.day>0">{{frightInfo.destActTimeInfo.day}}天</template>
											<template v-if="frightInfo.destActTimeInfo.hour>0">{{frightInfo.destActTimeInfo.hour}}小时</template>
											{{frightInfo.destActTimeInfo.minute}}分钟后到达
										</template>
									</text>
								</template>

								<!-- 出发航班 -->
								<template v-if="frightInfo.arrdep=='D'">
									<text>
										<template v-if="frightInfo.startSdtInfo.isOver">已在 {{frightInfo.startActTime}} 起飞</template>
										<template v-else>
											预计
											<template v-if="frightInfo.startSdtInfo.day>0">{{frightInfo.startSdtInfo.day}}天</template>
											<template v-if="frightInfo.startSdtInfo.hour>0">{{frightInfo.startSdtInfo.hour}}小时</template>
											{{frightInfo.startSdtInfo.minute}}分钟后起飞
										</template>
									</text>
								</template>
								<!-- <view style="float: right;">您可以说"查询其他航班"</view> -->
						</view>
						
					</view>
                </template>

				<view class="closeList" @click="setIsRestart(true)">X</view>
                
				<template v-if="flightList.length > 0">

					<view class="frightList">
						<view class="header">
							<view class="tableCell tableCell--num">No.</view>
							<view class="tableCell tableCell--fltNo">航班号</view>
							<view class="tableCell">出发</view>
							<view class="tableCell">到达</view>
							<view class="tableCell">状态</view>
						</view>
						<view class="listWrap">

							<scroll-view :style="{maxHeight: maxHeight+'px'}" :scroll-top="currentIndex>7?(currentIndex)*80:0" scroll-y="true">
								<view class="tableBody">
									<template v-for="(info, i) in flightList">
										<view class="tableRow" :key="i" :class="{'currentItem': currentIndex==i}" @click="getFrightInfo(info,i)">
											<view class="tableCell tableCell--num">
												<view class="num">{{i+1}}</view>
											</view>
											<view class="tableCell tableCell--fltNo">
												<view class="la">{{info.fltNo}}</view>
											</view>
											<view class="tableCell">
												<view class="txt">{{info.startCityCn}}</view>
												<view class="time">{{info.startSdt}}</view>
											</view>
											<view class="tableCell">
												<view class="txt">{{info.endCityCn}}</view>
												<view class="time">{{info.destSdt}}</view>
											</view>
											<view class="tableCell" :style="{color: info.stateColor}">
												<view class="la">{{info.stateCn}}</view>
											</view>
										</view>
									</template>
								</view>
							</scroll-view>

							<template v-if="totalCount>=flightList.length">
								<view class="pageList">
									<view class="item" @click="setPressPage('press_上一页')">《上一页</view>
									<view class="item" @click="setPressPage('press_下一页')">下一页》</view>
								</view>
							</template>

						</view>
						
					</view>

				</template>
                
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
			maxHeight: 0,
			detailInfoH: 0,
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState([
			"isFright", 
			"flightList", 
			"frightInfo",
			"totalCount",
			"currentIndex",
			"detailInfo",
			"suggestAnswer",
			"isDownTime"
		])
    },
    watch: {
        frightInfo(){
            let self = this;
            if(!!self.frightInfo.real_open_time) {
                self.timeInfo = self.$utility.timeDiff(self.frightInfo.real_open_time);
            }
		},
    },
    methods: {
		...mapMutations([
			"setIsFright", 
			"setFrightInfo", 
			"setIsRestart", 
			"setCurrentIndex",
			"setPressPage",
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

		self.maxHeight = (!!self.frightInfo['fltNo']?(self.systemInfo.screenHeight/2-100):(self.systemInfo.screenHeight/2+60)-self.detailInfoH);
		self.$watch('suggestAnswer', function () {
            clearTimeout(userTimeOut);
            let list = [];
            userTimeOut = setTimeout(() => {
                setTimeout(()=>{
                    if(self.suggestAnswer.length >= 2) {
                        list.push(self.suggestAnswer[self.suggestAnswer.length - 1]);
                        self.initSuggestAnswer(list);
                    }
                }, 5000);
            }, 200);
        }, {
            deep: true
        });
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
	z-index: 100;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255,255,255, 0);
}
.detailInfo {
	position: relative;
	z-index: 0;
	display: inline-block;
	max-width: 100%;
	font-size: 32px;
	padding: 20px;
	border-radius: 20px;
	text-align: left;
	line-height: 1.5;
	font-weight: bold;
	background-color: #ffffff;
	margin-bottom: 20px;
	box-shadow: 0 0 20px rgba(0, 0, 0, .75);
	color: #3282fd;
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
.frightWrap {
	position: fixed;
	z-index: 1000;
	left: 5%;
	right: 5%;
	top: 4%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: transparent;
	.frightInfo {
        position: relative;
        z-index: 0;
        font-size: 24px;
        text-align: center;
        border-radius: 20px;
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
	.closeList {
		width: 30px;
		height: 30px;
		line-height: 30px;
		margin: 5px auto;
		font-size: 28px;
		padding: 10px;
		color: #fff;
		border-radius: 50%;
		font-weight: bolder;
		background-color: #3282fd;
		text-align: center;
	}
	.pageList {
		display: flex;
		padding: 20px;
		.item {
			flex: 1;
			font-size: 48px;
			color: #3282fd;
		}
	}
	.frightList {
		font-size: 36px;
		text-align: center;
		padding: 0;
		background-color: transparent;
		overflow: hidden;
		.header {
			display: flex;
			border-radius: 20px 20px 0 0;
			background-color: #3282fd;
			font-size: 28px;
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
			background-color: #fff;
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
						font-size: 28px;
					}
					.num {
						position: relative;
						z-index: 0;
						top: 15px;
						font-size: 32px;
					}
					.la {
						position: relative;
						z-index: 0;
						top: 15px;
						font-size: 28px;
						text {
							color: #fff;
							display: inline-block;
							padding: 10px 15px;
							border-radius: 5px;
							font-size: 20px;
						}
					}
					.txt {
						font-size: 20px;
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

.message {
    .list {
        overflow-x: hidden;
        overflow-y: auto;
        padding: 0 20px;
        .item {
            position: relative;
            z-index: 0;
            margin: 10px 0;
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
                    right: -14px;
                    bottom: 5px;
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
                    bottom: 5px;
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
                font-size: 24px;
                padding: 10px;
                border-radius: 20px;
                text-align: left;
                line-height: 1.5;
                font-weight: bold;
                box-shadow: 0 0 20px rgba(0, 0, 0, .75);
            }
        }
    }
}

@media screen and (max-width: 1024px) {
	
}

@media screen and (max-width: 400px) {
	.detailInfo {
		font-size: 16px;
	}

	// .message {
	// 	.list {
	// 		.item {
	// 			.lable {
	// 				font-size: 14px;
	// 			}
	// 			&.szItem {
	// 				.angle {
	// 					right: -15px;
	// 					bottom: 5px;
	// 					border-top: 10px solid transparent;
	// 					border-bottom: 10px solid transparent; 
	// 					border-left: 15px solid #4883f9;
	// 				}
	// 			}
	// 			&.meItem{
	// 				.angle {
	// 					left: -10px;
	// 					bottom: 5px;
	// 					border-top: 10px solid transparent;
	// 					border-bottom: 10px solid transparent; 
	// 					border-right: 15px solid #fff;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	.frightWrap {

		// .closeList {
		// 	font-size: 16px;
		// 	width: 20px;
		// 	height: 20px;
		// 	line-height: 20px;
		// 	padding: 5px;
		// }

		.frightList {
			font-size: 14px;
			border-radius: 10px;
			.header {
				display: flex;
				background-color: #3282fd;
				font-size: 13px;
				.tableCell {
					padding: 10px 0;
				}
			} 
			.tableBody {
				.tableRow {
					display: flex;
					.tableCell {
						padding: 10px 0;
						// padding: 5px 0;
						font-size: 13px;
						// .num {
						// 	font-size: 13px;
						// }
						.la {
							top: 8px;
							// font-size: 13px;
						}
						// .time {
						// 	font-size: 13px;
						// }
						.txt {
							font-size: 14px;
						}
					}
				}
			}
		}
		.frightInfo {
			font-size: 12px;
			border-radius: 10px;
			margin-bottom: 20px;
			// margin-bottom: 10px;
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
	}
}

</style>
