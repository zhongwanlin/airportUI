<template>
	<div id="lostItemInfo">
		<Modal :value="true" class="noContentPadding" :footer-hide="true" :mask-closable="false" width="40" :styles="{top: '5%'}"
		 title="失物信息详情" @on-cancel="closeModal">
			<div class="modalTable" :style="{maxHeight: (height-150)+'px',overflowY: 'auto'}">
				<div style="text-align: center;"><img id="barcode" style="height: 100px" /></div>
				
				<div style="padding: 10px;">
				<div class="modalTitle">基本信息：</div>
				<div class="detail">
					<table>
						<tr>
							<td class="label" style="width: 350px;">失物编号 </td>
							<td style="width: 35%;">{{itemInfo.lostItemCode}}</td>
						</tr>
						<tr>
							<td class="label">失物名称</td>
							<td>
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
							<td class="label">捡拾地点</td>
							<td>
								{{itemInfo.areaCode}}{{itemInfo.locationName}}{{itemInfo.detailAreaDesc}}
							</td>
						</tr>
						<tr>
							<td class="label">航班号</td>
							<td>
								{{itemInfo.airlineNo}}
							</td>
						</tr>
						<tr>
							<td class="label">失物数量</td>
							<td>
								{{itemInfo.lostAmount}}
							</td>
						</tr>
						<tr>
							<td class="label">库存位置</td>
							<td>
								{{itemInfo.warehouseSpaceIds}}
							</td>
						</tr>
						<template v-if="!!itemInfo.id">
							<tr>
								<td class="label">失物状态</td>
								<td>
									{{$config.lostItemStatus[itemInfo.lostItemStatus]['name']}}
								</td>
							</tr>
						</template>

						<tr>
							<td class="label">是否确认公布</td>
							<td>
								{{['否', '是'][itemInfo.showFlag]}}
							</td>
						</tr>
						<tr>
							<td class="label">是否过安检</td>
							<td>
								{{['否', '是'][itemInfo.checkFlag]}}
							</td>
						</tr>
						<tr>
							<td class="label">是否含现金</td>
							<td>
								{{['否', '是'][itemInfo.cashFlag]}}
							</td>
						</tr>
						<tr>
							<td class="label">是否有违禁品</td>
							<td>
								{{['否', '是'][itemInfo.illegalFlag]}}
							</td>
						</tr>
						<template v-if="itemInfo.illegalFlag==1">
							<tr>
								<td class="label">违禁物品信息描述</td>
								<td>
									{{['否', '是'][itemInfo.illegalFlag]}}
								</td>
							</tr>
						</template>
						<tr>
							<td class="label">是否发布到民航统一失物平台</td>
							<td>
								{{['否', '是'][itemInfo.publicFlag]}}
							</td>
						</tr>
						<td class="label vt">补充信息</td>
							<td>
								{{itemInfo.lostItemRemark}}
							</td>
					</table>
				</div>
				</div>

				<div style="padding: 10px;">
				<div class="modalTitle">失物联系处理：</div>
				<div class="detail">
					<table>
						<tr>
							<td class="label" style="width: 350px;">客户联系时间</td>
							<td style="width: 35%;">
								{{itemInfo.ownerContactTime}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客姓名</td>
							<td>
								{{itemInfo.ownerName}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客电话</td>
							<td>
								{{itemInfo.ownerPhone}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客地址</td>
							<td>
								{{itemInfo.ownerAddress}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客证件类型</td>
							<td>
								<template v-if="itemInfo.ownerCertType>=1">{{$config.ownerCertType[itemInfo.ownerCertType-1]["name"]}}</template>
							</td>
						</tr>
						<tr>
							<td class="label">旅客证件号</td>
							<td>
								{{itemInfo.ownerCertNo}}
							</td>
						</tr>
						<tr>
							<td class="label">联系类型</td>
							<td>
								<template v-if="itemInfo.ownerFromType>=1">{{$config.ownerFromType[itemInfo.ownerFromType]["name"]}}</template>
							</td>
						</tr>
						<tr>
							<td class="label vt">联系详情</td>
							<td>
								{{itemInfo.dealRemark}}
							</td>
						</tr>
					</table>
				</div>
				</div>

				<div style="padding: 10px;">
				<div class="modalTitle">捡拾信息：</div>
				<div class="detail">
					<table>
						<tr>
							<td class="label" style="width: 350px;">交件人姓名</td>
							<td style="width: 35%;">
								{{itemInfo.handInUserName}}
							</td>
						</tr>
						<tr>
							<td class="label">交件人单位</td>
							<td>
								{{itemInfo.handInDeptName}}
							</td>
						</tr>
						<tr>
							<td class="label">交件人电话</td>
							<td>
								{{itemInfo.handInUserPhone}}
							</td>
						</tr>
						<tr>
							<td class="label">捡拾时间</td>
							<td>
								{{itemInfo.pickupTime}}
							</td>
						</tr>
						<tr>
							<td class="label">捡拾人姓名</td>
							<td>
								{{itemInfo.pickupPeople}}
							</td>
						</tr>
						<tr>
							<td class="label">捡拾人手机</td>
							<td>
								{{itemInfo.pickupPhone}}
							</td>
						</tr>
						<tr>
							<td class="label">捡拾上报单位</td>
							<td>
								{{itemInfo.pickupRegDeptName}}
							</td>
						</tr>
						<tr>
							<td class="label">接收人姓名</td>
							<td>
								{{userInfo.userName}}
							</td>
						</tr>
						<tr>
							<td class="label">接收时间</td>
							<td>
								{{itemInfo.receiveTime}}
							</td>
						</tr>
					</table>
				</div>
				</div>

				<div style="padding: 10px;">
				<div class="modalTitle">失物照片：</div>
				<div class="detail">
					<table>
						<tr>
							<td style="width: 25%;vertical-align: top;" @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic1)" >
								<div>外观图</div>
								<div v-if="!!itemInfo.lostItemOfficialPic1">
									<img style="width: 100%" :src="$config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic1" />
								</div>
							</td>
						</tr>
						<tr v-if="!!itemInfo.lostItemOfficialPic2">
							<td style="width: 25%;vertical-align: top;" @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic2)" >
								<div>详情图1</div>
								<div v-if="!!itemInfo.lostItemOfficialPic2">
									<img style="width: 100%" :src="$config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic2" />
								</div>
							</td>
						</tr>
						<tr v-if="!!itemInfo.lostItemOfficialPic3">
							<td style="width: 25%;vertical-align: top;" @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic3)">
								<div>详情图2</div>
								<div v-if="!!itemInfo.lostItemOfficialPic3">
									<img style="width: 100%" :src="$config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic3" />
								</div>
							</td>
						</tr>
						<tr v-if="!!itemInfo.lostItemOfficialPic4">
							<td style="width: 25%;vertical-align: top;" @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic4)">
								<div>详情图3</div>
								<div v-if="!!itemInfo.lostItemOfficialPic4">
									<img style="width: 100%" :src="$config.hostName+'/lostFound/'+itemInfo.lostItemOfficialPic4" />
								</div>
							</td>
						</tr>
					</table>
				</div>
				</div>

				<div style="padding: 10px;">
				<div class="modalTitle">失物认领：</div>
				<div class="detail">
					<table>
						<tr>
							<td class="label">移交方式</td>
							<td>
								<template v-if="itemInfo.takeType>=1">{{$config.takeType[itemInfo.takeType]["name"]}}</template>
							</td>
						</tr>
						<tr>
							<td class="label" style="width: 350px;">旅客姓名</td>
							<td style="width: 35%;">
								{{itemInfo.ownerName}}
							</td>
						</tr>
						<tr>
							<td class="label">旅客电话</td>
							<td>
								{{itemInfo.ownerPhone}}
							</td>
						</tr>
						
						<!-- <tr>
							<td class="label">旅客证件类型</td>
							<td>
								<template v-if="itemInfo.ownerCertType>=1">{{$config.ownerCertType[itemInfo.ownerCertType-1]["name"]}}</template>
							</td>
						</tr>
						<tr>
							<td class="label">旅客证件号</td>
							<td>
								{{itemInfo.ownerCertNo}}
							</td>
						</tr> -->

						<tr>
							<td class="label">认领来源</td>
							<td>
								<template v-if="itemInfo.ownerFromType>=1">{{$config.ownerFromType[itemInfo.ownerFromType]["name"]}}</template>
							</td>
						</tr>

						<template v-if="itemInfo.takeType==1">
							<tr>
								<td class="label" style="vertical-align: top;">本人身份证复印件</td>
								<td>
									<template v-if="!!itemInfo.takeUserCertPhoto1">
									<div @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1)">
										<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1" />
									</div>
									</template>
								</td>
							</tr>
						</template>

						<template v-if="itemInfo.takeType==2">
							<tr>
								<td class="label">代领人姓名</td>
								<td>
									{{itemInfo.takeUserName}}
								</td>
							</tr>
							<tr>
								<td class="label">代领人联系电话</td>
								<td>
									{{itemInfo.takeUserPhone}}
								</td>
							</tr>
							<!-- <tr>
								<td class="label">代领人证件类型</td>
								<td>
									<template v-if="itemInfo.takeUserCertType>=1">{{$config.ownerCertType[itemInfo.takeUserCertType-1]["name"]}}</template>
								</td>
							</tr>
							<tr>
								<td class="label">代领人证件号</td>
								<td>
									{{itemInfo.takeUserCertNo}}
								</td>
							</tr> -->
							<tr>
								<td class="label" style="vertical-align: top;">本人身份证复印件</td>
								<td>
									<template v-if="!!itemInfo.takeUserCertPhoto1">
									<div @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1)">
										<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1" />
									</div>
									</template>
								</td>
							</tr>
							<tr>
								<td class="label" style="vertical-align: top;">他人代领委托书</td>
								<td>
									<template v-if="!!itemInfo.authorizationCertPhoto">
									<div @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.authorizationCertPhoto)">
										<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+itemInfo.authorizationCertPhoto" />
									</div>
									</template>
								</td>
							</tr>
						</template>
						
						<template v-if="itemInfo.takeType==3||itemInfo.takeType==4">
							<tr>
								<td class="label">快递公司</td>
								<td>
									{{itemInfo.deliveryCompanyName}}
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
									{{itemInfo.ownerAddress}}
								</td>
							</tr>
							<tr>
								<td class="label" style="vertical-align: top;">本人身份证复印件</td>
								<td>
									<template v-if="!!itemInfo.takeUserCertPhoto1">
									<div @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1)">
										<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+itemInfo.takeUserCertPhoto1" />
									</div>
									</template>
								</td>
							</tr>
							<tr>
								<td class="label" style="vertical-align: top;">顺丰速运代领委托书</td>
								<td>
									<template v-if="!!itemInfo.authorizationCertPhoto">
									<div @click="showBigImg($config.hostName+'/lostFound/'+itemInfo.authorizationCertPhoto)">
										<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+itemInfo.authorizationCertPhoto" />
									</div>
									</template>
								</td>
							</tr>
						</template>

					
					</table>
				</div>
				</div>
			</div>
		</Modal>

		<Modal v-model="isBigImg" class="noContentPadding noHeaderModal" :footer-hide="true" :mask-closable="false" width="60" :styles="{top: '5%'}" title="大图" @on-cancel="isBigImg=false">
			<div>
			   <img style="width: 100%" :src="bigImgUrl" />	
			</div>	
		</Modal>	
	</div>
</template>

<script>
	import JsBarcode from 'jsbarcode';
	export default {
		name: "lostItemInfo",
		props: {
			itemInfo: Object,
			closeModal: Function,
			reflesh: Function,
		},
		components: {},
		data: () => ({
			userInfo: {},
			isBigImg: false,
			bigImgUrl: "",
			height: window.innerHeight,
		}),
		methods: {
			showBigImg(bigImgUrl) {
				let self = this;
				console.log(bigImgUrl);
				self.bigImgUrl = bigImgUrl;
				self.isBigImg = true;
			}
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

			JsBarcode("#barcode", self.itemInfo.lostItemCode, {
				format: "CODE128", // 选择要使用的条形码类型
				text: self.itemInfo.lostItemCode,
				displayValue: true, //是否在条形码下方显示文字
				textPosition: "bottom" //设置文本的垂直位置
			});
			window.onresize = function() {
				clearTimeout(resizeTime);
				resizeTime = setTimeout(function() {
					self.height = window.innerHeight;
				}, 500);
			};
		},
		beforeDestroy() {
			clearInterval(window.recordTime);
		}
	};
</script>

<style lang="less">
	@import "~@/common/unit.less";
</style>
