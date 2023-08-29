function tranNumber(num, flag=0){
    // var numStr = num.toString();
    var numStr = num + ""
    // 十万以内直接返回
    if (numStr.length <5 ) {
        if (flag==1)
            return numStr + '剂';
        else if(flag ==2)
            return num;
        else
            return numStr + '<em>剂</em>';

    }
    //大于8位数是亿
    else if (numStr.length > 8) {
        var decimal = numStr.substring(numStr.length - 8, numStr.length - 1);
        num = parseFloat(parseInt(num / 100000000) + '.' + decimal).toFixed(1)
        if (flag==1)
            return num + '亿剂';
        else if(flag ==2)
            return num + '亿';
        else
            return num + '<em>亿剂</em>';

    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
        var decimal = numStr.substring(numStr.length - 4, numStr.length - 1)
        num = parseFloat(parseInt(num / 10000) + '.' + decimal).toFixed(1)
        if (flag==1)
            return num + '万剂';
        else if(flag ==2)
            return num + '万';
        else
            return num + '<em>万剂</em>';
    }
}
function getTime() {
        $.ajax({
            url:"/time",
            timeout:10000,    //超时时间设置为10秒
            success: function (data) {
                $("#showTime").html(data)
            },
            error: function (xhr, type, errorThrown) {

            }
        })
    }

setInterval(getTime, 1000)