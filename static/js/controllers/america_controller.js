
$(function () {

    function get_america_screen_data() {
        $.ajax({
            url:"/america_screen_data",
            success: function (data) {
                // console.log(data)
                $(".s1").eq(0).text(data.nowConfirm);
                $(".s1").eq(1).text(data.confirm);
                $(".s1").eq(2).text(data.heal);
                $(".s1").eq(3).text(data.dead);
                $(".cmp>em").eq(0).text((data.nowConfirm_add >=0) ? " +"+data.nowConfirm_add : " "+data.nowConfirm_add)
                $(".cmp>em").eq(1).text((data.confirm_add >=0) ? " +"+data.confirm_add : " "+data.confirm_add)
                $(".cmp>em").eq(2).text((data.heal_add >=0) ? " +"+data.heal_add : " "+data.heal_add)
                $(".cmp>em").eq(3).text((data.dead_add >=0) ? " +"+data.dead_add : " "+data.dead_add)
            },
            error: function (xhr, type, errorThrown) {
            }
        })


}


    function get_al1_data() {
        $.ajax({
            url:"/al1_data",
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
    function get_al2_data() {
        $.ajax({
            url:"/al2_data",
            success: function (d) {
                // console.log(d)
                ec_left2_Option.xAxis[0].data = d.day
                ec_left2_Option.series[0].data = d.confirm
                ec_left2_Option.series[1].data = d.heal
                ec_left2_Option.series[2].data = d.dead
                ec_left2.hideLoading();
                ec_left2.setOption(ec_left2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_al3_data() {
        $.ajax({
            url:"/al3_data",
            success: function (d) {
                // console.log(d)
                ec_left3_Option.xAxis[0].data = d.day
                ec_left3_Option.series[0].data = d.total
                ec_left3_Option.series[1].data = d.total_add
                ec_left3.hideLoading();
                ec_left3.setOption(ec_left3_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_al4_data() {
         $.ajax({
            url:"/al4_data",
            success: function (d) {
                // console.log(d)
                ec_left4_Option.xAxis[0].data = d.day
                ec_left4_Option.series[0].data = d.hospitalized
                ec_left4_Option.series[1].data = d.nowHospitalized
                ec_left4_Option.series[2].data = d.hospitalized_add
                ec_left4.hideLoading();
                ec_left4.setOption(ec_left4_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }

    function get_ar1_data() {
        $.ajax({
            url: "/ar1_data",
            success: function (d) {
                // console.log(d)
                ec_right1_Option.xAxis[0].data = d.day
                ec_right1_Option.series[0].data = d.confirm
                ec_right1_Option.series[1].data = d.negative
                ec_right1.hideLoading();
                ec_right1.setOption(ec_right1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_ar2_data() {
        $.ajax({
            url: "/ar2_data",
            success: function (d) {
                // console.log(d)
                ec_right2_Option.xAxis[0].data = d.day
                ec_right2_Option.series[0].data = d.confirm_add
                ec_right2_Option.series[1].data = d.negative_add
                ec_right2.hideLoading();
                ec_right2.setOption(ec_right2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_ar3_data() {
        $.ajax({
            url: "/ar3_data",
            success: function (d) {
                // console.log(d)
                ec_right3_Option.xAxis[0].data = d.day
                ec_right3_Option.series[0].data = d.inIcu
                ec_right3_Option.series[1].data = d.nowInIcu
                ec_right3.hideLoading();
                ec_right3.setOption(ec_right3_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_ar4_data() {
        $.ajax({
            url: "/ar4_data",
            success: function (d) {
                ec_right4_Option.xAxis[0].data = d.day
                ec_right4_Option.series[0].data = d.onVentilator
                ec_right4_Option.series[1].data = d.nowOnVentilator
                ec_right4.hideLoading();
                ec_right4.setOption(ec_right4_Option)
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
                        + "</div><div class=\"desc\"><h3 class=\"news_title\"><a href=\"" +d.link[i] + "\">"
                        + d.content[i] + "</a></h3></div></li>"
                    $(".timeline-small-body>ul").append(html)
                }

            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }

    // setTimeout(getTime, 1000)
    setTimeout(get_america_screen_data(), 1000 * 10);
    // setTimeout(get_map_data(), 1000*10)
    setTimeout(get_al1_data(), 1000*10)
    setTimeout(get_al2_data(), 1000*10)
    setTimeout(get_al3_data(), 1000*10)
    setTimeout(get_al4_data(), 1000*10)
    setTimeout(get_ar1_data(), 1000*10)
    setTimeout(get_ar2_data(), 1000*10)
    setTimeout(get_ar3_data(), 1000*10)
    setTimeout(get_ar4_data(), 1000*10)
    setTimeout(get_hotnews_data(), 1000*10)
})


