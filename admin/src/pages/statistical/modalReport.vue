<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            区域
                            <template>
                                <Select v-model="searchInfo.satisfiedFlag" clearable placeholder="选择是否满意" style="width: 120px;">
                                    <Option :value="1">满意</Option>
                                    <Option :value="2">不满意</Option>
                                </Select>
                            </template>
                            &nbsp;&nbsp;时间
                            <template>
                                <DatePicker type="daterang" clearable :options="dataPickOption" @on-change="setBeginTime" placeholder="请选择时间" style="width: 120px"></DatePicker>
                            </template>
							&nbsp;&nbsp;设备号
							<template>
							    <Input v-model="searchInfo.roleName" clearable placeholder="请输入标题" style="width:150px;"/>
							</template>
                            <template>
                                <div class="searchBtnList">
                                    <Button icon="ios-refresh-circle" @click="reflesh(true)">刷新</Button>
                                </div>
                            </template>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="tableList">
            <template>
                <Table :height="height-100" stripe border :loading="isLoading" :columns="columns" :data="dataList"></Table>
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
    name: "lostAndFound",
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        isLoading: false,
        isDetail: false,
        disable: false,
        dateInfo: [],
        count: 0,
        pageInfo: {
            pageIndex: 1,
            pageSize: 50,
        },
        searchInfo: {
            satisfiedFlag: "", // 是否满意
            beginTime: "", // 查询开始时间,yyyy-MM-dd
            endTime: "", // 查询结束时间，yyyy-MM-dd
        },
		itemInfo: {
			id: 0, // 唯一ID，修改信息时必传
			paraId: 0, // 要回复的评价id
			lostRegId: 0, // 报失记录id
			lostUserName: "",  // 旅客名称
			userPhone: "", //旅客电话 
			lostUserId: "", 
			serviceLevel: "", 
			satisfiedFlag: "", 
			clientSuggestion: "", 
			replyInfo: "", 
			modifyUserId: "", 
		},
        columns: [
            {
                title: "序号",
                align: "center",
                type: "index",
                width: 60,
            },
            {
                title: "模组",
                align: "center",
                key: "lostUserName",
            },
            {
                title: "请求数量",
                align: "center",
                key: "userPhone",
            },
            {
                title: "区域名称",
                align: "center",
                key: "serviceLevel",
            },
            {
                title: "调用状态",
                align: "center",
                key: "serviceLevel",
            },
        ],
        areaCodeList: [],
        dataList: [],
        dataPickOption: {
            disabledDate (date) {
                return date && date.valueOf() > Date.now();
            }
        },
    }),
    methods: {
		setBeginTime(value) {
			let self = this;
			self.searchInfo.beginTime = value;
		},
		setEndTime(value) {
			let self = this;
			self.searchInfo.endTime = value;
		},
        reflesh(bool){
            let self = this;
            self.getLostCustomerEvaluationList(bool);
        },
        pageSizeChange(value) {
            let self = this;
            self.pageInfo.pageIndex = parseInt(value, 10);
            self.getLostCustomerEvaluationList(true);
        },
        pageRowChange(value) {
            let self = this;
            self.pageInfo.pageSize = parseInt(value, 10);
            self.getLostCustomerEvaluationList(false);
        },
        // 获取失物
        getLostCustomerEvaluationList(bool){
            let self = this;
            
            self.isLoading = true;
            if (bool == true) {
                self.pageInfo.pageIndex = 1;
            }
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.evaluationService),
                url: self.$config.action.getLostCustomerEvaluationList,
                data: self.$qs.stringify({
					"pageNum": self.pageInfo.pageIndex,
					"pageSize": self.pageInfo.pageSize,
					"satisfiedFlag": self.searchInfo.satisfiedFlag,
					"beginTime": self.searchInfo.beginTime,
					"endTime": self.searchInfo.endTime,
				})
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    self.dataList = res.data.data;
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
		showNewOrEdit(row){
			let self = this;
			self.itemInfo = row;
			self.isDetail = true;
		},
		saveLostCustomerEvaluation(){
			let self = this;
			if(self.itemInfo.replyInfo.trim().length == 0) {
				self.$Message.error("请输入回复的内容");
				return;
			}
			self.axios({
			    method: 'post',
			    headers: self.$utility.setHeader(self.$config.service.evaluationService),
			    url: self.$config.action.saveLostCustomerEvaluation,
			    data: self.$qs.stringify({
					id: self.itemInfo.id||0, // 唯一ID，修改信息时必传
					paraId: self.itemInfo.paraId||0, // 要回复的评价id
					lostRegId: self.itemInfo.lostRegId, // 报失记录id
					lostUserName: self.itemInfo.lostUserName, // 旅客名称
					userPhone: self.itemInfo.userPhone, //旅客电话 
					lostUserId: self.itemInfo.lostUserId, 
					serviceLevel: self.itemInfo.serviceLevel, 
					satisfiedFlag: self.itemInfo.satisfiedFlag, 
					clientSuggestion: self.itemInfo.clientSuggestion, 
					replyInfo: self.itemInfo.replyInfo, 
					modifyUserId: self.userInfo.id, 
				})
			})
			.then(function (res) {
			    if(res.data.code=='200') {
					self.getLostCustomerEvaluationList(true);
			        self.isDetail = false;
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

        self.getLostCustomerEvaluationList(true);

        self.$watch('searchInfo', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.getLostCustomerEvaluationList(true);
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
