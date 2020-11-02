<template>
    <div id="lostItemEdit">
        <Modal :value="true" class="noContentPadding" :mask-closable="false" width="40" :styles="{top: '2%'}" title="录入旅客报失信息" @on-cancel="closeModal">
            <div class="modalTable" :style="{height: (height-200)+'px',overflowY: 'auto'}">
				<div class="detail">
					<table>
						<tr>
							<td class="label" style="width: 100px;"><span class="request">*</span>失物名称</td>
							<td style="width: 40%;"><Input v-model="itemInfo.lostTitle" placeholder="请输入失物名称" style="width: 100%" /></td>
						</tr>
						<tr>
							<td class="label"><span class="request">*</span>一级分类</td>
							<td>
								<template>
									<Select v-model="itemInfo.firstCateId" placeholder="选择一级分类" style="width: 100%;">
										<template v-for="(item, index) in cate1">
											<Option :value="item.id" :key="index">{{item.cateName}}</Option>
										</template>
									</Select>
								</template>
							</td>
						</tr>
						<tr>
							<td class="label"><span class="request">*</span>二级分类</td>
							<td>
								<template>
									<Select v-model="secondInfo" @on-change="secondItemChange" placeholder="选择二级分类" style="width: 100%;">
										<template v-for="(item, index) in cate2">
											<Option :value="JSON.stringify(item)" :key="index">{{item.cateName}}</Option>
										</template>
									</Select>
								</template>
							</td>
						</tr>
						<template v-if="!!secondItem">
							
							<template v-if="!!secondItem.propName1">
								<tr>
									<td class="label">{{secondItem.propName1}}</td>
									<td>
										<template v-if="secondItem.propInputType1==0">
											<Input v-model="itemInfo.catePropValue1"  :placeholder="'请输入'+secondItem.propName1" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType1==1">
											<Input v-model="itemInfo.catePropValue1" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName1" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType1==2">
											<RadioGroup v-model="itemInfo.catePropValue1">
												<template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
													<Radio :label="item" :key="index">{{item}}</Radio>
												</template>
											</RadioGroup>
										</template>
										<template v-if="secondItem.propInputType1==3">
											<CheckboxGroup v-model="itemInfo.catePropValue1">
												<template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
													<Checkbox :label="item" :key="index">{{item}}</Checkbox>
												</template>
											</CheckboxGroup>
										</template>
										<template v-if="secondItem.propInputType1==4">
											<Select v-model="itemInfo.catePropValue1" :placeholder="'选择'+secondItem.propName1" style="width: 100%;">
												<template v-for="(item, index) in (secondItem.propOptionValue1).split(',')">
													<Option :value="item" :key="index">{{item}}</Option>
												</template>
											</Select>
										</template>
										<template v-if="secondItem.propInputType1==5">
											<DatePicker v-model="itemInfo.catePropValue1" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
										<template v-if="secondItem.propInputType1==6">
											<DatePicker v-model="itemInfo.catePropValue1" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
									</td>
								</tr>
							</template>
			
							<template v-if="!!secondItem.propName2">
								<tr>
									<td class="label">{{secondItem.propName2}}</td>
									<td>
										<template v-if="secondItem.propInputType2==0">
											<Input v-model="itemInfo.catePropValue2" :placeholder="'请输入'+secondItem.propName2" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType2==1">
											<Input v-model="itemInfo.catePropValue2" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName2" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType2==2">
											<RadioGroup v-model="itemInfo.catePropValue2">
												<template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
													<Radio :label="item" :key="index">{{item}}</Radio>
												</template>
											</RadioGroup>
										</template>
										<template v-if="secondItem.propInputType2==3">
											<CheckboxGroup v-model="itemInfo.catePropValue2">
												<template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
													<Checkbox :label="item" :key="index">{{item}}</Checkbox>
												</template>
											</CheckboxGroup>
										</template>
										<template v-if="secondItem.propInputType2==4">
											<Select v-model="itemInfo.catePropValue2" :placeholder="'选择'+secondItem.propName2" style="width: 100%;">
												<template v-for="(item, index) in (secondItem.propOptionValue2).split(',')">
													<Option :value="item" :key="index">{{item}}</Option>
												</template>
											</Select>
										</template>
										<template v-if="secondItem.propInputType2==5">
											<DatePicker v-model="itemInfo.catePropValue2" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
										<template v-if="secondItem.propInputType2==6">
											<DatePicker v-model="itemInfo.catePropValue2" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
									</td>
								</tr>
							</template>
			
							<template v-if="!!secondItem.propName3">
								<tr>
									<td class="label">{{secondItem.propName3}}</td>
									<td>
										<template v-if="secondItem.propInputType3==0">
											<Input v-model="itemInfo.catePropValue3" :placeholder="'请输入'+secondItem.propName3" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType3==1">
											<Input v-model="itemInfo.catePropValue3" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName3" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType3==2">
											<RadioGroup v-model="itemInfo.catePropValue3">
												<template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
													<Radio :label="item" :key="index">{{item}}</Radio>
												</template>
											</RadioGroup>
										</template>
										<template v-if="secondItem.propInputType3==3">
											<CheckboxGroup v-model="itemInfo.catePropValue3">
												<template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
													<Checkbox :label="item" :key="index">{{item}}</Checkbox>
												</template>
											</CheckboxGroup>
										</template>
										<template v-if="secondItem.propInputType3==4">
											<Select v-model="itemInfo.catePropValue3" :placeholder="'选择'+secondItem.propName3" style="width: 100%;">
												<template v-for="(item, index) in (secondItem.propOptionValue3).split(',')">
													<Option :value="item" :key="index">{{item}}</Option>
												</template>
											</Select>
										</template>
										<template v-if="secondItem.propInputType3==5">
											<DatePicker v-model="itemInfo.catePropValue3" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
										<template v-if="secondItem.propInputType3==6">
											<DatePicker v-model="itemInfo.catePropValue3" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
									</td>
								</tr>
							</template>
			
							<template v-if="!!secondItem.propName4">
								<tr>
									<td class="label">{{secondItem.propName4}}</td>
									<td>
										<template v-if="secondItem.propInputType4==0">
											<Input v-model="itemInfo.catePropValue4" :placeholder="'请输入'+secondItem.propName4" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType4==1">
											<Input v-model="itemInfo.catePropValue4" type="textarea" :row="4" :placeholder="'请输入'+secondItem.propName4" style="width: 100%" />
										</template>
										<template v-if="secondItem.propInputType4==2">
											<RadioGroup v-model="itemInfo.catePropValue4">
												<template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
													<Radio :label="item" :key="index">{{item}}</Radio>
												</template>
											</RadioGroup>
										</template>
										<template v-if="secondItem.propInputType4==3">
											<CheckboxGroup v-model="itemInfo.catePropValue4">
												<template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
													<Checkbox :label="item" :key="index">{{item}}</Checkbox>
												</template>
											</CheckboxGroup>
										</template>
										<template v-if="secondItem.propInputType4==4">
											<Select v-model="itemInfo.catePropValue4" :placeholder="'选择'+secondItem.propName4" style="width: 100%;">
												<template v-for="(item, index) in (secondItem.propOptionValue4).split(',')">
													<Option :value="item" :key="index">{{item}}</Option>
												</template>
											</Select>
										</template>
										<template v-if="secondItem.propInputType4==5">
											<DatePicker v-model="itemInfo.catePropValue4" type="date" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
										<template v-if="secondItem.propInputType4==6">
											<DatePicker v-model="itemInfo.catePropValue4" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
										</template>
									</td>
								</tr>
							</template>
			
						</template>
						
						<template v-if="itemInfo.id">
						<tr>
							<td class="label"><span class="request">*</span>处理状态</td>
							<td>
								<template>
									<Select v-model="itemInfo.clientDealStatus" placeholder="选择处理状态" style="width: 100%;">
										<template v-for="(item, index) in $config.clientDealStatus">
											<template v-if="item.id>0">
												<Option :value="item.id" :key="index">{{item.name}}</Option>
											</template>
										</template>
									</Select>
								</template>
							</td>
						</tr>
						</template>

						<tr>
							<td class="label"><span class="request">*</span>丢失地点</td>
							<td>
								<template>
									<Select v-model="itemInfo.clientAreaCode" @on-change="getLostAreaList" placeholder="选择丢失地点" style="width: 30%;">
										<template v-for="(item, index) in clientAreaCode">
											<Option :value="item.name" :key="index">{{item.name}}</Option>
										</template>
									</Select>
									<Input v-model="itemInfo.clientDetailAreaDesc" placeholder="请输入详细丢失地点" style="width: 70%" />
								</template>
							</td>
						</tr>
						<tr>
							<td class="label"><span class="request">*</span>丢失时间</td>
							<td>
								<template>
									<DatePicker v-model="itemInfo.clientLostTime" type="date" placeholder="请选择丢失时间" style="width: 100%;"></DatePicker>
								</template>
							</td>
						</tr>
						<tr>
							<td class="label vt"><span class="request">*</span>失物详细信息</td>
							<td>
								<template>
									<Input v-model="itemInfo.lostDesc" type="textarea" :rows="3" placeholder="请输入失物详细信息" style="width: 100%" />
								</template>
							</td>
						</tr>
						<tr>
							<td class="label"><span class="request">*</span>旅客姓名</td>
							<td>
								<template>
									<Input v-model="itemInfo.clientOwnerName" placeholder="请输入交件人姓名" style="width: 100%" />
								</template>
							</td>
						</tr>
						<tr>
							<td class="label"><span class="request">*</span>旅客电话</td>
							<td>
								<template>
									<Input v-model="itemInfo.clientOwnerPhone" placeholder="请输入旅客电话" style="width: 100%" />
								</template>
							</td>
						</tr>
						<template v-if="itemInfo.clientAreaCode=='飞机客舱'">
						<tr>
							<td class="label">航班号</td>
							<td>
								<template>
									<Input v-model="itemInfo.clientAirlineNo" placeholder="请输入航班号" style="width: 100%" />
								</template>
							</td>
						</tr>
						</template>
						
						<tr>
							<td class="label"><span class="request">*</span>领取方式</td>
							<td>
								<template>
									<Select v-model="itemInfo.clientTakeType" placeholder="选择领取方式" style="width: 100%;">
										<template v-for="(item, index) in $config.takeType">
											<template v-if="index>0">
											<Option :value="item.id" :key="index">{{item.name}}</Option>
											</template>
										</template>
									</Select>
								</template>
							</td>
						</tr>
						<tr>
							<td class="label">领取人姓名</td>
							<td>
								<template>
									<Input v-model="itemInfo.clientTakeUserName" placeholder="请输入领取人姓名" style="width: 100%" />
								</template>
							</td>
						</tr>
						<tr>
							<td class="label">领取人电话</td>
							<td>
								<template>
									<Input v-model="itemInfo.clientTakeUserPhone" placeholder="请输入领取人姓名" style="width: 100%" />
								</template>
							</td>
						</tr>
						<!-- <template v-if="itemInfo.clientTakeType==1">
							<tr>
								<td class="label">领取人证件类型</td>
								<td>
									<template>
										<Select v-model="itemInfo.clientTakeUserCertType" placeholder="选择领取人证件类型" style="width: 100%;">
                                            <template v-for="(item, index) in $config.ownerCertType">
                                                <Option :value="item.id" :key="index">{{item.name}}</Option>
                                            </template>
                                        </Select>
									</template>
								</td>
							</tr>
							<tr>
								<td class="label">领取人证件号</td>
								<td>
									<template>
										<Input v-model="itemInfo.clientTakeUserCertNo" placeholder="请输入领取人证件号" style="width: 100%" />
									</template>
								</td>
							</tr>
						</template> -->
						<template v-if="itemInfo.clientTakeType==3||itemInfo.clientTakeType==4">
							<tr>
                                <td class="label">快递公司</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.deliveryCompanyId" placeholder="选择快递公司" style="width: 100%;">
                                            <template v-for="(item, index) in $config.deliveryCompanyList">
                                                <template v-if="item.id>0">
                                                    <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                </template>
                                            </template>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">快递单号</td>
                                <td>
                                    <template>
                                        <Input v-model="itemInfo.deliveryNo" placeholder="请输入快递单号" style="width: 100%" />
                                    </template>
                                </td>
                            </tr>
							<tr>
								<td class="label">邮寄地址</td>
								<td>
									<template>
										<Input v-model="itemInfo.clientAddress" placeholder="请输入邮寄地址" style="width: 100%" />
									</template>
								</td>
							</tr>
						</template>
						
						<!-- <tr>
							<td class="label">旅客来源</td>
							<td>
								<template>
									<Select v-model="itemInfo.ownerFromType" placeholder="选择旅客来源" style="width: 100%;">
										<template v-for="(item, index) in $config.ownerFromType">
											<template v-if="item.id>0">
												<Option :value="item.id" :key="index">{{item.name}}</Option>
											</template>
										</template>
									</Select>
								</template>
							</td>
						</tr> -->
			
					</table>
					<table>
						<tr>
							<td style="vertical-align: top;">
								<div style="padding: 5px;">外观1</div>
								<div style="padding: 5px;">
									<Row>
										<Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="clientLostPhoto1" id="clientLostPhoto1" type="file"></p></Col>
										<Col span="8">
											<p style="padding-top: 3px;">
												<template v-if="!!itemInfo.clientLostPhoto1">
													<Button size="small" type="error" @click="deleteFile('clientLostPhoto1')">删除</Button>
												</template>
												<template v-else>
													<Button size="small" @click="uploadFileAction('clientLostPhoto1')">上传</Button>
												</template>
											</p>
										</Col>
									</Row>
								</div>
								<div v-if="!!itemInfo.clientLostPhoto1">
									<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(typeof itemInfo.clientLostPhoto1.split(',')[1]!='undefined'?itemInfo.clientLostPhoto1.split(',')[1]:itemInfo.clientLostPhoto1.split(',')[0])"/>
								</div>
							</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">
								<div style="padding: 5px;">外观2</div>
								<div style="padding: 5px;">
									<Row>
										<Col span="16"><p style="padding-top: 5px;"><input name="photo" ref="clientLostPhoto2" id="clientLostPhoto2" type="file"></p></Col>
										<Col span="8">
											<p style="padding-top: 3px;">
												<template v-if="!!itemInfo.clientLostPhoto2">
													<Button size="small" type="error" @click="deleteFile('clientLostPhoto2')">删除</Button>
												</template>
												<template v-else>
													<Button size="small" @click="uploadFileAction('clientLostPhoto2')">上传</Button>
												</template>
											</p>
										</Col>
									</Row>
								</div>
								<div v-if="!!itemInfo.clientLostPhoto2">
									<img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.clientLostPhoto2.indexOf(',')!=-1?itemInfo.clientLostPhoto2.split(',')[1]:itemInfo.clientLostPhoto2)"/>
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
			
            <div slot="footer" class="modalFooter">
                <template>
                    <Button type="default" @click="closeAction" style="margin-right: 5px">关闭</Button>
					<template v-if="!itemInfo.id">
						<Button type="primary" @click="saveLostInfo" :disabled="disable">确认录入并自动匹配</Button>
					</template>
					<template v-if="!!itemInfo.id">
						<Button type="primary" @click="saveLostInfo" :disabled="disable">确认修改</Button>
					</template>
                </template>
            </div> 
        </Modal>

        <Modal v-model="isMatch" class="noContentPadding" :footer-hide="true" :mask-closable="false" width="90" :styles="{top: '5%'}" title="失物信息录入" @on-cancel="isMatch=false">
            <template v-if="isMatch">
                <LostItemList :search-item="itemInfo" :is-from-loss="true"></LostItemList>
            </template>
        </Modal>
    </div>
