
$(function () {
    function get_big_screen_data() {
        $.ajax({
            url:"/vaccine_screen_data",
            success: function (data) {
                console.log(data)
                $(".s1").eq(0).html(tranNumber(data.glo_vac))
                $(".s1").eq(0).html(tranNumber(data.glo_vac));
                $(".s1").eq(1).html(tranNumber(data.glo_vac_add));
                $(".s1").eq(2).html(tranNumber(data.glo_per_hundred));
                $(".s1").eq(3).html(tranNumber(data.glo_per_hundred_add));
                $(".s1").eq(4).html(tranNumber(data.china_vac));
                $(".s1").eq(5).html(tranNumber(data.china_vac_add));
                $(".s1").eq(7).html(tranNumber(data.china_per_hundred_add));
                $(".s1").eq(6).html(data.china_per_hundred+'<em>剂</em>');
            },
            error: function (xhr, type, errorThrown) {
                console.log(xhr)
            }
        })

    }
    function get_worldMap_vaccine_data() {
        worldMap.showLoading();
        $.ajax({
            url:"/world_map_vaccine_data",
            success: function (d) {
                worldMap.hideLoading();
                worldMap.setOption({series: {data: d.datalist}})
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vl1_data() {
        $.ajax({
            url:"/vl1_data",
            success: function (d) {
                // console.log(d)
                ec_left1_Option.xAxis[0].data = d.day
                ec_left1_Option.series[0].data = d.total_v
                ec_left1.hideLoading()
                ec_left1.setOption(ec_left1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vl2_data() {
        $.ajax({
            url:"/vl2_data",
            success: function (d) {
                // console.log(d)
                ec_left2_Option.xAxis[0].data = d.day
                ec_left2_Option.series[0].data = d.per_v
                ec_left2.hideLoading()
                ec_left2.setOption(ec_left2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vl3_data() {
        $.ajax({
            url: '/vl3_data',
            success: function (d) {
                ec_left3_Option.series[0].data = d.words
                ec_left3.hideLoading()
                ec_left3.setOption(ec_left3_Option);
                // console.log(ec_left3_Option);
            }
        })
    }
    function get_vb1_data() {
        $.ajax({
            url: "/vb1_data",
            success: function (d) {
                country = d.country
                ec_bottom1_Option.xAxis[0].data = d.day
                var legend={data:country};
                var selected = {}; //是一个对象
                for (let i=0; i<country.length; i++) {
                    coun = country[i]
                    if (coun == 'United States' || coun == 'Hungary' || coun == 'Bahrain' || coun == 'Africa'|| coun == 'China'|| coun == 'Qatar'
                        || coun == 'Europe' || coun == 'United Arab Emirates' || coun == 'United Kingdom' || coun == 'Hong Kong' || coun == 'Morocco' || coun == 'Russia'
                         || coun == 'Chile' || coun == 'Thailand' || coun == 'Israel') {
                        selected[coun] = true;
                    }else {
                        selected[coun] = false;
                    }
                } 
                ec_bottom1_Option.legend = legend
                ec_bottom1_Option.legend.selected = selected;
                series = function() {
                    var serie = []
                    var len = d.per_v.length
                    for (let i=0; i<len; i++) {
                        var item = {
                            name: d.country[i],
                            type: 'line',
                            smooth: true,
                            showSymbol: false,//是否默认展示圆点
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 8,   //设定实心点的大小
                            endLabel: {
                                show: true,
                                formatter: '{a}:{c}',
                                color: '#b0c2f9',
                                borderColor: 'transparent'

                            },
                            emphasis: {
                                focus: 'series',
                                blurScope: 'coordinateSystem'
                            },
                            color: "#"+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,"0"),
                            data: d.per_v[i],
                            animationDuration: 10000,
                            animationEasing: 'linear'
                        }
                        serie.push(item)
                    }
                    return serie
                }()
                ec_bottom1_Option.series = series
                ec_bottom1.hideLoading();
                ec_bottom1.setOption(ec_bottom1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vb2_data() {
        $.ajax({
            url: "/vb2_data",
            success: function (d) {
                country = d.country
                ec_bottom2_Option.xAxis[0].data = d.day
                var legend={data:country};
                var selected = {}; //是一个对象

                for (let i=0; i<country.length; i++) {
                    coun = country[i]
                    if (coun == 'United States' || coun == 'France' || coun == 'Chile' || coun == 'United Kingdom'|| coun == 'China'|| coun == 'India'
                        || coun == 'Italy' || coun == 'Germany' || coun == 'Turkey' || coun == 'Brazil' || coun == 'Turkey' || coun == 'Russia'
                         || coun == 'Germany' || coun == 'Indonesia') {
                        selected[coun] = true;
                    }else {
                        selected[coun] = false;
                    }
                }
                ec_bottom2_Option.legend = legend
                ec_bottom2_Option.legend.selected = selected;
                series = function() {
                    var serie = []
                    var len = d.total_v.length
                    for (let i=0; i<len; i++) {
                        var item = {
                            name: d.country[i],
                            type: 'line',
                            smooth: true,
                            showSymbol: false,//是否默认展示圆点
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 8,   //设定实心点的大小
                            endLabel: {
                                show: true,
                                formatter: '{a}:{c}',
                                color: '#b0c2f9',
                                borderColor: 'transparent'

                            },
                            emphasis: {
                                focus: 'series',
                                blurScope: 'coordinateSystem'
                            },
                            color: "#"+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,"0"),
                            data: d.total_v[i],
                            animationDuration: 10000,
                            animationEasing: 'linear'
                        }
                        serie.push(item)
                    }
                    return serie
                }()
                ec_bottom2_Option.series = series
                ec_bottom2.hideLoading();
                ec_bottom2.setOption(ec_bottom2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vr1_data() {
        $.ajax({
            url: "/vr1_data",
            success: function (d) {
                data = d.data
                // console.log(data)
                var days = d.days
                days.reverse()
                startIndex = 10
                for (let i = startIndex; i < days.length; ++i) {
                    (function (i) {
                        setTimeout(function () {
                            updateDay(days[i]);
                        }, (i-startIndex) * 2000);
                    })(i);
                }
                function updateDay(day) {
                    var source = data.filter(function (d) {
                        return d[2] === day;
                    });
                    // console.log(day);
                    // console.log(source);
                    ec_right1_Option.series[0].data = source;
                    ec_right1_Option.dataset['source'] = source
                    ec_right1_Option.graphic.elements[0].style.text = day;
                    ec_right1.setOption(ec_right1_Option);
                }
                ec_right1.hideLoading()
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_vr2_data() {
        $.ajax({
            url: "/vr2_data",
            success: function (d) {
               for (var i=0; i<d.country.length; i++) {
                    var html ="<tr><td>"+ d.country[i] +"</td><td>"+ tranNumber(d.fully_vaccinated[i],1) +"</td><td>"+
                        d.fully_per[i] +"%</td><td>"+ tranNumber(d.one_vaccinated[i],1) +"</td><td>"+ d.one_per[i] +"%</td><td>"+ d.day[i] +"</td></tr>"
                    $(".list-table>tbody").append(html)
                }
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }

    setTimeout(get_big_screen_data(), 1000 * 10);
    setTimeout(get_worldMap_vaccine_data(), 1000*10)
    setTimeout(get_vl1_data(), 1000*10)
    setTimeout(get_vl2_data(), 1000*10)
    setTimeout(get_vl3_data(), 1000*10)
    setTimeout(get_vb1_data(), 1000*10)
    setTimeout(get_vb2_data(), 1000*10)
    setTimeout(get_vr1_data(), 1000*10)
    setTimeout(get_vr2_data(), 1000*10)
    // setTimeout(get_hotnews_data(), 1000*10)

})


