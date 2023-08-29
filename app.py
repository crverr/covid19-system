from flask import Flask as _Flask , request
from flask import render_template
from flask import jsonify,json
import util
from flask.json import JSONEncoder as _JSONEncoder
class JSONEncoder(_JSONEncoder):
    def default(self, o):
        import decimal
        if isinstance(o, decimal.Decimal):
            return float(o)
        super(JSONEncoder, self).default(o)

class Flask(_Flask):
    json_encoder = JSONEncoder

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/system')
def cov_system():
    return render_template("index.html")

@app.route('/global')
def cov_global_system():
    return render_template("global.html")

@app.route('/demo')
def demo():
    return render_template("demo.html")


@app.route('/history')
def history():
    return render_template("history.html")

@app.route('/worldvaccine')
def worldvaccine():
    return render_template("worldvaccine.html")

@app.route('/protrend')
def protrend():
    return render_template("protrend.html")

@app.route('/worldtrend')
def worldtrend():
    return render_template("worldtrend.html")

@app.route('/america')
def america():
    return render_template("america.html")

@app.route('/americatrend')
def americatrend():
    return render_template("americatrend.html")


@app.route('/read_json/<json_name>', methods=['GET'])
def read_json(json_name):
    dir = "static/json"
    try:
        with open(dir + '/' + json_name,'rb') as f:
            jsonStr = json.load(f)
            return jsonStr
    except Exception as e:
        return jsonify({"code": "异常", "message": "{}".format(e)})


#获取时间
@app.route('/time')
def get_time():
    return util.get_time()


#大屏数据
@app.route("/big_screen_data")
def get_big_screen_data():
    data,nowConfirm_add = util.get_big_screen_data()
    # print(type(data[1]))
    # print(data)
    return jsonify({"confirm":data[1],"confirm_add": data[2], "suspect":data[3],"suspect_add":data[4], "heal":data[5],
                    "heal_add":data[6], "dead":data[7], "dead_add":data[8], "importcase": data[9], "importcase_add": data[10],
                    "noinfect":data[11], "noinfect_add": data[12], "localconfirm": data[13], "localconfirm_add": data[14], "nowconfirm": data[15], "nowConfirm_add": nowConfirm_add})


@app.route("/global_screen_data")
def get_global_screen_data():
    data = util.get_global_screen_data()
    # print(data)
    return jsonify({"nowConfirm":data[0],"confirm": data[1],"heal":data[2],"dead":data[3],
                    "nowConfirm_add":data[4],"confirm_add": data[5],"heal_add":data[6],"dead_add":data[7]})


@app.route('/vaccine_screen_data')
def get_vaccine_screen_data():
    data = util.get_vaccine_screen_data()
    return jsonify({'china_vac':data[0][0],'china_vac_add':data[0][1],'china_per_hundred':data[0][2],'china_per_hundred_add':data[0][3],
                    'glo_vac':data[1][0], 'glo_vac_add':data[1][1],'glo_per_hundred':data[1][2],'glo_per_hundred_add':data[1][3]})


@app.route('/america_screen_data')
def get_america_screen_data():
    data = util.get_america_screen_data()
    print(data)
    return jsonify(
        {"confirm": data[0], "confirm_add": data[1], "nowConfirm": data[2], "nowConfirm_add": data[3], "heal": data[4],
         "heal_add": data[5], "dead": data[6], "dead_add": data[7]})


@app.route("/china_map_data")
def get_map_data():
    res = []
    for tup in util.get_map_data():
        # print(tup)
        res.append({"name":tup[0],"value":int(tup[1]), "heal" : int(tup[2]), "dead": int(tup[3]), "suspect": int(tup[4])})
    return jsonify({"datalist":res})

@app.route("/province_data", methods=['POST','GET'])
def province_data():
    city = request.form["city"]
    res = []
    # print("prodata"+city)
    if(city == 'china'):
        for tup in util.get_map_data():
            print(tup)
            res.append({"name": tup[0], "value": int(tup[1]), "heal": int(tup[2]), "dead": int(tup[3]),
                        "suspect": int(tup[4])})
        return jsonify({"datalist": res})
    else:
        for tup in util.get_province_data(city):
            print(tup)
            res.append({"name": tup[0]+'市', "value": int(tup[1]), "heal": int(tup[2]), "dead": int(tup[3]), "suspect": int(tup[4])})
        return jsonify({"datalist": res})

