/**
   加载地图：根据地图所在省市的行政编号，
   获取对应的json地图数据，然后向echarts注册该区域的地图
   最后加载地图信息
   @params {String} mapCode:地图行政编号,for example['中国':'100000', '湖南': '430000']
   @params {String} mapName: 地图名称
*/
var COLORS = ["#002097","#1b3770", "#254b97", "#1e71b5", "#21b1e5", "#42cbda", "#42cdd3", "#85ffee"];
var myChart = echarts.init(document.getElementById('map_1'));
myChart._dom.oncontextmenu = function(){
    return false;
}
//存储切换的每一级地图信息
var mapStack = [];
var curMap = {};
$(function () {
    //初始化加载中国地图
    loadChina()
    function loadChina() {
        $.ajax({
            url:"/china_map_data",
            success: function (d) {
                // console.log(d.datalist)
                loadMap('100000', 'china', d.datalist);
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }

    //初始化地图
    function loadMap(mapCode, mapName, d) {
        // console.log(d)
        $('#contextMenu').show();
        $.getJSON('../static/js/city-map/' + mapCode + '.json', function (data) {
             if (data) {
                 //向echarts插件注册地图
                 echarts.registerMap(mapName, data);
                 var option = {
                    tooltip: {
                        show: true,
                        formatter: function (params) {
                            if(!isNaN(params.value)) {
                                return params.name + "<br/>" + "确诊人数:"
                                + params.value + "<br/>" + "死亡人数:"
                                + params['data'].dead + "<br/>" + "治愈人数:"
                                + params['data'].heal + "<br/>" + "疑似患者人数:"
                                + params['data'].suspect + "<br/>"
                            } else {
                                return "该市区暂无数据"
                            }
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'horizontal',
                        right: '28%',
                        top: 'top',
                        feature: {
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                     visualMap: {
                        show: true,
                        left: '25%',
                         bottom: '10%',
                        textStyle: {
                            fontSize: 8,
                            color: "#fff"
                        },
                        pieces: [
                            {min: 0, max: 100, color:COLORS[6]},
                            {min: 100, max: 500, color:COLORS[5]},
                            {min: 500, max: 1000, color:COLORS[4]},
                            {min: 1000, max: 5000, color:COLORS[3]},
                            {min: 5000, max: 10000, color:COLORS[2]},
                            {min: 10000, color:COLORS[1]}
                        ],
                        inRange: {
                            color:COLORS //取值范围的颜色
                        }
                    },
                    series: [
                        {
                            type: 'map',
                            mapType: mapName,
                            selectedMode : 'multiple',
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    fontSize: 8,
                                    color: '#2980ff',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: d
                        }
                    ]
                 };
                 myChart.setOption(option);
                 curMap = {
                    mapCode: mapCode,
                    mapName: mapName
                 };
             } else {
                 alert('无法加载该地图');
             }
        });
    }
    /**
       绑定用户切换地图区域事件
       cityMap对象存储着地图区域名称和区域的信息(name-code)
       当mapCode有值说明可以切换到下级地图
       此时保存上级地图的编号和名称
    */
    myChart.on('mapselectchanged', function(params) {
        var name = params.batch[0].name;
        var data =  {"city": name}
        var mapCode = cityMap[name];
        console.log(name)
        if (!mapCode) {
            alert('无此区域地图显示');
            return;
        }
        $.ajax({
            url:"/province_data",
            type: "POST",
            timeout:10000,    //超时时间设置为10秒
            dataType: "json",
            data: data,  //传字符串
            success: function (data) {
                // console.log(data.datalist)
                //显示对应的省份
                loadMap(mapCode, name, data.datalist);

                //将上一级地图信息压入mapStack
                mapStack.push({
                    mapCode: curMap.mapCode,
                    mapName: curMap.mapName
                });
            },
            error: function (xhr, type, errorThrown) {}
        })

    });
    /**
       绑定右键事件
    */
    myChart.on('contextmenu', function(params) {
       $('#contextMenu').show();
    });
    /**
       响应图表的右键事件，返回上一级地图
    */
    $('#contextMenu').on('click', function () {
        //获取上一级地图信息
        var map = mapStack.pop();
        if (!mapStack.length && !map) {
            alert('已经到达最上一级地图了');
            return;
        }
        var data =  {"city": map.mapName}
        console.log(data);
        $.ajax({
            url:"/province_data",
            type: "POST",
            timeout:10000,    //超时时间设置为10秒
            dataType: "json",
            data: data,  //传字符串
            success: function (data) {
                // console.log("city="+map.mapName)
                // console.log("data"+data.datalist)
                //显示对应的省份
                loadMap(map.mapCode, map.mapName, data.datalist);
            },
            error: function (xhr, type, errorThrown) {}
        })

    });



})


