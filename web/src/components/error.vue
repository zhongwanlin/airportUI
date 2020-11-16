<template>
    <view>
        <!-- 紧急预案处理 -->
        <template v-if="isOnline">
            <view class="onlineWrap">
                <template v-if="errorImgList.length>0">
                    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :style="{height: systemInfo.screenHeight+'px'}">
                        <template v-for="(item, index) in errorImgList">
                            <swiper-item :key="index" :style="{height: systemInfo.screenHeight+'px'}">
                                <view :style="{height: systemInfo.screenHeight+'px'}">
                                    <img :src="item" :style="{height: systemInfo.screenHeight+'px'}"/>
                                </view>
                            </swiper-item>
                        </template>
                    </swiper>
                </template>
                <template v-else>
                    <img :src="errorImg"/>
                </template>
            </view>
        </template>
    </view>
</template>

<script>
import error from "../common/error";
export default {
    components: {},
    data() {
        return {
			isOnline: false,
			errorImg: error.errorImg,
			errorImgList: [],
			emergencyList: [],
            systemInfo: uni.getSystemInfoSync(),
        };
    },
    methods: {
        // 获取应急预案
        getEmergencyList(){
            var self = this;
            uni.request({
			    header: {
                    gomstoken: "866822030391163"
                },
                url: self.$config.action.emergencyList,
			    method: "GET",
			    data: {
					"pageNum": 1,
                    "pageSize": 1000,
                    "name": "",
                    "dep_status": "",
			    },
			    success(res, statusCode, header) {
					self.errorImgList = [];
                    for(var i = 0, len = res.data.list.length; i < len; i++) {
                        if(res.data.list[i]["status"] == 1) {
                            self.emergencyList = JSON.parse(res.data.list[i]["url"]);
                            break;
                        }
                    }
                    self.emergencyList.forEach(item => {
                        self.$utility.convertImgToBase64(item,(dataURL)=>{
                            self.errorImgList.push(dataURL);
                        });
                    });
			    },
			    fail(error) {
			        console.log(error);
			        uni.hideLoading();
			    }
            });
            
        },
        // 判断网络状态
        onLine(){
            let self = this;
            var img = new Image();
            img.src = self.$config.pageUrl + "static/icon06.png?t=" + Date.now();
            console.log(img.src);
            img.onload=function(){
                self.isOnline = false;       
            };
            img.onerror=function(){
                self.isOnline = true;     
            };
        }	
	},
	created() {
        let self = this;
        window.airport = self.$config.airport;
        self.locale = self.$i18n.locale;

        // 预案处理
        self.getEmergencyList();
        setInterval(()=>{
            self.onLine();
        }, 10000);
    },
	mounted() {
		let self = this;
	},
};
</script>

<style lang="less" scoped>
@import "~@/common/common.less";
.onlineWrap {
    position: fixed;
    z-index: 10000000000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