@app.route("/world_map_data")
def get_worldMap_data():
    res = []
    for tup in util.get_worldMap_data():
        res.append({"name":tup[0], "value": int(tup[1]), "heal": int(tup[2]),"dead": int(tup[3])})
    chinadata = util.get_big_screen_data()[0]
    res.append({"name": "中国", "value": int(chinadata[1]), "heal": int(chinadata[5]),"dead": int(chinadata[7])})
    return jsonify({"datalist":res})


@app.route("/l1_data")
def get_l1_data():
    data = util.get_l1_data()
    day, confirm, suspect, heal, dead = [], [], [], [],[]
    #取前7条数据
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
        # print(a,b,c,d,e)
    return jsonify({"day":day, "confirm": confirm, "suspect":suspect, "heal": heal, "dead": dead})


@app.route("/l2_data")
def get_l2_data():
    data = util.get_l2_data()
    day, confirm, suspect, heal, dead = [], [], [], [],[]
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
        # print(a,b,c,d,e)
    return jsonify({"day":day, "confirm": confirm, "suspect":suspect, "heal": heal, "dead": dead})

@app.route("/l3_data")
def get_l3_data():
    data = util.get_l2_data()
    day, dead_rate, heal_rate, dead_rate_add, heal_rate_add = [], [], [],[],[]
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))  # a是datetime类型
        dead_rate.append(b)
        heal_rate.append(c)
        dead_rate_add.append(d)
        heal_rate_add.append(e)
        # print(a,b,c,d,e)
    return jsonify({"day": day, "dead_rate": dead_rate, "heal_rate": heal_rate, "dead_rate_add":dead_rate_add, "heal_rate_add": heal_rate_add})

@app.route("/l4_data")
def get_l4_data():
    data = util.get_l4_data()
    day, province, city, nowConfirm, confirmAdd, grade = [], [], [], [], [],[]
    for a, b, c, d, e,f in data:
        day.append(a.strftime("%m-%d"))
        province.append(b)
        city.append(c)
        nowConfirm.append(d)
        confirmAdd.append(e)
        grade.append(f)

    return jsonify({"day":day,"province": province, "city": city, "nowConfirm": nowConfirm, "confirmAdd": confirmAdd, "grade": grade})

@app.route("/r1_data")
def get_r1_data():
    data = util.get_r1_data()
    province, confirm, heal, dead = [], [], [], []
    for a, b, c, d in data[1:]:
        # print(a,b,c,d)
        province.append(a)
        confirm.append(b)
        heal.append(c)
        dead.append(d)
    return jsonify({"province": province, "confirm": confirm, "heal": heal, "dead": dead})

@app.route("/r2_data")
def get_r2_data():
    data = util.get_r2_data()
    day, importedCase, noInfect,importedCase_add,noInfect_add = [], [], [], [], []
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))
        importedCase.append(b)
        noInfect.append(c)
        importedCase_add.append(d)
        noInfect_add.append(e)
    return jsonify({"day": day, "importedCase": importedCase, "noInfect": noInfect, "importedCase_add": importedCase_add, "noInfect_add": noInfect_add})

@app.route("/r3_data")
def get_r3_data():
    data = util.get_r3_data()
    day, nowConfirm, nowSevere = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))
        nowConfirm.append(b)
        nowSevere.append(c)
    return jsonify({"day": day, "nowConfirm": nowConfirm, "nowSevere": nowSevere})


@app.route("/hotnews_data")
def get_hotnews_data():
    data = util.get_hotnews_data()
    day, hour, content,link = [],[],[],[]
    for i,j,k in data:
        day.append(i.strftime("%m月%d日"))
        hour.append(i.strftime("%H:%M"))
        content.append(j)
        link.append(k)
        print("\n")
    return jsonify({"day":day, "hour": hour, "content": content, "link": link})

@app.route("/c1_data")
def get_c1_data():
    data = util.get_yq_word_cloud_data()
    return jsonify({'words':data})

