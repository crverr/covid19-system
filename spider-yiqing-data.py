# -*- coding: utf-8 -*-
import time,datetime, json, requests,pymysql
import pandas as pd
import traceback
from selenium.webdriver import Chrome, ChromeOptions
import sys

# ----------------数据库连接、关闭------------------------
#连接数据库
def get_conn():
    #建立连接
    connect = pymysql.Connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='cov',
        charset='utf8'
    )
    #获取游标
    cursor = connect.cursor()
    return connect,cursor

#关闭连接
def close_conn(connect,cursor):
    if connect:
        connect.close()
    if cursor:
        cursor.close()

# ----------------爬取数据------------------------

# 抓取腾讯疫情国内每日实时详细各省市和中国每日历史数据
def get_tencent_data():
    url1 = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&callback=&_=%d'%int(time.time()*1000)
    url2 = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_other&callback=&_=%d'%int(time.time()*1000)
    headers = {
        'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
    }
    r1 = requests.get(url1, headers)
    r2 = requests.get(url2, headers)

    #json字符串转字典
    res1 = json.loads(r1.text)
    res2 = json.loads(r2.text)

    data_all1 = json.loads(res1["data"])
    data_all2 = json.loads(res2["data"])

    #当日详细数据
    details = []
    update_time = data_all1["lastUpdateTime"]
    data_country = data_all1["areaTree"]
    data_province = data_country[0]["children"]
    for pro_infos in data_province:
        province = pro_infos["name"]
        for city_infos in pro_infos["children"]:
            city = city_infos["name"]
            confirm = city_infos["total"]["confirm"]
            confirm_add = city_infos["today"]["confirm"]
            nowConfirm = city_infos['total']['nowConfirm']
            suspect = city_infos["total"]["suspect"]
            heal = city_infos["total"]["heal"]
            dead = city_infos["total"]["dead"]
            dead_rate = city_infos['total']['deadRate']
            heal_rate = city_infos['total']['healRate']
            details.append([update_time, province, city,nowConfirm, confirm, confirm_add, suspect,heal, dead,dead_rate,heal_rate])

    #历史数据
    history = {}
    for day_infos in data_all2["chinaDayList"]:
        ds = day_infos["y"]+"."+day_infos["date"]
        tup = time.strptime(ds, "%Y.%m.%d")  # 匹配时间
        ds = time.strftime("%Y-%m-%d", tup)    #改变时间输入格式，不然插入数据库会报错，数据库是datatime格式
        confirm = day_infos["confirm"]
        suspect = day_infos["suspect"]
        heal = day_infos["heal"]
        dead = day_infos["dead"]
        nowConfirm = day_infos["nowConfirm"]
        nowSevere = day_infos["nowSevere"]
        importedCase = day_infos["importedCase"]
        noInfect = day_infos["noInfect"]
        localConfirm = day_infos["localConfirm"]
        dead_rate = day_infos["deadRate"]
        heal_rate = day_infos["healRate"]
        history[ds] = {"confirm":confirm, "suspect":suspect, "heal":heal, "dead":dead,
                    "importedCase": importedCase, "noInfect": noInfect, "localConfirm":localConfirm, "nowConfirm":nowConfirm,
                       "nowSevere":nowSevere, "dead_rate":dead_rate, "heal_rate":heal_rate}
    for day_infos in data_all2["chinaDayAddList"]:
        ds = day_infos["y"]+"."+day_infos["date"]
        tup = time.strptime(ds, "%Y.%m.%d")  # 匹配时间
        ds = time.strftime("%Y-%m-%d", tup)    #改变时间输入格式，不然插入数据库会报错，数据库是datatime格式
        confirm = day_infos["confirm"]
        suspect = day_infos["suspect"]
        heal = day_infos["heal"]
        dead = day_infos["dead"]
        importedCase = day_infos["importedCase"]
        noInfect = day_infos["infect"]
        dead_rate = day_infos["deadRate"]
        heal_rate = day_infos["healRate"]
        localConfirm = day_infos["localConfirmadd"]
        history[ds].update({"confirm_add":confirm, "suspect_add":suspect, "heal_add":heal, "dead_add":dead,
                            "importedCase_add": importedCase, "noInfect_add": noInfect, "localConfirm_add":localConfirm,
                            "dead_rate_add":dead_rate, "heal_rate_add":heal_rate})
    return history,details

