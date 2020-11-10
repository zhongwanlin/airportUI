<template>
    <div id="index">
        <div class="topHeader">
            <div class="logo">首都机场大屏后台管理系统</div>
            <div class="user">
                <span class="info">{{!!userInfo?userInfo.nickname:''}}（{{!!userInfo?userInfo.username:''}}）</span>
                <span class="info logOut" @click="logOut">退出 <span><Icon type="md-exit" size="24" /></span></span>
                <!-- <div class="logOutWrap">
                    <span class="mdArrow"><Icon type="md-arrow-dropup" color="#333" size="48" /></span>
                    <div class="modifPass" @click="showEditPass">修改密码</div>
                    <div class="logOutTxt" @click="logOut">
                        退出 <span><Icon type="md-exit" size="24" /></span>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="sibeMenu">
            <Menu :style="{height: (height-70)+'px',width: 'auto'}"  :active-name="activeName" :open-names="openNames">
                <template v-for="(value, key) in menuList">
                    <template v-if="value.isShow">
                        <Submenu :name="value.id" :key="key+'sub'" >
                            <template slot="title">
                                <span class="icons" v-html="value.icon"></span>
                                <span class="label">{{key}}</span>
                            </template>
                            <template v-for="(item, index) in value.list">
                                <template v-if="item.isShow">
                                    <MenuItem :name="item.id" :id="item.id" :key="index+key" style="padding-left: 5px;" :class="{'ivu-menu-item-active ivu-menu-item-selected': currentId==item.id}">
                                        <div class="item" @click="setCurretn(item)">
                                            <span class="topArrow"><Icon type="ios-arrow-forward" color="#d2dcf3" size="16" /></span>
                                            <span class="txt">{{item.label}}</span>
                                        </div>
                                    </MenuItem>
                                </template>
                            </template>
                        </Submenu>
                    </template>
                </template>
            </Menu>
        </div>

        <div class="mainNavTab">
            <template>
                <Tabs v-model="currentId" type="card" @on-click="setParent" @on-tab-remove="removeTab" :animated="false">
                    <TabPane class="firstTab" label="旅客使用报表" name="userReport">
                        <iframe :style="{width: '100%', height: (height-100) + 'px'}" src="#/userReport" frameborder="0"></iframe>
                    </TabPane>
                    <template v-for="(value, key) in iframeUrlList">
                        <template v-if="value.isShow==true">
                            <TabPane :label="value.item.label" :name="value.item.id" :key="key" :closable="true">
                                <iframe :id="value.item.id" :style="{width: '100%', height: (height-100) + 'px'}"  :src="value.item.url" frameborder="0"></iframe>
                            </TabPane>
                        </template>
                    </template>
                </Tabs>
            </template>
        </div>

        <template>
            <Modal v-model="isModifPass" :mask-closable="false" width="30" :styles="{top: '25%'}" title="修改密码" @on-cancel="isModifPass=false">
                <div class="modalTable">
                    <div class="detail">
                        <table>
                            <tr>
                                <td class="tr pr10"><span class="request">*</span>旧密码：</td>
                                <td class="pt5"><Input v-model="modifiInfo.oldUserPwd" placeholder="填写旧密码,至少6个字符,最多18个字符" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="tr pr10" style="width: 100px;"><span class="request">*</span>新密码：</td>
                                <td class="pt5"><Input v-model="modifiInfo.newUserPwd" placeholder="填写新密码,至少6个字符,最多18个字符" style="width: 100%" /></td>
                            </tr>
                            <tr>
                                <td class="tr pr10"><span class="request">*</span>确认密码：</td>
                                <td class="pt5"><Input v-model="modifiInfo.comfirPwd" placeholder="填写确认密码,至少6个字符,最多18个字符" style="width: 100%" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div slot="footer" class="modalFooter">
                    <template>
                        <Button type="default" @click="isModifPass=false" style="margin-right: 5px">关闭</Button>
                        <Button type="primary" @click="saveAction" :disable="disable">提交</Button>
                    </template>
                </div>
            </Modal>
        </template>
    </div>
</template>