@app.route("/gl1_data")
def get_gl1_data():
    data = util.get_gl1_data()
    name, confirm,day= [], [],[]
    #取前7条数据
    for a, b,c in data:
        if(len(day)==0):
            day.append(a.strftime("%Y-%m-%d"))    #a是datetime类型
        confirm.append(c)
        name.append(b)
    return jsonify({"day":day, "confirm": confirm, "name":name})

@app.route("/gr3_data")
def get_gr3_data():
    data = util.get_gr3_data()
    datalist,name= [],[]
    #取前7条数据
    for a, b in data:
        list = {"name": a, "value": b}
        name.append(a)
        datalist.append(list)
    return jsonify({"datalist": datalist,"name":name})

@app.route("/gr1_data")
def get_gr1_data():
    data = util.get_gr1_data()
    day, confirm, heal, dead = [], [], [], []
    # 取前7条数据
    for a, b, c, d in data:
        day.append(a.strftime("%m-%d"))  # a是datetime类型
        confirm.append(b)
        heal.append(c)
        dead.append(d)
        # print(a,b,c,d,e)
    return jsonify({"day": day, "confirm": confirm, "heal": heal, "dead": dead})

@app.route("/gr2_data")
def get_gr2_data():
    data = util.get_gr2_data()
    day,confirm_add = [],[]
    for a,b in data:
        day.append(a.strftime("%m-%d"))
        confirm_add.append(b)
    return jsonify({"day":day,"confirm_add":confirm_add})


@app.route("/gl2_data", methods=['POST','GET'])
def get_gl2_data():
    method = request.form["method"]
    data = util.get_gl2_data(method)
    name,confirm,confirmAdd,heal,dead= [],[],[],[],[]
    #取前7条数据
    for a, b, c, d, e in data:
        name.append(a)
        confirm.append(b)
        confirmAdd.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"name": name,"confirm":confirm, "confirmAdd": confirmAdd, "heal": heal, "dead": dead})

@app.route("/get_continent_details_data", methods=['POST','GET'])
def get_continent_details_data():
    name = request.form["data"]
    data = util.get_continent_details_data(name)
    name, confirm, confirmAdd, heal, dead = [], [], [], [], []
    for a, b, c, d, e in data:
        name.append(a)
        confirm.append(b)
        confirmAdd.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"name": name, "confirm": confirm, "confirmAdd": confirmAdd, "heal": heal, "dead": dead})


@app.route("/world_map_vaccine_data")
def get_worldMap_vaccine_data():
    res = []
    data= util.get_worldMap_vaccine_data()
    for tup in data:
        res.append({"name":tup[0], "value": int(tup[1]),"per_v":float(tup[2])})
    return jsonify({"datalist":res})

@app.route("/vl1_data")
def get_vl1_data():
    data = util.get_vl1_data()
    day, total_v= [], []

    for a, b in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        total_v.append(b)
    return jsonify({"day":day, "total_v": total_v})

@app.route("/vl2_data")
def get_vl2_data():
    data = util.get_vl2_data()
    day, per_v= [], []
    for a, b in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        per_v.append(b)
    return jsonify({"day":day, "per_v": per_v})

@app.route("/vl3_data")
def get_vl3_data():
    data = util.get_vl3_data()
    return jsonify({'words':data})

@app.route("/vr1_data")
def get_vr1_data():
    data,days = util.get_vr1_data()
    return jsonify({"data": data,"days":days})

@app.route("/vr2_data")
def get_vr2_data():
    data = util.get_vr2_data()
    day, country, fully_vaccinated, fully_per, one_vaccinated,one_per = [], [], [], [], [],[]
    for a, b, c, d, e,f in data:
        day.append(a.strftime('%m-%d'))
        country.append(b)
        fully_vaccinated.append(c)
        fully_per.append(d)
        one_vaccinated.append(e)
        one_per.append(f)
    return jsonify({"day": day, "country": country, "fully_vaccinated": fully_vaccinated, "fully_per": fully_per, "one_vaccinated": one_vaccinated,'one_per':one_per})



@app.route("/vb1_data")
def get_vb1_data():
    day,countryList,per_v = util.get_vb1_data()
    return jsonify({"country": countryList, "day": day, 'per_v':per_v})