# 抓取各省从2020到2021的每日历史数据（无市区）
def get_province_history_data():
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
    }
    url = "http://111.231.75.86:8000/api/provinces/CHN/daily/"

    response = requests.get(url=url, headers=headers)
    res = json.loads(response.text)
    details = []
    for infos in res:
        ds = datetime.datetime.strptime(str(infos["dateId"]), '%Y%m%d').strftime('%Y-%m-%d')
        province = infos["provinceName"]
        province_code = infos["provinceCode"]
        nowConfirm = infos["currentConfirmedCount"]
        nowConfirm_add = infos["currentConfirmedIncr"]
        confirm = infos["confirmedCount"]
        confirm_add = infos["confirmedIncr"]
        suspect = infos["suspectedCount"]
        suspect_add = infos["suspectedCountIncr"]
        heal = infos["curedCount"]
        dead = infos["deadCount"]
        heal_add = infos["curedIncr"]
        dead_add = infos["deadIncr"]
        nowSevere = infos["highDangerCount"]
        nowMidSevere = infos["midDangerCount"]
        details.append(
            [ds, province,province_code, confirm, confirm_add, nowConfirm, nowConfirm_add,  suspect, suspect_add, heal, heal_add, dead, dead_add, nowSevere, nowMidSevere])

    return details


# 抓取本土风险划分数据
def get_localrisk_data():
    url = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_other&callback=&_=%d' % int(time.time() * 1000)
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
    }
    r = requests.get(url, headers)
    res = json.loads(r.text)
    data_all = json.loads(res["data"])
    locallist = []
    for local in data_all["statisGradeCityDetail"]:
        ds = str(local["syear"]) + "/" + local["date"]
        tup = time.strptime(ds, "%Y/%m/%d")  # 匹配时间
        ds = time.strftime("%Y-%m-%d", tup)  # 改变时间输入格式，不然插入数据库会报错，数据库是datatime格式
        province = local["province"]
        city = local["city"]
        nowConfirm = local["nowConfirm"]
        confirm = local["confirm"]
        confirm_add = local["confirmAdd"]
        heal = local["heal"]
        dead = local["dead"]
        grade = local["grade"]
        locallist.append([ds, province,city,nowConfirm,confirm,confirm_add,heal,dead,grade])
    return locallist

#抓取全球各国以及美国各洲最新的数据
def get_global_country_latest_data():
    url = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign&callback=&_=%d' % int(time.time() * 1000)
    url2 = "https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist"
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
    }

    s = requests.session()
    s.keep_alive = False
    requests.DEFAULT_RETRIES = 5

    # 各国各城市数据
    details = []
    america = []

    #获取美国数据
    r1 = requests.get(url, headers)
    res1 = json.loads(r1.text)
    data_all = json.loads(res1["data"])

    # 获取全球数据
    r2 = requests.post(url=url2, headers=headers)
    res2 = json.loads(r2.text)
    # print(res["data"])
    for infos in res2["data"]:
        ds = infos["y"] + "." + infos["date"]
        country = infos["name"]
        continent = infos["continent"]
        nowConfirm = infos["nowConfirm"]
        nowConfirm_add = infos["nowConfirmCompare"]
        confirm = infos["confirm"]
        confirm_add = infos["confirmCompare"]
        suspect = infos["suspect"]
        heal = infos["heal"]
        dead = infos["dead"]
        heal_add = infos["healCompare"]
        dead_add = infos["deadCompare"]
        tup = time.strptime(ds, "%Y.%m.%d")  # 匹配时间
        ds = time.strftime("%Y-%m-%d", tup)
        details.append([ds,country, continent, confirm, confirm_add,nowConfirm,nowConfirm_add, suspect,
                        heal, heal_add, dead, dead_add])

    # 美国数据
    for infos in data_all["foreignList"]:
        name = infos["name"]
        continent = infos["continent"]
        nowConfirm = infos["nowConfirm"]
        confirm = infos["confirm"]
        confirm_add = infos["confirmAdd"]
        suspect = infos["suspect"]
        heal = infos["heal"]
        dead = infos["dead"]
        confirm_cmp = infos["confirmCompare"]
        nowConfirm_cmp = infos["nowConfirmCompare"]
        heal_cmp = infos["healCompare"]
        dead_cmp = infos["deadCompare"]
        if (infos["name"] == "美国"):
            ds = infos["y"] +"." + infos["date"]
            tup = time.strptime(ds, "%Y.%m.%d")  # 匹配时间
            ds = time.strftime("%Y-%m-%d", tup)
            for i in infos["children"]:
                city = i["name"]
                citymap = i["nameMap"]
                cconfirm = i["confirm"]
                cconfirm_add = i["confirmAdd"]
                csuspect = i["suspect"]
                cheal = i["heal"]
                cdead = i["dead"]
                america.append([ds, name, city, citymap, cconfirm, cconfirm_add, csuspect, cheal, cdead])
            break

    return america,details