<script>
import menu from "@/common/menu.js";
export default {
    name: "index",
    components: {},
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
        currentId: "userReport",
        parent: "",
        isIframe: false,
        menuList: {},
        iframeUrlList: {},
        iframeList: [],
        paramsInfo: {},
        isModifPass: false,
        disable: false,
        activeName: "statisticalReport",
        openNames: ["statisticalReport","sysAdmin","areaManage","deviceManage","voiceManage","emergency","statisticalReport"],
        modifiInfo: {
            oldUserPwd: "",
            newUserPwd: "",
            comfirPwd: "",
        }
    }),
    methods: {
        showEditPass(){
            var self = this;
            self.isModifPass = true;
        },
        // 当删除tab时
        removeTab(id){
            var self = this;
            let arr = [];
            self.iframeUrlList[id]["isShow"] = false;
            if(self.currentId != "userReport") {
                self.parent = self.iframeUrlList[self.currentId]["item"]["parent"];
            } else {
                self.parent = "";
            }
            self.setParent(self.currentId);
        },
        // 设置
        setParent(id){
            var self = this;
            self.parent = !!self.iframeUrlList[id] ? self.iframeUrlList[id]["item"]["parent"]:'';

            setTimeout(()=>{
                self.$(".sibeMenu").find(".ivu-menu-item").removeClass("ivu-menu-item-active");
                self.$(".sibeMenu").find(".ivu-menu-item").removeClass("ivu-menu-item-selected");
                self.$(".sibeMenu").find("#"+id).addClass("ivu-menu-item-active");
                self.$(".sibeMenu").find("#"+id).addClass("ivu-menu-item-selected");
                self.currentId = id;
            }, 250);
        },
        setCurretn(item) {
            var self = this;
            self.currentId = item.id;
            self.parent = item.parent;
            clearInterval(window.wecomeInterval);
            if(item.id != "userReport") {
                self.iframeUrlList[item.id] = {
                    isShow: true,
                    item: item
                };
            }
        },
    
        // 退出
        logOut() {
            var self = this;
            self.axios({
                method: 'post',
                headers: {
                    token: self.userInfo.token
                },
                url: self.$config.action.userLoginOut,
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$utility.cleanLocalStorage();
                    window.parent.location.replace("#/login");
                } else {
                    self.$Message.error(res.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        saveAction(){
            var self = this;
            if(self.modifiInfo.oldUserPwd.trim().length==0) {
                self.$Message.error("请输入旧密码");
                return;
            }
            if(self.modifiInfo.newUserPwd.trim().length<6||self.modifiInfo.newUserPwd.trim().length>18) {
                self.$Message.error("新密码至少6到18位字符");
                return;
            }
            if(self.modifiInfo.newUserPwd.trim()!=self.modifiInfo.comfirPwd) {
                self.$Message.error("新密码与确认密码不一致");
                return;
            }
            self.disable = true;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.userService),
                url: self.$config.action.changeUserPwd,
                data: self.$qs.stringify({
                    "oldUserPwd": self.modifiInfo.oldUserPwd,
                    "newUserPwd": self.modifiInfo.newUserPwd,
                })
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    self.$Message.success("密码修改成功,请重新登录");
                    self.logOut();
                } else {
                    self.$Message.error(res.data.msg);
                }
                self.disable = false;
            })
            .catch(function (error) {
                console.log(error);
                self.disable = false;
            });
        }
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        if(!self.userInfo) {
            self.$router.push({
                name: "login"
            });
            return;
        }

        self.menuList = menu.setMenuList(self)["menuInfo"];

        console.log(self.userInfo);
    },
    mounted(){
        let self = this;
        let resizeTime = null;

        self.$(".navItem").on("mouseover", function(){
            self.$(".subNav").removeAttr("style");
        });

        window.onresize = function() {
            clearTimeout(resizeTime);
            resizeTime = setTimeout(function () {
                self.height = window.innerHeight;
            }, 500);
        }
    }
};
</script>

