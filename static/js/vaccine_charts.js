var ec_left1 = ""
var ec_left2 = ""
var ec_left3 = ""
var ec_right1 = ""
var ec_right2 = ""
var ec_bottom1 = ""
var ec_bottom2 = ""
var ec_left1_Option = {}
var ec_left2_Option = {}
var ec_left3_Option = {}
var ec_right1_Option = {}
var ec_right2_Option = {}
var ec_bottom1_Option = {}
var ec_bottom2_Option = {}
$(function () {
    l1()
    l2()
    l3()
    b1()
    b2()
    r1()
    // r2()
    function l1() {
        ec_left1 = echarts.init(document.getElementById("echarts1"))
        ec_left1.clear()
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
                show: true,
                formatter: function (params) {
                    return params.name + "<br/>" + "累计接种: "
                        + tranNumber(params.value,1) + "<br/>"
                }
            },
            legend: {
                data: ['累计接种'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#7760f6"],
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
                data: []
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value,2)
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
                name: '累计接种',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#7760f6'
                    }
                },
                data: [],
                animationDuration: 5000,
                animationEasing: 'linear'
            }],

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
                data: ['每百人接种'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#e6b600"],
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
                data: []
            }],
            yAxis: [{

                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value,2)
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
                name: '每百人接种',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#e6b600'
                    }
                },
                data: [],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }],
            animateDuration: 3000,
            animateEasing: 'linear'
        }
        ec_left2.setOption(ec_left2_Option)
        window.addEventListener("resize",function(){
            ec_left2.resize();
        });
    }
    function l3() {
        ec_left3 = echarts.init(document.getElementById("echarts3"))
        ec_left3.clear()
        word = [{name:'肺炎',value:'123243',textStyle: {}},{name:'疫情',value:'1393754',textStyle: {}}]
        var maskImage = new Image()
        maskImage.src = "data:image/png;base64,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"
        // maskImage.src = '../static/images/chinamap.png'
        ec_left3.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_left3_Option = {
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
                width: '100%',
                height: '90%',
                shape: 'circle',
                rotationRange: [-45, 0, 45, 90],
                textStyle: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255),
                            Math.round(Math.random() * 255)
                        ].join(',') + ')';
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
        ec_left3.setOption(ec_left3_Option)
        window.addEventListener("resize",function(){
            ec_left3.resize();
        });
    }
    function b1() {
        ec_bottom1 = echarts.init(document.getElementById("echarts10"))
        ec_bottom1.clear()
        ec_bottom1.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_bottom1_Option = {
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
                },
                lineStyle: {
                    type: 'solid',

                }
            },
            legend: {
                type: 'scroll',
                icon: 'rect',
                data: [],
                top: '0%',
                left: '4%',
                right: '4%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                },
                pageTextStyle: {
                    color: '#b0c2f9'
                },
            },
            //图形位置
            grid: {
                top: '5%',
                left: '1%',
                right: '10%',
                bottom: '15%',
                top: 50,
                containLabel: true
            },
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
                data: []
            }],
            dataZoom: [{
                type: "inside",
                show: true,
                start: 30,
                end: 100
            },{
                type: 'slider',
                height: 14,
                start: 30,
                end: 100,
                borderColor: 'transparent',
                handleColor: '#02a6b5',
                handleSize: 20,
                handleStyle: {
                    borderColor: '#02a6b5',
                },
                selectedDataBackground: {
                    lineStyle: {
                        color: '#02a6b5',
                    },
                    areaStyle: {
                        color: '#02a6b5',
                    }

                },
                textStyle: {
                    color: '#b0c2f9',
                }
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value,2)
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
                    show: false,
                }

            }],
            series: []
        }
        ec_bottom1.setOption(ec_bottom1_Option)
        window.addEventListener("resize",function(){
            ec_bottom1.resize();
        });
    }
    function b2() {
        ec_bottom2 = echarts.init(document.getElementById("echarts11"))
        ec_bottom2.clear()
        ec_bottom2.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_bottom2_Option = {
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
                },
                lineStyle: {
                    type: 'solid',

                }
            },
            legend: {
                type: 'scroll',
                icon: 'rect',
                data: [],
                top: '0%',
                left: '4%',
                right: '4%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                },
                pageTextStyle: {
                    color: '#b0c2f9'
                },
            },
            //图形位置
            grid: {
                top: '5%',
                left: '1%',
                right: '10%',
                bottom: '15%',
                top: 50,
                containLabel: true
            },
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
                data: []
            }],
            dataZoom: [{
                type: "inside",
                show: true,
                start: 30,
                end: 100
            },{
                type: 'slider',
                height: 14,
                start: 30,
                end: 100,
                borderColor: 'transparent',
                handleColor: '#02a6b5',
                handleSize: 20,
                handleStyle: {
                    borderColor: '#02a6b5',
                },
                selectedDataBackground: {
                    lineStyle: {
                        color: '#02a6b5',
                    },
                    areaStyle: {
                        color: '#02a6b5',
                    }

                },
                textStyle: {
                    color: '#b0c2f9',
                }
            }],
            yAxis: [{
                type: 'value',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                    formatter: function (value) {
                        return tranNumber(value,2)
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
                    show: false,
                }

            }],
            series: []
        }
        ec_bottom2.setOption(ec_bottom2_Option)
        window.addEventListener("resize",function(){
            ec_bottom2.resize();
        });
    }
    function r1() {
        ec_right1 = echarts.init(document.getElementById("echarts5"))
        ec_right1.clear()
        ec_right1.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });
        ec_right1_Option = {
            color: ["#01bffa","#2a99fa"],
            grid: {
                left: 0,
                right: '8%',
                bottom: '2%',
                top: '4%',
                containLabel: true
            },
            dataset: {
                source: []
            },
            graphic: {
                elements: [{
                    type: 'text',
                    right: 20,
                    bottom: 60,
                    style: {
                        text: '12-02',
                        font: 'bolder 50px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }]
            },
            xAxis: [{
                type: 'value',
                max: 'dataMax',
                label: {
                    formatter: function (n) {
                        return Math.round(n);
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3c76'
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: '#b0c2f9',
                    fontSize: 12
                },
            }],
            yAxis: [{
                type: 'category',
                //y轴字体设置
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9',
                },
                axisTick: {
                    show: false,
                },
                //y轴设置显示
                axisLine: { show: false,},
                //与x轴平行的线样式
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "transparent",
                        width: 1,
                        type: "solid",
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                inverse:true,
                animationDuration: 300,
                animationDurationUpdate: 300
            }],
            series: [{
                type: 'bar',
                realtimeSort: true,
                seriesLayoutBy: 'column',
                barWidth: 15,
                label: {
                    show: true,
                    precision: 2,      //文本标签中数值的小数点精度
                    position: "right",
                    valueAnimation: true,
                    fontFamily: 'monospace',
                    color: "#188df0"
                },
                encode: {
                    x: 0,
                    y: 1
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#fff6d1'},
                                {offset: 0.5, color: '#edcb46'},
                                {offset: 1, color: '#bda533'}
                            ]
                        )
                    },
                    label: {
                        color: "#edcb46"
                    }
                }
            }],
            animationDuration: 0,
            animationDurationUpdate: 2000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
        }
        ec_right1.setOption(ec_right1_Option)
        window.addEventListener("resize",function(){
            ec_right1.resize();
        });
    }
    function createdRandomItemStyle() {
        return {
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            }
        }
    }


})

