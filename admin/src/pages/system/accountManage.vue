<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            <!-- 公司:
                            <template>
                                <Select v-model="searchInfo.companyId" clearable placeholder="选择公司" style="width: 240px;">
                                    <template v-for="(item, index) in companyList">
                                        <Option :value="item.id" :key="index">{{item.companyName}}</Option>
                                    </template>
                                </Select>
                            </template>
                            &nbsp;&nbsp;部门:
                            <template>
                                <div style="display: inline-block;width: 150px"><Cascader :data="superiorDepartmentList" v-model="searchInfo.paraDeptIds" placeholder="请选择部门" trigger="click" :change-on-select="true"></Cascader></div>
                            </template> -->
                            &nbsp;&nbsp;账号:
                            <template>
                                <Input v-model="searchInfo.userCode" clearable placeholder="请输入账号" style="width:100px;"/>
                            </template>
                            &nbsp;&nbsp;用户名:
                            <template>
                                <Input v-model="searchInfo.userName" clearable placeholder="请输入用户名" style="width:100px;"/>
                            </template>
                            <template>
                                <div class="searchBtnList">
                                    <template v-if="!!userFuncCode.addNewUser">
                                        <Button type="primary" icon="ios-add-circle" @click="showNew">新增</Button>
                                    </template>
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
                        <Button type="text" class="info" size="small" @click="showEdit(row)">修改</Button>
                        <template v-if="!!userFuncCode['delUser']">
                        <Button type="text" class="error" size="small" @click="deleteAction(row)">删除</Button>
                        </template>
                    </template>
                    <template slot-scope="{ row, index }" slot="status">
                        <template>
                            <i-switch size="large" :value="row.status" :true-value="911" :false-value="912">
                                <span slot="open">启用</span>
                                <span slot="close">禁用</span>
                            </i-switch>
                        </template>
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
            <Modal v-model="isDetail" class="noContentPadding" :mask-closable="false" width="30" :styles="{top: '5%'}" title="录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td class="label" style="width: 20%;"><span class="request">*</span>公司：</td>
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
                                <td class="label"><span class="request">*</span>部门：</td>
                                <td>
                                    <template>
                                        <Cascader :data="superiorDepartmentList" v-model="itemInfo.paraDeptIds" placeholder="请选择部门" trigger="click" :change-on-select="true"></Cascader>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>所在机场：</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.areaCode" clearable placeholder="选择所在机场" style="width: 100%;">
                                            <Option value="T1">T1航站楼</Option>
                                            <Option value="T2">T2航站楼</Option>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label" style="width: 100px;"><span class="request">*</span>用户账号：</td>
                                <td><Input v-model="itemInfo.userCode" placeholder="填写用户账号,2~50位字符" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>用户名称：</td>
                                <td><Input v-model="itemInfo.userName" placeholder="填写用户名称,填写个人真实姓名" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>帐号状态：</td>
                                <td>
                                    <Select v-model="itemInfo.status" clearable placeholder="选择帐号状态" style="width: 100%;">
                                        <template v-for="(item, index) in userStatusType">
                                            <Option :value="item.type" :key="index">{{item.name}}</Option>
                                        </template>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td class="label"><span class="request">*</span>登录密码：</td>
                                <td><Input v-model="itemInfo.userPwd" placeholder="填写登录密码,至少6个字符,最多18个字符" style="width: 100%" /></td>
                            </tr>
                            
                            <tr>
                                <td class="label"><span class="request">*</span>角色：</td>
                                <td>
                                    <template>
                                        <Select v-model="itemInfo.roleIds" clearable placeholder="选择角色" style="width: 100%;">
                                            <template v-for="(item, index) in roleList">
                                                <Option :value="item.id" :key="index">{{item.roleName}}</Option>
                                            </template>
                                        </Select>
                                    </template>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">手机号码：</td>
                                <td><Input v-model="itemInfo.mobile" placeholder="手机号码" style="width: 100%" /></td>
                            </tr>
                            <!-- <tr>
                                <td class="label">常用邮箱：</td>
                                <td><Input v-model="itemInfo.email" placeholder="常用邮箱" style="width: 100%" /></td>
                            </tr> -->
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isDetail=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveAction" :disabled="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>

    </div>
