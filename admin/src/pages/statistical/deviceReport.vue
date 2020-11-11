<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            
                            &nbsp;&nbsp;区域
                            <template>
                                <Select v-model="searchInfo.area_name" clearable style="width:200px">
                                    <Option v-for="item in areaList" :value="item.name" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </template>
                            &nbsp;&nbsp;设备号
                            <template>
                                <Select v-model="searchInfo.mac_id" clearable style="width:200px">
                                    <Option v-for="item in marchineList" :value="item.id" :key="item.id">{{ item.mac_id }}({{ item.name }})</Option>
                                </Select>
                            </template>
                            &nbsp;&nbsp;时间
                            <template>
                                <DatePicker type="daterange" @on-change="dateChange" placeholder="选择时间" style="width: 300px"></DatePicker>
                            </template>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="tableList">
            <template>
                <Table :height="height-100" border stripe :loading="isLoading" :columns="columnsRealTime" :data="realTimeDataList"></Table>
            </template>
        </div>
        <div class="pageWrap">
            <template>
                <Page :total="count" @on-change="pageSizeChange" @on-page-size-change="pageRowChange" :page-size="50" :page-size-opts="[50, 100, 150]" show-sizer showTotal />
            </template>
        </div>

    </div>
</template>

<script>
export default {
    name: "deviceReport",
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isLoading: false,
        count: 0,
        pageInfo: {
            pageIndex: 0,
            pageSize: 50,
        },
        searchInfo: {
            "area_name": "",
            "begDate": "",
            "endDate": "",
            "mac_id": "",
            "mac_model_id": "",
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "设备号",
                align: "center",
                key: "name",
            },
            {
                title: "区域",
                align: "center",
                key: "e_name",
            },
            {
                title: "服务人数",
                align: "center",
                key: "create_time",
            }
        ],
        realTimeDataList: [],
        areaList: []
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
                url: self.$config.action.marchineSumUsed,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "area_name": self.searchInfo.area_name,
                    "begDate": self.searchInfo.begDate,
                    "endDate": self.searchInfo.endDate,
                    "mac_id": self.searchInfo.mac_id,
                    "mac_model_id": self.searchInfo.mac_model_id,
                }
            })
            .then(function (res) {
                self.realTimeDataList = res.data.list;
                self.count = res.data.total;
                self.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.isLoading = false;
            });
        },
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
        // 获取设备列表
        getDeviceList(){
            var self = this;
            
            self.axios({
                method: 'get',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.marchineList,
                params: {
                    "pageNum": 1,
                    "pageSize": 10000,
                    "area_id": "",
                    "dep_status": "",
                    "mac_id": "",
                    "status": "",
                    "version": "",
                    "name": "",
                }
            })
            .then(function (res) {
                self.marchineList = res.data.list;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 设置时间
        dateChange(e) {
            let self = this;
            console.log(e);
            if(!!e&&e.length > 0) {
                self.searchInfo.begDate = e[0];
                self.searchInfo.endDate = e[1];
            }
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        
        self.getList(true); // 获取角色
        self.getAreaList();
        self.getDeviceList();

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
