<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;标题
                            <template>
                                <Input v-model="searchInfo.roleName" clearable placeholder="请输入标题" style="width:150px;"/>
                            </template>
                            <template>
                                <div class="searchBtnList">
                                    <Button type="primary" icon="ios-add-circle" @click="showNew">新增</Button>
                                    <Button icon="ios-refresh-circle" @click="reflesh">重置</Button>
                                </div>
                            </template>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="tableList">
            <template>
                <Table :height="height-100" border stripe :loading="isLoading" :columns="columnsRealTime" :data="realTimeDataList">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" @click="showEdit(row)">修改</Button>&nbsp;&nbsp;
                        <Button type="error" size="small" @click="deleteAction(row)">删除</Button>
                    </template>
                </Table>
            </template>
        </div>
        <div class="pageWrap">
            <template>
                <Page :total="count" @on-change="pageSizeChange" @on-page-size-change="pageRowChange" :page-size="50" :page-size-opts="[50, 100, 150]" show-sizer showTotal />
            </template>
        </div>

        <template>
            <Modal v-model="isDetail" class="noContentPadding" :mask-closable="false" width="30" :styles="{top: '5%'}" title="角色录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td class="label" style="width: 20%;"><span class="request">*</span>所属公司：</td>
                                <td style="width: 20%;">
                                    <template>
                                        <Select v-model="itemInfo.companyId" clearable placeholder="选择公司" style="width: 100%;">
                                            <template v-for="(item, index) in companyList">
                                                <Option :value="item.id" :key="index">{{item.companyName}}</Option>
                                            </template>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>角色名称：</td>
                                <td><Input v-model="itemInfo.roleName" placeholder="填写角色名称,2~8为字符" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>角色编码：</td>
                                <td><Input v-model="itemInfo.roleCode" placeholder="填写角色编码,2~15为字符" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>是否可用：</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.isValid" clearable placeholder="选择是否可用" style="width: 100%;">
                                            <Option :value="1">可用</Option>
                                            <Option :value="0">不可用</Option>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">角色描述：</td>
                                <td><Input v-model="itemInfo.roleDesc" placeholder="填写角色描述" style="width: 100%" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isDetail=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveAction" :disable="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>

        
    </div>
</template>

