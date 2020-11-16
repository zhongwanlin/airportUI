<template>
    <view>
        <view class="header">
			<view class="box">
				<view class="nav">
					<image :style="{width: systemInfo.screenWidth<=1024?'30px':'60px',height:systemInfo.screenWidth<=1024?'30px':'60px'}" src="../static/icon06.png"></image>
				</view>
                <!-- <text class="wellcome">欢迎来到北京首都机场</text> -->
				<view class="icon" @click="isOpen=!isOpen">
					<image :style="{width: systemInfo.screenWidth<=1024?'30px':'80px',height:systemInfo.screenWidth<=1024?'30px':'80px'}" src="../static/icon05.png"></image>
				</view>
				<view class="label" @click="isOpen=!isOpen">
					<text>{{passenger}}</text>
				</view>
			</view>
		</view>

        <template v-if="isOpen">
            <view class="swichPage">
                <view class="list">
                    <view class="item item1" @click="setType('出发旅客（国内）')">
                        <text>我是出发旅客（国内）</text>
                    </view>
                    <view class="item item2" @click="setType('国际/港澳台')">
                        <text>我是出发旅客（国际/港澳台）</text>
                    </view>
                    <view class="item item3" @click="setType('到达旅客')">
                        <text>我是到达旅客</text>
                    </view>
                    <view class="item item4" @click="setType('中转旅客')">
                        <text>我是中转旅客</text>
                    </view>
                    <view class="item item5" @click="setType('接送机')">
                        <text>我来接送机</text>
                    </view>
                    <view class="close" @click="closeType">X</view>
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
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    computed: {
        ...mapState(["passenger"])
    },
    methods: {
        ...mapMutations(["setPassenger"]),
        closeType() {
            let self = this;
            self.isOpen = false;
        },
        setType(type) {
            let self = this;
            self.setPassenger(type);
            self.closeType();
            window.utility.setLocalStorage("type", type);
        }
	},
	created() {
        let self = this;
        let type = window.utility.getLocalStorage("type");
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;
        if(!type) {
            self.isOpen = true;
        }
    },
	mounted() {
		let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
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
			top: 20px;
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
				top: 10px;
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
				top: 0;
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
