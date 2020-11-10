<template>
    <div class="page">
        <div class="searchWrap">
            <div class="search">
                <table>
                    <tr>
                        <td>
                            &nbsp;&nbsp;版本名称
                            <template>
                                <Input v-model="searchInfo.info" clearable placeholder="请输入版本名称" style="width:150px;"/>
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
                                    <span class="request">*</span>版本号：
                                    <div><Input v-model="itemInfo.name" placeholder="填写版本号" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="request">*</span>版本描述：
                                    <div><Input v-model="itemInfo.title" placeholder="填写配置用途" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="request">*</span>更新时间：
                                    <div><Input v-model="itemInfo.value" placeholder="填写配置值" style="width: 100%" /></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="request">*</span>更新包：
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
                                                <Button icon="ios-cloud-upload-outline">上传更新包</Button>
                                            </Upload>
                                        </template>
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
            "info": "", // 角色名称
        },
        itemInfo: {
            "id": 0,
            "info": "",
            "md5": "",
            "url": "",
            "version": ""
        },
        columnsRealTime: [
            {
                align: "center",
                title: "序号",
                type: "index",
                width: 60,
            },
            {
                title: "版本",
                align: "left",
                key: "version",
                width: 100,
            },
            {
                title: "更新包MD5",
                align: "left",
                key: "md5",
                width: 260,
            },
            {
                title: "下载包地址",
                align: "left",
                key: "url",
            },
            {
                title: "版本描述",
                align: "left",
                key: "info",
                width: 150,
            },
            {
                title: "终端更新时间",
                align: "center",
                key: "update_time",
                width: 240,
            },
            {
                align: "center",
                title: "操作",
                width: 120,
                slot: 'status'
            }
        ],
        realTimeDataList: []
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
                url: self.$config.action.versionList,
                params: {
                    "pageNum": self.pageInfo.pageIndex,
                    "pageSize": self.pageInfo.pageSize,
                    "info": self.searchInfo.info,
                    "version": self.searchInfo.version,
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
        // 显示新增
        showNew(){
            let self = this;
            self.itemInfo = {
                "id": 0,
                "name": "",
                "tips": "",
                "title": "",
                "value": ""
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
        // 保存公司
        saveAction(){
            let self = this;
            
            if(self.itemInfo.name.trim().length==0) {
                self.$Message.error("请输入配置名称");
                return;
            }

            if(self.itemInfo.title.trim().length==0) {
                self.$Message.error("请输入配置用途");
                return;
            }

            if(self.itemInfo.value.trim().length==0) {
                self.$Message.error("请输入配置值");
                return;
            }

            if(self.itemInfo.tips.trim().length==0) {
                self.$Message.error("请输入配置描述");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.configAdd:self.$config.action.configEdit,
                data: {
                    "id": self.itemInfo.id || 0, 
                    "name": self.itemInfo.name,
                    "tips": self.itemInfo.tips,
                    "title": self.itemInfo.title,
                    "value": self.itemInfo.value
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "id": 0,
                        "name": "",
                        "tips": "",
                        "title": "",
                        "value": ""
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
                        url: self.$config.action.configDelete,
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
        uploadSuccess(response, file, fileList){
            let self = this;
            self.disabled = false;
            if(!!response.data&&response.data.length>0) {
                console.log(response, file, fileList);
            } else {
                console.log(response, file, fileList);
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
