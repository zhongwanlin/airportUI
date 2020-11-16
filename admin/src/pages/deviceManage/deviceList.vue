<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;设备名称
                            <template>
                                <Input v-model="searchInfo.name" clearable placeholder="请输入设备名称" style="width:200px;"/>
                            </template>
                            &nbsp;&nbsp;机器码
                            <template>
                                <Input v-model="searchInfo.mac_id" clearable placeholder="请输入机器码" style="width:200px;"/>
                            </template>
                            &nbsp;&nbsp;区域
                            <template>
                                <Select v-model="searchInfo.area_id" clearable style="width:200px">
                                    <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </template>
                            &nbsp;&nbsp;部署状态
                            <template>
                                <Select v-model="searchInfo.dep_status" clearable style="width:200px">
                                    <!-- 1:入场，2：撤场，3激活 -->
                                    <Option :value="1">入场</Option>
                                    <Option :value="2">撤场</Option>
                                    <Option :value="3">激活</Option>
                                </Select>
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
                    <template slot-scope="{ row, index }" slot="dep_status">
                        {{['入场','撤场','激活'][row.dep_status-1]}}
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
                                    <span class="request">*</span>设备名称：
                                    <div><Input v-model="itemInfo.name" placeholder="填写设备名称" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    机器码：
                                    <div><Input v-model="itemInfo.mac_id" placeholder="填写机器码" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    SDK版本：
                                    <div>
                                        <Select v-model="itemInfo.version" placeholder="选择SDK版本" style="width:100%">
                                            <Option v-for="item in versionList" :value="item.version" :key="item.id">{{ item.version }}</Option>
                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    所在区域：
                                    <div>
                                        <Select v-model="itemInfo.area_id" placeholder="选择所在区域" style="width:100%">
                                            <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    部署状态：
                                    <div>
                                        <Select v-model="itemInfo.dep_status" placeholder="选择部署状态" style="width:100%">
                                            <!-- 1:入场，2：撤场，3激活 -->
                                            <Option :value="1">入场</Option>
                                            <Option :value="2">撤场</Option>
                                            <Option :value="3">激活</Option>
                                        </Select>
                                    </div>
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
            "area_id": "",
            "dep_status": "",
            "id": "",
            "mac_id": "",
            "name": "",
            "version": "",
        },
        itemInfo: {
            "area_id": "",
            "dep_status": "",
            "id": "",
            "mac_id": "",
            "name": "",
            "version": "",
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "设备名称",
                align: "center",
                key: "name",
            },
            {
                title: "所在区域",
                align: "center",
                key: "areaName",
            },
            {
                title: "机器码",
                align: "center",
                key: "mac_id",
            },
            {
                title: "SDK版本",
                align: "center",
                key: "version",
            },
            {
                title: "部署状态",
                align: "center",
                key: "dep_status",
                slot: "dep_status",
            },
            {
                title: "创建时间",
                align: "center",
                key: "create_time",
            },
            {
                title: "更新时间",
                align: "center",
                key: "update_time",
            },
            {
                align: "center",
                title: "操作",
                width: 220,
                slot: 'action'
            }
        ],
        realTimeDataList: [],
        areaList: [],
        versionList: []
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
            self.getList(true); // 获取角色
            self.getAreaList(true); // 获取角色
            self.getVersionList(true); // 获取版本
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
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.marchineList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "area_id": self.searchInfo.area_id,
                    "dep_status": self.searchInfo.dep_status,
                    "mac_id": self.searchInfo.mac_id,
                    "status": self.searchInfo.status,
                    "version": self.searchInfo.version,
                    "name": self.searchInfo.name,
                }
            })
            .then(function (res) {
                self.realTimeDataList = res.data.list;
                self.count = res.data.total;
                if(res.data.code=='0') {
                    self.realTimeDataList = res.data.data;
                    self.count = res.data.count;
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
                "area_id": "",
                "dep_status": "",
                "id": "",
                "mac_id": "",
                "name": "",
                "version": "",
            };
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
        // 保存
        saveAction(){
            let self = this;

            if(!self.itemInfo.name) {
                self.$Message.error("请输入设备名称");
                return;
            }
            if(!self.itemInfo.mac_id) {
                self.$Message.error("请输入机器码");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.marchineAdd:self.$config.action.marchineEdit,
                data: {
                    "id": self.itemInfo.id || 0, 
                    "area_id": self.itemInfo.area_id,
                    "dep_status": self.itemInfo.dep_status,
                    "mac_id": self.itemInfo.mac_id,
                    "name": self.itemInfo.name,
                    "version": self.itemInfo.version,
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "id": "",
                        "area_id": "",
                        "dep_status": "",
                        "mac_id": "",
                        "name": "",
                        "version": "",
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
        // 删除公司
        deleteAction(item){
            let self = this;
            self.$Modal.confirm({
                "title": "确定删除"+ item.name+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        headers: {
                            token: self.userInfo.token
                        },
                        url: self.$config.action.marchineDelete,
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
                            self.$Message.error(res.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            });
        },
        // 获取公司列表
        getAreaList(bool){
            var self = this;
            
            self.axios({
                method: 'get',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.areaList,
                params: {
                    "pageNum": 1,
                    "pageSize": 10000,
                    "e_name": "",
                    "name": "",
                }
            })
            .then(function (res) {
                self.areaList = res.data.list;
                self.count = res.data.total;
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
        // 获取版本
        getVersionList(bool){
            var self = this;
            if (bool == true) {
                self.isLoading = true;
                self.pageInfo.pageIndex = 0;
            }
            self.axios({
                method: 'get',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.versionList,
                params: {
                    "pageNum": 1,
                    "pageSize": 10000,
                }
            })
            .then(function (res) {
                self.versionList = res.data.list;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        
        self.getList(true); // 获取角色
        self.getAreaList(true); // 获取角色
        self.getVersionList(true); // 获取版本

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
