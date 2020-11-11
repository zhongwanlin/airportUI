<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;部门:
                            <template>
                                <div style="display: inline-block;"><Cascader :data="treeData" v-model="searchInfo.orgids" style="width:400px;"></Cascader></div>
                            </template>
                            
                            &nbsp;&nbsp;用户名:
                            <template>
                                <Input v-model="searchInfo.userName" clearable placeholder="请输入用户名" style="width:200px;"/>
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
                    </template>

                    <template slot-scope="{ row, index }" slot="status">
                        <template>
                            <i-switch size="large" :value="row.status" :true-value="1" :false-value="0" @on-change="enableOrNot(row.status==0?'1':'0', row)">
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
            <Modal v-model="isDetail" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="新增/修改账号" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail" :style="{maxHeight: (height-100)+'px',overflowY: 'auto'}">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>所在部门：
                                    <div><Cascader :data="treeData" v-model="itemInfo.orgids"></Cascader></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="request">*</span>用户名：
                                    <div><Input v-model="itemInfo.username" placeholder="填写用户名,可由英文字母、数字组成" style="width: 100%" /></div>
                                    <div class="tips">必填，可由英文字母、数字组成</div>
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    昵称：
                                    <div><Input v-model="itemInfo.nickname" placeholder="填写昵称,可以是中文" style="width: 100%" /></div>
                                    <div class="tips">可以是中文</div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <span class="request">*</span>密码：
                                    <div><Input v-model="newPassword" placeholder="填写登录密码,至少6个字符,最多18个字符" style="width: 100%" /></div>
                                    <div class="tips">必填，至少6个字符,最多18个字符</div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <span class="request">*</span>角色：
                                    <div>
                                        <template>
                                            <Select v-model="itemInfo.role" clearable placeholder="选择角色" style="width: 100%;">
                                                <template v-for="(item, index) in roleList">
                                                    <Option :value="item.id" :key="index">{{item.name}}</Option>
                                                </template>
                                            </Select>
                                        </template>
                                    </div>
                                    <div class="tips">非超级管理员，禁止创建与当前角色同级的用户</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    手机号码：
                                    <div><Input v-model="itemInfo.mobile" placeholder="手机号码" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    邮箱：
                                    <div><Input v-model="itemInfo.email" placeholder="常用邮箱" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td>
                                    头像：
                                    <div>
                                        <template>
                                            <Upload
                                            :headers="{token: userInfo.token}" 
                                            :action="$config.action.setFileUpload"
                                            :disabled="disable"
                                             :show-upload-list="false" 
                                             :on-error="errorUpload" 
                                             :on-progress="progressing" 
                                             :on-success="uploadSuccess">
                                                <Button icon="ios-cloud-upload-outline">上传头像</Button>
                                            </Upload>
                                        </template>
                                    </div>
                                </td>
                            </tr> -->
                            <!-- <tr>
                                <td>
                                    <span class="request">*</span>帐号状态：
                                    <div>
                                        <RadioGroup>
                                            <Radio label="0">禁用</Radio>
                                            <Radio label="1">启用</Radio>
                                        </RadioGroup>
                                    </div>
                                </td>
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
import md5 from "js-md5";
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
            "userCode": "",
            "userName": "",
            "orgid": "",
            "orgids": [],
        },
        itemInfo: {
            "id": "",
            "email": "",
            "mobile": "",
            "role": "",
            "nickname": "",
            "password": "",
            "username": "",
            "orgid": "",
            "orgids": [],
        },
        newPassword: "",
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "账号名",
                align: "center",
                key: "username",
            },
            {
                title: "姓名",
                align: "center",
                key: "nickname",
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
                key: "rolename",
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
                key: "create_time",
            },
            {
                align: "center",
                title: "操作",
                width: 120,
                slot: 'action',
            }
        ],
        realTimeDataList: [],
        roleList: [],
        treeData: []
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

        // 获取用户列表
        getList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            self.axios({
                method: 'get',
                url: self.$config.action.userList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "orgid": self.searchInfo.orgids[self.searchInfo.orgids.length-1],
                }
            })
            .then(function (res) {
                self.realTimeDataList = res.data.list;
                self.count = res.data.total;
                if(res.data.code=='0') {
                    
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.msg);
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
                "id": "",
                "email": "",
                "mobile": "",
                "nickname": "",
                "password": "",
                "username": "",
                "orgids": [],
                "orgid": "",
            };
            self.isDetail = true;
        },
        // 显示编辑
        showEdit(item){
            let self = this;
            let arr = [];
            for(var key in item) {
                self.itemInfo[key] = item[key];
            }
            self.itemInfo.orgids = [];
            self.isDetail = true;

            if(self.itemInfo.orgid>=0) {
                self.$utility.setDepetList(self.treeData, self.itemInfo.orgid, arr);
                console.log(arr);
                arr[0].split(",").forEach((item)=>{
                    self.itemInfo.orgids.push(parseInt(item, 10));
                });
            }
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
            
            if(self.itemInfo.username.trim().length<2||self.itemInfo.username.trim().length>50) {
                self.$Message.error("用户账号至少2到50位字符");
                return;
            }
            
            // 新增是秘密必传
            if(!self.itemInfo.id){
                if(self.newPassword.trim().length<6||self.newPassword.trim().length>18) {
                    self.$Message.error("登录密码至少6到18位字符");
                    return;
                }
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.userAdd:self.$config.action.userEdit,
                data: {
                    "id": self.itemInfo.id||"", 
                    "email": self.itemInfo.email,
                    "mobile": self.itemInfo.mobile,
                    "role": self.itemInfo.role,
                    "nickname": self.itemInfo.nickname,
                    "password": !!self.newPassword?md5(self.newPassword):"",
                    "username": self.itemInfo.username,
                    "orgid": self.itemInfo.orgids[self.itemInfo.orgids.length-1],
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "id": "",
                        "email": "",
                        "mobile": "",
                        "nickname": "",
                        "password": "",
                        "username": "",
                        "orgids": [],
                        "orgid": "",
                    };
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.msg);
                }
                self.disable = false;
            })
            .catch(function (error) {
                console.log(error);
                self.disable = false;
            });
        },
        // 删除用户
        deleteAction(item){
            let self = this;
            self.$Modal.confirm({
                "title": "确定删除"+ item.username+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        headers: {
                            token: self.userInfo.token
                        },
                        url: self.$config.action.userDelete,
                        data: {
                            "id": item.id,
                        }
                    })
                    .then(function (res) {
                        if(res.data.code=='0') {
                            self.$Message.success("删除成功");
                            self.getList(true);
                        } else if(res.data.code=='9003') {
                            self.utility.loginTimeOut(self);
                        } else {
                            self.$Message.error(res.data.msg);
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
                url: value==1?self.$config.action.userEnable:self.$config.action.userDisable,
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

        getRoleList(){
            var self = this;
            self.axios({
                method: 'get',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.roleList,
                params: {
                    "pageNum": 1,
                    "pageSize": 1000,
                }
            })
            .then(function (res) {
                self.roleList = res.data.list;
                if(res.data.code=='0') {
                    self.roleList = res.data.list;
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 获取用户列表
        getDepetList(bool){
            var self = this;
            self.axios({
                method: 'get',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.orgList,
                params: {
                    "pageNum": 1,
                    "pageSize": 10000
                }
            })
            .then(function (res) {
                let depetArr = [];
                let arr = [];
                self.realTimeDataList = res.data.list;
                self.count = res.data.total;
                self.treeData = [];

                self.realTimeDataList.forEach((item,index)=>{
                    self.realTimeDataList[index]["label"] = item.name;
                    self.realTimeDataList[index]["value"] = item.id;
                });

                //第一种： filter 方式
                function setTreeData(source){
                    let cloneData = source;     // 对源数据深度克隆
                    return  cloneData.filter(father=>{                      // 循环所有项，并添加children属性
                        let branchArr = cloneData.filter(child=>father.id == child.pid);       // 返回每一项的子级数组
                        branchArr.length>0 ? father.children=branchArr : []   //给父级添加一个children属性，并赋值
                        return father.pid==0;      //返回第一层
                    });
                }
                self.treeData = setTreeData(self.realTimeDataList);
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },

        // 文件上传中
        progressing(){
            let self = this;
            self.disabled = true;
        },
        // 上传失败
        errorUpload(error){
            let self = this;
            self.disabled = false;
            console.log(error);
        },
        // 
        uploadSuccess(response, file, fileList){
            let self = this;
            self.disabled = false;
            if(!!response.data&&response.data.length>0) {
                console.log(response, file, fileList);
            } else {
                self.$Message.info({
                    content: response.message,
                    duration: 0,
                    closable: true
                });
            }
        },
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        self.userFuncInfo = self.$utility.getSessionStorage("userFuncInfo");
        self.userFuncCode = self.$utility.getSessionStorage("userFuncCode");
        
        self.getList(true);
        self.getRoleList();
        self.getDepetList();

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

    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";
</style>
