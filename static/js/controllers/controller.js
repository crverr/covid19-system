
$(function () {

    function get_big_screen_data() {
        $.ajax({
            url:"/big_screen_data",
            success: function (data) {
                console.log(data)
                $(".s1").eq(0).text(data.confirm);
                $(".s1").eq(1).text(data.suspect);
                $(".s1").eq(2).text(data.heal);
                $(".s1").eq(3).text(data.dead);
                $(".s1").eq(4).text(data.localconfirm);
                $(".s1").eq(5).text(data.noinfect);
                $(".s1").eq(6).text(data.importcase);
                $(".s1").eq(7).text(data.nowconfirm);
                $(".cmp>em").eq(0).text((data.confirm_add >=0) ? " +"+data.confirm_add : " -"+data.confirm_add)
                $(".cmp>em").eq(1).text((data.suspect_add >=0) ? " +"+data.suspect_add : " -"+data.suspect_add)
                $(".cmp>em").eq(2).text((data.heal_add >=0) ? " +"+data.heal_add : " -"+data.heal_add)
                $(".cmp>em").eq(3).text((data.dead_add >=0) ? " +"+data.dead_add : " -"+data.dead_add)
                $(".cmp>em").eq(4).text((data.localconfirm_add >=0) ? " +"+data.localconfirm_add : " -"+data.localconfirm_add)
                $(".cmp>em").eq(5).text((data.noinfect_add >=0) ? " +"+data.noinfect_add : " -"+data.noinfect_add)
                $(".cmp>em").eq(6).text((data.importcase_add >=0) ? " +"+data.importcase_add : " -"+data.importcase_add)
                $(".cmp>em").eq(7).text((data.nowConfirm_add >=0) ? " +"+data.nowConfirm_add : " " + data.nowConfirm_add)
            },
            error: function (xhr, type, errorThrown) {
            }
        })


}
    function get_map_data() {
        $.ajax({
            url:"/china_map_data",
            success: function (d) {
                // console.log(d.datalist)
                // map.setOption({series: {data: d.datalist}})
                myChart.setOption({series: {data: d.datalist}})
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_wordCloud_data() {
        $.ajax({
            url: '/c1_data',
            success: function (d) {
                ec_center_Option.series[0].data = d.words
                ec_center.hideLoading()
                ec_center.setOption(ec_center_Option);
                // console.log(ec_left3_Option);
            }
        })
    }
    function get_l1_data() {
        $.ajax({
            url:"/l1_data",
            success: function (d) {
                // console.log(d)
                ec_left1_Option.xAxis[0].data = d.day
                ec_left1_Option.series[0].data = d.confirm
                ec_left1_Option.series[1].data = d.suspect
                ec_left1_Option.series[2].data = d.heal
                ec_left1_Option.series[3].data = d.dead
                ec_left1.hideLoading();
                ec_left1.setOption(ec_left1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_l2_data() {
        $.ajax({
            url:"/l2_data",
            success: function (d) {
                // console.log(d)
                ec_left2_Option.xAxis[0].data = d.day
                ec_left2_Option.series[0].data = d.confirm
                ec_left2_Option.series[1].data = d.suspect
                ec_left2_Option.series[2].data = d.heal
                ec_left2_Option.series[3].data = d.dead
                ec_left2.hideLoading();
                ec_left2.setOption(ec_left2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_l3_data() {
        $.ajax({
            url:"/l3_data",
            success: function (d) {
                // console.log(d)
                ec_left3_Option.xAxis[0].data = d.day
                ec_left3_Option.series[0].data = d.dead_rate
                ec_left3_Option.series[1].data = d.heal_rate
                ec_left3_Option.series[2].data = d.dead_rate_add
                ec_left3_Option.series[3].data = d.heal_rate_add
                ec_left3.hideLoading();
                ec_left3.setOption(ec_left3_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }


    function get_r1_data() {
        $.ajax({
            url: "/r1_data",
            success: function (d) {
                // console.log(d)
                ec_right1_Option.xAxis[0].data = d.province
                ec_right1_Option.series[0].data = d.confirm
                ec_right1_Option.series[1].data = d.heal
                ec_right1_Option.series[2].data = d.dead
                ec_right1.hideLoading();
                ec_right1.setOption(ec_right1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_r2_data() {
        $.ajax({
            url: "/r2_data",
            success: function (d) {
                // console.log(d)
                ec_right2_Option.xAxis[0].data = d.day
                ec_right2_Option.series[0].data = d.noInfect
                ec_right2_Option.series[1].data = d.importedCase
                ec_right2_Option.series[2].data = d.noInfect_add
                ec_right2_Option.series[3].data = d.importedCase_add
                ec_right2.hideLoading();
                ec_right2.setOption(ec_right2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_r3_data() {
        $.ajax({
            url: "/r3_data",
            success: function (d) {
                // console.log(d)
                ec_right3_Option.xAxis[0].data = d.day
                ec_right3_Option.series[0].data = d.nowSevere
                ec_right3_Option.series[1].data = d.nowConfirm
                ec_right3.hideLoading();
                ec_right3.setOption(ec_right3_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_hotnews_data() {
        $.ajax({
            url: "/hotnews_data",
            success: function (d) {
                for (var i=0; i<d.content.length; i++) {
                    var html = "<li><div class=\"bullet pink\"></div><div class=\"date\">"+d.day[i]+" <br/>"+d.hour[i]
                        + "</div><div class=\"desc\"><h3 class=\"news_title\"><a target=\"_blank\" href=\"" +d.link[i] + "\">"
                        + d.content[i] + "</a></h3></div></li>"
                    $(".timeline-small-body>ul").append(html)
                }

            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_l4_data() {
        $.ajax({
            url: "/l4_data",
            success: function (d) {
                // console.log(d)
                for (var i=0; i<d.city.length; i++) {
                    var html ="<tr><td>"+ d.city[i] +"</td><td>"+ d.province[i] +"</td><td>"+
                        d.confirmAdd[i] +"</td><td>"+ d.nowConfirm[i] +"</td><td>"+ d.grade[i] +"</td><td>"+ d.day[i] +"</td></tr>"
                    $(".list-table>tbody").append(html)
                }
            },
            error: function (xhr, type, errorThrown) {}
        })
    }
    // setTimeout(getTime, 1000)
    setTimeout(get_big_screen_data(), 1000 * 10);
    setTimeout(get_map_data(), 1000*10)
    setTimeout(get_wordCloud_data(), 1000*10)
    setTimeout(get_l1_data(), 1000*10)
    setTimeout(get_l2_data(), 1000*10)
    setTimeout(get_l3_data(), 1000*10)
    setTimeout(get_l4_data(), 1000*10)
    setTimeout(get_r1_data(), 1000*10)
    setTimeout(get_r2_data(), 1000*10)
    setTimeout(get_r3_data(), 1000*10)
    setTimeout(get_hotnews_data(), 1000*10)

})


