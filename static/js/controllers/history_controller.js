var ec_left1 = ""
var ec_left2 = ""
var ec_left1_Option = {}
var ec_left2_Option = {}
$(function () {

    setTimeout(l1(), 1000*10)
    setTimeout(l2(), 1000*10)
    function l2() {
        $.ajax({
            url: '/read_json/world-series.json',
            type: 'get',
            success: function (res) {
                if (res.success === true) {
                    var chartData = res.results;
                    var date = [];
                    var name = [];
                    var value = [];
                    var dataa = []
                    var seriesdata = [];
                    // .获取所有日期
                    for (var i in chartData) {
                        //获取历史日期
                        var datetime = chartData[i].time;
                        date.push(datetime);

                    }
                    //2. dataaa 是全部的数据，一个天的所有国家的数据为一个[],格式是[[],[],[]]
                    for (var j in date) {
                        var shuju = chartData[j].data;
                        //数据list[]
                        dataa.push(shuju);
                    }
                    //3. dataa[1]是2020年1月23日的数据，这里是获取国家名
                    for (var j in dataa[1]) {
                        var coun = dataa[1][j].Country;
                        name.push(coun);
                    }

                    //4. 开始遍历数据
                    for (var i in dataa) {
                        // zhongjian变量是某一天的所有国家的数据
                        var zhongjian = dataa[i];

                        for (var j in zhongjian) {
                            var shu = zhongjian[j].Confirmed;
                            value.push(shu);
                        }
                        // 确诊数据,二维列表，一行为某一天数据，某一行某一列为某一国家的某一天的确诊数据
                        seriesdata[i] = value;
                        // 清空列表
                        value = [];
                    }
                    initDetailChart(date, seriesdata, name, 'worldMap','world');
                    return;
                }
                alert("获取数据失败");
                }, error: function (res) {
                    console.log(res);
            }
            });
    }
    function l1() {
        $.ajax({
            // url: '/read_json/china-province-series.json',
            url: '/hl1_data',
            // type: 'get',
            success: function (d) {
                    initDetailChart(d.day, d.seriesdata, d.provinces, 'chinaMap','china');
                }, error: function (res) {
                    alert("获取数据失败");
                    console.log(res);
                }
            });
    }
    function initDetailChart (date, data, name, elem, map) {
            chart = echarts.init(document.getElementById(elem))
            chart.showLoading({
                text: '加载中...',
                effect: 'whirling'
            });
            var days = date;
            //var province = ['湖北', '广东', '浙江', '湖南', '河南', '安徽', '重庆', '山东', '江西', '四川', '江苏', '北京', '福建', '上海', '广西', '河北', '陕西', '云南', '海南', '黑龙江', '辽宁', '山西', '天津', '甘肃', '内蒙古', '新疆', '宁夏', '吉林', '贵州', '青海', '西藏', '澳门', '香港', '台湾'];
            //国家名
            var province = name;
            var data = data;
            var sum = [];
            for (var i = 0; i < data.length; i++) {
                var leiji = 0;
                for (var j = 0; j < data[i].length; j++) {
                    leiji = leiji + (data[i][j]-'0');

                }
                sum[i] = leiji;
            }
            option = {
                baseOption: {
                    timeline: {
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 1000,
                        symbolSize: 12,
                        left: '5%',
                        right: '5%',
                        bottom: '0%',
                        width: '90%',
                        data: days,
                        tooltip: {
                            formatter: days
                        },
                    },
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            return params.name + '：' + params.data['value']
                        },
                    },
                    visualMap: {
                        type: 'piecewise',
                        pieces: [{
                            min: 500001,
                            color: '#73240D'
                        },
                        {
                            min: 100001,
                            max: 500000,
                            color: '#BB0000'
                        },
                        {
                            min: 10001,
                            max: 100000,
                            color: '#BD430A'
                        },
                        {
                            min: 1001,
                            max: 10000,
                            color: '#E08150'
                        },
                        {
                            min: 101,
                            max: 1000,
                            color: '#E9B090'
                        },
                        {
                            min: 1,
                            max: 100,
                            color: '#F2DDD2'
                        },
                        {
                            value: 0,
                            color: 'white'
                        }
                        ],
                        orient: 'vertical',
                        itemWidth: 25,
                        itemHeight: 15,
                        showLabel: true,
                        seriesIndex: [0],
                        text: ["高", "低"],
                        textStyle: {
                            color: '#7B93A7'
                        },
                        bottom: '10%',
                        right: "3%",
                    },
                    grid: [{
                        left: '10%',
                        top: '10%',
                        bottom: '8%',
                        width: '50%'
                    },
                    {
                        right: '5%',
                        top: '12%',
                        bottom: '75%',//应该去了
                        width: '0%'
                    }],
                    xAxis: [{
                        type: 'value',//相对定位
                        splitNumber: 8,
                        show: false
                    }, {
                        gridIndex: 1
                    }], //折线图x轴数据赋值，指定坐标信息,
                    yAxis: [{
                        inverse: true,
                        offset: '2',
                        type: 'category',
                        data: '',
                        nameTextStyle: {
                            color: '#b0c2f9'
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            //rotate:45,
                            textStyle: {
                                fontSize: 14,
                                color: '#b0c2f9',
                            },
                            interval: 0
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#b0c2f9'
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#b0c2f9'
                            }
                        },
                    },
                    {
                        inverse: false,
                        offset: '2',
                        type: 'category',
                        nameTextStyle: {
                            color: '#000'
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            //rotate:45,
                            show: false,
                            textStyle: {
                                fontSize: 14,
                                color: '#000000',
                            },
                            interval: 'auto'
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            },
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        gridIndex: 1
                    }],
                    geo: {
                        map: map,
                        roam: true,
                        scaleLimit: {
                            min: 0.5,
                            max: 3
                        },
                        zoom: 1,
                        top: 150,
                        left: 120,
                        label: {
                            normal: {
                                show: !1,
                                fontSize: "5",
                                color: "rgba(0,0,0,0.7)"
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0, 0, 0, 0.2)"
                            },
                            emphasis: {
                                areaColor: "#f2d5ad",
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                borderWidth: 0
                            }
                        }
                    },
                    series: [ {
                            name: 'mapSer',
                            type: 'map',
                            map: map,
                            roam: true,
                            geoIndex: 0,
                            label: {
                                show: false,
                            },
                        },
                        {
                            name: '',
                            type: 'bar',
                            zlevel: 2,
                            barWidth: '50%',
                            label: {
                                normal: {
                                    show: true,
                                    color: '#b0c2f9',
                                    fontSize: 14,
                                    position: 'right',
                                    formatter: '{c}'
                                }
                            },
                        }
                    ],},
                    animationDurationUpdate: 3000,
                    animationEasingUpdate: 'quinticInOut',
                    options: []
                };
            for (var n = 0; n < days.length; n++) {

                var res = [];
                for (j = 0; j < data[n].length; j++) {
                    res.push({
                        name: province[j],
                        value: data[n][j]
                    });
                }
                res.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6);

                res.sort(function (a, b) {
                    return a.value - b.value;
                });


                var res1 = [];
                var res2 = [];
                //左侧显示多少条数据
                for (t = 0; t < 30; t++) {
                    res1[t] = res[res.length - 1 - t].name;
                    res2[t] = res[res.length - 1 - t].value;
                }

                if (map == 'world')
                    str = '日全球COVID-19确诊人数：'
                else
                    str = '日全国COVID-19确诊人数：'

                option.options.push({
                    title: [{
                        text: days[n] + str + sum[n] + '人',
                        textStyle: {
                            color: '#ffeb7b',
                            fontSize: 28
                        },
                        left: '15%',
                        top: 10
                    },
                    {
                        show: true,
                        text: '累计确诊前三十',
                        textStyle: {
                            color: '#ffeb7b',
                            fontSize: 16
                        },
                        left: '5%',
                        top: '7%'
                    }],
                    yAxis: {
                        data: res1,

                    },
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            return params.name + '：' + params.value
                        },
                    },
                    series: [{
                        type: 'map',
                        data: res
                    }, {
                        type: 'bar',
                        data: res2,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [{
                                        colorStops: [{
                                            offset: 1,
                                            color: '#FF0000' // 100% 处的颜色
                                        }, {
                                            offset: 0,
                                            color: '#990000' // 0% 处的颜色
                                        }]
                                    }, {
                                        colorStops: [{
                                            offset: 1,
                                            color: '#00C0FA' // 100% 处的颜色
                                        }, {
                                            offset: 0,
                                            color: '#2F95FA' // 0% 处的颜色
                                        }]
                                    }];
                                    if (params.dataIndex < 10) {
                                        return colorList[0]
                                    } else {
                                        return colorList[1]
                                    }
                                },
                            }
                        },
                    }]
                });
            }

            //去除默认的鼠标事件
            document.oncontextmenu = function () { return false; };
            //新加上鼠标右击事件

            chart.hideLoading();
            chart.setOption(option)
            window.addEventListener("resize",function(){
                chart.resize();
            });
        }
});

