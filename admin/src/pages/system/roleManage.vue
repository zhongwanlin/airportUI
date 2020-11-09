<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;角色名称
                            <template>
                                <Input v-model="searchInfo.name" clearable placeholder="请输入角色名称" style="width:150px;"/>
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
                        <Button type="warning" size="small" @click="showRoleFunctions(row)">权限设置</Button>&nbsp;&nbsp;
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
            <Modal v-model="isDetail" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="角色录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>角色名称：
                                    <div><Input v-model="itemInfo.name" placeholder="填写角色名称,2~8为字符" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    角色描述：
                                    <div><Input v-model="itemInfo.description" placeholder="填写角色描述" style="width: 100%" /></div>
                                </td>
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

        <template>
            <Modal v-model="isFunction" class="noContentPadding" :mask-closable="false" :footer-hide="true" width="70" :styles="{top: '5%'}" title="角色权限" @on-cancel="isFunction=false">
                <Row>
                    <Col span="8">
                        <div class="searchWrap" style="min-height: auto;">
                            <div class="search">
                                <table>
                                    <tr>
                                        <td>
                                            <span style="font-size: 16px;">权限列表</span>
                                            <template>
                                                <div class="searchBtnList">
                                                    <Button type="primary" size="small" :disabled="selectFunction.length==0" @click="uploadFunctionDataToServer">添加</Button>
                                                </div>
                                            </template>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div style="position: relative; z-index: 0; height: 350px; overflow: auto; padding: 0 10px;">
                            <Tree :data="functionsTableRowList" @on-check-change="selectFunctionsChange" show-checkbox></Tree>
                        </div>
                    </Col>
                    <Col span="16">
                        <div class="searchWrap" style="min-height: auto;">
                            <div class="search">
                                <table>
                                    <tr>
                                        <td>
                                            <span style="font-size: 16px;">绑定的权限</span>
                                            <template>
                                                <div class="searchBtnList">
                                                    <Button type="error" :disabled="selectRoleFunction.length==0" size="small" @click="deleteRoleFunctions">删除</Button>
                                                </div>
                                            </template>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="tableList">
                            <template>
                                <Table :height="300" border stripe @on-selection-change="selectRoleFunctionsChange" :loading="isModalLoading" :columns="roleFunctionColumsList" :data="roleFunctionTableRowList"></Table>
                            </template>
                        </div>
                        <div class="pageWrap">
                            <template>
                                <Page :total="roleFunctionPageInfo.count" @on-change="pageSizeChange" @on-page-size-change="pageRowChange" :page-size="50" :page-size-opts="[50, 100, 150]" show-sizer showTotal />
                            </template>
                        </div>
                    </Col>
                </Row>
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
            "name": "", // 角色名称
        },
        itemInfo: {
            "id": "", // 系统角色ID，修改时必传
            "description": "",
            "menu_auth": "",
            "name": "",
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "角色名称",
                align: "center",
                key: "name",
            },
            // {
            //     title: "状态",
            //     align: "center",
            //     key: "status",
            //     slot: "status"
            // },
            {
                title: "角色描述",
                align: "center",
                key: "description",
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
                method: 'get',
                url: self.$config.action.roleList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                }
            })
            .then(function (res) {
                self.realTimeDataList = res.data.list;
                self.count = res.data.count;
                if(res.data.code=='0') {
                    self.realTimeDataList = res.data.list;
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
                "description": "",
                "menu_auth": "",
                "name": "",
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
            
            if(self.itemInfo.name.trim().length==0) {
                self.$Message.error("请输入角色名称");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                url: !self.itemInfo.id?self.$config.action.roleAdd:self.$config.action.roleEdit,
                data: {
                    "id": self.itemInfo.id || 0, 
                    "description": self.itemInfo.description,
                    "menu_auth": self.itemInfo.menu_auth,
                    "name": self.itemInfo.name
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
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
                "title": "确定删除"+ item.name+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        url: self.$config.action.roleDelete,
                        data: {
                            "id": item.id
                        }
                    })
                    .then(function (res) {
                        if(res.data.code=='0') {
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
        // 启用或禁用
        enableOrNot(value, row){
            let self = this;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: value==1?self.$config.action.roleEnable:self.$config.action.roleDisable,
                data: {
                    "id": row.id
                }
            })
            .then(function (res) {
                if (res.data.code == '0') {
                    self.$Message.success("修改成功");
                    self.getList(false);
                } else if (res.data.code == "419") {
                    self.$utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.msg);
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
                if(res.data.code=='0') {
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
                if(res.data.code=='0') {
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
                if(res.data.code=='0') {
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
                if(res.data.code=='0') {
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
        
        self.getList(true); // 获取角色

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
