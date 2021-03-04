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
                title: "名称/描述",
                align: "center",
                key: "opFunctionDesc"
            },
            {
                title: "操作结果",
                align: "center",
                key: "opResult"
            },
            {
                align: "center",
                title: "创建时间",
                key: "createTime"
            },
            {
                align: "center",
                title: "来源IP",
                key: "fromIp"
            },
            {
                align: "center",
                title: "用户账号",
                key: "userCode"
            },
            {
                align: "center",
                title: "用户名",
                key: "userName"
            },
            {
                align: "center",
                title: "创建用户",
                key: "createUserName"
            },
        ],
        realTimeDataList: [],
        areaList: [],
        marchineList: []
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

        // self.realTimeDataList = [{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"超级管理员","userId":43,"userCode":"sa3","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:48:27","appType":2,"fromIp":"120.235.189.165","id":54264},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"和佳欢","userId":164,"userCode":"hejiahuan","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:24:44","appType":2,"fromIp":"219.137.228.28","id":54136},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"test002","userId":209,"userCode":"test002","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:03:46","appType":2,"fromIp":"120.235.189.165","id":54196},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"超级管理员","userId":43,"userCode":"sa3","opResult":"成功","companyId":2,"createTime":"2021-03-03 17:45:44","appType":2,"fromIp":"120.235.189.165","id":53996},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"超级管理员","userId":43,"userCode":"sa3","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:25:20","appType":2,"fromIp":"120.235.189.165","id":54221},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"安检六大队","userId":254,"userCode":"17620045093","opResult":"成功","companyId":2,"createTime":"2021-03-03 19:01:17","appType":1,"fromIp":"117.136.32.58","id":54055},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"test001","userId":208,"userCode":"test001","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:47:11","appType":2,"fromIp":"120.235.189.165","id":54175},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"吕俊洪","userId":351,"userCode":"lvjunhong","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:27:13","appType":2,"fromIp":"219.137.228.26","id":54144},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"邓俊伦","userId":434,"userCode":"hf61110171 ","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:06:29","appType":1,"fromIp":"117.136.12.186","id":54199},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"潘雨琪","userId":325,"userCode":"1087","opResult":"成功","companyId":2,"createTime":"2021-03-03 18:00:58","appType":2,"fromIp":"219.137.228.28","id":54006},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"T2-奥德","userId":285,"userCode":"13922335630","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:26:53","appType":1,"fromIp":"117.136.41.44","id":54225},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"许玥君","userId":425,"userCode":"hf61000313","opResult":"成功","companyId":2,"createTime":"2021-03-03 19:29:50","appType":1,"fromIp":"183.237.185.205","id":54087},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"test002","userId":209,"userCode":"test002","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:47:41","appType":2,"fromIp":"120.235.189.165","id":54178},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"安检行检大队","userId":117,"userCode":"ajxingjiandadui","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:19:49","appType":6,"fromIp":"219.137.228.28","id":54215},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"安全保卫一大队","userId":130,"userCode":"xfbaoweiyidadui","opResult":"成功","companyId":2,"createTime":"2021-03-03 18:19:46","appType":1,"fromIp":"117.136.12.75","id":54018},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"许玥君","userId":425,"userCode":"hf61000313","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:29:45","appType":1,"fromIp":"112.96.115.133","id":54152},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"房文斌","userId":182,"userCode":"1047","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:35:45","appType":2,"fromIp":"219.137.228.28","id":54241},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"廖雪芳","userId":350,"userCode":"liaoxuefang","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:02:25","appType":2,"fromIp":"219.137.228.28","id":54116},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"利绮梦","userId":181,"userCode":"1070","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:01:38","appType":2,"fromIp":"219.137.228.28","id":54191},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"和佳欢","userId":164,"userCode":"hejiahuan","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:24:21","appType":2,"fromIp":"219.137.228.28","id":54218},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"邓俊伦","userId":434,"userCode":"hf61110171","opResult":"成功","companyId":2,"createTime":"2021-03-03 18:29:44","appType":6,"fromIp":"117.136.32.85","id":54029},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"张茜","userId":428,"userCode":"hf61120171","opResult":"成功","companyId":2,"createTime":"2021-03-03 20:33:50","appType":1,"fromIp":"112.96.119.197","id":54156},{"opFunctionDesc":"登录","createDeptId":0,"createDeptName":"","createUserId":0,"opTypeCode":"1","sysRespCode":"200","companyName":"广州白云国际机场","opTypeDesc":"登录日志","deptId":0,"createUserName":"System","opFunctionCode":"login","userName":"中英保","userId":305,"userCode":"43042619910307769x","opResult":"成功","companyId":2,"createTime":"2021-03-03 21:43:21","appType":1,"fromIp":"112.96.179.78","id":54255}]

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