@app.route("/vb2_data")
def get_vb2_data():
    day,countryList,total_v = util.get_vb2_data()
    return jsonify({"country": countryList, "day": day, 'total_v':total_v})

@app.route("/hl1_data")
def get_hl1_data():
    day,provinces,seriesdata = util.get_hl1_data()
    return jsonify({"day": day, "provinces": provinces, 'seriesdata':seriesdata})


@app.route("/loadCity/<area>/<searchName>", methods=['GET'])
def loadCity(area,searchName):
    data = util.get_city_trend(area,searchName)
    print(data)
    return jsonify({"data":data})

@app.route('/trend_data/<area>', methods=['GET'])
def get_trend_data(area):
    data = util.get_trend_data(area)
    # print(data)
    return jsonify({"data": data})

@app.route('/al1_data')
def get_al1_data():
    data = util.get_al1_data()
    day, confirm, suspect, heal, dead = [], [], [], [],[]
    #取前7条数据
    for a, b, c, d, e in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
        # print(a,b,c,d,e)
    return jsonify({"day":day, "confirm": confirm, "suspect":suspect, "heal": heal, "dead": dead})

@app.route("/al2_data")
def get_al2_data():
    data = util.get_al2_data()
    day, confirm, heal, dead = [], [], [], []
    for a, b, c, d in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm.append(b)
        heal.append(c)
        dead.append(d)
        # print(a,b,c,d,e)
    return jsonify({"day":day, "confirm": confirm, "heal": heal, "dead": dead})

@app.route("/al3_data")
def get_al3_data():
    data = util.get_al3_data()
    day, total, total_add = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        total.append(b)
        total_add.append(c)
        # print(a,b,c)
    return jsonify({"day":day, "total": total, "total_add": total_add})

@app.route("/al4_data")
def get_al4_data():
    data = util.get_al4_data()
    day, hospitalized, hospitalized_add, nowHospitalized = [], [], [],[]
    for a, b, c,d in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        hospitalized.append(b)
        nowHospitalized.append(c)
        hospitalized_add.append(d)
        # print(a,b,c)
    return jsonify({"day":day, "hospitalized": hospitalized, "nowHospitalized": nowHospitalized,"hospitalized_add":hospitalized_add})

@app.route("/ar1_data")
def get_ar1_data():
    data = util.get_ar1_data()
    day, confirm, negative = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm.append(b)
        negative.append(c)
        # print(a,b,c)
    return jsonify({"day":day, "confirm": confirm, "negative": negative})



@app.route("/ar2_data")
def get_ar2_data():
    data = util.get_ar2_data()
    day, confirm_add, negative_add = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        confirm_add.append(b)
        negative_add.append(c)
        # print(a,b,c)
    return jsonify({"day":day, "confirm_add": confirm_add, "negative_add": negative_add})

@app.route("/ar3_data")
def get_ar3_data():
    data = util.get_ar3_data()
    day, inIcu, nowInIcu = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        inIcu.append(b)
        nowInIcu.append(c)
        # print(a,b,c)
    return jsonify({"day":day, "inIcu": inIcu, "nowInIcu": nowInIcu})

@app.route("/ar4_data")
def get_ar4_data():
    data = util.get_ar4_data()
    day, onVentilator, nowOnVentilator = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))    #a是datetime类型
        onVentilator.append(b)
        nowOnVentilator.append(c)
        # print(a,b,c)
    return jsonify({"day":day, "onVentilator": onVentilator, "nowOnVentilator": nowOnVentilator})

@app.route("/america_map_data")
def get_america_map_data():
    res = []
    for tup in util.get_america_map_data():
        # print(tup)
        res.append({"name":tup[0],"value":int(tup[1]), "heal" : int(tup[2]), "dead": int(tup[3]), "suspect": int(tup[4])})
    return jsonify({"datalist":res})


@app.route("/sl1_data")
def get_sl1_data():
    data = util.get_sl1_data()
    return jsonify({'words': data})

@app.route("/sr1_data")
def get_sr1_data():
    data = util.get_sr1_data()
    # print(data)
    return jsonify({'data': data})

@app.route("/sr2_data")
def get_sr2_data():
    data = util.get_sr2_data()
    print(data)
    return data


if __name__ == '__main__':
    # app.run(debug=True)
    app.run()
