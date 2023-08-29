/**
   加载地图：根据地图所在省市的行政编号，
   获取对应的json地图数据，然后向echarts注册该区域的地图
   最后加载地图信息
   @params {String} mapCode:地图行政编号,for example['中国':'100000', '湖南': '430000']
   @params {String} mapName: 地图名称
*/

//存储切换的每一级地图信息


$(function () {
    var COLORS = ["#002097","#1b3770", "#254b97", "#1e71b5", "#21b1e5", "#42cbda", "#42cdd3", "#85ffee"];
    var myChart = echarts.init(document.getElementById('map_1'));
    //初始化加载中国地图
    get_map_data()
    function get_map_data() {
        $.ajax({
            url:"/america_map_data",
            success: function (d) {
                data = d.datalist
                loadMap(d.datalist)
                // myChart.setOption({series: {data: d.datalist}})
                // myChart.hideLoading()
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function loadMap(data) {

        myChart.showLoading({
            text: '加载中...',
            effect: 'whirling'
        });

        // var data = [{name: "纽约", confirm: 1099, heal: 1213, dead: 23245}]
        $.get('./static/json/USA.json',function (usaJson) {
            echarts.registerMap('USA', usaJson, {
                // 把阿拉斯加移到美国主大陆左下方
                Alaska: {
                    left: -120,
                    top: 25,
                    width: 15
                },
                // 夏威夷
                Hawaii: {
                    left: -110,
                    top: 28,
                    width: 5
                },
                // 波多黎各（因为名字有空格，所以写为字符串的形式）
                'Puerto Rico': {
                    left: -76,
                    top: 26,
                    width: 2
                }
            })
            var map_option = {
                title: {
                    left: 'center'
                },
                visualMap: {
                    show: true,
                    left: '25%',
                    textStyle: {
                        fontSize: 8,
                        color: "#fff"
                    },
                    pieces: [{value: 0, color: "#fff"},
                        {min: 1, max: 999, color:COLORS[6]},
                        {min: 1000, max: 9999, color:COLORS[5]},
                        {min: 10000, max: 99999, color:COLORS[4]},
                        {min: 100000, max: 999999, color:COLORS[3]},
                        {min: 1000000, max: 9999999, color:COLORS[2]},
                        {min: 10000000, color:COLORS[1]}
                    ],
                    inRange: {
                        color:COLORS //取值范围的颜色
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                tooltip: {
                    show: true,
                    formatter: function (params) {
                        if(!isNaN(params.value)) {
                            return params.name + "<br/>"
                                + "确诊人数:" + params.value + "<br/>" + "死亡人数:"
                                + params['data'].dead + "<br/>" + "治愈人数:"
                                + params['data'].heal + "<br/>" + "<br/>"
                        } else {
                                return "暂无数据"
                        }
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'horizontal',
                    right: '28%',
                    top: 'top',
                    color: "rgba(255,255,255,.7)",
                    feature: {
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                series: [{
                    name: 'USA PopEstimates',
                    type: 'map',
                    roam: true,
                    map: 'USA',
                    nameMap: {
                        "Alabama": "阿拉巴马州",
                        "Alaska": "阿拉斯加州",
                        "AmericanSamoa": "美属萨摩亚群岛",
                        "Arizona": "亚利桑那",
                        "Arkansas": "阿肯色州",
                        "California": "加利福尼亚",
                        "Colorado":	"科罗拉多",
                        "Connecticut":	"康涅狄格",
                        "Delaware":	"特拉华州",
                        "District Of Columbia":	"华盛顿特区",
                        "Florida":	"佛罗里达",
                        "Georgia":"乔治亚",
                        "Guam":	"关岛",
                        "Hawaii": "夏威夷",
                        "Idaho": "爱达荷州",
                        "Illinois":	"伊利诺伊",
                        "Indiana":	"印第安纳",
                        "Iowa":	"爱荷华州",
                        "Kansas": "堪萨斯州",
                        "Kentucky":	"肯塔基",
                        "Louisiana": "路易斯安那州",
                        "Maine": "缅因州",
                        "Maryland":	"马里兰",
                        "Massachusetts": "马萨诸塞",
                        "Michigan":	"密歇根州",
                        "Minnesota": "明尼苏达",
                        "Mississippi":	"密西西比州",
                        "Missouri":	"密苏里州",
                        "Montana":	"蒙大拿",
                        "Navajo Nation": "纳瓦霍族保留地",
                        "Nebraska":	"内布拉斯加",
                        "Nevada": "内华达",
                        "New Hampshire": "新罕布什尔",
                        "New Jersey": "新泽西",
                        "New Mexico": "新墨西哥州",
                        "New York":	"纽约",
                        "North Carolina":	"北卡罗来纳",
                        "North Dakota":	"北达科他州",
                        "Northern Mariana Islands":	"北马里亚纳群岛",
                        "Ohio":	"俄亥俄州",
                        "Oklahoma":	"俄克拉荷马",
                        "Oregon": "俄勒冈",
                        "Pennsylvania":	"宾夕法尼亚",
                        "Puerto Rico":	"波多黎各",
                        "Rhode Island":	"罗德岛",
                        "South Carolina": "南卡罗来纳州",
                        "South Dakota":	"南达科塔州",
                        "Tennessee": "田纳西",
                        "Texas": "德克萨斯",
                        "United States Virgin Islands":	"美属维尔京群岛",
                        "Utah":	"犹他",
                        "Vermont":	"佛蒙特",
                        "Virginia":	"弗吉尼亚",
                        "Washington": "华盛顿州",
                        "West Virginia": "西弗吉尼亚",
                        "Wisconsin": "威斯康星",
                        "Wyoming":	"怀俄明州"
                    },
                    zoom: .8,
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    data: data
                }]
            }
            myChart.setOption(map_option);
            myChart.hideLoading()
        });
    }
    // myChart.on("click",function (params) {
    //     console.log(params);
    //     $.ajax({
    //        type: "POST",
    //        url:"/state_trend",//请求页面
    //        data: {data:row.id},
    //        dataType: "json",
    //        complete:function(){
    //           location.href ="/admin/sysjgl/sysjck/index"
    //      }//跳转页面
    // });
    // })
})


