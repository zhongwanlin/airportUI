<template>
    <div id="claimLostItem">
        <Modal :value="true" class="noContentPadding" :mask-closable="false" width="40" :styles="{top: '5%'}" title="认领失物" @on-cancel="closeModal">
            <div class="modalTable" :style="{maxHeight: (height-200)+'px',overflowY: 'auto'}">
                <div class="detail">
                    <table>
                        <tr>
                            <td class="label" style="width: 280px;"><span class="request">*</span>移交方式</td>
                            <td style="width: 18%;">
                                <template>
                                    <Select v-model="itemInfo.takeType" placeholder="选择移交方式" style="width: 100%;">
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
                            <td class="label"><span class="request">*</span>旅客姓名</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerName" placeholder="请输入旅客姓名" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label"><span class="request">*</span>旅客电话</td>
                            <td>
                                <template>
                                    <Input v-model="itemInfo.ownerPhone" placeholder="请输入旅客电话" style="width: 100%" />
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="label">领走时间</td>
                            <td>
                                <template>
                                    <DatePicker v-model="itemInfo.takeTime" type="datetime" placeholder="请选择时间" style="width: 100%;"></DatePicker>
                                </template>
                            </td>
                        </tr>
                     
                        <tr>
                            <td class="label">认领来源</td>
                            <td>
                                <template>
                                    <Select v-model="itemInfo.ownerFromType" placeholder="选择认领来源" style="width: 100%;">
                                        <template v-for="(item, index) in $config.ownerFromType">
											<template v-if="index>0">
                                            <Option :value="item.id" :key="index">{{item.name}}</Option>
											</template>
                                        </template>
                                    </Select>
                                </template>
                            </td>
                        </tr>
                        <template v-if="itemInfo.takeType==1">
                            <tr> 
                                <td class="label" style="vertical-align: top;">本人身份证复印件</td>
                                <td>
                                    <Row>
                                        <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="takeUserCertPhoto1" id="takeUserCertPhoto1" type="file"></p></Col>
                                        <Col span="6">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.takeUserCertPhoto1">
                                                    <Button size="small" type="error" @click="deleteFile('takeUserCertPhoto1')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('takeUserCertPhoto1')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                    <div v-if="!!itemInfo.takeUserCertPhoto1">
                                        <img style="width: 100%;"  :src="$config.hostName+'/lostFound/'+(itemInfo.takeUserCertPhoto1.indexOf(',')!=-1?itemInfo.takeUserCertPhoto1.split(',')[1]:itemInfo.takeUserCertPhoto1)"/>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-if="itemInfo.takeType==2">
                            <tr>
                                <td class="label">代领人姓名</td>
                                <td>
                                    <template>
                                        <Input v-model="itemInfo.takeUserName" placeholder="请输入代领人姓名" style="width: 100%" />
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">代领人联系电话</td>
                                <td>
                                    <template>
                                        <Input v-model="itemInfo.takeUserPhone" placeholder="请输入代领人联系电话" style="width: 100%" />
                                    </template>
                                </td>
                            </tr>
                            <tr> 
                                <td class="label" style="vertical-align: top;">本人身份证复印件</td>
                                <td>
                                    <Row>
                                        <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="takeUserCertPhoto1" id="takeUserCertPhoto1" type="file"></p></Col>
                                        <Col span="6">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.takeUserCertPhoto1">
                                                    <Button size="small" type="error" @click="deleteFile('takeUserCertPhoto1')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('takeUserCertPhoto1')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                    <div v-if="!!itemInfo.takeUserCertPhoto1">
                                        <img style="width: 100%;"  :src="$config.hostName+'/lostFound/'+(itemInfo.takeUserCertPhoto1.indexOf(',')!=-1?itemInfo.takeUserCertPhoto1.split(',')[1]:itemInfo.takeUserCertPhoto1)"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label" style="vertical-align: top;">他人代领委托书</td>
                                <td >
                                    <Row>
                                        <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="authorizationCertPhoto" id="authorizationCertPhoto" type="file"></p></Col>
                                        <Col span="6">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.authorizationCertPhoto">
                                                    <Button size="small" type="error" @click="deleteFile('authorizationCertPhoto')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('authorizationCertPhoto')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                    <div v-if="!!itemInfo.authorizationCertPhoto">
                                        <img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.authorizationCertPhoto.indexOf(',')!=-1?itemInfo.authorizationCertPhoto.split(',')[1]:itemInfo.authorizationCertPhoto)"/>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <template v-if="itemInfo.takeType==3||itemInfo.takeType==4">
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
                                <td colspan="3">
                                    <template>
                                        <Input v-model="itemInfo.ownerAddress" placeholder="请输入邮寄地址" style="width: 100%" />
                                    </template>
                                </td>
                            </tr>
                            
                            <tr> 
                                <td class="label" style="vertical-align: top;">本人身份证复印件</td>
                                <td>
                                    <Row>
                                        <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="takeUserCertPhoto1" id="takeUserCertPhoto1" type="file"></p></Col>
                                        <Col span="6">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.takeUserCertPhoto1">
                                                    <Button size="small" type="error" @click="deleteFile('takeUserCertPhoto1')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('takeUserCertPhoto1')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                    <div v-if="!!itemInfo.takeUserCertPhoto1">
                                        <img style="width: 100%;"  :src="$config.hostName+'/lostFound/'+(itemInfo.takeUserCertPhoto1.indexOf(',')!=-1?itemInfo.takeUserCertPhoto1.split(',')[1]:itemInfo.takeUserCertPhoto1)"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label" style="vertical-align: top;">顺丰速运代领委托书</td>
                                <td >
                                    <Row>
                                        <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="authorizationCertPhoto" id="authorizationCertPhoto" type="file"></p></Col>
                                        <Col span="6">
                                            <p style="padding-top: 3px;">
                                                <template v-if="!!itemInfo.authorizationCertPhoto">
                                                    <Button size="small" type="error" @click="deleteFile('authorizationCertPhoto')">删除</Button>
                                                </template>
                                                <template v-else>
                                                    <Button size="small" @click="uploadFileAction('authorizationCertPhoto')">上传</Button>
                                                </template>
                                            </p>
                                        </Col>
                                    </Row>
                                    <div v-if="!!itemInfo.authorizationCertPhoto">
                                        <img style="width: 100%;" :src="$config.hostName+'/lostFound/'+(itemInfo.authorizationCertPhoto.indexOf(',')!=-1?itemInfo.authorizationCertPhoto.split(',')[1]:itemInfo.authorizationCertPhoto)"/>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <!-- <tr>
                            <td class="label" style="vertical-align: top;">旅客有效身份证件背面</td>
                            <td >
                                <Row>
                                    <Col span="18"><p style="padding-top: 5px;"><input name="photo" ref="takeUserCertPhoto2" id="takeUserCertPhoto2" type="file"></p></Col>
                                    <Col span="6">
                                        <p style="padding-top: 3px;">
                                            <template v-if="!!itemInfo.takeUserCertPhoto2">
                                                <Button size="small" type="error" @click="deleteFile('takeUserCertPhoto2')">删除</Button>
                                            </template>
                                            <template v-else>
                                                <Button size="small" @click="uploadFileAction('takeUserCertPhoto2')">上传</Button>
                                            </template>
                                        </p>
                                    </Col>
                                </Row>
                                <div v-if="!!itemInfo.takeUserCertPhoto2">
                                    <img style="width: 100%;"  :src="$config.hostName+'/lostFound/'+(itemInfo.takeUserCertPhoto2.indexOf(',')!=-1?itemInfo.takeUserCertPhoto2.split(',')[1]:itemInfo.takeUserCertPhoto2)"/>
                                </div>
                            </td>
                        </tr> -->
                    </table>
                </div>
            </div>
            <div slot="footer" class="modalFooter">
                <template>
                    <Button type="default" @click="closeModal" style="margin-right: 5px">关闭</Button>
                    <Button type="primary" @click="saveLostItem" :disabled="disable">提交</Button>
                </template>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "claimLostItem",
    props: {
        itemInfo: Object,
        closeModal: Function,
        reflesh: Function,
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        disable: false,
        cateLevel: 1,
        paraCateId: 0,
        cate1: [],
        cate2: [],
        areaCodeList: [],
        deptList: [],
        secondItem: null,
        secondInfo: "",
    }),
    watch: {
        "itemInfo.firstCateId": function(value) {
            var self = this;
            self.getLostCategoryList(2);
        }
    },
    methods: {
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
                headers: self.$utility.setHeader(self.$config.service.cateService),
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
        formatTime(time) {
            var self = this;
            var timeInfo = self.$utility.getCurrentTimeInfo(time);
            return timeInfo.year + "-" + timeInfo.month + "-" + timeInfo.date + " " + timeInfo.hour + ":"+ timeInfo.min + ":"+ timeInfo.second;
        },
        // 保存认领信息
        saveLostItem() {
            var self = this;
            if(self.itemInfo.takeType==="") {
                self.$Message.error("请选择移交方式");
                return;
            }
            if(self.itemInfo.ownerName.length=="") {
                self.$Message.error("请输入旅客姓名");
                return;
            }
            if(self.itemInfo.ownerPhone.length=="") {
                self.$Message.error("请输入旅客电话");
                return;
            }

            // 自取
            if(self.itemInfo.takeType==1) {
                if(self.itemInfo.takeUserCertPhoto1 == "") {
                    self.$Message.error("请上传本人身份证复印件");
                    return;
                }
            }

            // 他人代领
            if(self.itemInfo.takeType==2) {
                if(self.itemInfo.takeUserCertPhoto1 == "") {
                    self.$Message.error("请上传本人身份证复印件");
                    return;
                }
                if(self.itemInfo.authorizationCertPhoto == "") {
                    self.$Message.error("请上传他人代领委托书");
                    return;
                }
            }

            // 他人代领
            if(self.itemInfo.takeType==3||self.itemInfo.takeType==4) {
                if(self.itemInfo.takeUserCertPhoto1 == "") {
                    self.$Message.error("请上传本人身份证复印件");
                    return;
                }
                if(self.itemInfo.authorizationCertPhoto == "") {
                    self.$Message.error("请上传顺丰速运代领委托书");
                    return;
                }
            }

            // 他人代领
            if(self.itemInfo.takeType==2) {
                if(self.itemInfo.authorizationCertPhoto == "") {
                    self.$Message.error("请上传他人代领委托书");
                    return;
                }
            }

            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.saveLostItem,
                data: self.$qs.stringify({
                    id: self.itemInfo.id || 0,
                    companyId: self.userInfo.companyId,
                    firstCateId: self.itemInfo.firstCateId||"", //一级分类ID，可不填
                    secondCateId: self.itemInfo.secondCateId||"", // 二级分类ID，新增时必填
                    lostTitle: self.itemInfo.lostTitle||"", // 失物名称，新增时必填，修改时可不填。比如单独修改失物状态时即可不用传入
                    pickupPeople: self.itemInfo.pickupPeople||"", // 捡拾人姓名，新增时必填，修改时可不填
                    pickupPhone: self.itemInfo.pickupPhone||"", // 捡拾人电话，新增时必填，修改时可不填
                    pickupRegUserId: self.itemInfo.pickupRegUserId||"", // 当是工作人员的前端H5/小程序的失物入口功能界面时，必须传入当前操作用户的用户id
                    pickupRegAppearancePic: self.itemInfo.pickupRegAppearancePic||"", // 捡拾时失物外观照片，传入“附件上传接口”返回的相对url地
                    pickupTime: !!self.itemInfo.pickupTime?self.formatTime(self.itemInfo.pickupTime):"", // 捡拾日期，yyyy-MM-dd如2020-08-02
                    pickupRegTime: !!self.itemInfo.pickupRegTime?self.formatTime(self.itemInfo.pickupRegTime):"", // 捡拾上报时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    areaCode: self.itemInfo.areaCode||"", // 机场区域，固定值：T1 T2 客机舱 地面交通
                    locationId: self.itemInfo.locationId||"", // 遗失位置id，从“获取失物位置列表”接口获取
                    airlineNo: self.itemInfo.airlineNo||"", // 航班号
                    lostAmount: self.itemInfo.lostAmount||"", //  失物数量
                    detailAreaDesc: self.itemInfo.detailAreaDesc||"", // 详细捡拾地址
                    receiveTime: !!self.itemInfo.receiveTime?self.formatTime(self.itemInfo.receiveTime):"", //  失物接收时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    handInDeptId: self.itemInfo.handInDeptId||"", // 交件人部门ID
                    handInUserName: self.itemInfo.handInUserName||"", // 失物交件人姓名，如可能是其他旅客
                    handInUserPhone: self.itemInfo.handInUserPhone||"", // 失物交件人电话，如可能是其他旅客
                    checkFlag: self.itemInfo.checkFlag||"", // 是否经过安检： 0=否 1=是
                    showFlag: self.itemInfo.showFlag||"", //  是否公示： 0=否 1=是
                    lostItemStatus: 7, // 失物状态
                    useStatus: self.itemInfo.useStatus||"", // 物品使用状态
                    alertFlag: self.itemInfo.alertFlag||"", // 有自动匹配结果时是否提醒
                    lostRegId: self.itemInfo.lostRegId||"", // 报失记录ID，当选择匹配的旅客报失记录时必填
                    catePropName1: self.itemInfo.catePropName1||"", // 失物所属二级分类的分类属性1的名称，新增时必填
                    catePropValue1: self.itemInfo.catePropValue1||"", // 失物所属二级分类的分类属性1的属性值，新增时必填
                    catePropName2: self.itemInfo.catePropName2||"", // 失物所属二级分类的分类属性2的名称，如分类属性的propMustInput2为1则强制必填
                    catePropValue2: self.itemInfo.catePropValue2||"", // 失物所属二级分类的分类属性2的属性值，如分类属性的propMustInput2为1则强制必填
                    catePropName3: self.itemInfo.catePropName3||"", // 失物所属二级分类的分类属性3的名称，如分类属性的propMustInput3为1则强制必填
                    catePropValue3: self.itemInfo.catePropValue3||"", // 失物所属二级分类的分类属性3的属性值，如分类属性的propMustInput3为1则强制必填
                    catePropName4: self.itemInfo.catePropName4||"", // 失物所属二级分类的分类属性4的名称，如分类属性的propMustInput4为1则强制必填
                    catePropValue4: self.itemInfo.catePropValue4||"", // 失物所属二级分类的分类属性4的属性值，如分类属性的propMustInput4为1则强制必填
                    ownerContactTime: !!self.itemInfo.ownerContactTime?self.formatTime(self.itemInfo.ownerContactTime):"", // 联系失主时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    ownerAddress: self.itemInfo.ownerAddress||"", //旅客地址
                    ownerName: self.itemInfo.ownerName||"", // 失主姓名，认领失物时必须填写
                    ownerPhone: self.itemInfo.ownerPhone||"", // 失主电话，认领失物时必须填写
                    ownerCertType: self.itemInfo.ownerCertType||"", // 失主证件类型，认领失物时必须填写
                    ownerCertNo: self.itemInfo.ownerCertNo||"", // 失主证件号，认领失物时必须填写
                    takeTime: !!self.itemInfo.takeTime?self.formatTime(self.itemInfo.takeTime):"", // 领走失物时间，领取失物时必须填写，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
                    takeType: self.itemInfo.takeType||"", //领取失物方式，认领失物时必须填写：
                    takeUserCertType: self.itemInfo.takeUserCertType||"", // 领取人证件类型，认领失物时必须填写：
                    takeUserCertNo: self.itemInfo.takeUserCertNo||"", //领取人证件号，领取失物时必须填写
                    takeUserName: self.itemInfo.takeUserName||"", //领取人姓名，领取失物时必须填写
                    takeUserPhone: self.itemInfo.takeUserPhone||"", // 领取人电话，领取失物时必须填写
                    takeUserCertPhoto1: self.itemInfo.takeUserCertPhoto1.indexOf(",")!=-1?self.itemInfo.takeUserCertPhoto1.split(',')[1]:self.itemInfo.takeUserCertPhoto1, //领取人证件正面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    takeUserCertPhoto2:self.itemInfo.takeUserCertPhoto2.indexOf(",")!=-1?self.itemInfo.takeUserCertPhoto2.split(',')[1]:self.itemInfo.takeUserCertPhoto2, //领取人证件背面照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    authorizationCertPhoto: self.itemInfo.authorizationCertPhoto.indexOf(",")!=-1?self.itemInfo.authorizationCertPhoto.split(',')[1]:self.itemInfo.authorizationCertPhoto, // 他人代领的失主授权文件电子版，当takeType不为1时，领取时必填
                    takeSignPhoto: self.itemInfo.takeSignPhoto||"", //领取签名照片，领取时必填，传入“附件上传接口”返回的相对url地址
                    deliveryCompanyId: self.itemInfo.deliveryCompanyId||"", //快递公司ID 0：无 1：顺丰 2：EMS
                    deliveryNo: self.itemInfo.deliveryNo||"", //快递单号
                    lostItemRemark: self.itemInfo.lostItemRemark||"", //失物备注信息
                    ownerFromType: self.itemInfo.ownerFromType||"", //认领来源
                    dealRemark: self.itemInfo.dealRemark||"", // 失物处理备注
                    lostItemOfficialPic1: self.itemInfo.lostItemOfficialPic1.indexOf(",")!=-1?self.itemInfo.lostItemOfficialPic1.split(',')[1]:self.itemInfo.lostItemOfficialPic1, //失物正面外观图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic2: self.itemInfo.lostItemOfficialPic2.indexOf(",")!=-1?self.itemInfo.lostItemOfficialPic2.split(',')[1]:self.itemInfo.lostItemOfficialPic2, //失物背面外观图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic3: self.itemInfo.lostItemOfficialPic3.indexOf(",")!=-1?self.itemInfo.lostItemOfficialPic3.split(',')[1]:self.itemInfo.lostItemOfficialPic3, //失物内包装图片, 传入“附件上传接口”返回的相对url地址
                    lostItemOfficialPic4: self.itemInfo.lostItemOfficialPic4.indexOf(",")!=-1?self.itemInfo.lostItemOfficialPic4.split(',')[1]:self.itemInfo.lostItemOfficialPic4, //失物其他图片, 传入“附件上传接口”返回的相对url地址
                    warehouseSpaceIds: self.itemInfo.warehouseSpaceIds||"", //失物库存位置ids，多个以英文逗号分隔，入库时必填
                    createUserId: self.userInfo["id"], // 创建用户ID，新增时必传
                    modifyUserId: self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("保存成功");
                    self.isDetail = false;
                    if(self.reflesh) {
                        self.reflesh(false);
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
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostAreaList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000,
                    "companyId": self.userInfo.companyId,
                    "areaCode": self.itemInfo.areaCode
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

        getDeptList(){
            var self = this;
    
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.deptService),
                url: self.$config.action.getDeptList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 100,
                    "companyId": self.userInfo.companyId,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.deptList = res.data.data;
                } else if(res.data.code=='9003') {} else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },

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
        }
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
        self.getLostCategoryList(1);
        self.getDeptList();
        self.getLostAreaList();
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
