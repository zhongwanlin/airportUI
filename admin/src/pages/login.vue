<template>
    <div id="login">
        <!-- <img class="bgImg" src="../assets/lgBg.png" /> -->
        <div class="inputWrap">
            <div class="bannerBg">
                <div class="label">后台管理系统</div>
            </div>
            <div class="inputInfo">
                <div class="inputList">
                    <div class="item">
                        <Input size="large" :disabled="loading" v-model="loginInfo.username" placeholder="请输入用户名">
                        <Icon type="md-person" size="22" color="#808695" slot="prefix" />
                        </Input>
                    </div>
                    <div class="item">
                        <Input size="large" :disabled="loading" type="password" v-model="loginInfo.password"  placeholder="请输入密码">
                        <Icon type="md-unlock" size="22" color="#808695" slot="prefix" />
                        </Input>
                    </div>
                </div>
                <div class="action">
                    <Button type="primary" @click="loginAction" :loading="loading" size="large" :long="true" shape="circle">登录</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from "js-md5";
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    name: "login",
    components: {
    },
    data: () => ({
        loading: false,
        userInfo: {},
        verifyInfo: {
            imgCode: "",
            imgCodeUrl: "",
            reqId: "",
        },
        loginInfo: {
            "userCode": "",
            "userPwd": ""
        }
    }),
    computed: {
        ...mapState([])
    },
    methods: {
        ...mapMutations([]),
        loginAction() {
            let self = this;
            let timestamp = Date.parse(new Date());
            self.loading = true;
            if(self.$utility.checkLen(self.loginInfo.username, 0)) {
                self.$Message.error("请输入用户名");
                self.loading = false;
                return;
            }
            if(self.$utility.checkLen(self.loginInfo.password, 0)) {
                self.$Message.error("请输入密码");
                self.loading = false;
                return;
            }

            self.axios({
                method: 'post',
                url: self.$config.action.userLogin,
                data: {
                    "username": self.loginInfo.username,
                    "password": md5(self.loginInfo.password).toUpperCase()
                }
            })
            .then(function (res) {
                if(res.data.code=='0') {
                    let data = res.data.data;
                    self.$utility.setLocalStorage("userInfo", res.data.data);
                    self.$router.push({
                        name: "index"
                    });
                } else {
                    self.$Message.error(res.data.msg);
                }
                self.loading = false;
            })
            .catch(function (error) {
                console.log(error);
                self.loading = false;
            });
        }
    },
    created() {
        let self = this;
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        if(!!self.userInfo) {
            self.$router.push({
                name: "index"
            });
        }
    },
    mounted(){
        let self = this;
        document.onkeydown = function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                self.loginAction();
            }
        }
    }
};
</script>

<style lang="less">
#login {
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #fff url("~@/assets/bg.jpg") no-repeat center center;
    background-size: cover;

    .bgImg {
        display: block;
        width: 100%;
        height: 100%;
    }

    .inputWrap {
        position: absolute;
        z-index: 1000;
        left: 50%;
        top: 15%;
        width: 480px;
        margin-left: -240px;
        background-color: rgba(255, 255, 255, .5);
        border-radius: 5px;

        .bannerBg {
            padding: 20px;
            text-align: center;
            
            .label {
                font-size: 32px;
                font-weight: bold;
                color: #3d3d3f;
                padding-top: 10px;
                text-shadow: 1px 1px 2px rgba(255, 255, 255, 1);
            }
            .logo {
                width: 60px;
                height: 60px;
                line-height: 55px;
                text-align: center;
                overflow: hidden;
                margin: 0 auto;
                border-radius: 10px;
                font-size: 54px;
                color: #fef995;
                border: 2px solid #fef995;
                background-color: #0052a6;
                font-family: cursive;
            }
            
        }

        .inputInfo {
            padding: 0 30px 30px 30px;
            .title {
                padding: 10px 0;
                color: #2b85e4;
                overflow: hidden;

                img {
                    width: 60%;
                }

                span {
                    display: block;
                    font-size: 32px;
                    padding-left: 40px;
                    padding-bottom: 10px;

                    &.label {
                        padding-top: 20px;
                    }
                }
            }

            .inputList {
                .item {
                    position: relative;
                    z-index: 100;
                    padding: 5px 0;
                    margin-bottom: 10px;
                    font-size: 18px;
                    .ivu-input {
                        font-size: 18px;
                        font-weight: bolder;
                    }
                    .imgCode {
                        position: absolute;
                        z-index: 100;
                        right: 0;
                        top: 5px;
                        width: 28%;
                        height: 40px;
                    }
                }
            }

            .action {
                padding: 0 0 20px 0;
                font-size: 32px;

                .ivu-btn {
                    background-color: #368fff;
                    span {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