#抓取全球各国历史数据(文件)
def get_global_country_history_data():
    try:
        details = []
        with open('./static/json/world-country-history.json','rb') as f:
            jsonStr = json.load(f)
            for infos in jsonStr:
                ds = datetime.datetime.strptime(str(infos["dateId"]), '%Y%m%d').strftime('%Y-%m-%d')
                country = infos["countryName"]
                country_code = infos["countryCode"]
                nowConfirm = infos["currentConfirmedCount"]
                nowConfirm_add = infos["currentConfirmedIncr"]
                confirm = infos["confirmedCount"]
                confirm_add = infos["confirmedIncr"]
                suspect = infos["suspectedCount"]
                suspect_add = infos["suspectedCountIncr"]
                heal = infos["curedCount"]
                dead = infos["deadCount"]
                heal_add = infos["curedIncr"]
                dead_add = infos["deadIncr"]
                details.append(
                    [ds, country,country_code, confirm, confirm_add, nowConfirm, nowConfirm_add, suspect, suspect_add, heal, heal_add,
                     dead, dead_add])
            f.close()
        return details
    except Exception as e:
        print(e)

# 获取美国各州历史数据
def get_america_state_history_data():
    try:
        details = []
        with open('./static/json/america-provinces-history.json','rb') as f:
            jsonStr = json.load(f)
            name = '美国'
            for infos in jsonStr:
                ds = datetime.datetime.strptime(str(infos["dateId"]), '%Y%m%d').strftime('%Y-%m-%d')
                city = infos["provinceName"]
                citymap = infos["provinceCode"]
                confirm = infos["confirmedCount"]
                confirm_add = infos["confirmedIncr"]
                suspect = infos["suspectedCount"]
                heal = infos["curedCount"]
                dead = infos["deadCount"]
                if(suspect == None): suspect = 0
                if(heal == None): heal = 0
                if(dead == None): dead = 0
                if(confirm == None): confirm =0
                if (confirm_add == None): confirm_add = 0
                details.append([ds, name, city, citymap, confirm, confirm_add, suspect, heal, dead])
            f.close()
        return details
    except Exception as e:
        print(e)

# 获取美国历史总体数据
def get_america_history_data():
    try:
        details = []
        with open('./static/json/america-history.json','rb') as f:
            jsonStr = json.load(f)
            name = '美国'
            for infos in jsonStr:
                ds = datetime.datetime.strptime(str(infos["date"]), '%Y%m%d').strftime('%Y-%m-%d')
                confirm = infos["positive"]               # 阳性累计
                confirm_add = infos["positiveIncrease"]    # 阳性新增
                suspect = 0
                heal = infos["recovered"]
                dead = infos["death"]
                dead_add = infos["deathIncrease"]
                hospitalized = infos["hospitalized"]    #住院累计
                nowHospitalized = infos["hospitalizedCurrently"]   #当前住院  现有住院
                hospitalized_add = infos["hospitalizedIncrease"]    #住院新增
                nowInIcu = infos["inIcuCurrently"]        # 当前ICU
                inIcu = infos["inIcuCumulative"]        # 累计ICU
                negative = infos["negative"]         # 阴性检测累计
                negative_add = infos['negativeIncrease']
                onVentilator = infos['onVentilatorCumulative']   #使用呼吸机累计
                nowOnVentilator = infos['onVentilatorCurrently']   #当前使用呼吸机
                totalTestResults = infos['totalTestResults']   #累计监测
                totalTestResults_add = infos['totalTestResultsIncrease']
                if(onVentilator == None): onVentilator = 0
                if(nowOnVentilator == None): nowOnVentilator = 0
                if(nowHospitalized == None): nowHospitalized = 0
                if(hospitalized == None): hospitalized = 0
                if(hospitalized_add == None): hospitalized_add = 0
                if(heal == None): heal = 0
                if(dead == None): dead = 0
                if(confirm == None): confirm =0
                if (confirm_add == None): confirm_add = 0
                if (nowInIcu == None): nowInIcu = 0
                if (inIcu == None): inIcu = 0
                if (negative == None): negative = 0
                details.append([ds, confirm, confirm_add, suspect, heal, dead, dead_add, negative,negative_add,hospitalized, hospitalized_add, nowHospitalized,
                                inIcu, nowInIcu, onVentilator,nowOnVentilator,totalTestResults,totalTestResults_add])
            f.close()
        return details
    except Exception as e:
        print(e)