<style lang="less">
body {
    background-color: #f5f9fa;
}
#index { 
    .routerView {
        .page {
            background-color: transparent;
            box-shadow: none;
            overflow: visible;
        }
    }
    .contain {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 98px;
        bottom: 0;
        right: 0; 
        height: 100%;
        .ivu-spin-fix {
            left: 15px;
            top: 10px;
            bottom: 60px;
            right: 10px;
            width: auto;
            height: auto;
            .ivu-spin-main{
                top: 30%;
            }
            .ivu-spin-dot {
                width: 50px;
                height: 50px;
            }
        }
        &.containFromPage {
            width: 100%;
            left: 0;
            top: 0;
        }
        iframe {
            position: absolute;
            z-index: 0;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            &.current {
                z-index: 1000000;
                opacity: 1;
            }
            &.noCurrent {
                z-index: 0;
                opacity: 0;
            }
        }
    }
    .sibeMenu {
        position: absolute;
        z-index: 0;
        left: 0;
        top:64px;
        bottom: 0;
        width: 140px;
        overflow-x: hidden;
        overflow-y: auto;
        .ivu-menu-submenu-title {
            padding: 8px 10px;
            background-color: #e8eaec;
            border-bottom: 1px solid #f8f8f8;
            .label {
                position: relative;
                z-index: 0;
                top: -3px;
                font-size: 13px;
                padding-left: 5px;
            }
            .icons {
                position: relative;
                z-index: 0;
            }
        }
        .ivu-menu-item {
            padding: 0;
            font-size: 13px;
            .item {
                position: relative;
                z-index: 0;
                padding: 8px 10px;
                border-bottom: 1px solid #dcdcdc;
                .topArrow {
                    position: absolute;
                    z-index: 100;
                    top: 8px;
                    right: 14px;
                }
            }
        }
        .ivu-menu-submenu-title-icon {
            right: 10px;
        }
    }
    .mainNavTab {
        position: absolute;
        z-index: 0;
        left: 140px;
        right: 0;
        top:64px;
        bottom: 0;
        .ivu-tabs {
            width: 100%;
        }
        .ivu-tabs-bar {
            margin-bottom: 0;
        }
    }

    .topHeader {
        position: relative;
        z-index: 1000000000000;
        height: 64px;
        background: #2b85e4;
        .logo {
            position: relative;
            z-index: 0;
            top: 15px;
            float: left;
            // width: 120px;
            margin: 0 20px 0;
            color: #fff;
            font-size: 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        // .mainNav {
        //     float: left;
        //     .navItem {
        //         position: relative;
        //         z-index: 0;
        //         display: inline-block;
        //         cursor: pointer;
        //         .navLabel {
        //             text-align: center;
        //             color: #fff;
        //             padding: 0 15px;
        //             height: 64px;
        //             line-height: 1.2;
        //             .icon {
        //                 padding-top: 5px;
        //             }
        //             .label {
        //                 font-size: 13px;;
        //             }
        //         }
        //         &.currentItem {
        //             background-color: #168878;
        //         }
        //         .subNav {
        //             display: none;
        //             position: absolute;
        //             z-index: 100;
        //             left: -30px;
        //             top: 64px;
        //             border-radius: 5px;
        //             width: 150px;
        //             color: #368fff;
        //             font-size: 14px;
        //             background-color: #ffffff;
        //             box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
        //             border: 1px solid #f8f8f8;
        //             line-height: 1.2;
        //             // overflow: hidden;
        //             .topArrow {
        //                 position: absolute;
        //                 z-index: 100;
        //                 top: -20px;
        //                 left: 55px;
        //             }
        //             .item {
        //                 padding: 10px 10px 10px 20px;
        //                 cursor: pointer;
        //                 &:nth-child(2n+1) {
        //                     background-color: #eff5fd;
        //                 }
        //                 &:hover {
        //                     // color: #ffffff;
        //                     color: #f18232;
        //                 }
        //             }
        //         }
        //         &:hover {
        //             .subNav { 
        //                 display: block;
        //             }
        //         }
        //     }
        // }
        .user {
            position: relative;
            z-index: 0;
            float: right;
            color: #fff;
            padding-right: 30px;
            .info {
                line-height: 64px;
                &.logOut {
                    cursor: pointer;
                }
            }
            &:hover {
                .logOutWrap { 
                    display: block;
                }
            }
            .logOutWrap {
                display: none;
                position: absolute;
                z-index: 10;
                width: 100px;
                padding: 0 10px;
                top: 50px;
                right: 10px;
                background-color: #333;
                line-height: 2;
                cursor: pointer;
                .mdArrow {
                    position: absolute;
                    z-index: 10000000;
                    top: -28px;
                }
                .modifPass {
                    padding: 10px;
                    border-bottom: 1px solid #009688;
                }
                .logOutTxt {
                    padding: 10px;
                }
            }
        }
    }
}
</style>
