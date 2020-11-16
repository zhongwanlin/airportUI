<template>
    <view>
        <view class="footer">
            <view class="listWrap">
                <view class="list">
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}"  src="../static/icon01.png"></image>
							</view>
							<view class="label">
								<text>航班查询</text>
							</view>
						</view>
                    </view>
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}" src="../static/icon02.png"></image>
							</view>
							<view class="label">
								<text>旅客指南</text>
							</view>
						</view>
                    </view>
                </view>
                <view class="list">
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}"  src="../static/icon03.png"></image>
							</view>
							<view class="label">
								<text>交通信息</text>
							</view>
						</view>
                    </view>
                    <view class="item">
						<view class="wrap">
							<view class="icon">
								<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}"  src="../static/icon04.png"></image>
							</view>
							<view class="label">
								<text>机场商业</text>
							</view>
						</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            locale: "",
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    methods: {
        	
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
.footer {
	display: none;
	position: fixed;
	z-index: 10;
	bottom: 0;
	left: 5%;
	right: 5%;
	background-color: #fff;
	border-radius: 20px 20px 0 0;
	.listWrap {
		padding: 30px;
		.list {
			display: flex;
			padding: 10px;
			.item {
				flex: 1;
				.wrap {
					overflow: hidden;
					width: 90%;
					margin: 0 auto;
					padding: 10px;
					box-shadow: 0 0 5px rgba(218,228,247,.95);
					border-radius: 20px;
					.icon {
						float: left;
						padding-left: 20px;
						position: relative;
						z-index: 0;
						top: 10px;
					}
					.label {
						float: left;
						font-size: 32px;
						padding-left: 20px;
						text {
							position: relative;
							z-index: 0;
							top: 30px;
						}
					}
				}
			}
		}
	}
}

@media screen and (min-width: 1090px) {
    .footer {
		position: relative;
	}
}

@media screen and (max-width: 1024px) {
	.footer {
		.listWrap {
			padding: 10px;
			.list {
				padding: 5px;
				.item {
					height: 48px;
					line-height: 48px;
					.wrap {
						padding: 2px;
						.icon {
							display: inline-block;
							padding-left: 10px;
							top: 0;
						}
						.label {
							font-size: 18px;
							padding-left: 10px;
							text {
								top: 0;
							}
						}
					}
				}
			}
		}
	}
}

@media screen and (max-width: 400px) {
	.footer,
	.tagcloudWrap {
		display: none;
	}
}

</style>
