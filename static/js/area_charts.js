var ec_left1 = ""
var ec_left2 = ""
var ec_left3 = ""
var ec_right1 = ""
var ec_right2 = ""
var ec_right3 = ""
var ec_center = ""
var ec_left1_Option = {}
var ec_left2_Option = {}
var ec_left3_Option = {}
var ec_right1_Option = {}
var ec_right2_Option = {}
var ec_right3_Option = {}
var ec_center_Option = {}
$(function () {
    l1()
    l2()
    l3()
    r1()
    r2()
    r3()
    c1()
    function c1() {
        ec_center = echarts.init(document.getElementById("center"))
        ec_center.clear()
        word = [{name:'肺炎',value:'123243',textStyle: {}},{name:'疫情',value:'1393754',textStyle: {}}]
        var maskImage = new Image()
        // maskImage.src  = './static/images/chinamap.png'
        ec_center.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_center_Option = {
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'none'
                },
                position: "top",
                formatter: function({name, value}) {
                    return `${name}:${value}`
                }
            },
            series: [{
                type: 'wordCloud',
                gridSize: 1,
                sizeRange: [20,65],
                width: '80%',
                height: '80%',
                shape: 'pentagon',
                rotationRange: [-45, 0, 45, 90],
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#ffeb76'
                    }
                },
                left: 'center',
                top: 'center',
                bottom: '10',
                right: null,
                data: [{
                    name: 'Sam S Club',
                    value: 10000,
                    textStyle: {
                        normal: {
                            color: 'black'
                        },
                        emphasis: {
                            color: 'red'
                        }
                    }
                }]
            }],
        }
        ec_center.setOption(ec_center_Option)
        window.addEventListener("resize",function(){
            ec_center.resize();
        });
    }
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
                },
                selected: {
                    '累计确诊':false,
                    '现有疑似':true,
                    '累计治愈':false,
                    '累计死亡':false
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
                inverse:true,
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
                        // if (value >= 1000) {
                        //     value = value/1000 + 'k'
                        // }
                        // return value
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
                data: ['新增确诊','新增疑似', '新增治愈','新增死亡'],
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
                inverse:true,
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
                        // if (value >= 1000) {
                        //     value = value/1000 + 'k'
                        // }
                        // return value
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
                lineStyle: {
                    normal: {
                        color: '#c12e34'
                    }
                },
                data: [],// [260,406,529],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }, {
                name: '新增疑似',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#7760f6'
                    }
                },
                data: []  //[54,37,3464]
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
                lineStyle: {
                    normal: {
                        color: '#e6b600'
                    }
                },
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
                subtext:  "百分比",
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
                data: ['死亡率','治愈率', '新增死亡率','新增治愈率'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#c12e34","#0098d9","#7171c6","#e6b600"],
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
                start: 50,
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
                inverse:true,
                data: []  //['01.20', '01.21', '01.22']
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: '{value} %'
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
                name: '死亡率',
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
                name: '治愈率',
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
                name: '新增死亡率',
                type: 'bar',
                data: []  //[5,6,7]
            },{
                name: '新增治愈率',
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
        ec_right1 = echarts.init(document.getElementById("echarts5"),"shine.js")
        ec_right1.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right1_Option = {
            title: {
                subtext:  "人数",
                subtextStyle: {
                    color: '#b0c2f9'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "shadow",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['现存确诊', '治愈', '死亡'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#00d887","#7760f6","#0098d9"],
            //图形位置
            grid: {
                left: '4%',
                right: '6%',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    interval: 0,
                    formatter:function(value){
                       return value.split("").join("\n");
                    }
                },
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
                data: []  //['河北','黑龙江', '北京', '上海', '吉林']
            }],
            dataZoom: [{
                type: "inside",
                show: true,
                start: 0,
                end: 50
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
                        color: "#2e3c76",
                        width: 1,
                        type: "solid"
                    }
                }

            }],
            series: [{
                name: '现存确诊',
                type: 'bar',
                barGap: '-100%',
                z: 10,
                lineStyle: {
                    normal: {
                        color: '#00d887'
                    }
                },
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                itemStyle: {
                    normal: {
                        borderWidth: 12
                    }
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: []  //[0,406,529]
            },
            {
                name: '治愈',
                type: 'bar',
                barGap: '-100%',
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#7760f6'
                    }
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: []  //[200,806,929]
            },
            {
                name: '死亡',
                type: 'bar',
                barGap: '-100%',
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#0098d9'
                    }
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
                data: []  //[250,26,29]
            }]
        }
        ec_right1.setOption(ec_right1_Option)
        window.addEventListener("resize",function(){
            ec_right1.resize();
        });
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
                data:['无症状感染','境外输入',"新增无症状感染","新增境外输入"],
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
                inverse:true,
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
                name: '无症状感染',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#0184d5',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0184d5',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: []  //[3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

            },
            {
                name: '境外输入',
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

            },{
                name: '新增无症状感染',
                type: 'bar',

                data: []  //[5,6,7]
            },{
                name: '新增境外输入',
                type: 'bar',

                data: []  //[5,6,7]
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
                data:['重症病例','现有确诊'],
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
                inverse:true,
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
                name: '重症病例',
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
                name: '现有确诊',
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