#抓取全球历史总体数据
def get_global_histroy_data():
    url = "https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoGlobalDailyList"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"
    }
    response = requests.get(url=url, headers=headers)
    res = json.loads(response.text)
    data = res["data"]

    global_day_list = data['FAutoGlobalDailyList']
    global_statis = data['FAutoGlobalStatis']
    global_history = {}
    for global_day in global_day_list:
        ds = global_day["y"] + "." + global_day["date"]
        confirm = global_day["all"]["confirm"]
        dead = global_day["all"]["dead"]
        heal = global_day["all"]["heal"]
        confirm_add = global_day["all"]["newAddConfirm"]
        dead_rate = global_day["all"]["deadRate"]
        heal_rate = global_day["all"]["healRate"]
        global_history[ds] = {"confirm": confirm, "confirm_add": confirm_add, "dead": dead, "heal": heal,
                              "dead_rate": dead_rate, "heal_rate": heal_rate}

    ds = global_statis["lastUpdateTime"]
    confirm = int(global_statis["confirm"])
    dead = int(global_statis["dead"])
    heal = int(global_statis["heal"])
    dead_rate = round(dead / confirm, 4) if confirm > 0 else 0.00
    heal_rate = round(heal / confirm, 4) if confirm > 0 else 0.00
    global_history[ds] = {"confirm": confirm,
                          "confirm_add": global_statis["nowConfirmAdd"],
                          "dead": dead,
                          "heal": heal,
                          "dead_rate": dead_rate,
                          "heal_rate": heal_rate}
    global_statis_list = [global_statis[key] for key in global_statis]

    return global_history, global_statis_list

# 热搜新闻数据
def get_hotnews_data():
    url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/"
    # 无头模式，无需打开浏览器，效率快
    option = ChromeOptions()
    # 隐藏浏览器
    option.add_argument("--headless")
    # linux部署
    option.add_argument("--no-sandbox")
    browser = Chrome(options = option)
    browser.get(url)
    # 整个网站的源码
    # print(browser.page_source)
    # 模拟按钮模仿人浏览网站点击展开
    but = browser.find_element_by_xpath('//*[@id="ptab-1"]/div[3]/div[11]/span')
    # but = browser.find_element_by_css_selector('#ptab-1 > div.Virus_1-1-304_2SKAfr > div.Common_1-1-304_3lDRV2 > span')

    # 模拟点击按钮，点击展开
    but.click()
    # 等待1秒
    time.sleep(1)
    #获取热搜头条信息
    content = []
    link = []
    news = browser.find_elements_by_xpath('//*[@id="ptab-1"]/div[3]/div/div[2]/a/div')
    a = browser.find_elements_by_xpath('//*[@id="ptab-1"]/div[3]/div/div[2]/a')

    for i, j in zip(news, a):
        # 热搜头条标题
        content.append(i.text)
        link.append(j.get_attribute("href"))

    # 关闭浏览
    browser.close()
    return content,link


# ----------------爬取数据结束------------------------

