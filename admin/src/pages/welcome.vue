<template>
    <div class="page">
        <div style="padding: 20px;">
            <div style="border-bottom: 1px solid #ddd;padding-bottom: 10px;">
                <Row>
                    <Col span="10">
                        <div style="padding-left: 40px;">选择时间：<DatePicker v-model="byStatusSearch" type="daterange" :clearable="false" :options="dataPickOption" placeholder="请选择时间" style="width: 200px"></DatePicker></div>
                        <div id="byStatusSearch" :style="{width: '100%', height: (height/2-100)+'px'}"></div>
                    </Col>
                    <Col span="14">
                        <div style="padding-left: 40px;">选择时间：<DatePicker v-model="byCateSearch" type="daterange" :clearable="false" :options="dataPickOption" placeholder="请选择时间" style="width: 200px"></DatePicker></div>
                        <div id="byCateSearch" :style="{width: '100%', height: (height/2-100)+'px'}"></div>
                    </Col>
                </Row>
            </div>

            <div style="padding-top: 10px;">
                <Row>
                    <Col span="10">
                        <div style="padding-left: 40px;">选择时间：<DatePicker v-model="byCStatusSearch" type="daterange" :clearable="false" :options="dataPickOption" placeholder="请选择时间" style="width: 200px"></DatePicker></div>
                        <div id="byCStatusSearch" :style="{width: '100%', height: (height/2-100)+'px'}"></div>
                    </Col>
                    <Col span="14">
                        <div style="padding-left: 40px;">选择时间：<DatePicker v-model="byCCateSearch" type="daterange" :clearable="false" :options="dataPickOption" placeholder="请选择时间" style="width: 200px"></DatePicker></div>
                        <div id="byCCateSearch" :style="{width: '100%', height: (height/2-100)+'px'}"></div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    name: "welcome",
    components: {},
    data: () => ({
        userInfo: null,  
        height: window.innerHeight,
        statuTime: [],
        color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3',"#660099","#666FF","#000CC","#9933CC","#666699","#660066","#FFCC66","#FF9900","#FF9966","#CC3300","#996666","#FFCCCC","#660000","#FF3300","#FF6666","#FFCC33","#66CC33","#33CC00","#CCFF33","#666633","#669999","#00FFCC"	,"#336633","#33CC66","#99FF66","#006600","#990033","#CC6699","#FF6699","#FF3366","#993366","#CC0066","#CC0033","#FF0066","#FF0033","#CC3399",'#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3',"#660099","#666FF","#000CC","#9933CC","#666699","#660066","#FFCC66","#FF9900","#FF9966","#CC3300","#996666","#FFCCCC","#660000","#FF3300","#FF6666","#FFCC33","#66CC33","#33CC00","#CCFF33","#666633","#669999","#00FFCC"	,"#336633","#33CC66","#99FF66","#006600","#990033","#CC6699","#FF6699","#FF3366","#993366","#CC0066","#CC0033","#FF0066","#FF0033","#CC3399",'#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3',"#660099","#666FF","#000CC","#9933CC","#666699","#660066","#FFCC66","#FF9900","#FF9966","#CC3300","#996666","#FFCCCC","#660000","#FF3300","#FF6666","#FFCC33","#66CC33","#33CC00","#CCFF33","#666633","#669999","#00FFCC"	,"#336633","#33CC66","#99FF66","#006600","#990033","#CC6699","#FF6699","#FF3366","#993366","#CC0066","#CC0033","#FF0066","#FF0033","#CC3399"],
        byStatusSearch: ["",""],
        byCateSearch: ["",""],
        statusList: {
            xValue: [],
            list: [],
            total: 0,
        },
        cateList: {
            xValue: [],
            list: [],
            total: 0
        },
        byCStatusSearch: ["",""],
        byCCateSearch: ["",""],
        cStatusList: {
            xValue: [],
            list: [],
            total: 0,
        },
        cCateList: {
            xValue: [],
            list: [],
            total: 0
        },
        dataPickOption: {
            shortcuts: [{
                text: '今天',
                value () {
                    const end = new Date();
                    const start = new Date();
                    return [start, end];
                }
            },{
                text: '1个星期',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                }
            },
            {
                text: '1个月',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                }
            },
            {
                text: '3个月',
                value () {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                }
            }],
            disabledDate (date) {
                return date && date.valueOf() > Date.now();
            }
        },
    }),
    
    methods: {
        
        // 按失物状态统计接口
        getLostStatByStatus(){
            let self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.statService),
                url: self.$config.action.getLostStatByStatus,
                data: self.$qs.stringify({
                    "pickupBeginTime": self.byStatusSearch[0],
                    "pickupEndTime": self.byStatusSearch[1],
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    let list = res.data.data.statusStat;
                    let xValue = [];
                    let statusList = [];
                    for(var i = 0, len = list.length; i < len; i++) {
                        xValue.push(self.$config.lostItemStatus[list[i]["lostItemStatus"]]["name"]);
                        statusList.push({
                            name: self.$config.lostItemStatus[list[i]["lostItemStatus"]["name"]],
                            value: list[i]["statusNum"],
                            itemStyle: {
                                "color": self.color[i],
                                "width": 32
                            },
                        });
                    }
                    self.drawLine({
                        id: "byStatusSearch",
                        title: "遗失物品状态统计("+ res.data.data.totalItems +")",
                        xValue: xValue,
                        data: statusList
                    });
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        
        // 旅客
        getClientRegisterStatByStatus(){
            let self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.statService),
                url: self.$config.action.getClientRegisterStatByStatus,
                data: self.$qs.stringify({
                    "beginTime": self.byCStatusSearch[0],
                    "endTime": self.byCStatusSearch[1],
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    let list = res.data.data.clientRegisterStatusStat;
                    let xValue = [];
                    let statusList = [];

                    for(var i = 0, len = list.length; i < len; i++) {
                        xValue.push(self.$config.clientDealStatus[list[i]["clientDealStatus"]]["name"]);
                        statusList.push({
                            name: self.$config.clientDealStatus[list[i]["clientDealStatus"]["name"]],
                            value: list[i]["statusNum"],
                            itemStyle: {
                                "color": self.color[i],
                                "width": 32
                            }
                        });
                    }
                    self.drawLine({
                        id: "byCStatusSearch",
                        title: "旅客报失物品处理统计("+ res.data.data.totalItems +")",
                        xValue: xValue,
                        data: statusList
                    });
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        
        // 按失物分类统计接口
        getLostStatByCate(item){
            let self = this;
            
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.statService),
                url: self.$config.action.getLostStatByCate,
                data: self.$qs.stringify({
                    "pickupBeginTime": self.byCateSearch[0],
                    "pickupEndTime": self.byCateSearch[1],
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    let list = res.data.data.cateStat;
                    let xValue = [];
                    let statusList = [];

                    for(var i = 0, len = list.length; i < len; i++) {
                        xValue.push(list[i]["secondCateName"]);
                        // list[i]["firstCateName"]+'-'+
                        statusList.push({
                            name: list[i]["secondCateName"],
                            value: list[i]["cateNum"],
                            itemStyle: {
                                "color": self.color[i]
                            },
                        });
                    }
                    self.drawLine({
                        id: "byCateSearch",
                        title: "遗失物品类型统计("+ res.data.data.totalItems +")",
                        xValue: xValue,
                        data: statusList
                    });
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        
        // 按失物分类统计接口
        getClientRegisterStatByCate(){
            let self = this;
            self.axios({
                method: 'post',
                headers: self.$utility.setHeader(self.$config.service.statService),
                url: self.$config.action.getClientRegisterStatByCate,
                data: self.$qs.stringify({
                    "beginTime": self.byCCateSearch[0],
                    "endTime": self.byCCateSearch[1],
                })
            })
            .then(function (res) {
                if(res.data.code=='200') {
                    let list = res.data.data.clientRegisterCateStat;
                    let xValue = [];
                    let statusList = [];

                    for(var i = 0, len = list.length; i < len; i++) {
                        xValue.push(list[i]["secondCateName"]);
                        // list[i]["firstCateName"]+'-'+
                        statusList.push({
                            name: list[i]["secondCateName"],
                            value: list[i]["cateNum"],
                            itemStyle: {
                                "color": self.color[i]
                            },
                        });
                    }
                    self.drawLine({
                        id: "byCCateSearch",
                        title: "旅客报失物品统计("+ res.data.data.totalItems +")",
                        xValue: xValue,
                        data: statusList
                    });
                } else if(res.data.code=='9003') {
                    self.utility.loginTimeOut(self);
                } else {
                    self.$Message.error(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        
        // 画柱状图
        drawLine(options){
            let self = this;
            // 基于准备好的dom，初始化echarts实例
            let myChart = self.$echarts.init(document.getElementById(options.id))
            // 绘制图表
            myChart.setOption({
                title: { 
                    text: options.title,
                    padding: 10, 
                    left: 40,
                    top: 5,
                    textStyle: {
                        color: "#666"
                    }
                },
                tooltip: {
                    formatter: '{b}:{c}',
                },
                legend: {
                    show: true,
                    data: options.xValue
                },
                grid: [{
                    left: 20,
                    top: 50,
                    right: 20,
                    bottom: 0,
                    width: '100%',
                    containLabel: true
                }],
                xAxis: [{
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    // axisLabel: {
                    //     interval: 0,
                    //     rotate: 30
                    // },
                    data: options.xValue
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        interval: 0,
                    },
                    splitLine: {
                        show: false
                    },
                }],
                series: [{
                    type: 'bar',
                    stack: 'chart',
                    itemStyle: {
                        normal: {
                            color: '#eee'
                        }
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: 18
                    },
                    data: options.data
                }]
            });
        },

        // 画饼状图
        drawPie(options){
            let self = this;
            // 基于准备好的dom，初始化echarts实例
            let myChart = self.$echarts.init(document.getElementById(options.id));
            let labelLine = {
                length: 5,
                length2: 5,
                smooth: true
            };
            // 绘制图表
            myChart.setOption({
                title: "",
                tooltip: {
                    formatter: '{b}:{d}%',
                },
                legend: {
                    top: 20,
                    padding: [5,2],
                    itemWidth: 15,
                    itemGap: 5,
                    show: true,
                    data: options.xValue
                },
                grid: {
                    left: 20,
                    top: 150,
                    right: 20,
                    bottom: 0,
                    containLabel: true
                },
                series: [{
                    type: 'pie',
                    radius: [0, '65%'],
                    center: ['30%', '65%'],
                    data: options.house,
                    labelLine: labelLine
                },
                {
                    type: 'pie',
                    radius: [0, '65%'],
                    center: ['70%', '65%'],
                    data: options.shops,
                    labelLine: labelLine
                }]
            });
        },

    },
    created() {
        let self = this;
        let userTimeOut = null;
        let end = new Date();
        let start = new Date();
        self.userInfo = self.$utility.getLocalStorage("userInfo");
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

        self.byStatusSearch = [start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate(), end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()];
        self.byCateSearch = [start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate(), end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()];

        self.byCStatusSearch = [start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate(), end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()];
        self.byCCateSearch = [start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate(), end.getFullYear()+'-'+(end.getMonth()+1)+'-'+end.getDate()];

        self.getLostStatByStatus();
        self.getLostStatByCate();

        self.getClientRegisterStatByStatus();
        self.getClientRegisterStatByCate();

        self.$watch('byStatusSearch', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.statusList.list = [];
                self.statusList.xValue = [];
                self.getLostStatByStatus();
            }, 200);
        }, {
            deep: true
        });

        self.$watch('byCateSearch', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.cateList.list = [];
                self.cateList.xValue = [];
                self.getLostStatByCate();
            }, 200);
        }, {
            deep: true
        });

        self.$watch('byCStatusSearch', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.cStatusList.list = [];
                self.cStatusList.xValue = [];
                self.getClientRegisterStatByStatus();
            }, 200);
        }, {
            deep: true
        });

        self.$watch('byCCateSearch', function () {
            clearTimeout(userTimeOut);
            userTimeOut = setTimeout(() => {
                self.cCateList.list = [];
                self.cCateList.xValue = [];
                self.getClientRegisterStatByCate();
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
    }
};
</script>

<style lang="less">
@import "~@/common/unit.less";

</style>
