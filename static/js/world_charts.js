var ec_left1 = ""
var ec_right1 = ""
var ec_right2 = ""
var ec_right3 = ""
var ec_left1_Option = {}
var ec_right1_Option = {}
var ec_right2_Option = {}
var ec_right3_Option = {}
$(function () {
    l1()
    r3()
    r1()
    r2()
    function  getDateList(count, long) {
        var time = new Date().setMinutes(0)
        time = time - 24*60*60*1000;
        var categoryData = [];
        for (var i=0; i<=count;i++) {
            categoryData.push(moment(time).format("YYYY-MM-DD"))
            time += long;
        }
        return categoryData
    }
    var date = getDateList(7, 24*60*60*1000)
    function l1() {
        ec_left1 = echarts.init(document.getElementById("echarts1"))
        ec_left1_Option = {
            title: {
                show: true,
                text: "最新更新时间：",
                textStyle: {
                    color: '#b0c2f9',
                    fontSize: 14,
                    fontWeight: 100
                }
            },
            color: ["#01bffa","#2a99fa"],
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                top: 30,
                containLabel: true
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                },
                formatter: function(datas) {
                  var res = datas[0].name + '<br/>', val;
                  for(var i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].data
                        index = parseInt(datas[i].dataIndex)+1;
                        res += "排名："+ index + "<br/>" +
                            "确诊人数：" + val + '<br/>';
                    }
                    return res;
               }
            },
            xAxis: [{
                show: false,
                boundaryGap: true
            }],
            yAxis: [{
                type: 'category',
                data: [], // ["美国","新西兰","英国","法国","土耳其","美国","新西兰","英国","法国","土耳其"],
                //y轴字体设置
                boundaryGap: ['5%', '5%'],
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#b0c2f9'
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
                inverse: true
            }],
            series: [{
                type: 'bar',
                z: 10,
                barWidth: 15,
                barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
                barCategoryGap:'50%',
                label: {
                    show: true,
                    position: "right",
                    valueAnimation: true,
                    color: "#188df0"
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
                },
                data: [] //[34235,43406,529,43433,4545,34235,43406,529,43433,4545]
            }]
        }
        ec_left1.setOption(ec_left1_Option)
        window.addEventListener("resize",function(){
            ec_left1.resize();
        });
    }
    function r3() {
        ec_right3 = echarts.init(document.getElementById("echarts7"))
        ec_right3_Option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/> 确诊人数: {c} <br/> 全球占比: {d}%'
            },
            legend: {
                type: "scroll",
                orient: "vertical",
                top: 10,
                right: 10,
                bottom: 10,
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'10',
                },
                pageTextStyle: {
                    color: "#b0c2f9"
                },
                data: [] //['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            color: ["#fc5570","#e742d6","#7760f6","#0098d9","#31c5fc","#8afaff","#00d887","#fb9545","#a5ed5f","#e6b600","#e342d1"],
            //图形位置
            grid: {
                left: '2%',
                right: '0',
                bottom: '4%',
                top: 50,
                containLabel: true
            },
            series: [{
                type: 'pie',
                radius: [60, 100],
                center: ['35%', '50%'],
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                data: []
                //[
                //     {value: 30, name: 'rose 1'},
                //     {value: 28, name: 'rose 2'},
                //     {value: 26, name: 'rose 3'},
                //     {value: 24, name: 'rose 4'},
                //     {value: 22, name: 'rose 5'},
                //     {value: 20, name: 'rose 6'},
                //     {value: 18, name: 'rose 7'},
                //     {value: 16, name: 'rose 8'}
                // ]
        }]
        }
        ec_right3.setOption(ec_right3_Option)
        window.addEventListener("resize",function(){
            ec_right3.resize();
        });
    }
    function r1() {
        ec_right1 = echarts.init(document.getElementById("echarts5"),"shine.js")
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
                    type: "line",
                    lineStyle: {
                        color: "#7171c6"
                    }
                }
            },
            legend: {
                data: ['累计确诊', '累计治愈', '累计死亡'],
                top: '0%',
                textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            color: ["#c12e34","#0098d9","#e6b600"],
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
                data: [] //['01-20', '01-21', '01-22']
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
                name: '累计治愈',
                type: 'line',
                smooth: true,
                data: [] //[25,5,12]
            },{
                name: '累计死亡',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#e6b600'
                    }
                },
                data: [] //[5,6,7]
            }]
        }
        ec_right1.setOption(ec_right1_Option)
        window.addEventListener("resize",function(){
            ec_right1.resize();
        });
    }
    function r2() {
        ec_right2 = echarts.init(document.getElementById("echarts6"))
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
                data:['新增确诊'],
                    textStyle: {
                    color: '#b0c2f9',
                    fontSize:'12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '10',
                bottom: '10',
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
                data: [] //['01-02', '01-03', '01-04']
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
            series: [
            {
                name: '新增确诊',
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
                data: [] //[5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

            }]

    };
        ec_right2.setOption(ec_right2_Option)
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

