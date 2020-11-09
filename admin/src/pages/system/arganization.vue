<template>
    <div class="page">
        <div style="padding: 20px;">
            <div :style="{height: (height-60)+'px'}">
                <Split value="400" min="400px">
                    <div slot="left" class="demo-split-pane">
                        <div class="tableList" style="border: 1px solid #dcdee2;" :style="{height: (height-60)+'px'}">
                            <div class="splitTitle">
                                组织架构
                                <div class="searchBtnList">
                                    <Button type="primary" size="small" style="margin-right: 10px;" icon="ios-add-circle" @click="showNew">新增公司</Button>
                                </div>
                            </div>
                            <div class="splitBox" style="padding: 0 20px;">
                                <template>
                                    <Tree :data="treeData" :render="renderContent" class="demo-tree-render" @on-select-change="treeChange"></Tree>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div slot="right" class="demo-split-pane">
                        <div class="tableList" style="border: 1px solid #dcdee2;" :style="{height: (height-60)+'px'}">
                            <div class="splitTitle">部门员工</div>
                            <div class="splitBox">
                                <template v-if="isUser"><DepartmentUser :id="orgId"/></template>
                            </div>
                        </div>
                    </div>
                </Split>
            </div>
        </div>

        <template>
            <Modal v-model="isDetail" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="新增/修改账号" @on-cancel="isDetail=false">
                <div class="modalTable">
                    <div class="detail" :style="{maxHeight: (height-200)+'px',overflowY: 'auto'}">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>公司名称：
                                    <div><Input v-model="itemInfo.name" placeholder="填写公司名称" style="width: 100%" /></div>
                                </td>
                            </tr>
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

        <template>
            <Modal v-model="isDept" class="noContentPadding noHeaderModal" :mask-closable="false" width="30" :styles="{top: '5%'}" title="新增/修改账号" @on-cancel="isDept=false">
                <div class="modalTable">
                    <div class="detail" :style="{maxHeight: (height-200)+'px',overflowY: 'auto'}">
                        <table>
                            <tr>
                                <td>
                                    <span class="request">*</span>部门名称：
                                    <div><Input v-model="deptItemInfo.name" placeholder="填写部门名称" style="width: 100%" /></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isDept=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveDepetAction" :disabled="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>

    </div>
</template>

