/**
   加载地图：根据地图所在省市的行政编号，
   获取对应的json地图数据，然后向echarts注册该区域的地图
   最后加载地图信息
   @params {String} mapCode:地图行政编号,for example['中国':'100000', '湖南': '430000']
   @params {String} mapName: 地图名称
*/
var COLORS = ["#002097","#1b3770", "#254b97", "#1e71b5", "#21b1e5", "#42cbda", "#42cdd3", "#85ffee"];
var worldMap = echarts.init(document.getElementById('map_1'));
worldMap.showLoading({
    text: '加载中...',
    effect: 'whirling'
});
var data = [{name: "Canada", total_v: 1099, per_v: 0.3}]

$(function () {
    //初始化加载中国地图
    loadWorld()
    function loadWorld() {
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
                        {min: 1, max: 999, color:COLORS[1]},
                        {min: 1000, max: 9999, color:COLORS[2]},
                        {min: 10000, max: 99999, color:COLORS[3]},
                        {min: 100000, max: 999999, color:COLORS[4]},
                        {min: 1000000, max: 9999999, color:COLORS[5]},
                        {min: 10000000, color:COLORS[6]}
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
                            return params.name + "<br/>" + "累计接种: "
                                + tranNumber(params.value,1) + "<br/>" + "每百人接种: "
                                + params['data'].per_v + "剂<br/>"
                        }else {
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
                    type: "map",
                    coordinateSystem: "geo",
                    mapType: 'world',
                    zoom: .8,
                    roam: false,
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    data: data
                }]
            }
            worldMap.setOption(map_option);
    }

})


