<template>
    <div id="lostItemInfo">
        <Modal :value="true" class="noContentPadding" :footer-hide="true" :mask-closable="false" width="55" :styles="{top: '5%'}" title="查看失物操作日志" @on-cancel="closeModal">
            <Row :gutter="20">
                <Col span="16">
                    <div class="modalTable" :style="{maxHeight: (height/2-20)+'px',overflowY: 'auto'}">
                        <div class="detail">
                            <table>
                                <tr>
                                    <td class="label" style="width: 250px;">失物编号</td>
                                    <td style="width: 18%;">{{itemInfo.lostItemCode}}</td>
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
                                    <td class="label">是否经过安检</td>
                                    <td>
                                        {{['否', '是'][itemInfo.checkFlag]}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">是否发布到民航统一失物平台</td>
                                    <td>
                                        {{['否', '是'][itemInfo.publicFlag]}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Col>
                <Col span="8">
                    <div style="padding: 10px 0 0 0;" :style="{maxHeight: (height/2-20)+'px',overflowY: 'auto'}">
                        <Steps :current="itemLogList.length-1" size="small" direction="vertical">
                            <template v-for="(item, index) in itemLogList">
                                <Step :key="index" :title="$config.lostItemStatus[item.lostItemStatus]['name']">
                                    <div slot="content">
                                        <div class="label">
                                            <div style="padding: 0 5px;">操作时间: <span style="color: #000;">{{item.modifyTime}}</span></div>
                                            <!-- <div style="padding: 0 5px;">操作: <span style="color: #000;">{{item.approveUserName}}</span></div> -->
                                            <div style="padding: 0 5px;">操作人: <span style="color: #000;">{{item.modifyUserName}}</span></div>
                                            <div style="padding: 0 5px;">部门: <span style="color: #000;">{{item.createDeptName}}</span></div>
                                            <div style="padding: 0 5px;">查看详情: <Button type="text" size="small" @click="showLogInfo(item)">详情</Button></div>
                                        </div>
                                    </div>
                                </Step>
                            </template>
                        </Steps>
                    </div>
                </Col>
            </Row>
        </Modal>

        <template v-if="isLogInfo">
            <LostItemInfo :item-info="logItemInfo" :close-modal="closeLog" :reflesh="reflesh"></LostItemInfo>
        </template>
    </div>
</template>

<script>
import LostItemInfo from "@/components/lostItemInfo.vue";
export default {
    name: "lostItemInfo",
    props: {
        itemInfo: Object,
        closeModal: Function,
        reflesh: Function,
    },
    components: {
        LostItemInfo
     },
    data: () => ({
        userInfo: {},
        height: window.innerHeight,
        itemLogList: [],
        isLogInfo: false,
        logItemInfo: {
            id: 0,
            companyId: "",
            firstCateId: "", //一级分类ID，可不填
            secondCateId: "", // 二级分类ID，新增时必填
            lostTitle: "", // 失物名称，新增时必填，修改时可不填。比如单独修改失物状态时即可不用传入
            pickupPeople: "", // 捡拾人姓名，新增时必填，修改时可不填
            pickupPhone: "", // 捡拾人电话，新增时必填，修改时可不填
            pickupRegUserId: "", // 当是工作人员的前端H5/小程序的失物入口功能界面时，必须传入当前操作用户的用户id
            pickupRegAppearancePic: "", // 捡拾时失物外观照片，传入“附件上传接口”返回的相对url地
            pickupTime: "", // 捡拾日期，yyyy-MM-dd如2020-08-02
            pickupRegTime: "", // 捡拾上报时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
            pickupRegDeptId: "", // 捡拾上报单位
            pickupRegDeptName: "", // 捡拾上报单位
            areaCode: "", // 机场区域，固定值：T1 T2 客机舱 地面交通
            locationId: "", // 遗失位置id，从“获取失物位置列表”接口获取
            airlineNo: "", // 航班号
            lostAmount: "", //  失物数量
            detailAreaDesc: "", // 详细捡拾地址
            receiveTime: "", //  失物接收时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
            handInDeptId: "", // 交件人部门ID
            handInUserName: "", // 失物交件人姓名，如可能是其他旅客
            handInUserPhone: "", // 失物交件人电话，如可能是其他旅客
            checkFlag: "", // 是否经过安检： 0=否 1=是
            showFlag: "", //  是否公示： 0=否 1=是
            lostItemStatus: "", // 失物状态
            useStatus: "", // 物品使用状态
            alertFlag: "", // 有自动匹配结果时是否提醒
            lostRegId: "", // 报失记录ID，当选择匹配的旅客报失记录时必填
            catePropName1: "", // 失物所属二级分类的分类属性1的名称，新增时必填
            catePropValue1: "", // 失物所属二级分类的分类属性1的属性值，新增时必填
            catePropName2: "", // 失物所属二级分类的分类属性2的名称，如分类属性的propMustInput2为1则强制必填
            catePropValue2: "", // 失物所属二级分类的分类属性2的属性值，如分类属性的propMustInput2为1则强制必填
            catePropName3: "", // 失物所属二级分类的分类属性3的名称，如分类属性的propMustInput3为1则强制必填
            catePropValue3: "", // 失物所属二级分类的分类属性3的属性值，如分类属性的propMustInput3为1则强制必填
            catePropName4: "", // 失物所属二级分类的分类属性4的名称，如分类属性的propMustInput4为1则强制必填
            catePropValue4: "", // 失物所属二级分类的分类属性4的属性值，如分类属性的propMustInput4为1则强制必填
            ownerContactTime: "", // 联系失主时间，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
            ownerFromType: "", //失主信息来源
            ownerAddress: "", //旅客地址
            ownerName: "", // 失主姓名，认领失物时必须填写
            ownerPhone: "", // 失主电话，认领失物时必须填写
            ownerCertType: "", // 失主证件类型，认领失物时必须填写
            ownerCertNo: "", // 失主证件号，认领失物时必须填写
            takeTime: "", // 领走失物时间，领取失物时必须填写，yyyy-MM-dd  HH24:MI:SS如2020-08-02 08:23:22
            takeType: "", //领取失物方式，认领失物时必须填写：
            takeUserCertType: "", // 领取人证件类型，认领失物时必须填写：
            takeUserCertNo: "", //领取人证件号，领取失物时必须填写
            takeUserPhone: "", // 领取人电话，领取失物时必须填写
            takeUserCertPhoto1: "", //领取人证件正面照片，领取时必填，传入“附件上传接口”返回的相对url地址
            takeUserCertPhoto2: "", //领取人证件背面照片，领取时必填，传入“附件上传接口”返回的相对url地址
            takeSignPhoto: "", //领取签名照片，领取时必填，传入“附件上传接口”返回的相对url地址
            deliveryCompanyId: "", //快递公司ID 0：无 1：顺丰 2：EMS
            deliveryNo: "", //快递单号
            authorizationCertPhoto: "", // 他人代领的失主授权文件电子版，当takeType不为1时，领取时必填
            lostItemRemark: "", //失物备注信息
            dealRemark: "", // 失物处理备注
            lostItemOfficialPic1: "", //失物正面外观图片, 传入“附件上传接口”返回的相对url地址
            lostItemOfficialPic2: "", //失物背面外观图片, 传入“附件上传接口”返回的相对url地址
            lostItemOfficialPic3: "", //失物内包装图片, 传入“附件上传接口”返回的相对url地址
            lostItemOfficialPic4: "", //失物其他图片, 传入“附件上传接口”返回的相对url地址
            warehouseSpaceIds: "", //失物库存位置ids，多个以英文逗号分隔，入库时必填
            createUseriId: "", //创建用户ID，创建时必填
            modifyUserId: "", // 修改用户ID，修改时必填
        }
    }),
    methods: {
        showLogInfo(item) {
            let self = this;
            for(let key in item) {
                self["logItemInfo"][key] = item[key];
            }
            self.isLogInfo = true;
        },
        closeLog() {
            let self = this;
            self.isLogInfo = false;
        },
        // 获取公司列表
        getLostItemLogList(bool){
            let self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostItemLogList,
                data: self.$qs.stringify({
                    "lostItemId": self.itemInfo.id,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.itemLogList = res.data.data;
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
        self.getLostItemLogList();
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