# ----------------更新国内数据start------------------------
#更新国内疫情详细数据
def update_details():
    cursor = None
    connect = None
    try:
        li = get_tencent_data()[1]    #0历史，1当前数据
        connect,cursor = get_conn()
        sql = "INSERT INTO details (update_time, province, city, nowConfirm, confirm, confirm_add,suspect, heal, dead, dead_rate, heal_rate) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        sql_query = "select %s = (select update_time from details order by id desc limit 1)"
        # 对比当前最大时间戳，相同不更新，不相同则更新
        cursor.execute(sql_query, li[0][0])
        if not cursor.fetchone()[0]:
            #time.asctime() 接受时间元组并返回一个可读的形式为"Tue Dec 11 18:07:14 2008"
            # 以 f开头表示在字符串内支持大括号内的python 表达式
            print(f"{time.asctime()}开始更新数据")
            for item in li:
                print(item)
                cursor.execute(sql, item)
            connect.commit()        #提交事务
            print(f"{time.asctime()}更新到最新数据")
        else:
            print(f"{time.asctime()}已是最新数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect,cursor)

#更新国内各省疫情历史每日数据
def update_province_history_data():
    cursor = None
    connect = None
    try:
        li = get_province_history_data()    #0历史，1当前数据
        connect,cursor = get_conn()
        sql = "INSERT INTO province_history (ds, province,province_code, confirm, confirm_add, nowConfirm, nowConfirm_add, suspect, suspect_add, heal, heal_add, dead, dead_add, nowSevere, nowMidSevere) " \
              "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        sql_query = "select confirm from province_history where ds = %s and province = %s"
        # sql_query = "select %s = (select ds from province_history order by id desc limit 1)"
        # 对比当前最大时间戳，相同不更新，不相同则更新
        print(f"{time.asctime()}开始更新各省历史数据")
        for item in li:
            if not cursor.execute(sql_query, [item[0],item[1]]):
                print(item)
                cursor.execute(sql, item)
        connect.commit()        #提交事务
        print(f"{time.asctime()}已更新到最新各省历史数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect,cursor)


# 插入国内history数据
def insert_china_history():
    cursor = None
    connect = None
    try:
        dic = get_tencent_data()[0]  #0历史数据
        print(f"{time.asctime()}开始插入历史数据")
        connect,cursor = get_conn()
        sql = "insert into china_history values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        for k, v in dic.items():
            print("\n")
            print(k)
            print("----")
            print(v)
            print("\n")
            cursor.execute(sql, [k,v.get("confirm"), v.get("confirm_add"), v.get("suspect"), v.get("suspect_add"),
                                 v.get("heal"), v.get("heal_add"), v.get("dead"), v.get("dead_add"), v.get("importedCase"),
                                     v.get("importedCase_add"), v.get("noInfect"), v.get("noInfect_add"), v.get("localConfirm"),
                                     v.get("localConfirm_add"), v.get("nowConfirm"), v.get("nowSevere"),v.get("dead_rate"),
                                     v.get("heal_rate"),v.get("dead_rate_add"),v.get("heal_rate_add")])
        connect.commit()
        print(f"{time.asctime()}插入历史数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect,cursor)

#更新国内历史数据
def update_china_history_data():
    cursor = None
    connect = None
    try:
        dic = get_tencent_data()[0]  # 0历史数据
        print(f"{time.asctime()}开始更新历史数据")
        connect, cursor = get_conn()
        sql = "insert into china_history values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select confirm from china_history where ds = %s"
        #查询数据是否存在数据库里，不存在则插入
        for k,v in dic.items():
            if not cursor.execute(sql_query, k):
                print(k, v)
                cursor.execute(sql, [k,v.get("confirm"), v.get("confirm_add"), v.get("suspect"), v.get("suspect_add"),
                                    v.get("heal"), v.get("heal_add"), v.get("dead"), v.get("dead_add"), v.get("importedCase"),
                                     v.get("importedCase_add"), v.get("noInfect"), v.get("noInfect_add"), v.get("localConfirm"),
                                     v.get("localConfirm_add"), v.get("nowConfirm"), v.get("nowSevere"),v.get("dead_rate"),
                                     v.get("heal_rate"),v.get("dead_rate_add"),v.get("heal_rate_add")])
        connect.commit()
        print(f"{time.asctime()}历史数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

#插入地区风险数据
def insert_localrisk():
    cursor = None
    connect = None
    try:
        li = get_localrisk_data()  # 0历史数据
        print(li)
        print(f"{time.asctime()}开始插入风险数据")
        connect, cursor = get_conn()
        sql = "insert into localrisk(ds, province, city, nowConfirm, confirm, confirm_add, heal,dead, grade) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        for i in li:
            cursor.execute(sql, i)
        connect.commit()
        print(f"{time.asctime()}插入风险数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

#更新地区风险数据
def update_localrisk():
    cursor = None
    connect = None
    try:
        li = get_localrisk_data()  # 0历史数据

        print(f"{time.asctime()}开始插入风险数据")
        connect, cursor = get_conn()
        sql = "insert into localrisk(ds, province, city, nowConfirm, confirm, confirm_add, heal,dead, grade) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select %s = (select ds from localrisk where city = %s order by ds desc limit 1)"
        # 对比当前最大时间戳，相同不更新，不相同则更新
        for i in li:
            cursor.execute(sql_query, (i[0], i[2]))
            if not cursor.fetchone()[0]:
                print(i[0]+i[1]+i[2])
                cursor.execute(sql, i)
        connect.commit()
        print(f"{time.asctime()}插入风险数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)


# 更新热搜数据
def update_hotsearch():
    cursor = None
    connect = None
    try:
        context,link = get_hotnews_data()
        print(f"{time.asctime()}开始更新热搜数据")
        connect, cursor = get_conn()
        sql = "insert into hotsearch(dt,content,link) values(%s,%s,%s)"
        sql_query = "select * from hotsearch where content = %s"
        ts = time.strftime("%Y-%m-%d %X")
        for i,j  in zip(context,link):
            if not cursor.execute(sql_query, i):
                print(ts, i, j)
                cursor.execute(sql, (ts, i, j))
        connect.commit()  # 提交事务
        print(f"{time.asctime()}热搜数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)


# ----------------更新国内数据end------------------------

# ----------------更新全球数据start------------------------

# 更新全球各国最新数据
def update_global_country_latest_data():
    cursor = None
    connect = None
    try:
        li = get_global_country_latest_data()[1]    #0美国，1全球
        connect, cursor = get_conn()
        sql = "INSERT INTO global_country_latest(ds, country, continent,confirm, confirm_add,nowConfirm, nowConfirm_add,suspect, heal,heal_add, dead, dead_add) " \
              "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        sql_query = "select %s = (select ds from global_country_latest order by id desc limit 1)"
        cursor.execute(sql_query, li[0][0])
        if not cursor.fetchone()[0]:
            print(f"{time.asctime()}开始更新全球数据")
            for item in li:
                print(item)
                cursor.execute(sql, item)
            connect.commit()  # 提交事务
            print(f"{time.asctime()}更新到最新全球数据")
        else:
            print(f"{time.asctime()}已是最新全球数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 插入全球各国历史数据(没有更新操作)
def insert_global_country_history_data():
    cursor = None
    connect = None
    try:
        li = get_global_country_history_data()
        print(f"{time.asctime()}开始更新全球各国历史数据")
        connect, cursor = get_conn()
        sql = "insert into global_country_history (ds, country,country_code, confirm, confirm_add, nowConfirm, nowConfirm_add, suspect, suspect_add, heal, heal_add, dead, dead_add) " \
              "values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        print(f"{time.asctime()}开始更新数据")
        for item in li:
            print(item)
            cursor.execute(sql, item)
        connect.commit()
        print(f"{time.asctime()}全球各国历史数据更新完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 更新美国各州最新数据
def update_america_state_latest():
    cursor = None
    connect = None
    try:
        li = get_global_country_latest_data()[0]  # 0美国，1全球
        connect, cursor = get_conn()
        sql = "INSERT INTO america_state (ds, name, city, cityMap, confirm, confirm_add, suspect, heal, dead)" \
              "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        sql_query = "select %s = (select ds from america_state order by id desc limit 1)"
        cursor.execute(sql_query, li[0][0])
        if not cursor.fetchone()[0]:
            print(f"{time.asctime()}开始更新美国各州最新数据")
            for item in li:
                print(item)
                cursor.execute(sql, item)
            connect.commit()  # 提交事务
            print(f"{time.asctime()}更新到最新美国各州最新数据")
        else:
            print(f"{time.asctime()}已是最新美国数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 插入美国各州历史数据（无更新）
def insert_america_state_history():
    cursor = None
    connect = None
    try:
        li = get_america_state_history_data()
        connect, cursor = get_conn()
        sql = "INSERT INTO america_state (ds, name, city, cityMap, confirm, confirm_add, suspect, heal, dead)" \
              "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        print(f"{time.asctime()}开始更新美国各州历史数据")
        for item in li:
            print(item)
            cursor.execute(sql, item)
        connect.commit()  # 提交事务
        print(f"{time.asctime()}更新到最新美国各洲历史数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 插入美国历史数据（无更新）
def insert_america_history():
    cursor = None
    connect = None
    try:
        li = get_america_history_data()
        connect, cursor = get_conn()
        sql = "INSERT INTO america_history (ds, confirm, confirm_add, suspect, heal, dead, dead_add, negative,negative_add,hospitalized, hospitalized_add, nowHospitalized, " \
              "inIcu, nowInIcu, onVentilator,nowOnVentilator,totalTestResults,totalTestResults_add)" \
              "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "
        print(f"{time.asctime()}开始更新美国历史数据")
        for item in li:
            print(item)
            cursor.execute(sql, item)
        connect.commit()  # 提交事务
        print(f"{time.asctime()}更新到最新美国历史数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)



#插入全球历史总体数据
def insert_global_history():
    cursor = None
    connect = None
    try:
        dic = get_global_histroy_data()[0]  # 0历史数据,1最新日期的总体数据
        print(f"{time.asctime()}开始插入全球历史数据")
        connect, cursor = get_conn()
        sql = "insert into global_history values(%s,%s,%s,%s,%s,%s,%s)"
        for k, v in dic.items():
            print("\n")
            print(k)
            print("----")
            print(v)
            print("\n")
            cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("dead"), v.get("heal"),
                                 v.get("dead_rate"), v.get("heal_rate")])
        connect.commit()
        print(f"{time.asctime()}插入全球历史数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 更新全球历史数据
def update_global_history_data():
    cursor = None
    connect = None
    try:
        dic = get_global_histroy_data()[0]  # 0历史数据
        print(f"{time.asctime()}开始更新全球历史数据")
        connect, cursor = get_conn()
        sql = "insert into global_history values(%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select confirm from global_history where ds = %s"
        # 查询数据是否存在数据库里，不存在则插入
        for k, v in dic.items():
            if not cursor.execute(sql_query, k):
                print(k, v)
                cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("dead"), v.get("heal"),
                                     v.get("dead_rate"), v.get("heal_rate")])
        connect.commit()
        print(f"{time.asctime()}全球历史数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)


# ----------------国外全球处理end------------------------




# ----------------爬取疫苗数据start--------------------------

# 获取全球疫苗每百人接种数据和全球疫苗累计接种数据
def get_total_vaccinations_data():
    # 读取数据
    per_data = pd.read_csv(r'./static/csv/covid-vaccination-doses-per-capita.csv')
    total_data = pd.read_csv(r'./static/csv/cumulative-covid-vaccinations.csv')
    per_data.head()
    total_data.head()

    vaccine_list = []
    for i in range(0, per_data.shape[0]):  # 利用shape的第一个元素来获取数据的数量
        per_row_data = per_data.iloc[i]  # 获取第每行数据
        total_row_data = total_data.iloc[i]
        per_row_data.fillna('null', inplace=True)  # 找出每行的nan(NAN)值以null填充
        value = [per_row_data[2], str(per_row_data[0]), str(per_row_data[1]), total_row_data[3],
                 per_row_data[3]]  # 读取第每行中每列数据，由于数据库添加使用的都是字符串形式添加故都取str
        vaccine_list.append(value)

    return vaccine_list

# 获取完全接种COVID-19疫苗的总人口中的份额和总人数
def get_people_fully_vaccinated_data():
    per_data = pd.read_csv(r'./static/csv/share-people-fully-vaccinated-covid.csv')
    total_data = pd.read_csv(r'./static/csv/people-fully-vaccinated-covid.csv')
    per_data.head()
    total_data.head()

    vaccine_list = []
    for i in range(0, per_data.shape[0]):  # 利用shape的第一个元素来获取数据的数量
        per_row_data = per_data.iloc[i]  # 获取第每行数据
        total_row_data = total_data.iloc[i]
        per_row_data.fillna('null', inplace=True)  # 找出每行的nan(NAN)值以null填充
        value = [per_row_data[2], str(per_row_data[0]), str(per_row_data[1]), total_row_data[3],
                 per_row_data[3]]  # 读取第每行中每列数据，由于数据库添加使用的都是字符串形式添加故都取str
        vaccine_list.append(value)
    return vaccine_list

# 获取已接受至少一剂COVID-19疫苗的总人口中的份额和总人数
def get_people_vaccinated_data():
    per_data = pd.read_csv(r'./static/csv/share-people-vaccinated-covid.csv')
    total_data = pd.read_csv(r'./static/csv/people-vaccinated-covid.csv')
    per_data.head()
    total_data.head()

    vaccine_list = []
    for i in range(0, per_data.shape[0]):  # 利用shape的第一个元素来获取数据的数量
        per_row_data = per_data.iloc[i]  # 获取第每行数据
        total_row_data = total_data.iloc[i]
        per_row_data.fillna('null', inplace=True)  # 找出每行的nan(NAN)值以null填充
        value = [per_row_data[2], str(per_row_data[0]), str(per_row_data[1]), total_row_data[3],
                 per_row_data[3]]  # 读取第每行中每列数据，由于数据库添加使用的都是字符串形式添加故都取str
        vaccine_list.append(value)
    return vaccine_list


# ----------------爬取疫苗数据eng----------------------------

# ----------------手动更新疫苗数据start--------------------------

# 更新全球疫苗每百人接种数据和全球疫苗累计接种数据
def update_total_vaccinations_data():
    #连接数据库
    cursor = None
    connect = None
    try:
        connect, cursor = get_conn()
        vaccine_list = get_total_vaccinations_data()
        print(f"{time.asctime()}全球疫苗每百人接种和累计接种数据开始更新")
        sql = "insert into `global_total_vaccinations`(ds,country,code,total_vaccine,per_hundred) values(%s,%s,%s,%s,%s)"
        for item in vaccine_list:  # 利用shape的第一个元素来获取数据的数量
            print(item)
            cursor.execute(sql, item)
        connect.commit()
        print(f"{time.asctime()}全球疫苗每百人接种和累计接种数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 更新完全接种COVID-19疫苗的总人口中的份额和总人数
def update_people_fully_vaccinated_data():
    #连接数据库
    cursor = None
    connect = None
    try:
        connect, cursor = get_conn()
        vaccine_list = get_people_fully_vaccinated_data()
        print(f"{time.asctime()}全球疫苗完全接种COVID-19疫苗的总人口中的份额和总人数数据开始更新")
        sql = "insert into `global_people_fully_vaccinated`(ds,country,code,people_fully_vaccinated,people_fully_vaccinated_per_hundred) values(%s,%s,%s,%s,%s)"
        for item in vaccine_list:  # 利用shape的第一个元素来获取数据的数量
            print(item)
            cursor.execute(sql, item)
        connect.commit()
        print(f"{time.asctime()}全球疫苗完全接种COVID-19疫苗的总人口中的份额和总人数数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)

# 更新已接受至少一剂COVID-19疫苗的总人口中的份额和总人数
def update_people_vaccinated_data():
    #连接数据库
    cursor = None
    connect = None
    try:
        connect, cursor = get_conn()
        vaccine_list = get_people_vaccinated_data()
        print(f"{time.asctime()}全球疫苗已接受至少一剂COVID-19疫苗的总人口中的份额和总人数数据开始更新")
        sql = "insert into `global_people_vaccinated`(ds,country,code,people_vaccinated,people_vaccinated_per_hundred) values(%s,%s,%s,%s,%s)"
        for item in vaccine_list:  # 利用shape的第一个元素来获取数据的数量
            print(item)
            cursor.execute(sql, item)
        connect.commit()
        print(f"{time.asctime()}全球疫苗已接受至少一剂COVID-19疫苗的总人口中的份额和总人数数据更新完毕")

    except:
        traceback.print_exc()
    finally:
        close_conn(connect, cursor)


# ----------------手动更新疫苗数据处理end--------------------------



if __name__ == "__main__":
    # update_hotsearch()
    # print(get_america_history_data())
    # # 参数列表长度
    len = len(sys.argv)
    if(len == 1):
        s = """
        请输入参数
        参数说明:
        up_his  更新全球和中国的历史数据
        up_hot  更新实时热搜
        up_de   更新全球和中国疫情详细数据
        up-risk 更新地区风险
        """
        print(s)
    else:
        # 0表示文件路径，1开始是参数
        order = sys.argv[1]
        if order == 'up_his':
            update_china_history_data()
            update_global_history_data()
            update_province_history_data()
        elif order == 'up_hot':
            update_hotsearch()
        elif order == 'up_risk':
            update_localrisk()
        elif order == 'up_det':
            update_details()
            update_global_country_latest_data()
            update_america_state_latest()
            # insert_america_state_history()
            # insert_america_history()
