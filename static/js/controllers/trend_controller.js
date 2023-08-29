var chart = ''
var option = {}


$('.searchBut').bind('keypress', function (event) {
   if (event.keyCode == "13") {
       console.log('ok');
       $(".searchBut").trigger("click");
   }
})
$(".searchBut").click(function () {
    searchName = $(".searchIn").val()
    area = $(this).attr('name')
    console.log(searchName)
    console.log(area)
    $.ajax({
        url: '/loadCity/' + area + "/" + searchName,
        method: 'get',
        beforeSend: function() {
           $(".mainloading").fadeIn()
        },
        success: function (d) {
            datalist = d.data
            // console.log(d.data);
            $(".trend-box").html('')
            if (datalist.length == 0) {
                $(".trend-box").append("<span class='info'>暂无此数据</span>")
            }
            j = 0
            for(let i of datalist){
                let li_str = "<li><div class=\"boxall\"><div class=\"alltitle\">"+i['city']+"</div>" +
                        "<div class=\"allnav\" id=\""+j+"\"></div></div></li>"
                $(".trend-box").append(li_str)
                initProvinceCharts(j, i.data);
                j +=1
            }
            $(".mainloading").fadeOut()
        }, error: function (err) {
            console.log(err);
        }
    })
})
function loadLi(area) {
    $.ajax({
        url: '/trend_data/'+area,
        method: 'get',
        beforeSend: function() {
           $(".mainloading").fadeIn()
        },
        success: function (d) {
           datalist = d.data
            $(".trend-box").html('')
            for(let i of datalist) {
                let li_str = "<li><div class=\"boxall\"><div class=\"alltitle\">"+i.name+"</div>" +
                    "<div class=\"allnav\" id=\""+i.code+"\"></div></div></li>"
                $(".trend-box").append(li_str)
                initProvinceCharts(i.code,i.data);
           }
           $(".mainloading").fadeOut()
        }, error: function (err) {
            console.log(err);
        }
    })
}

function initProvinceCharts(id,data) {
    chart = echarts.init(document.getElementById(id))
    chart.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    option = {
        title: {
            subtext:  "人数",
            subtextStyle: {
                color: '#b0c2f9'
            },
            top: 40
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
            data: ['确诊','疑似', '治愈','死亡','新增确诊','新增疑似','新增治愈','新增死亡'],
            top: '0%',
            textStyle: {
                color: '#b0c2f9',
                fontSize:'12',
            }
        },
        color: ["#c12e34","#0098d9","#7171c6","#e6b600","#c12e34","#0098d9","#7171c6","#e6b600"],
        //图形位置
        grid: {
            left: '4%',
            right: '6%',
            bottom: '4%',
            top: 80,
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
            data: []
        }],
        yAxis: [{
            type: 'value',
            //y轴字体设置
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#b0c2f9',
                 formatter: '{value}'
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
            name: '确诊',
            type: 'line',
            smooth: true,
            data: [],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
        },{
            name: '疑似',
            type: 'line',
            smooth: true,
            data: []
        },{
            name: '治愈',
            type: 'line',
            smooth: true,
            data: [],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
        },{
            name: '死亡',
            type: 'line',
            smooth: true,
            data: [],
        },{
            name: '新增确诊',
            type: 'bar',
            data: []
        },{
            name: '新增疑似',
            type: 'bar',
            data: []
        },{
            name: '新增治愈',
            type: 'bar',
            data: []
        },{
            name: '新增死亡',
            type: 'bar',
            data: []
        }],
        animation: 'auto',
        animationDurationUpdate: 500,
        animationDuration: 1000,
    }
    option.xAxis[0].data = data['day']
    option.series[0].data = data['confirm']
    option.series[1].data = data['suspect']
    option.series[2].data = data['heal']
    option.series[3].data = data['dead']
    option.series[4].data = data['confirm_add']
    option.series[5].data = data['suspect_add']
    option.series[6].data = data['heal_add']
    option.series[7].data = data['dead_add']
    chart.setOption(option)
    chart.hideLoading()
    window.addEventListener("resize",function(){
        chart.resize();
    });
}