<script>
import DepartmentUser from "@/components/departmentUser.vue";
export default {
    name: "user",
    components: { 
        DepartmentUser
    },
    data: () => ({
        split: 0.5,
        userInfo: null,
        userFuncInfo: null,
        height: window.innerHeight,
        isDetail: false,
        isUser: false,
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
        },
        orgId: "",
        itemInfo: {
            "fullname": "",
            "id": 0,
            "name": "",
            "pid": 0
        },
        deptItemInfo: {
            "fullname": "",
            "id": 0,
            "name": "",
            "pid": 0
        },
        realTimeDataList: [],
        treeData: [
            
        ],
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

        // 根据部门查询用户
        treeChange(e) {
            var self = this;
            self.isUser = false;
            setTimeout(()=>{
                self.orgId = e[0]["id"];
                self.isUser = true;
            }, 200);
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
                    if(item.pid == 0) {
                        self.realTimeDataList[index]["title"] = item.name;
                        self.realTimeDataList[index]["id"] = item.id;
                        self.realTimeDataList[index]["itemInfo"] = item;
                        self.realTimeDataList[index]["expand"] = true;
                        self.realTimeDataList[index]["children"] = [];
                        self.realTimeDataList[index]["render"] = (h, { root, node, data }) => {
                            return window.vuePage.companyAttr(h, root, node, data);
                        };
                    } else {
                        self.realTimeDataList[index]["title"] = item.name;
                        self.realTimeDataList[index]["id"] = item.id;
                        self.realTimeDataList[index]["itemInfo"] = item;
                        self.realTimeDataList[index]["expand"] = true;
                        self.realTimeDataList[index]["children"] = [];
                    }
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

                if(res.data.code=='0') {
                    self.realTimeDataList = res.data.list;
                    self.count = res.data.total;
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
                "fullname": "",
                "id": 0,
                "name": "",
                "pid": 0
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

        // 新增公司
        saveAction(){
            let self = this;
            
            if(!!self.itemInfo.pid) {
                if(self.itemInfo.name.length==0) {
                    self.$Message.error("请输入部门名称");
                    return;
                }
            } else {
                if(self.itemInfo.name.length==0) {
                    self.$Message.error("请输入公司名称");
                    return;
                }
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.itemInfo.id?self.$config.action.orgAdd:self.$config.action.orgEdit,
                data: {
                    "id": self.itemInfo.id||"", 
                    "fullname": self.itemInfo.fullname,
                    "name": self.itemInfo.name,
                    "pid": self.itemInfo.pid
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDetail = false;
                    self.itemInfo = {
                        "fullname": "",
                        "id": 0,
                        "name": "",
                        "pid": 0
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
        // 保存公司
        saveDepetAction(){
            let self = this;
            
            if(self.deptItemInfo.name.length==0) {
                self.$Message.error("请输入部门名称");
                return;
            }
            
            self.disable = true;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: !self.deptItemInfo.id?self.$config.action.orgAdd:self.$config.action.orgEdit,
                data: {
                    "id": self.deptItemInfo.id||"", 
                    "fullname": self.deptItemInfo.fullname,
                    "name": self.deptItemInfo.name,
                    "pid": self.deptItemInfo.pid
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("提交成功");
                    self.getList(false);
                    self.isDept = false;
                    self.deptItemInfo = {
                        "fullname": "",
                        "id": 0,
                        "name": "",
                        "pid": 0
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
                "title": "确定删除"+ item.name+"?",
                onOk() {
                    self.axios({
                        method: 'post',
                        headers: {
                            token: self.userInfo.token
                        },
                        url: self.$config.action.orgDelete,
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

        // 渲言按钮
        renderContent (h, { root, node, data }) {
            let self = this;
            let buttonProps = {
                type: 'default',
                size: 'small',
            };
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, {
                            type: 'default',
                            size: 'small',
                        }),
                        style: {
                            marginRight: '8px',
                            marginLeft: '20px'
                        },
                        on: {
                            click: () => { window.vuePage.append(data) }
                        }
                    },'+下级部门'),
                    h('Button', {
                        props: Object.assign({},{
                            type: 'default',
                            size: 'small',
                        }, {
                            icon: 'ios-create-outline'
                        }),
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => { window.vuePage.editDepet(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({},{
                            type: 'default',
                            size: 'small',
                        }, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: () => { window.vuePage.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },

        // 已经结构
        companyAttr(h, root, node, data){
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '64px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, {
                            type: 'primary',
                            size: 'small',
                        }),
                        style: {
                            marginRight: '10px',
                            marginLeft: '20px'
                        },
                        on: {
                            click: () => { window.vuePage.append(data) }
                        }
                    }, "+新增部门"),
                    h('Button', {
                        props: Object.assign({},{
                            type: 'warning',
                            size: 'small',
                        }, {
                            icon: 'ios-create-outline'
                        }),
                        style: {
                            marginRight: '10px'
                        },
                        on: {
                            click: () => { window.vuePage.edit(data) }
                        }
                    }), // ios-create-outline
                    h('Button', {
                        props: Object.assign({},{
                            type: 'error',
                            size: 'small',
                        }, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: () => { window.vuePage.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },

        // 新增部门
        append (data) {
            let self = this;
            self.deptItemInfo = {
                "fullname": "",
                "id": 0,
                "name": "",
                "pid": 0
            };
            self.deptItemInfo.pid = data.itemInfo.id;
            self.isDept = true;
        },
        edit(data) {
            let self = this;
            for(var key in data.itemInfo) {
                self.itemInfo[key] = data.itemInfo[key];
            }
            self.isDetail = true;
        },
        editDepet(data) {
            let self = this;
            for(var key in data.itemInfo) {
                self.deptItemInfo[key] = data.itemInfo[key];
            }
            self.isDept = true;
        },
        remove (root, node, data) {
            let self = this;
            // const parentKey = root.find(el => el === node).parent;
            // const parent = root.find(el => el.nodeKey === parentKey).node;
            // const index = parent.children.indexOf(data);
            // parent.children.splice(index, 1);
            self.deleteAction(data.itemInfo);
        }
    },
    created() {
        let self = this;
        let userTimeOut = null;
        window.vuePage = self;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        self.userFuncInfo = self.$utility.getSessionStorage("userFuncInfo");
        self.userFuncCode = self.$utility.getSessionStorage("userFuncCode");
        
        self.getList(true);
        self.isUser = true;

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
.splitTitle {
    position: relative;
    z-index: 0;
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #f8f8f8;
    background-color: #f8f8f8;
    .searchBtnList {
        position: absolute;
        z-index: 1;
        right: 10px;
        top: 10px;
    }
}
.ivu-tree-title {
    width: 100%;
}
</style>