<script>
export default {
    name: "role",
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isModalLoading: false,
        isDetail: false,
        isFunction: false,
        isInfo: false,
        disable: false,
        isLoading: false,
        count: 0,
        pageInfo: {
            pageIndex: 0,
            pageSize: 50,
        },
        searchInfo: {
            "companyId": "", // 所属公司ID，手动从公司列表选择
            "roleName": "", // 角色名称
        },
        itemInfo: {
            "id": "", // 系统角色ID，修改时必传
            "companyId": "", // 所属公司ID，手动从公司列表选择
            "roleName": "", // 角色名称
            "roleCode": "", // 角色编码
            "roleDesc": "", // 角色描述
            "isValid": 1, // 分组是否可用，默认=1 0=否 1=是
            "isPublic": 1, // 是否公共角色 0=否 1=是
            "createUserId": "", // 创建用户ID，新增时必传
            "modifyUserId": "", // 修改用户ID，修改时必传
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "标题",
                align: "center",
                key: "roleName",
            },
            {
                title: "英文标题",
                align: "center",
                key: "roleName",
            },
            {
                title: "关键词",
                align: "center",
                key: "roleName",
            },
            {
                title: "创建时间",
                align: "center",
                key: "createTime",
            },
            {
                title: "更新时间",
                align: "center",
                key: "modifyTime",
            },
            {
                align: "center",
                title: "操作",
                width: 220,
                slot: 'action'
            }
        ],
        realTimeDataList: [],
        companyList: [],

        roleFunctionPageInfo: {
            "count": 0,
            "pageNum": 1,
            "pageSize": 20,
            "roleId": "", // 角色ID
            "companyId": "", // 公司ID
        },
        roleFunctionColumsList: [{
            "type": "selection",
            "width": 60,
            "align": "center"
        },
        {
            "title": "公司名称",
            "align": "center",
            "key": "companyName",
            "width": 250
        },
        {
            "title": "角色名称",
            "align": "center",
            "key": "roleName"
        },
        {
            "title": "功能名称",
            "align": "center",
            "key": "functionName"
        }],
        roleFunctionTableRowList: [],
        functionsTableRowList: [],
        selectFunction: [],
        selectRoleFunction: []
    }),
    methods: {
        pageSizeChange(value) {
            var self = this;
            self.pageInfo.pageIndex = parseInt(value, 10);
            self.getList(true);
        },
        pageRowChange(value) {
            var self = this;
            self.pageInfo.pageSize = parseInt(value, 10);
            self.getList(false);
        },
        reflesh(){
            var self = this;
            self.getList(true);
        },

        // 获取公司列表
        getList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.getRoleList,
                data: self.$qs.stringify({
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "companyId": self.searchInfo.companyId, // 查询关键字（公司名称）
                    "roleName": encodeURI(self.searchInfo.roleName), // 上级公司ID
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.realTimeDataList = res.data.data;
                    self.count = res.data.count;
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
        // 显示新增
        showNew(){
            let self = this;
            self.itemInfo = {
                "id": "", // 系统角色ID，修改时必传
                "companyId": "", // 所属公司ID，手动从公司列表选择
                "roleName": "", // 角色名称
                "roleCode": "", // 角色编码
                "roleDesc": "", // 角色描述
                "isValid": 1, // 分组是否可用，默认=1 0=否 1=是
                "isPublic": 1, // 是否公共角色 0=否 1=是
                "createUserId": "", // 创建用户ID，新增时必传
                "modifyUserId": "", // 修改用户ID，修改时必传
            };
            self.itemInfo.companyId = !!self.companyList[0]?self.companyList[0]["id"]:'';
            self.isDetail = true;
        },
        // 显示编辑
        showEdit(item){
            let self = this;
            for(var key in item) {
                self.itemInfo[key] = item[key];
            }
            self.isDetail = true;
        },
        // 显示详情
        showInfo(item){
            let self = this;
            for(var key in item) {
                self.itemInfo[key] = item[key];
            }
            self.isInfo = true;
        },
        // 保存公司
        saveAction(){
            let self = this;
            if(!self.itemInfo.companyId) {
                self.$Message.error("请选择公司");
                return;
            }
            if(self.itemInfo.roleName.trim().length==0) {
                self.$Message.error("请输入角色名称");
                return;
            }
            if(self.itemInfo.roleCode.trim().length==0) {
                self.$Message.error("请输入角色编码");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.saveRole,
                data: self.$qs.stringify({
                    "id": self.itemInfo.id || 0, 
                    "companyId": self.itemInfo.companyId,
                    "roleName": encodeURI(self.itemInfo.roleName),
                    "roleCode": encodeURI(self.itemInfo.roleCode),
                    "roleDesc": encodeURI(self.itemInfo.roleDesc), // 角色描述
                    "isValid": self.itemInfo.isValid,
                    "isPublic": self.itemInfo.isPublic,
                    "createUserId": self.userInfo["id"], // 创建用户ID，新增时必传
                    "modifyUserId": self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "id": "", // 系统角色ID，修改时必传
                        "companyId": "", // 所属公司ID，手动从公司列表选择
                        "roleName": "", // 角色名称
                        "roleCode": "", // 角色编码
                        "roleDesc": "", // 角色描述
                        "isValid": 1, // 分组是否可用，默认=1 0=否 1=是
                        "isPublic": 1, // 是否公共角色 0=否 1=是
                        "createUserId": "", // 创建用户ID，新增时必传
                        "modifyUserId": "", // 修改用户ID，修改时必传
                    };
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
                self.disable = false;
            })
            .catch(function (error) {
                console.log(error);
                self.disable = false;
            });
        },
        // 删除公司
        deleteAction(item){
            let self = this;
            self.$Modal.confirm({
                "title": "确定删除"+ item.roleName+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        headers: self.$utility.setHeader(self.$config.service.permissionService),
                        url: self.$config.action.delRole,
                        data: self.$qs.stringify({
                            "ids": item.id, // 公司ID，修改公司信息时必传
                            "modifyUserId": self.userInfo["id"], // 修改用户ID，修改时必传
                        })
                    })
                    .then(function (res) {
                        if(res.data.code=='200') {
                            self.$Message.success("删除成功");
                            self.getList(true);
                        } else if(res.data.code=='9003') {
                            self.utility.loginTimeOut(self);
                        } else {
                            self.$Message.error(res.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            });
        },
        // 获取公司
        getCompanyList(){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.companyService),
                url: self.$config.action.getCompanyList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 1000
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.companyList = res.data.data;
                    self.searchInfo.companyId = self.userInfo.companyId;
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
        showRoleFunctions(item){
            let self = this;
            self.roleFunctionPageInfo.companyId = item.companyId;
            self.roleFunctionPageInfo.roleId = item.id;
            self.isFunction = true;
            self.getFunctionsDataList();
            self.getRoleFunctionsDataList(true);
        },
        // 页数改变时的回调
        roleFunctionsPageSizeChange: function (value) {
            var self = this;
            self.roleFunctionPageInfo.pageNum = parseInt(value, 10);
            setTimeout(function () {
                self.getRoleFunctionsDataList(false);
            }, 200);
        },
        // 切换每页条数时的回调
        roleFunctionsPageRowChange: function (value) {
            var self = this;
            self.roleFunctionPageInfo.pageSize = parseInt(value, 10);
            setTimeout(function () {
                self.getRoleFunctionsDataList(false);
            }, 200);
        },
        // 获取角色可用功能列表数据接口
        getRoleFunctionsDataList: function (bool) {
            var self = this;
            if (bool == true) {
                self.roleFunctionPageInfo.pageNum = 1;
            }
            self.isModalLoading = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.getRoleFunctionList,
                data: self.$qs.stringify({
                    "pageNum": self.roleFunctionPageInfo.pageNum,
                    "pageSize": self.roleFunctionPageInfo.pageSize,
                    "companyId": self.roleFunctionPageInfo.companyId,
                    "roleId": self.roleFunctionPageInfo.roleId,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.roleFunctionTableRowList = res.data.data;
                    self.roleFunctionPageInfo.count = res.data.count;
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
                self.isModalLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isModalLoading = false;
            });
        },
        getSuper: function (list, value) {
            var self = this;
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i]["id"] == value) {
                    self.selectFunction.push(value);
                    list[i]["checked"] = true;
                    break;
                } else {
                    self.getSuper(list[i]["children"], value);
                }
            }
        },
        setChecked: function () {
            var self = this;
            for (var i = 0, len = self.roleFunctionTableRowList.length; i < len; i++) {
                self.getSuper(self.functionsTableRowList, self.roleFunctionTableRowList[i]["functionId"]);
            }
        },
        // 当选择的行发生变化时 
        selectFunctionsChange: function (selection) {
            var self = this;
            var ids = [];

            for (var i = 0, len = selection.length; i < len; i++) {
                ids.push(selection[i]["id"]);
            }

            self.selectFunction = ids;
        },
        // 格式化系统操作权限功能
        formatFunctions: function (list) {
            var self = this;
            var fun = JSON.stringify(list).replace(/(subFunctionList)/g, 'children').replace(/(functionName)/g, 'title').replace(/isValid/g, 'expand');
            self.functionsTableRowList = JSON.parse(fun);
            console.log(self.functionsTableRowList);
            self.setChecked();
        },
        // 获取系统操作权限功能项目列表接口
        getFunctionsDataList: function (bool) {
            var self = this;
            self.functionsTableRowList = [];
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.getFunctionTreeList,
                data: self.$qs.stringify({
                    "pageNum": 1,
                    "pageSize": 100000,
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.formatFunctions(res.data.data);
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
        // 添加权限
        uploadFunctionDataToServer: function () {
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.saveRoleFunction,
                data: self.$qs.stringify({
                    "roleId": self.roleFunctionPageInfo.roleId, // 系统角色ID，修改时必传
                    "companyId": self.roleFunctionPageInfo.companyId, // 所属公司ID，手动从公司列表选择
                    "functionIds": self.selectFunction.join(","), // 角色名称
                    "createUserId": self.userInfo["id"], // 创建用户ID，新增时必传
                    "modifyUserId": self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.getRoleFunctionsDataList(true);
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
        // 当选择的行发生变化时 
        selectRoleFunctionsChange: function (selection) {
            var self = this;
            var ids = [];

            for (var i = 0, len = selection.length; i < len; i++) {
                ids.push(selection[i]["id"]);
            }

            self.selectRoleFunction = ids;
        },
        // 删除角色可用功能
        "deleteRoleFunctions": function () {
            var self = this;
            self.isModalLoading = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.delRoleFunction,
                data: self.$qs.stringify({
                    "ids": self.selectRoleFunction.join(","),
                    "modifyUserId": self.userInfo["id"], // 修改用户ID，修改时必传
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.getRoleFunctionsDataList(true);
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
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        
        // self.getList(true); // 获取角色
        self.getCompanyList(); // 获取公司列表

        self.$watch('searchInfo', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.getList(true);
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
