<template>
    <div>
        <div style="padding: 0 0 5px 0;">
            <Button type="primary" size="small" @click="showNewOrEdit">+录入二级分类</Button>
        </div>

        <div class="tableList">
            <template>
                <Table stripe :loading="isLoading" border :columns="columns" :data="dataList">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" class="info" size="small" @click="showNewOrEdit(row)">修改</Button>
                        <Button type="text" class="error" size="small" @click="delLostCategory(row)">删除</Button>
                    </template>
                </Table>
            </template>
        </div>
        
        <template>
            <Modal v-model="isDetail" class="noContentPadding" :mask-closable="false" width="80" :styles="{top: '5%'}" title="物品二级分类录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td class="label"><span class="request">*</span>名称</td>
                                <td><Input v-model="itemInfo.cateName" size="small" placeholder="例如：苹果手机" style="width: 100%" /></td>
                                <td class="label" style="width: 120px;"><span class="request">*</span>状态</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.cateStatus" size="small" clearable placeholder="选择分类状态" style="width: 100%;">
                                            <Option :value="1">有效</Option>
                                            <Option :value="2">暂停使用</Option>
                                        </Select>
                                    </template>
                                </td>
                                <td class="label">保存天数</td>
                                <td>
                                    {{parentItem.reserveDays}}
                                </td>
                                <td class="label">排序号</td>
                                <td>
                                    <InputNumber v-model="itemInfo.orderSeq" size="small" :min="0"  placeholder="请输入排序号"  style="width: 100%;"></InputNumber>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="8" style="padding: 0;border: none;">
                                    <table class="innerTable">
                                        <tr>
                                            <td style="width: 25%; padding: 10px;">
                                                <div class="title">属性1</div>
                                                <table class="noborderTable">
                                                    <tr>
                                                        <td><span class="request">*</span>名称</td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input v-model="itemInfo.propName1" size="small" placeholder="例如：iPhone" style="width: 100%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><span class="request">*</span>格式</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propInputType1" size="small" clearable placeholder="选择格式" style="width: 100%;">
                                                                    <template v-for="(item, index) in $config.itemFormat">
                                                                        <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                                    </template>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span class="request">*</span>选项值</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Input v-model="itemInfo.propOptionValue1" size="small" type="textarea" :rows="3" placeholder="例如:iPhone6,iPhone7,iPhone8" style="width: 100%" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span class="request">*</span>是否必填</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propMustInput1" size="small" clearable placeholder="选择是否必填" style="width: 100%;">
                                                                    <Option :value="1">是</Option>
                                                                    <Option :value="0">否</Option>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td style="width: 25%; padding: 10px;">
                                                <div class="title">属性2</div>
                                                <table class="noborderTable">
                                                    <tr>
                                                        <td>名称</td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input v-model="itemInfo.propName2" size="small" placeholder="请输入属性名称" style="width: 100%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>格式</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propInputType2" size="small" clearable placeholder="选择格式" style="width: 100%;">
                                                                    <template v-for="(item, index) in $config.itemFormat">
                                                                        <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                                    </template>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>选项值</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Input v-model="itemInfo.propOptionValue2" size="small" type="textarea" :rows="3" placeholder="请输入选项值" style="width: 100%" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>是否必填</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propMustInput2" size="small" clearable placeholder="选择是否必填" style="width: 100%;">
                                                                    <Option :value="1">是</Option>
                                                                    <Option :value="0">否</Option>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td style="width: 25%; padding: 10px;">
                                                <div class="title">属性3</div>
                                                <table class="noborderTable">
                                                    <tr>
                                                        <td>名称</td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input v-model="itemInfo.propName3" size="small" placeholder="请输入属性名称" style="width: 100%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>格式</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propInputType3" size="small" clearable placeholder="选择格式" style="width: 100%;">
                                                                    <template v-for="(item, index) in $config.itemFormat">
                                                                        <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                                    </template>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>选项值</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Input v-model="itemInfo.propOptionValue3" size="small" type="textarea" :rows="3" placeholder="请输入选项值" style="width: 100%" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>是否必填</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propMustInput3" size="small" clearable placeholder="选择是否必填" style="width: 100%;">
                                                                    <Option :value="1">是</Option>
                                                                    <Option :value="0">否</Option>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td style="width: 25%; padding: 10px;">
                                                <div class="title">属性4</div>
                                                <table class="noborderTable">
                                                    <tr>
                                                        <td>名称</td>
                                                    </tr>
                                                    <tr>
                                                        <td><Input v-model="itemInfo.propName4" size="small" placeholder="请输入属性名称" style="width: 100%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>格式</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propInputType4" size="small" clearable placeholder="选择格式" style="width: 100%;">
                                                                    <template v-for="(item, index) in $config.itemFormat">
                                                                        <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                                    </template>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>选项值</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <Input v-model="itemInfo.propOptionValue4" size="small" type="textarea" :rows="3" placeholder="请输入选项值" style="width: 100%" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>是否必填</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <template>
                                                                <Select v-model="itemInfo.propMustInput4" size="small" clearable placeholder="选择是否必填" style="width: 100%;">
                                                                    <Option :value="1">是</Option>
                                                                    <Option :value="0">否</Option>
                                                                </Select>
                                                            </template>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isDetail=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveLostCategory" :disabled="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>
    </div>
