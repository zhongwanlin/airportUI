<template>
    <div class="levelWrap">
        <table>
            <template v-if="!!levelInfo.propName1">
                <tr>
                    <td style="width: 120px;">{{levelInfo.propName1}}：</td>
                    <td>
                        {{levelInfo.propOptionValue1||'自填'}}
                    </td>
                </tr>
            </template>

            <template v-if="!!levelInfo.propName2">
                <tr>
                    <td>{{levelInfo.propName2}}：</td>
                    <td>
                        {{levelInfo.propOptionValue2||'自填'}}
                    </td>
                </tr>
            </template>

            <template v-if="!!levelInfo.propName3">
                <tr>
                    <td>{{levelInfo.propName3}}：</td>
                    <td>
                        {{levelInfo.propOptionValue3||'自填'}}
                    </td>
                </tr>
            </template>

            <template v-if="!!levelInfo.propName4">
                <tr>
                    <td>{{levelInfo.propName4}}：</td>
                    <td>
                        {{levelInfo.propOptionValue4||'自填'}}
                    </td>
                </tr>
            </template>
        </table>
    
    </div>
</template>

<script>
export default {
    name: "levelInfo",
    props: {
        levelInfo: Object,
    },
    components: { },
    data: () => ({
        userInfo: null,
        height: window.innerHeight,
    }),
    methods: {
        
    },
    created() {
        let self = this;
    },
    mounted() {
        let self = this;
        let resizeTime = null;
        let userTimeOut = null;
        self.userInfo = self.$utility.getLocalStorage("lostFoundUserInfo");
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
.levelWrap {
    tr {
        td {
            &:first-child {
                text-align: right;
            }
        }
    }
    td{
        padding: 5px;
        vertical-align: top;
    }
}
</style>
