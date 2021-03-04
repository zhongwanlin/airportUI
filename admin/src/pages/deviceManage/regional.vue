<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;区域中文名称
                            <template>
                                <Input v-model="searchInfo.name" clearable placeholder="请输入区域中文名称" style="width:150px;"/>
                            </template>
                            &nbsp;&nbsp;区域英文名称
                            <template>
                                <Input v-model="searchInfo.e_name" clearable placeholder="请输入区域英文名称" style="width:150px;"/>
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
            <Modal v-model="isDetail" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="角色录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>区域中文名称：
                                    <div><Input v-model="itemInfo.name" placeholder="填写区域中文名称" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    区域英文名称：
                                    <div><Input v-model="itemInfo.e_name" placeholder="填写区域英文名称" style="width: 100%" /></div>
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
            "id": 0,
            "counter_map": "",
            "e_counter_map": "",
            "e_gate_map": "",
            "e_name": "",
            "e_pickup_map": "",
            "gate_map": "",
            "name": "",
            "pickup_map": ""
        },
        itemInfo: {
            "id": 0,
            "counter_map": "",
            "e_counter_map": "",
            "e_gate_map": "",
            "e_name": "",
            "e_pickup_map": "",
            "gate_map": "",
            "name": "",
            "pickup_map": ""
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "区域中文名称",
                align: "center",
                key: "name",
            },
            {
                title: "区域英文名称",
                align: "center",
                key: "e_name",
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
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.areaList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "e_name": self.searchInfo.e_name,
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
                "id": 0,
                "counter_map": "",
                "e_counter_map": "",
                "e_gate_map": "",
                "e_name": "",
                "e_pickup_map": "",
                "gate_map": "",
                "name": "",
                "pickup_map": ""
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
                self.$Message.error("请输入中文名称");
                return;
            }
            if(!self.itemInfo.e_name) {
                self.$Message.error("请输入英文名称");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.areaAdd:self.$config.action.areaEdit,
                data: {
                    "id": self.itemInfo.id || 0, 
                    "counter_map": self.itemInfo.counter_map,
                    "e_counter_map": self.itemInfo.e_counter_map,
                    "e_gate_map": self.itemInfo.e_gate_map,
                    "e_name": self.itemInfo.e_name,
                    "e_pickup_map": self.itemInfo.e_pickup_map,
                    "gate_map": self.itemInfo.gate_map,
                    "name": self.itemInfo.name,
                    "pickup_map": self.itemInfo.pickup_map
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "id": 0,
                        "counter_map": "",
                        "e_counter_map": "",
                        "e_gate_map": "",
                        "e_name": "",
                        "e_pickup_map": "",
                        "gate_map": "",
                        "name": "",
                        "pickup_map": ""
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
                        url: self.$config.action.areaDelete,
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
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        
        self.getList(true); // 获取角色
        // self.realTimeDataList = [{
        //     "id": 0,
        //     "counter_map": "区域中文名称",
        //     "e_counter_map": "asdasd",
        //     "e_gate_map": "asdasd",
        //     "e_name": "Test1",
        //     "e_pickup_map": "asdfas",
        //     "gate_map": "asdfad",
        //     "name": "测试区域",
        //     "pickup_map": "asdfasd",
        //     "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        //     "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        // },{
        //     "id": 0,
        //     "counter_map": "区域中文名称",
        //     "e_counter_map": "asdasd",
        //     "e_gate_map": "asdasd",
        //     "e_name": "Test1",
        //     "e_pickup_map": "asdfas",
        //     "gate_map": "asdfad",
        //     "name": "测试区域",
        //     "pickup_map": "asdfasd",
        //     "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        //     "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        // },{
        //     "id": 0,
        //     "counter_map": "区域中文名称",
        //     "e_counter_map": "asdasd",
        //     "e_gate_map": "asdasd",
        //     "e_name": "Test1",
        //     "e_pickup_map": "asdfas",
        //     "gate_map": "asdfad",
        //     "name": "测试区域",
        //     "pickup_map": "asdfasd",
        //     "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        //     "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        // },{
        //     "id": 0,
        //     "counter_map": "区域中文名称",
        //     "e_counter_map": "asdasd",
        //     "e_gate_map": "asdasd",
        //     "e_name": "Test1",
        //     "e_pickup_map": "asdfas",
        //     "gate_map": "asdfad",
        //     "name": "测试区域",
        //     "pickup_map": "asdfasd",
        //     "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        //     "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
        // }];

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