</template>

<script>
import LostItemList from "@/pages/lostAndFound/index.vue";
export default {
    name: "clentlostEdit",
    props: {
        itemInfo: Object,
        closeModal: Function,
        reflesh: Function,
    },
    components: { 
        LostItemList
    },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        disable: false,
        isMatch: false,
        cateLevel: 1,
        paraCateId: 0,
        cate1: [],
        cate2: [],
        areaCodeList: [],
        deptList: [],
        secondItem: null,
        secondInfo: "",
        searchInfo: {},
        clientAreaCode: []
    }),
    watch: {
        "itemInfo.firstCateId": function(value) {
            var self = this;
            self.getLostCategoryList(2);
        }
    },
    methods: {
        closeAction() {
            var self = this;
            if(self.closeModal) {
                self.closeModal();
            }
        },
        secondItemChange(e) {
            var self = this;
            self.secondItem = JSON.parse(e);
            self.itemInfo.secondCateId = self.secondItem.id;
            self.itemInfo.catePropName1 = self.secondItem.propName1;
            self.itemInfo.catePropName2 = self.secondItem.propName2;
            self.itemInfo.catePropName3 = self.secondItem.propName3;
            self.itemInfo.catePropName4 = self.secondItem.propName4;
        },
        // 获取类型列表
        getLostCategoryList(cateLevel){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.lostRegistService),
                url: self.$config.action.getLostCategoryList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 10000,
                    "companyId": self.userInfo.companyId,
                    "paraCateId": cateLevel==2?self.itemInfo.firstCateId:0,
                    "cateLevel": cateLevel,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self["cate"+cateLevel] = res.data.data;
                    if(cateLevel==1 && self["cate"+cateLevel].length>0) {
                        if(!self.itemInfo.id) {
                            self.itemInfo.firstCateId = self["cate"+cateLevel][0]["id"];
                        } else {
                            self.getLostCategoryList(2);
                        }
                    } else if(cateLevel==2) {
                        self["cate"+cateLevel].forEach((item)=>{
                            if(item.id == self.itemInfo.secondCateId) {
                                self.secondInfo = JSON.stringify(item);
                                self.secondItemChange(JSON.stringify(item));
                            }
                        });
                    }
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
        formatTime(time, bool) {
            var self = this;
            var timeInfo = self.$utility.getCurrentTimeInfo(time);
            if(bool==true) {
                return timeInfo.year + "-" + timeInfo.month + "-" + timeInfo.date + " " + timeInfo.hour + ":"+ timeInfo.min + ":"+ timeInfo.second;
            } else {
                return timeInfo.year + "-" + timeInfo.month + "-" + timeInfo.date;
            }
        },
        // 保存分类
        saveLostInfo() {
			var self = this;
			if(self.itemInfo.lostTitle.length == 0) {
				self.$Message.error("请输入失物名称");
				return;
			}
			if(self.itemInfo.firstCateId === "") {
				self.$Message.error("请选择一级分类");
				return;
			}
			if(self.itemInfo.secondCateId === "") {
				self.$Message.error("请选择二级分类");
				return;
			}
			if(self.itemInfo.clientAreaCode === "") {
				self.$Message.error("请选择机场区域");
				return;
			}
			if(self.itemInfo.clientLocationId === "") {
				self.$Message.error("请选择丢失地点");
				return;
			}
			if(self.itemInfo.clientLostTime === "") {
				self.$Message.error("请选择丢失时间");
				return;
			}
			if(self.itemInfo.lostDesc === "") {
				self.$Message.error("请输入失物详细信息");
				return;
			}
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.lostRegistService),
                url: self.$config.action.saveLostInfo,
                data: self.$qs.stringify({
                    id: self.itemInfo.id || 0,
                    fromType: "airport", //用户类型，必须传入 client : 旅客 airportH5 :来自机场前端H5的机场内部用户 airportWww :来自机场www后台的机场内部用户
                    lostUserId: null, //旅客的机场通用户id，当fromType为client时，必须传入
                    officialUserId: !!self.itemInfo.id?null:self.userInfo.id, // 机场内部用户id，当fromType为airport时，必须传入
                    firstCateId: self.itemInfo.firstCateId, //一级分类ID，可不填
                    secondCateId: self.itemInfo.secondCateId, // 二级分类ID，新增时必填
                    lostTitle: self.itemInfo.lostTitle, // 失物名称，新增时必填，修改时可不填。比如单独修改失物状态时即可不用传入
                    clientLostTime: !!self.itemInfo.clientLostTime?self.formatTime(self.itemInfo.clientLostTime, true):"", //遗失日期，yyyy-MM-dd如2020-08-02
                    clientAreaCode: self.itemInfo.clientAreaCode, //机场区域，固定值
                    clientLocationId: self.itemInfo.clientLocationId, // 遗失位置id，从“获取失物位置列表”接口获取
                    clientDetailAreaDesc: self.itemInfo.clientDetailAreaDesc, // 遗失地址详细描述
                    clientAirlineNo: self.itemInfo.clientAirlineNo, // 航班号
                    clientLostAmount: self.itemInfo.clientLostAmount, // 失物数量
                    catePropName1: self.itemInfo.catePropName1, // 失物所属二级分类的分类属性1的名称，新增时必填
                    catePropValue1: self.itemInfo.catePropValue1, // 失物所属二级分类的分类属性1的属性值，新增时必填
                    catePropName2: self.itemInfo.catePropName2, // 失物所属二级分类的分类属性2的名称，如分类属性的propMustInput2为1则强制必填
                    catePropValue2: self.itemInfo.catePropValue2, // 失物所属二级分类的分类属性2的属性值，如分类属性的propMustInput2为1则强制必填
                    catePropName3: self.itemInfo.catePropName3, // 失物所属二级分类的分类属性3的名称，如分类属性的propMustInput3为1则强制必填
                    catePropValue3: self.itemInfo.catePropValue3, // 失物所属二级分类的分类属性3的属性值，如分类属性的propMustInput3为1则强制必填
                    catePropName4: self.itemInfo.catePropName4, // 失物所属二级分类的分类属性4的名称，如分类属性的propMustInput4为1则强制必填
                    catePropValue4: self.itemInfo.catePropValue4, // 失物所属二级分类的分类属性4的属性值，如分类属性的propMustInput4为1则强制必填
                    clientLostPhoto1: !!self.itemInfo.clientLostPhoto1?self.itemInfo.clientLostPhoto1.split(',')[1]:"", //旅客自行上传的外观图片1
                    clientLostPhoto2: !!self.itemInfo.clientLostPhoto2?self.itemInfo.clientLostPhoto2.split(',')[1]:"", //旅客自行上传的外观图片2
                    clientOwnerName: self.itemInfo.clientOwnerName, // 失主姓名，新增时必须填写
                    clientOwnerPhone: self.itemInfo.clientOwnerPhone, // 失主电话，新增时必须填写
                    clientOwnerCertType: self.itemInfo.clientOwnerCertType, //失主证件类型，旅客自行新增时必须填写，工作人员录入时可不填：
                    clientOwnerCertNo: self.itemInfo.clientOwnerCertNo, //失主证件号，旅客自行新增时必须填写，工作人员录入时可不填
                    clientDealStatus: self.itemInfo.clientDealStatus, //报失处理状态，注意需仅内部工作人员可以修改
                    clientAddress: self.itemInfo.clientAddress, //旅客收件地址
                    lostDesc: self.itemInfo.lostDesc, //物品描述
                    clientTakeTime: !!self.itemInfo.clientTakeTime?self.formatTime(self.itemInfo.clientTakeTime, true):"", // 旅客领走日期，yyyy-MM-dd HH24:MI:SS
                    clientTakeType: self.itemInfo.clientTakeType, // 领取失物方式，认领失物时必须填写
                    clientTakeUserName: self.itemInfo.clientTakeUserName, // 领取人姓名，领取失物时必须填写
                    clientTakeUserCertType: self.itemInfo.clientTakeUserCertType, // 领取人证件号，领取失物时必须填写
                    clientTakeUserCertNo: self.itemInfo.clientTakeUserCertNo, // 领取人证件号，领取失物时必须填写
                    clientTakeUserPhone: !!self.itemInfo.clientTakeUserPhone?self.itemInfo.clientTakeUserPhone.split(',')[1]:"", // 领取人电话，领取失物时必须填写
                    clientTakeUserCertPhoto1: !!self.itemInfo.clientTakeUserCertPhoto1?self.itemInfo.clientTakeUserCertPhoto1.split(',')[1]:"", // 领取人证件正面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    clientTakeUserCertPhoto2: !!self.itemInfo.clientTakeUserCertPhoto2?self.itemInfo.clientTakeUserCertPhoto2.split(',')[1]:"", // 领取人证件背面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    clientTakeSignPhoto: self.itemInfo.clientTakeSignPhoto, // 领取签名照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    deliveryCompanyId: self.itemInfo.deliveryCompanyId, // 快递公司ID：
                    deliveryNo: self.itemInfo.deliveryNo, // 快递单号
                    clientAuthorizationCertPhoto: !!self.itemInfo.clientAuthorizationCertPhoto?self.itemInfo.clientAuthorizationCertPhoto.split(',')[1]:"", // 他人代领的失主授权文件电子版，当takeType不为1时，领取时必填
                    createUserId: self.userInfo["id"], // 创建用户ID，新增时必传
                    modifyUserId: self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("保存成功");
					if(self.itemInfo.id) {
						if(self.closeModal) {
						    self.closeModal();
						}
					} else {
						self.isMatch = true;
					}
					if(self.reflesh) {
					    self.reflesh();
					}
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
                self.disable = false;
            })
            .catch(function (error) {
                console.log(error);
                self.disable = false;
            });
        },

        // 遗失位置
        getLostAreaList(){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.lostRegistService),
                url: self.$config.action.getLostAreaList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000,
                    "companyId": self.userInfo.companyId,
                    "areaCode": self.itemInfo.clientAreaCode
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.areaCodeList = res.data.data;
                    
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
		// 上传文件
		uploadFileAction(id){
		    let self = this;
		    var fileList = document.getElementById(id).files;
		    let formdataList = [];
		    self["itemInfo"][id] = [];
		
		    formdataList.push(new FormData());// 创建form对象
		    formdataList[0].append('photo',fileList[0], fileList[0].name);// 通过append向form对象添加数据,可以通过append继续添加数据 
		    self.axios({
		        method: 'post',
		        headers: self.$utility.setHeader(self.$config.service.uploadService,'multipart/form-data'),
		        url: self.$config.hostName+self.$config.service.uploadService+'?createUserId='+self.userInfo['id']+'&userId='+self.userInfo['id']+'&userToken='+self.userInfo['userToken']+'&fileType=lostItem'+'&companyId='+ self.userInfo.companyId,
		        data: formdataList[0]
		    })
		    .then(function (res) {
		        if(res.data.code=='200') {
		            self.$Message.success("上传成功");
		            self["itemInfo"][id] = res.data.message;
		        } else if(res.data.code=='9003') {} else {
		            self.$Message.error(res.data.message);
		        }
		    })
		    .catch(function (error) {
		        console.log(error);
		    });
		},
		// 删除附件
		deleteFile(id){
		    let self = this;
		    self.axios({
		        method: 'post',
		        headers: self.$utility.setHeader(self.$config.service.attachmentService),
		        url: self.$config.action.delAttachment,
		        data: self.$qs.stringify({
		            "ids": parseInt(self["itemInfo"][id].split(',')[0]),
		            "modifyUserId": self.userInfo["id"],
		        })
		    })
		    .then(function (res) {
		        if(res.data.code=='200') {
		            self.$Message.success("删除成功");
		            self["itemInfo"][id] = "";
		            document.getElementById(id).value = "";
		        } else if(res.data.code=='9003') {} else {
		            self.$Message.error(res.data.message);
		        }
		        self.isLoading = false;
		    })
		    .catch(function (error) {
		        console.log(error);
		        self.isLoading = false;
		    });
		},
		// 区域
        getSysParaList(){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.sysParaService),
                url: self.$config.action.getSysParaList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000,
                    "name": "",
                    "type": "",
                    "cateCode": "clientAreaCode",
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.clientAreaCode = res.data.data;
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
        self.getLostCategoryList(1);
		self.getLostAreaList();
		self.getSysParaList();
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        let userTimeOut = null;
        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        };
    },
    beforeDestroy(){

    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
</style>
