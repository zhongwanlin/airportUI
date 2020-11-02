<template>
    <div id="lostItemEdit">
        <Modal :value="true" class="noContentPadding" :mask-closable="false" :footer-hide="true" width="40" :styles="{top: '5%'}" title="旅客报失详情" @on-cancel="closeModal">
			<div class="modalTable" :style="{maxHeight: (height-200)+'px',overflowY: 'auto'}">
				<div class="detail">
					<table>
						<tr>
							<td class="label" style="width: 100px;">失物名称</td>
							<td style="width: 50%;">
								{{itemInfo.lostTitle}}
							</td>
						</tr>
						<tr>
							<td class="label">一级分类</td>
							<td>
								{{itemInfo.firstCateName}}
							</td>
						</tr>
						<tr>
							<td class="label">二级分类</td>
							<td>
								{{itemInfo.secondCateName}}
							</td>
						</tr>
						<tr>
							<td class="label">{{itemInfo.catePropName1}}</td>
							<td>
								{{itemInfo.catePropValue1}}
							</td>
						</tr>
						<template v-if="!!itemInfo.catePropName2">
							<tr>
								<td class="label">{{itemInfo.catePropName2}}</td>
								<td>
									{{itemInfo.catePropValue2}}
								</td>
							</tr>
						</template>
						
						<template v-if="!!itemInfo.catePropName3">
							<tr>
								<td class="label">{{itemInfo.catePropName3}}</td>
								<td>
									{{itemInfo.catePropValue3}}
								</td>
							</tr>
						</template>
						
						<template v-if="!!itemInfo.catePropName4">
							<tr>
								<td class="label">{{itemInfo.catePropName4}}</td>
								<td>
									{{itemInfo.catePropValue4}}
								</td>
							</tr>
						</template>
						<tr>
							<td class="label">处理状态</td>
							<td>
								<template v-if="itemInfo.clientDealStatus>=0">
									{{$config.clientDealStatus[itemInfo.clientDealStatus]["name"]}}
								</template>
							</td>
						</tr>
						<tr>
							<td class="label">丢失地点</td>
							<td>
								<template>
									{{itemInfo.clientAreaCode}}{{itemInfo.clientLocationName}}{{itemInfo.clientDetailAreaDesc}}
								</template>
							</td>
						</tr>
						<tr>
							<td class="label">丢失时间</td>
							<td>
								{{itemInfo.clientLostTime}}
							</td>
						</tr>
						<tr>
							<td class="label vt">详细信息</td>
							<td>
								{{itemInfo.lostDesc}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客姓名</td>
							<td>
								{{itemInfo.clientOwnerName}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客电话</td>
							<td>
								{{itemInfo.clientOwnerPhone}}
							</td>
						</tr>
						<template v-if="itemInfo.clientAreaCode=='飞机客舱'">
						<tr>
							<td class="label">航班号</td>
							<td>
								{{itemInfo.clientAirlineNo}}
							</td>
						</tr>
						</template>
						
						<tr>
							<td class="label"><span class="request">*</span>领取方式</td>
							<td>
								<template v-if="itemInfo.clientTakeType>=0">
									{{$config.takeType[itemInfo.clientTakeType]['name']}}
								</template>
							</td>
						</tr>
						<template v-if="itemInfo.clientTakeType==3||itemInfo.clientTakeType==4">
							<tr>
                                <td class="label">快递公司</td>
                                <td>
                                    <template v-if="itemInfo.deliveryCompanyId>=0">
										{{$config.deliveryCompanyList[itemInfo.deliveryCompanyId]['name']}}
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">快递单号</td>
                                <td>
                                    {{itemInfo.deliveryNo}}
                                </td>
                            </tr>
							<tr>
								<td class="label">邮寄地址</td>
								<td>
									{{itemInfo.clientAddress}}
								</td>
							</tr>
						</template>
						<template v-if="itemInfo.clientTakeType==2">
							<tr>
								<td class="label">领取人姓名</td>
								<td>
									{{itemInfo.clientTakeUserName}}
								</td>
							</tr>
							<tr>
								<td class="label">领取人电话</td>
								<td>
									{{itemInfo.clientTakeUserPhone}}
								</td>
							</tr>
							<!-- <tr>
								<td class="label">领取人证件类型</td>
								<td>
									<template v-if="itemInfo.clientTakeUserCertType>=1">
										{{$config.ownerCertType[itemInfo.clientTakeUserCertType-1]['name']}}
									</template>
								</td>
							</tr>
							<tr>
								<td class="label">领取人证件号</td>
								<td>
									{{itemInfo.clientTakeUserCertNo}}
								</td>
							</tr> -->
						</template>
						<!-- <tr>
							<td class="label">旅客来源</td>
							<td>
								{{itemInfo.ownerFromType}}
								<template v-if="itemInfo.ownerFromType>=0">
								{{$config.ownerFromType[itemInfo.ownerFromType]["name"]}}
								</template>
							</td>
						</tr> -->
			
					</table>
					<table>
						<tr>
							<td style="vertical-align: top;">
								<div style="padding: 5px;">外观1</div>
								<div v-if="!!itemInfo.clientLostPhoto1">
									<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(typeof itemInfo.clientLostPhoto1.split(',')[1]!='undefined'?itemInfo.clientLostPhoto1.split(',')[1]:itemInfo.clientLostPhoto1.split(',')[0])"/>
								</div>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">
								<div style="padding: 5px;">外观2</div>
								<div v-if="!!itemInfo.clientLostPhoto2">
									<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(typeof itemInfo.clientLostPhoto2.split(',')[1]!='undefined'?itemInfo.clientLostPhoto2.split(',')[1]:itemInfo.clientLostPhoto2.split(',')[0])"/>
								</div>
							</td>
						</tr>
						<template v-if="itemInfo.clientTakeType==1">
							<template v-if="!!itemInfo.clientTakeUserCertPhoto1">
								<tr>
									<td style="vertical-align: top;">
										<div style="padding: 5px;">本人身份证复印件</div>
										<div>
											<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientTakeUserCertPhoto1.indexOf(',')!=-1?itemInfo.clientTakeUserCertPhoto1.split(',')[1]:itemInfo.clientTakeUserCertPhoto1)"/>
										</div>
									</td>
								</tr>
							</template>
						</template>
						<template v-if="itemInfo.clientTakeType==2">
							<template v-if="!!itemInfo.clientTakeUserCertPhoto1">
								<tr>
									<td style="vertical-align: top;">
										<div style="padding: 5px;">本人身份证复印件</div>
										<div>
											<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientTakeUserCertPhoto1.indexOf(',')!=-1?itemInfo.clientTakeUserCertPhoto1.split(',')[1]:itemInfo.clientTakeUserCertPhoto1)"/>
										</div>
									</td>
								</tr>
							</template>
							<template v-if="!!itemInfo.clientAuthorizationCertPhoto">
								<tr>
									<td style="vertical-align: top;">
										<div style="padding: 5px;">他人代领委托书</div>
										<div>
											<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientAuthorizationCertPhoto.indexOf(',')!=-1?itemInfo.clientAuthorizationCertPhoto.split(',')[1]:itemInfo.clientAuthorizationCertPhoto)"/>
										</div>
									</td>
								</tr>
							</template>
						</template>

						<template v-if="itemInfo.clientTakeType==3||itemInfo.clientTakeType==4">
							<template v-if="!!itemInfo.clientTakeUserCertPhoto1">
								<tr>
									<td style="vertical-align: top;">
										<div style="padding: 5px;">本人身份证复印件</div>
										<div>
											<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientTakeUserCertPhoto1.indexOf(',')!=-1?itemInfo.clientTakeUserCertPhoto1.split(',')[1]:itemInfo.clientTakeUserCertPhoto1)"/>
										</div>
									</td>
								</tr>
							</template>
							<template v-if="!!itemInfo.clientAuthorizationCertPhoto">
								<tr>
									<td style="vertical-align: top;">
										<div style="padding: 5px;">顺丰速运代领委托书</div>
										<div>
											<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientAuthorizationCertPhoto.indexOf(',')!=-1?itemInfo.clientAuthorizationCertPhoto.split(',')[1]:itemInfo.clientAuthorizationCertPhoto)"/>
										</div>
									</td>
								</tr>
							</template>
						</template>
					</table>
				</div>
			</div>
        </Modal>

    </div>
</template>

<script>
export default {
    name: "lostItemInfo",
    props: {
        itemInfo: Object,
        closeModal: Function,
    },
    components: { },
    data: () => ({
        userInfo: {},
        height: window.innerHeight,
    }),
    methods: {
        
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        };
    },
    beforeDestroy(){
        clearInterval(window.recordTime);
    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
</style>