</template>

<script>
import levelInfo from "@/components/levelInfo.vue";
export default {
    name: "secondLevel",
    props: {
        parentItem: Object
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isLoading: false,
        isDetail: false,
        disable: false,
        count: 0,
        pageInfo: {
            pageIndex: 1,
            pageSize: 100,
        },
        searchInfo: {
            cateName: "", // 分类名称
            cateStatus: "", // 分类状态是否有效：1：有效 2：暂停使用
            paraCateId: "", // 上级分类ID，第二级分类时必须传入
        },
        itemInfo: {
            cateLevel: "", // 分类层级，第1级分类的值默认为1
            cateName: "", // 分类名称
            cateStatus: "", // 分类状态是否有效：1：有效 2：暂停使用
            paraCateId: "", // 上级分类ID，第二级分类时必须传入
            reserveDays: 365, // 失物默认保存天数，默认365天
            orderSeq: null, // 显示排序号
            propName1: "", // 物品属性1，第二级分类时必须填入
            propInputType1: "", // 物品属性1的用户输入方式
            propOptionValue1: "", // 物品属性1的选项值
            propMustInput1: "", // 物品属性1是否必填：0=否 1=是
            propName2: "", // 物品属性2，第二级分类时必须填入
            propInputType2: "", // 物品属性2的用户输入方式
            propOptionValue2: "", // 物品属性2的选项值
            propMustInput2: "", // 物品属性2是否必填：0=否 1=是
            propName3: "", // 物品属性3，第二级分类时必须填入
            propInputType3: "", // 物品属性3的用户输入方式
            propOptionValue3: "", // 物品属性3的选项值
            propMustInput3: "", // 物品属性3是否必填：0=否 1=是
            propName4: "", // 物品属性4，第二级分类时必须填入
            propInputType4: "", // 物品属性4的用户输入方式
            propOptionValue4: "", // 物品属性4的选项值
            propMustInput4: "", // 物品属性4是否必填：0=否 1=是
        },
        columns: [
            {
                title: "类型名称",
                align: "center",
                key: "cateName"
            },
            {
                title: "属性明细",
                type: 'expand',
                width: 80,
                align: "center",
                render: (h, params) => {
                    return h(levelInfo, {
                        props: {
                            levelInfo: params.row
                        }
                    })
                }
            },
            {
                title: "属性1",
                align: "center",
                key: "propName1",
                render: function (h, params) {
                    return h("div", [
                        h('div', {props: {}}, params.row.propName1)
                    ]);
                }
            },
            {
                title: "属性2",
                align: "center",
                key: "propName2",
                render: function (h, params) {
                    return h("div", [
                        h('div', {props: {}}, params.row.propName2)
                    ]);
                }
            },
            {
                title: "属性3",
                align: "center",
                key: "propName3",
                render: function (h, params) {
                    return h("div", params.row.propName3);
                }
            },
            {
                title: "属性4",
                align: "center",
                key: "propName4",
                render: function (h, params) {
                    return h("div", params.row.propName4);
                }
            },
            {
                title: "修改时间",
                align: "center",
                key: "createTime",
                width: 150,
            },
            {
                title: "操作",
                align: "center",
                slot: 'action'
            }
        ],
        dataList: [],
    }),
    methods: {
        reflesh(){
            var self = this;
            self.getLostCategoryList(true);
        },
        pageSizeChange(value) {
            var self = this;
            self.pageInfo.pageIndex = parseInt(value, 10);
            self.getLostCategoryList(true);
        },
        pageRowChange(value) {
            var self = this;
            self.pageInfo.pageSize = parseInt(value, 10);
            self.getLostCategoryList(false);
        },
        getLostCategoryList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            console.log(self.parentItem);
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.getLostCategoryList,
                data: self.$qs.stringify({
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "companyId": self.parentItem.companyId,
                    "cateName": self.searchInfo.cateName,
                    "cateStatus": self.searchInfo.cateStatus,
                    "paraCateId": self.parentItem.id,
                    "cateLevel": 2,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.dataList = res.data.data;
                    self.count = res.data.count;
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
        // 新增或修改
        showNewOrEdit(item) {
            var self = this;
            if(typeof item != "undefined") {
                self.itemInfo = item;
            } else {
                self.itemInfo = {
                    cateLevel: "", // 分类层级，第1级分类的值默认为1
                    cateName: "", // 分类名称
                    cateStatus: "", // 分类状态是否有效：1：有效 2：暂停使用
                    paraCateId: "", // 上级分类ID，第二级分类时必须传入
                    reserveDays: 365, // 失物默认保存天数，默认365天
                    orderSeq: null, // 显示排序号
                    propName1: "", // 物品属性1，第二级分类时必须填入
                    propInputType1: "", // 物品属性1的用户输入方式
                    propOptionValue1: "", // 物品属性1的选项值
                    propMustInput1: "", // 物品属性1是否必填：0=否 1=是
                    propName2: "", // 物品属性2，第二级分类时必须填入
                    propInputType2: "", // 物品属性2的用户输入方式
                    propOptionValue2: "", // 物品属性2的选项值
                    propMustInput2: "", // 物品属性2是否必填：0=否 1=是
                    propName3: "", // 物品属性3，第二级分类时必须填入
                    propInputType3: "", // 物品属性3的用户输入方式
                    propOptionValue3: "", // 物品属性3的选项值
                    propMustInput3: "", // 物品属性3是否必填：0=否 1=是
                    propName4: "", // 物品属性4，第二级分类时必须填入
                    propInputType4: "", // 物品属性4的用户输入方式
                    propOptionValue4: "", // 物品属性4的选项值
                    propMustInput4: "", // 物品属性4是否必填：0=否 1=是
                };
            }

            self.isDetail = true;
        },
        // 保存分类
        saveLostCategory() {
            var self = this;
            if(self.itemInfo.cateName.length==0) {
                self.$Message.error("请输入类别名称");
                return;
            }
            if(self.itemInfo.cateStatus==="") {
                self.$Message.error("请选择分类状态");
                return;
            }
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.cateService),
                url: self.$config.action.saveLostCategory,
                data: self.$qs.stringify({
                    id: self.itemInfo.id||0,
                    companyId: self.parentItem.companyId,
                    cateLevel: 2, // 分类层级，第1级分类的值默认为1
                    cateName: self.itemInfo.cateName||"", // 分类名称
                    cateStatus: self.itemInfo.cateStatus||1, // 分类状态是否有效：1：有效 2：暂停使用
                    paraCateId: self.parentItem.id, // 上级分类ID，第二级分类时必须传入
                    reserveDays: self.parentItem.reserveDays||365, // 失物默认保存天数，默认365天
                    orderSeq: self.itemInfo.orderSeq||0, // 显示排序号
                    propName1: self.itemInfo.propName1||"", // 物品属性1，第二级分类时必须填入
                    propInputType1: self.itemInfo.propInputType1||"", // 物品属性1的用户输入方式
                    propOptionValue1: self.itemInfo.propOptionValue1||"", // 物品属性1的选项值
                    propMustInput1: self.itemInfo.propMustInput1||"", // 物品属性1是否必填：0=否 1=是
                    propName2: self.itemInfo.propName2||"", // 物品属性2，第二级分类时必须填入
                    propInputType2: self.itemInfo.propInputType2||"", // 物品属性2的用户输入方式
                    propOptionValue2: self.itemInfo.propOptionValue2||"", // 物品属性2的选项值
                    propMustInput2: self.itemInfo.propMustInput2||"", // 物品属性2是否必填：0=否 1=是
                    propName3: self.itemInfo.propName3||"", // 物品属性3，第二级分类时必须填入
                    propInputType3: self.itemInfo.propInputType3||"", // 物品属性3的用户输入方式
                    propOptionValue3: self.itemInfo.propOptionValue3||"", // 物品属性3的选项值
                    propMustInput3: self.itemInfo.propMustInput3||"", // 物品属性3是否必填：0=否 1=是
                    propName4: self.itemInfo.propName4||"", // 物品属性4，第二级分类时必须填入
                    propInputType4: self.itemInfo.propInputType4||"", // 物品属性4的用户输入方式
                    propOptionValue4: self.itemInfo.propOptionValue4||"", // 物品属性4的选项值
                    propMustInput4: self.itemInfo.propMustInput4||"", // 物品属性4是否必填：0=否 1=是
                    createUserId: self.userInfo["id"], // 创建用户ID，新增时必传
                    modifyUserId: self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("保存成功");
                    self.isDetail = false;
                    self.getLostCategoryList(true);
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
        // 删除分类
        delLostCategory(item) {
            var self = this;
            self.$Modal.confirm({
                title: '确认要删除分类'+item.cateName+'吗？',
                content: '',
                onOk: () => {
                    self.axios({
                        method: 'post',
                        headers: self.$utility.setHeader(self.$config.service.cateService),
                        url: self.$config.action.delLostCategory,
                        data: self.$qs.stringify({
                            ids: [item.id].join(","),
                            modifyUserId: self.userInfo.id
                        })
                    })
                    .then(function (res) {
                        if(res.data.code=='200') {
                            self.$Message.success("删除成功");
                            self.getLostCategoryList(true);
                        } else if(res.data.code=='9003') {} else {
                            self.$Message.error(res.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            });
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");

        self.getLostCategoryList(true);

        self.$watch('searchInfo', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.getLostCategoryList(true);
            }, 200);
        }, {
            deep: true
        });
    },
    mounted() {
        let self = this;
        let resizeTime = null;
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
