var ec_left1 = ""
var ec_left2 = ""
var ec_left3 = ""
var ec_left4 = ""
var ec_right1 = ""
var ec_right2 = ""
var ec_right3 = ""
var ec_right4 = ""
var ec_left1_Option = {}
var ec_left2_Option = {}
var ec_left3_Option = {}
var ec_left4_Option = {}
var ec_right1_Option = {}
var ec_right2_Option = {}
var ec_right3_Option = {}
var ec_right4_Option = {}


$(function () {
    l1()
    l2()
    l3()
    l4()
    r1()
    r2()
    r3()
    r4()

    function l1() {
        ec_left1 = echarts.init(document.getElementById("echarts1"))
        ec_left1.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_left1_Option = {
            title: {
                subtext:  "人数",
                subtextStyle: {
                    color: '#b0c2f9'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['累计确诊','现有疑似', '累计治愈', '累计死亡'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#c12e34","#7760f6","#0098d9","#e6b600"],
            //图形位置
            grid: {
                left: '4%',
                right: '6%',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 50
            }],
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                axisLabel: {
                    show: true,
                    color: '#b0c2f9',
                    fontSize: 12
                },
                data: []  //['01.20', '01.21', '01.22']
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value)
                    }
                },
                axisTick: {
                    show: false,
                },
                //y轴设置显示
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                //与x轴平行的线样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "transparent",
                        width: 1,
                        type: "solid"
                    }
                }

            }],
            series: [{
                name: '累计确诊',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#c12e34'
                    }
                },
                data: []  //[260,406,529]
            }, {
                name: '现有疑似',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#7760f6'
                    }
                },
                data: []  //[54,37,3464]
            },{
                name: '累计治愈',
                type: 'line',
                smooth: true,
                data: []  //[25,5,12]
            },{
                name: '累计死亡',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#e6b600'
                    }
                },
                data: []  //[5,6,7]
            }]
        }
        ec_left1.setOption(ec_left1_Option)
        window.addEventListener("resize",function(){
            ec_left1.resize();
        });
    }
    function l2() {
        ec_left2 = echarts.init(document.getElementById("echarts2"),"shine.js")
        ec_left2.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_left2_Option = {
            title: {
                subtext:  "人数",
                subtextStyle: {
                    color: '#b0c2f9'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['新增确诊', '新增治愈','新增死亡'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#c12e34","#e6b600","#0098d9"],
            //图形位置
            grid: {
                left: '4%',
                right: '6%',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 93,
                end: 100
            }],
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    color: '#b0c2f9',
                    fontSize: 12
                },
                data: []  //['01.20', '01.21', '01.22']
            }],
            yAxis: [{

                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value)
                    }
                },
                //y轴设置显示
                //刻度显示
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                //与x轴平行的线样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "transparent",
                        width: 1,
                        type: "solid"
                    }
                }

            }],
            series: [{
                name: '新增确诊',
                type: 'line',
                smooth: true,
                data: [],// [260,406,529],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },{
                name: '新增治愈',
                type: 'line',
                smooth: true,
                data: [],  //[25,5,12],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },{
                name: '新增死亡',
                type: 'line',
                smooth: true,

                data: []  //[5,6,7]
            }]
        }
        ec_left2.setOption(ec_left2_Option)
        window.addEventListener("resize",function(){
            ec_left2.resize();
        });
    }
    function l3() {
        ec_left3 = echarts.init(document.getElementById("echarts3"),"shine.js")
        ec_left3.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_left3_Option = {
            title: {
                subtext:  "人数",
                subtextStyle: {
                    color: '#b0c2f9'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "cross",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['累计检测','累计检测新增'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#c12e34","#7171c6"],
            //图形位置
            grid: {
                left: '4%',
                right: '6%',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 100
            }],
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    color: '#b0c2f9',
                    fontSize: 12
                },
                data: []  //['01.20', '01.21', '01.22']
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value)
                    }
                },
                //y轴设置显示
                //刻度显示
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                //与x轴平行的线样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "transparent",
                        width: 1,
                        type: "solid"
                    }
                }

            }],
            series: [{
                name: '累计检测',
                type: 'line',
                smooth: true,
                data: [],// [260,406,529],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
            },{
                name: '累计检测新增',
                type: 'bar',
                data: []  //[5,6,7]
            }]
        }
        ec_left3.setOption(ec_left3_Option)
        window.addEventListener("resize",function(){
            ec_left3.resize();
        });
    }
    function l4() {
        ec_left4 = echarts.init(document.getElementById("echarts4"),"shine.js")
        ec_left4.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_left4_Option = {
            title: {
                subtext:  "人数",
                subtextStyle: {
                    color: '#b0c2f9'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "cross",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['累计住院','现有住院','新增住院'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#0098d9","#e6b600","#7171c6"],
            //图形位置
            grid: {
                left: '4%',
                right: '6%',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 100
            }],
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    color: '#b0c2f9',
                    fontSize: 12
                },
                data: []  //['01.20', '01.21', '01.22']
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value)
                    }
                },
                //y轴设置显示
                //刻度显示
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                //与x轴平行的线样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "transparent",
                        width: 1,
                        type: "solid"
                    }
                }

            }],
            series: [{
                name: '累计住院',
                type: 'line',
                smooth: true,
                data: [],// [260,406,529],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
            },{
                name: '现有住院',
                type: 'line',
                smooth: true,
                data: [],// [260,406,529],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
            },{
                name: '新增住院',
                type: 'bar',
                data: []  //[5,6,7]
            }]
        }
        ec_left3.setOption(ec_left3_Option)
        window.addEventListener("resize",function(){
            ec_left3.resize();
        });
    }
    function r1() {
        ec_right1 = echarts.init(document.getElementById("echarts5"))
        ec_right1.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right1_Option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top:'0%',
                data:['累计检测阳性','累计检测阴性'],
                    textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '18',
                bottom: '10',
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 100
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: []  //['01-02', '01-03', '01-04']
            }, {
                axisPointer: {show: false},
                axisLine: {  show: false},
                position: 'bottom',
                offset: 20,
            }],
            color: ["#7171c6","#e6b600"],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                    formatter: function (value) {
                        return tranNumber(value)
                    }
                },
                splitLine: {
                    lineStyle: {
                         color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '累计检测阳性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#F2597F',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(213,72,120,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(213,72,120,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F2597F',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

            },
            {
                name: '累计检测阴性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#00d887',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                    itemStyle: {
                    normal: {
                        color: '#00d887',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
            }]

    };
        ec_right1.setOption(ec_right1_Option)
    }
    
    function r2() {
        ec_right2 = echarts.init(document.getElementById("echarts6"))
        ec_right2.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right2_Option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top:'0%',
                data:['新增检测阳性','新增检测阴性'],
                    textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '18',
                bottom: '10',
                containLabel: true
            },
            dataZoom: [{
                type: "inside",
                show: true,
                start: 80,
                end: 100
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: []  //['01-02', '01-03', '01-04']
            }, {
                axisPointer: {show: false},
                axisLine: {  show: false},
                position: 'bottom',
                offset: 20,
            }],
            color: ["#7171c6","#e6b600"],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize:12,
                        },
                    },
                splitLine: {
                    lineStyle: {
                         color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '新增检测阳性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#F2597F',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(213,72,120,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(213,72,120,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F2597F',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

            },
            {
                name: '新增检测阴性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#00d887',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                    itemStyle: {
                    normal: {
                        color: '#00d887',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
            }]

    };
        ec_right2.setOption(ec_right2_Option)
    }
    function r3() {
        ec_right3 = echarts.init(document.getElementById("echarts7"))
        ec_right3.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right3_Option = {
            animation: 'auto',
            animationDurationUpdate: 500,
            animationDuration: 1000,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top:'0%',
                data:['当前ICU','现有ICU'],
                    textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '18',
                bottom: '10',
                containLabel: true
            },
             dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 100
                }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: []  //['01-02', '01-03', '01-04']
            }, {
                axisPointer: {show: false},
                axisLine: {  show: false},
                position: 'bottom',
                offset: 20,
            }],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize:12,
                        },
                    },
                splitLine: {
                    lineStyle: {
                         color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '当前ICU',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#F2597F',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(213,72,120,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(213,72,120,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F2597F',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

            },
            {
                name: '现有ICU',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#0770FF',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(58,77,233,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(58,77,233,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0770FF',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

            }]

    };
        ec_right3.setOption(ec_right3_Option)
    }
    function r4() {
        ec_right4 = echarts.init(document.getElementById("echarts8"))
        ec_right4.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right4_Option = {
            animation: 'auto',
            animationDurationUpdate: 500,
            animationDuration: 1000,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top:'0%',
                data:['当前使用呼吸机','现有使用呼吸机'],
                    textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '18',
                bottom: '10',
                containLabel: true
            },
             dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 100
                }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: []  //['01-02', '01-03', '01-04']
            }, {
                axisPointer: {show: false},
                axisLine: {  show: false},
                position: 'bottom',
                offset: 20,
            }],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel:  {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize:12,
                        },
                    },
                splitLine: {
                    lineStyle: {
                         color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '当前使用呼吸机',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#F2597F',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(213,72,120,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(213,72,120,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F2597F',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

            },
            {
                name: '现有使用呼吸机',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#0770FF',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(58,77,233,0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(58,77,233,0.3)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0770FF',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

            }]

    };
        ec_right4.setOption(ec_right4_Option)
    }

    // 以万格式设置
    function tranNumber(num){
        var numStr = num.toString();
        // 十万以内直接返回
        if (numStr.length <5 ) {
            return numStr;
        }
        //大于8位数是亿
        else if (numStr.length > 8) {
            var decimal = numStr.substring(numStr.length - 8, numStr.length - 1 );
            return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
        }
        //大于6位数是十万 (以10W分割 10W以下全部显示)
        else if (numStr.length > 5) {
            var decimal = numStr.substring(numStr.length - 4, numStr.length - 1)
            return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
        }else if(numStr.length == 5){
            var decimal = numStr.substring(numStr.length - 3, numStr.length - 1)
            return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
        }
    }


})

