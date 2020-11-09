<template>
    <div>
        <div class="tableList">
            <template>
                <Table :height="height-200" border stripe :loading="isLoading" :columns="columnsRealTime" :data="realTimeDataList"></Table>
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
    name: "department",
    props: {
        parentItem: Object
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isLoading: false,
        count: 0,
        pageInfo: {
            pageIndex: 1,
            pageSize: 50,
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "员工姓名",
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
                title: "创建时间",
                align: "center",
                key: "create_time",
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
                    "pageSize": self.pageInfo.pageSize
                }
            })
            .then(function (res) {
                self.realTimeDataList = res.data.list;
                self.count = res.data.total;
                if(res.data.code=='0') {
                    
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
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");

        self.getList(true);
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
