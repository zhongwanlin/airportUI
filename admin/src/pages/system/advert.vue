<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            设备
                            <template>
                                <Select v-model="searchInfo.mac_id" clearable style="width:200px">
                                    <Option v-for="item in marchineList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
                    <template slot-scope="{ row, index }" slot="macInfos">
                        <template v-for="item in row.macInfos">
                            {{item}}
                        </template>
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
            <Modal v-model="isDetail" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="角色录入" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>资源名称：
                                    <div><Input v-model="itemInfo.name" placeholder="填写资源名称" style="width: 100%" /></div>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    设备：
                                    <div>
                                        <Select v-model="itemInfo.macInfos" multiple style="width:100%">
                                            <Option v-for="item in marchineList" :value="item.mac_id+'-'+item.name" :key="item.id">{{ item.name }}</Option>
                                        </Select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="request">*</span>图片：
                                    <div>
                                        <template>
                                            <Upload
                                            multiple
                                            :headers="{token: userInfo.token}" 
                                            :action="$config.action.setFileUpload"
                                            :disabled="disable"
                                             :show-upload-list="isShowUploadList" 
                                             :on-error="errorUpload" 
                                             :on-progress="progressing" 
                                             :on-success="uploadSuccess"
                                             :on-remove="removeFile">
                                                <Button icon="ios-cloud-upload-outline">上传图片</Button>
                                            </Upload>
                                        </template>
                                    </div>
                                    <div style="padding: 10px 0;">
                                        <Row :gutter="10">
                                            <template v-for="(img,index) in itemInfo.urls">
                                                <Col span="12" :key="index">
                                                    <div :key="index">
                                                        <img :src="img" style="width: 100%" />
                                                    </div>
                                                </Col>
                                            </template>
                                        </Row>
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
        isShowUploadList: false,
        count: 0,
        pageInfo: {
            pageIndex: 0,
            pageSize: 50,
        },
        searchInfo: {
            "macName": "",
            "mac_id": "",
        },
        itemInfo: {
            "id": 0,
            "macInfos": [],
            "name": "",
            "urls": []
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "资源名称",
                align: "center",
                key: "name",
            },
            {
                title: "资源路径",
                align: "center",
                key: "macInfos",
                slot: "macInfos",
            },
            {
                align: "center",
                title: "状态",
                width: 120,
                slot: 'status'
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
            self.getList(true); // 获取预案
            self.getDeviceList(true); // 获取设备
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
                url: self.$config.action.emergencyList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "name": self.searchInfo.macName,
                    "dep_status": self.searchInfo.mac_id,
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
                "macInfos": [],
                "name": "",
                "urls": []
            };
            self.isDetail = true;
        },
        // 显示编辑
        showEdit(item){
            let self = this;
            for(var key in item) {
                self.itemInfo[key] = item[key];
            }
            self.itemInfo.urls = JSON.parse(item.url);
            let macInfoList = JSON.parse(item.macInfo);
            self.itemInfo.macInfos = [];
            macInfoList.forEach((item)=>{
                self.itemInfo.macInfos.push(item.mac_id+'-'+item.name);
            });
            console.log(self.itemInfo.macInfos);
            self.isDetail = true;
        },

        // 保存
        saveAction(){
            let self = this;
            let macInfos = [];

            console.log(self.itemInfo.name);

            if(self.itemInfo.name.length == 0) {
                self.$Message.error("请输入预案名称");
                return;
            }

            if(self.itemInfo.macInfos.length == 0) {
                self.$Message.error("请选择设备");
                return;
            }
            if(self.itemInfo.urls.length==0) {
                self.$Message.error("请上传图片");
                return;
            }

            self.itemInfo.macInfos.forEach((item)=>{
                let info = item.split("-");
                macInfos.push({
                    mac_id: info[0],
                    name: info[1],
                });
            });
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.emergencyAdd:self.$config.action.emergencyEdit,
                data: {
                    "id": self.itemInfo.id || 0, 
                    "macInfos": macInfos,
                    "name": self.itemInfo.name,
                    "urls": self.itemInfo.urls
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.isShowUploadList = false;
                    self.itemInfo = {
                        "id": 0,
                        "macInfos": [],
                        "name": "",
                        "urls": []
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
                self.isShowUploadList = false;
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
                        url: self.$config.action.emergencyDelete,
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
        // 获取设备列表
        getDeviceList(bool){
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
        // 启用或禁用
        enableOrNot(value, row){
            let self = this;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: value==1?self.$config.action.emergencyEnable:self.$config.action.emergencyDisable,
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
        // 文件上传中
        progressing(){
            let self = this;
            self.disabled = true;
        },
        // 上传失败
        errorUpload(){
            let self = this;
            self.disabled = false;
            console.log(error);
        },
        // 
        removeFile(file, fileList){
            let self = this;
            self.itemInfo.urls = [];
            fileList.forEach((item) => {
                if(!!item.response.data) {
                    self.itemInfo.urls.push(self.$config.hostName+item.response.data);
                }
            });
        },
        // 
        uploadSuccess(response, file, fileList){
            let self = this;
            self.disabled = false;
            console.log(response);
            if(!!response.data&&response.data.length>0) {
                self.isShowUploadList = true;
                self.itemInfo.urls = [];
                fileList.forEach((item) => {
                    if(!!item.response.data) {
                        self.itemInfo.urls.push(self.$config.hostName+item.response.data);
                    }
                });
            } else {
                self.$Message.error({
                    content: response.data.result,
                    duration: 5,
                });
            }
        },
    },
    created() {
        let self = this;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        
        // self.getList(true); // 获取预案
        self.getDeviceList(true); // 获取设备

        self.realTimeDataList = [{
            "id": 0,
            "name": "资源名称1",
            "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "status": 1,
            "macInfos": [
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.newssoon.com"
            ],
        },{
            "id": 1,
            "name": "资源名称2",
            "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "status": 1,
            "macInfos": [
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.newssoon.com"
            ],
        },{
            "id": 2,
            "name": "资源名称3",
            "create_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "update_time": self.$utility.getCurrentTimeInfo(new Date())["formatDate"],
            "status": 1,
            "macInfos": [
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.newssoon.com"
            ],
        }];

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