</template>

<script>
export default {
    name: "user",
    components: { },
    data: () => ({
        userInfo: null,
        userFuncInfo: null,
        height: window.innerHeight,
        isDetail: false,
        disable: false,
        isLoading: false,
        userFuncCode: {},
        count: 0,
        pageInfo: {
            pageIndex: 1,
            pageSize: 50,
        },
        searchInfo: {
            "companyId": "",
            "paraDeptIds": [],
            "userCode": "",
            "userName": "",
        },
        itemInfo: {
            "id": "", // 员工ID，修改员工信息时必传
            "userCode": "", // 用户帐号名
            "areaCode": "", // 航站楼
            "userPwd": "", // 用户密码. 说明： 1、	创建时不设置则默认为123456; 2、修改用户时不设置则不修改原有密码
            "companyId": "", //所属公司ID，手动从公司列表选择
            "posiName": "员工", // 员工工号
            "posiType": 143, // 员工工号
            "userName": "", // 员工姓名
            "mobile": "", // 员工手机号
            "email": "", // 员工邮箱
            "status": "", // 员工帐号状态，默认值911表示正常： 911：正常 912：冻结 913：作废                
            "paraDeptIds": [],
            "roleIds": "", // 角色id，可多选，多个间以英文半角分割
            "deptId": "", // 部门id，单选
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
            // {
            //     align: "center",
            //     title: "公司名称",
            //     key: "companyName",
            //     width: 260,
            // },
            {
                title: "账号名",
                align: "center",
                key: "userCode",
            },
            {
                title: "姓名",
                align: "center",
                key: "userName",
            },
            {
                title: "手机号",
                align: "center",
                key: "mobile"
            },
            {
                title: "邮箱",
                align: "center",
                key: "email",
            },
            {
                title: "角色",
                align: "center",
                key: "roleNames",
            },
            {
                title: "状态",
                align: "center",
                key: "status",
                slot: "status"
            },
            {
                title: "创建时间",
                align: "center",
                key: "createTime",
            },
            {
                align: "center",
                title: "操作",
                width: 120,
                slot: 'action',
            }
        ],
        realTimeDataList: [],
        companyList: [],
        superiorDepartmentList: [],
        userStatusType: [{
            "name": "正常",
            "type": 911
        },{
            "name": "冻结",
            "type": 912
        },{
            "name": "作废",
            "type": 913
        }],
        roleList: []
    }),
    watch: {
        "itemInfo.companyId": function() {
            var self = this;
            self.getRoleList();
            self.$utility.getSuperiorDepartmentList(self, "itemInfo", "deptId");
        },
        "searchInfo.companyId": function() {
            var self = this;
            self.$utility.getSuperiorDepartmentList(self, "searchInfo", "deptId");
        },
    },
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
                    self.searchInfo.companyId = !!self.companyList[0]?self.companyList[0]["id"]:'';
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

        // 获取公司列表
        getRoleList(bool){
            var self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.permissionService),
                url: self.$config.action.getRoleList,
                data: self.$qs.stringify({
                    "pageNum": 0,
                    "pageSize": 10000,
                    "companyId": self.itemInfo.companyId, // 查询关键字（公司名称）
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.roleList = res.data.data;
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

        // 获取用户列表
        getList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.userService),
                url: self.$config.action.getUserList,
                data: self.$qs.stringify({
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "companyId": self.searchInfo.companyId,
                    "userCode": encodeURI(self.searchInfo.userCode),
                    "userName": encodeURI(self.searchInfo.userName),
                    "deptId": self.searchInfo.paraDeptIds[self.searchInfo.paraDeptIds.length-1]
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
                "id": "", // 员工ID，修改员工信息时必传
                "areaCode": "", // 航站楼
                "userCode": "", // 用户帐号名
                "userPwd": "", // 用户密码. 说明： 1、	创建时不设置则默认为123456; 2、修改用户时不设置则不修改原有密码
                "companyId": "", //所属公司ID，手动从公司列表选择
                "userSeq": "", // 员工工号
                "userName": "", // 员工姓名
                "mobile": "", // 员工手机号
                "email": "", // 员工邮箱
                "status": "", // 员工帐号状态，默认值911表示正常： 911：正常 912：冻结 913：作废                
                "paraDeptIds": [],
                "roleIds": "", // 角色id，可多选，多个间以英文半角分割
                "deptId": "", // 部门id，单选
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
            self.itemInfo["roleIds"] = parseInt(item["roleIds"], 10);
            self.isDetail = true;
            self.$utility.getSuperiorDepartmentList(self, "itemInfo", "deptId");
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
                self.$Message.error("请选择一家公司");
                return;
            }
            if(self.itemInfo.paraDeptIds.length==0) {
                self.$Message.error("请选择部门");
                return;
            }
            if(self.itemInfo.areaCode.length==0) {
                self.$Message.error("请选择所在航站楼");
                return;
            }
            if(self.itemInfo.userCode.trim().length<2||self.itemInfo.userCode.trim().length>50) {
                self.$Message.error("用户账号至少2到50位字符");
                return;
            }
            if(self.itemInfo.userName.trim().length==0) {
                self.$Message.error("请输入用户名称");
                return;
            }
            if(!self.itemInfo.status) {
                self.$Message.error("请选择用户状态");
                return;
            }
            // 新增是秘密必传
            if(!self.itemInfo.id){
                if(self.itemInfo.userPwd.trim().length<6||self.itemInfo.userPwd.trim().length>18) {
                    self.$Message.error("登录密码至少6到18位字符");
                    return;
                }
            }
            if(self.itemInfo.roleIds === "") {
                self.$Message.error("请选择角色");
                return;
            }
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.userService),
                url: self.$config.action.saveUser,
                data: self.$qs.stringify({
                    "id": self.itemInfo.id||"", // 员工ID，修改员工信息时必传
                    "userCode": encodeURI(self.itemInfo.userCode), // 用户帐号名
                    "areaCode": encodeURI(self.itemInfo.areaCode), // 用户帐号名
                    "userPwd": self.itemInfo.userPwd, // 用户密码. 说明： 1、	创建时不设置则默认为123456; 2、修改用户时不设置则不修改原有密码
                    "companyId": self.itemInfo.companyId, //所属公司ID，手动从公司列表选择
                    "userName": encodeURI(self.itemInfo.userName), // 员工姓名
                    "mobile": self.itemInfo.mobile, // 员工手机号
                    "email": self.itemInfo.email, // 员工邮箱
                    "status": self.itemInfo.status, // 员工帐号状态，默认值911表示正常： 911：正常 912：冻结 913：作废                
                    "roleIds": self.itemInfo.roleIds, // 角色id，可多选，多个间以英文半角分割
                    "deptId": self.itemInfo.paraDeptIds[self.itemInfo.paraDeptIds.length-1], // 部门id，单选
                    "posiName": encodeURI('员工'),
                    "posiType": 143,
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
                        "id": "", // 员工ID，修改员工信息时必传
                        "userCode": "", // 用户帐号名
                        "areaCode": "", // 用户帐号名
                        "userPwd": "", // 用户密码. 说明： 1、	创建时不设置则默认为123456; 2、修改用户时不设置则不修改原有密码
                        "companyId": "", //所属公司ID，手动从公司列表选择
                        "userSeq": "", // 员工工号
                        "userName": "", // 员工姓名
                        "mobile": "", // 员工手机号
                        "email": "", // 员工邮箱
                        "status": "", // 员工帐号状态，默认值911表示正常： 911：正常 912：冻结 913：作废                
                        "paraDeptIds": [],
                        "roleIds": "", // 角色id，可多选，多个间以英文半角分割
                        "roleIdList": [],
                        "deptId": "", // 部门id，单选
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
                "title": "确定删除"+ item.userName+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        headers: self.$utility.setHeader(self.$config.service.userService),
                        url: self.$config.action.delUser,
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
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
        self.userFuncInfo = self.$utility.getSessionStorage("userFuncInfo");
        self.userFuncCode = self.$utility.getSessionStorage("userFuncCode");
        
        // self.getList(true);// 获取部门列表
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
