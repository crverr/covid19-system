

$(function () {

    function get_worldMap_data() {
        worldMap.showLoading();
        $.ajax({
            url:"/world_map_data",
            success: function (d) {
                // console.log(d.datalist)
                // map_option.series[0].data = d.datalist
                // map_option.setOption({series: {data: d.datalist}})
                worldMap.hideLoading();
                worldMap.setOption({series: {data: d.datalist}})
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_gl1_data() {
        $.ajax({
            url:"/gl1_data",
            success: function (d) {
                // console.log(d)
                ec_left1_Option.title.text = "最新更新时间："+d.day[0]
                ec_left1_Option.yAxis[0].data = d.name
                ec_left1_Option.series[0].data = d.confirm
                ec_left1.setOption(ec_left1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_gr3_data() {
        $.ajax({
            url:"/gr3_data",
            success: function (d) {
                ec_right3_Option.series[0].data = d.datalist
                ec_right3_Option.legend.data = d.name
                arr = d.datalist
                ec_right3.setOption(ec_right3_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_gr1_data() {
        $.ajax({
            url: "/gr1_data",
            success: function (d) {
                // console.log(d)
                ec_right1_Option.xAxis[0].data = d.day
                ec_right1_Option.series[0].data = d.confirm
                ec_right1_Option.series[1].data = d.heal
                ec_right1_Option.series[2].data = d.dead
                ec_right1.setOption(ec_right1_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }
    function get_gr2_data() {
        $.ajax({
            url: "/gr2_data",
            success: function (d) {
                // console.log(d)
                ec_right2_Option.xAxis[0].data = d.day
                ec_right2_Option.series[0].data = d.confirm_add
                ec_right2.setOption(ec_right2_Option)
            },
            error: function (xhr, type, errorThrown) {
            }
        })
    }

    function get_gl2_data(method) {
        if (method == "按大陆查看")
            var data = {"method": "by_continent"}
        else
            var data = {"method": "by_country"}
        $.ajax({
            url: "/gl2_data",
            type: "POST",
            dataType: "json",
            data: data,  //传字符串,
            success: function (d) {
                if (d.name.length <=7) {
                   for (var i=0; i<d.name.length; i++) {
                        var html ="<tr class='table-fold'><td><img src='../../images/triangle.png' class='table-icon' /> "+ d.name[i] +"</td><td>"+ d.confirmAdd[i] +"</td><td>"+
                            d.confirm[i] +"</td><td>"+ d.heal[i] +"</td><td>"+ d.dead[i] +"</td></tr>"
                        $(".list-table>tbody").append(html)

                    }
                } else {
                    for (var i=0; i<d.name.length; i++) {
                        var html ="<tr><td>"+ d.name[i] +"</td><td>"+ d.confirmAdd[i] +"</td><td>"+
                            d.confirm[i] +"</td><td>"+ d.heal[i] +"</td><td>"+ d.dead[i] +"</td></tr>"
                        $(".list-table>tbody").append(html)
                    }
                }
            },
            error: function (xhr, type, errorThrown) {}
        })
    }
    function get_global_screen_data(){
        $.ajax({
            url:"/global_screen_data",
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
            error: function (xhr, type, errorThrown) {}
        })
    }

    $(".check_but span").click(function (event) {
        $(this).addClass("but_active").siblings().removeClass("but_active")
        $(".list-table>tbody").empty()
        var method = $(this).text()
        get_gl2_data(method)

    })

    // 按大陆查询
    // $(".list-table").on("click",".table-fold",function (event) {
    //     var target = event.currentTarget
    //     var child = target.childNodes[0]
    //     var continent = child.innerText
    //     var icon = child.childNodes[0]
    //     console.log(event)
    //     $(icon).toggleClass("icon-active")
    //
    //     var data = {"data": continent}
    //     $.ajax({
    //         url: "/get_continent_details_data",
    //         type: "POST",
    //         dataType: "json",
    //         data: data,  //传字符串,
    //         success: function (d) {
    //             for(var i=0; i<d.name.length; i++) {
    //                 var html = "<tr class='fold-child'><td>" + d.name[i] + "</td><td>" + d.confirmAdd[i] + "</td><td>" +
    //                     d.confirm[i] + "</td><td>" + d.heal[i] + "</td><td>" + d.dead[i] + "</td></tr>"
    //                 $(target).after(html)
    //             }
    //         },
    //         error: function (xhr, type, errorThrown) {}
    //     })
    // })




    setTimeout(get_global_screen_data(), 1000 * 10);
    setTimeout(get_worldMap_data(), 1000*10)
    setTimeout(get_gl1_data(), 1000*10)
    setTimeout(get_gl2_data(), 1000*10)
    setTimeout(get_gr1_data(), 1000*10)
    setTimeout(get_gr2_data(), 1000*10)
    setTimeout(get_gr3_data(), 1000*10)
})
