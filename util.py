import time,datetime
import pymysql
import pandas as pd
from snownlp import SnowNLP

def get_time():
    time_str = time.strftime("%Y {} %m {} %d {} %X")
    return time_str.format("年","月","日")

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

#数据库查询
def query(sql, *args):
    """
    封装通用查询
    :param sql:
    :param args:
    :return  返回查询的结果，（（）,()）的形式
    """
    conn, cursor = get_conn()
    cursor.execute(sql, args)
    res = cursor.fetchall()
    close_conn(conn,cursor)
    return res


############国内数据begin#############

#获取全国的大屏数据
def get_big_screen_data():
    '''
    :return: 返回大屏中间的数据
    '''
    #取时间戳最新的那组数据
    sql = "select sum(confirm)," \
          "(select suspect from china_history ORDER BY ds desc limit 1)," \
          "sum(heal)," \
          "sum(dead) from details " \
          "where update_time = (SELECT update_time FROM details ORDER BY update_time desc LIMIT 1);" \

    sql2 = "select * from china_history where ds = (SELECT ds FROM china_history ORDER BY ds desc LIMIT 1);"

    sql3 = "select nowconfirm,ds FROM china_history ORDER BY ds desc LIMIT 2"

    res = query(sql)
    res2 = query(sql2)
    res3 = query(sql3)
    # print(res3)
    nowConfirm_add = res3[0][0] - res3[1][0]
    # print(nowConfirm_add)
    # 要有加0，否则返回就是字典格式这样得((),),加了0则返回()
    return res2[0],nowConfirm_add

#返回各国的确诊、疑似、治愈、死亡数据
def get_worldMap_data():
    sql = "select country, confirm, heal, dead from global_country_latest " \
          "where ds = (select ds from global_country_latest ORDER BY ds desc LIMIT 1) GROUP BY country"
    res = query(sql)
    return res

#返回各省份的确诊、疑似、治愈、死亡数据
def get_map_data():
    sql = "select province, sum(confirm), SUM(heal), SUM(dead), SUM(suspect) from details " \
          "where update_time = (SELECT update_time FROM details ORDER BY update_time desc limit 1) " \
          "GROUP BY province;"

    res = query(sql)
    # print(res)
    return res;

#返回各省份数据
def get_province_data(city):
    sql = "select city, confirm,heal,dead,suspect from details where province = '{}' and city not in ('境外输入','地区待确认');".format(city)
    res = query(sql)
    # print(res)
    return res;

#返回历史累计数据趋势
def get_l1_data():
    sql = "select ds, confirm, suspect, heal, dead from china_history ORDER BY ds desc "
    res = query(sql)
    return res

#返回历史新增数据趋势
def get_l2_data():
    sql = "select ds, confirm_add, suspect_add, heal_add, dead_add from china_history ORDER BY ds desc"
    res = query(sql)
    return res

def get_l3_data():
    sql = "select ds, dead_rate, heal_rate,dead_rate_add,heal_rate_add from china_history ORDER BY ds desc"
    res = query(sql)
    return res


#返回疾病数据
def get_l4_data():
    sql = "select ds, province, city, nowConfirm,confirm_add,grade from localrisk ORDER BY id desc"
    res = query(sql)
    return res


#省病患数排名
def get_r1_data():
    sql = "select province, sum(confirm_add), sum(heal), sum(dead) from details " \
          "where update_time = (select update_time from details ORDER BY update_time desc limit 1) " \
          "GROUP BY province ORDER BY sum(confirm_add) desc"
    res = query(sql)
    # print(res)
    return res

# 无症状+境外
def get_r2_data():
    sql = "select ds, importedCase, noInfect, importedCase_add, noInfect_add from china_history ORDER BY ds desc"
    res = query(sql)
    # print(res)
    return res

def get_r3_data():
    sql = "select ds, nowConfirm, nowSevere from china_history ORDER BY ds desc"
    res = query(sql)
    return res


# 热搜数据
def get_hotnews_data():
    sql = "select dt, content,link from hotsearch ORDER BY dt desc limit 20"
    res = query(sql)
    return res

############国内数据end#############

############全球数据begin#############
#获取全球的大屏数据
def get_global_screen_data():
    sql = "select sum(nowConfirm), sum(confirm), sum(heal), sum(dead)," \
          "sum(nowConfirm_add),sum(confirm_add),sum(heal_add),sum(dead_add) from global_country_latest " \
          "where ds = (select ds from global_country_latest ORDER BY ds desc LIMIT 1)"
    res = query(sql)
    return res[0]

def get_gl1_data():
    sql = "select ds, country, confirm from global_country_latest where " \
          "ds = (SELECT ds FROM global_country_latest ORDER BY ds desc limit 1) " \
          "order by confirm desc limit 10;"
    res = query(sql)
    return res;

def get_gr3_data():
    sql = "select country, nowConfirm from global_country_latest where " \
          "ds = (SELECT ds FROM global_country_latest ORDER BY ds desc limit 1) " \
          "order by nowConfirm desc;"
    res = query(sql)
    return res;

def get_gr1_data():
    sql = "select ds, confirm, dead, heal from global_history"
    res = query(sql)
    return res;

def get_gr2_data():
    sql = "select ds, confirm_add from global_history"
    res = query(sql)
    return res;

def get_gl2_data(method):
    if(method == "by_country"):
        sql = "select country, confirm, confirm_add, heal, dead from global_country_latest where " \
              "ds = (SELECT ds FROM global_country_latest ORDER BY ds desc limit 1) " \
              "order by confirm desc;"
    else:
        sql = "select continent, sum(confirm) confirm, sum(confirm_add) confirm_add, sum(heal) heal, sum(dead) dead from global_country_latest where " \
              "ds = (SELECT ds FROM global_country_latest ORDER BY ds desc limit 1) and continent != '' " \
              "GROUP BY continent ORDER BY confirm desc;"
    res = query(sql)
    return res;

def get_continent_details_data(name):
    sql = "select country, confirm, confirm_add, heal, dead from global_country_latest where continent = '{}' " \
          "and ds = (SELECT ds FROM global_country_latest ORDER BY ds desc limit 1) " \
          "order by confirm desc;".format(name)
    res = query(sql)
    return res
############全球数据end#############

############全球疫苗数据begin#############
#获取全球疫苗的大屏数据
def get_vaccine_screen_data():
    sql = "select a.total_vaccine,a.total_vaccine-b.total_vaccine total_add ,a.per_hundred, a.per_hundred - b.per_hundred per_add " \
          "from (select ds,country,total_vaccine,per_hundred from global_total_vaccinations " \
          "where country in ('World','China') ORDER BY ds desc limit 2) a, " \
          "(select ds,country,total_vaccine,per_hundred from global_total_vaccinations " \
          "where country in ('World','China') ORDER BY ds desc limit 2,2) b " \
          "where a.country = b.country"
    res = query(sql)
    return res

def get_worldMap_vaccine_data():
    sql = "select country,total_vaccine,per_hundred from global_total_vaccinations " \
          "where ds = (select ds from global_total_vaccinations ORDER BY ds desc LIMIT 1) "
    res = query(sql)
    return res

def get_vl1_data():
    sql = "select ds,total_vaccine from global_total_vaccinations where country = 'China' ORDER BY ds desc"
    res = query(sql)
    return res

def get_vl2_data():
    sql = "select ds,per_hundred from global_total_vaccinations where country = 'China' ORDER BY ds desc"
    res = query(sql)
    return res

# 疫苗词云
def get_vl3_data():
    word_data = pd.read_csv(r'./static/csv/vaccinations-words-data.csv')
    word_data.head()

    word_list = []
    for i in range(0, word_data.shape[0]):  # 利用shape的第一个元素来获取数
        tup = {}
        row = word_data.iloc[i]  # 获取第每行数据
        tup['name'] = str(row[1])
        tup['value'] = str(row[2])
        word_list.append(tup)
    # print(word_list)
    return word_list



# 获取每百人接种和累计接种
def get_vaccinations_data(table,params):
    sql = "select DISTINCT country from %s"%(table)
    coun_res = query(sql)
    data_res, countryList = [], []
    for i in coun_res:
        countryList.append(i[0])
        list = []
        tup = {}
        tup['country'] = i[0]
        sql2 = "select ds, country, %s from %s where country = %s" % (params,table,"\""+i[0]+"\"")
        per = query(sql2)
        for j in per:
            list.append([j[0].strftime('%Y-%m-%d'), j[1], j[2]])
        tup['data'] = list;
        data_res.append(tup)
    # print(data_res)
    # 各个地区拥有数据的日期天数
    # 找出用最大天数的一个国家
    maxLen = 0
    for i in data_res:
        data = i['data']
        # 找到最大的日期数的国家
        if (maxLen < len(data)):
            maxLen = len(data)
            country = i['country']

    # # 整合日期
    day = []
    day_short = []
    for info in data_res:
        if (info['country'] == country):
            list = info['data']
            for i in list:
                # 短的日期形式 01-21
                day_short.append(datetime.datetime.strptime(i[0], "%Y-%m-%d").strftime('%m-%d'))
                # 完整的日期形式 2020-01-21
                day.append(i[0])
    # print(day)
    # print(maxLen)
    #
    # # 整合数据
    value = []
    for i in data_res:
        k = 0
        list = []
        # print(i['country'])
        for j in i['data']:
            while (1):
                if (date_compare(j[0], day[k]) == 1):  # j[0]=day[k]
                    list.append(j[2])
                    k += 1
                    break
                elif (date_compare(j[0], day[k]) == 2):  # j[0]>day[k]
                    list.append(j[2])
                    k += 1
        while (k < maxLen):
            list.append(j[2])
            k += 1
        # print(k)
        # print(list)
        value.append(list)
    return day_short, countryList, value


def get_vaccined_share_data(table,params):
    sql = "select ds, country,%s p " \
          "from %s " \
          "where country in (select g.country from " \
          "(select country from %s " \
          "where ds = (select max(ds) from global_people_fully_vaccinated) " \
          "order by %s desc limit 10 ) g ) " \
          "ORDER BY ds desc" %(params,table,table,params)
    print(sql)
    res = query(sql)
    list = []
    days = []
    country = []
    for i in res:
        ds = i[0].strftime('%Y-%m-%d')
        if (len(days) == 0 or days[len(days) - 1] != ds):
            days.append(ds)
        if (len(country) == 0 or i[1] not in country):
            country.append(i[1])
        list.append([i[2], i[1], ds])

    data = []
    for i in days:
        tup = {}
        new_list = []
        tup['time'] = i
        for j in list:
            if (j[2] == i):
                new_list.append(j)
        tup['data'] = new_list

        data.append(tup)
    # print(data)

    total = []
    for i in data:
        p = []
        if (len(i['data']) != 10):
            # print('not enough')
            for val in i['data']:
                if (val[1] in country):
                    p.append(val[1])
        if (len(p)):
            for k in country:
                if (k not in p):
                    i['data'].append([0.0, k, i['time']])

    for i in data:
        for j in i['data']:
            total.append(j)
    return total, days


def get_vr1_data():
    return get_vaccined_share_data('global_people_fully_vaccinated','people_fully_vaccinated_per_hundred')
    sql = "select ds, country,people_fully_vaccinated_per_hundred from global_people_fully_vaccinated " \
          "ORDER BY ds desc"
    # sql = "select ds, country,people_fully_vaccinated_per_hundred p " \
    #       "from global_people_fully_vaccinated " \
    #         "where country in (select g.country from " \
    #              "(select country from global_people_fully_vaccinated " \
    #                  "where ds = (select max(ds) from global_people_fully_vaccinated) " \
    #                     "order by people_fully_vaccinated_per_hundred desc limit 10 ) g ) " \
    #     "ORDER BY ds desc"
    # res = query(sql)
    # list = []
    # days = []
    # country = []
    # for i in res:
    #     ds = i[0].strftime('%Y-%m-%d')
    #     if(len(days) == 0 or days[len(days)-1] != ds):
    #         days.append(ds)
    #     if (len(country) == 0 or i[1] not in country):
    #         country.append(i[1])
    #     list.append([i[2],i[1],ds])
    #
    # data = []
    # for i in days:
    #     tup = {}
    #     new_list = []
    #     tup['time'] = i
    #     for j in list:
    #         if(j[2] == i):
    #             new_list.append(j)
    #     tup['data']= new_list
    #
    #     data.append(tup)
    # # print(data)
    #
    # total = []
    # for i in data:
    #     p = []
    #     if(len(i['data'])!=10):
    #         # print('not enough')
    #         for val in i['data']:
    #             if(val[1] in country):
    #                 p.append(val[1])
    #     if(len(p)):
    #         for k in country:
    #             if(k not in p):
    #                 i['data'].append([0.0, k, i['time']])
    #
    # for i in data:
    #     for j in i['data']:
    #         total.append(j)
    # return total,days

def get_vr2_data():
    sql = "select pa.ds,pa.country,people_fully_vaccinated a1,people_fully_vaccinated_per_hundred a2,people_vaccinated b1, people_vaccinated_per_hundred b2 from global_people_fully_vaccinated pa, global_people_vaccinated pb " \
          "where pa.ds = (select max(ds) from global_people_fully_vaccinated) and pa.country <> 'World' " \
          "and pa.ds = pb.ds and pa.country = pb.country " \
          "ORDER BY a1 desc "
    res = query(sql)
    return res

def get_vb1_data():
    return get_vaccinations_data('global_total_vaccinations', 'per_hundred')

def get_vb2_data():
    return get_vaccinations_data('global_total_vaccinations', 'total_vaccine')


# 比较日期大小
def date_compare(date1, date2, fmt='%Y-%m-%d'):
    """
    比较两个真实日期之间的大小，date1 = date2 则返回1
                           date1 > date2      2
                           date1 < date2      0
    :param date1:
    :param date2:
    :param fmt:
    :return:
    """

    zero = datetime.datetime.fromtimestamp(0)

    try:
        d1 = datetime.datetime.strptime(str(date1), fmt)
    except:
        d1 = zero

    try:
        d2 = datetime.datetime.strptime(str(date2), fmt)
    except:
        d2 = zero
    if(d1==d2):
        return 1
    elif(d1>d2):
        return 2
    else:
        return 0

# 中国地图回放
def get_hl1_data():
    # 选取2020-01-23之后的所有记录
    sql = "select ds, province, confirm from province_history where ds >='2020-01-23' order by ds"
    res = query(sql)

    data = []
    days = []
    provinces = []

    for i in res:
        ds = i[0].strftime('%Y-%m-%d')
        if (len(days) == 0 or days[len(days) - 1] != ds):
            days.append(ds)
        if (len(provinces) == 0 or i[1] not in provinces):
            provinces.append(i[1])
        data.append([ds,i[1],i[2]])

    seriesdata = []
    value = []
    for i in days:
        for j in provinces:
            for k in data:
                if (k[0] == i and k[1] == j):
                    value.append(k[2])
        seriesdata.append(value)
        # print(seriesdata)
        value = []

    print(seriesdata)
    return days,provinces,seriesdata



def get_city_trend(area,name):
    if(area == 'china'):
        # 按省份查询
        sql = "select update_time, city, confirm, suspect, heal, dead from details where province like %s order by city" % ("\"" + name + "\"")
        res = query(sql)
        # 按城市查询
        if(len(res) == 0):
            sql = "select update_time, city, confirm, suspect, heal, dead from details where city like %s order by update_time" % ("\"" + name+ "\"")
            res = query(sql)
    elif(area == 'world'):
        # 按国家查询
        sql = "select ds,country, confirm, suspect,heal, dead from global_country_history " \
              "where country like %s order by ds" % ("\"" + name + "\"")
        res = query(sql)
    elif(area == 'america'):
        sql = "SELECT ds, city, confirm, suspect, heal, dead FROM america_state " \
              "where city like %s ORDER BY cityMap ,ds " % ("\"" + name + "\"")
        res = query(sql)

    city,day = [],[]
    for i in res:
        if(len(city) == 0 or city[len(city)-1] != i[1]):
            city.append(i[1])

    data = []
    for i in city:
        # print(i)
        tup,value = {},{}
        day, confirm, suspect, heal, dead = [],[],[],[],[]
        tup['city'] = i
        for j in res:
            if(j[1] == i):
                ds = j[0].strftime('%Y-%m-%d')
                day.append(ds)
                confirm.append(j[2])
                suspect.append(j[3])
                heal.append(j[4])
                dead.append(j[5])
        value['day'] = day
        value['confirm'] = confirm
        value['suspect'] = suspect
        value['heal'] = heal
        value['dead'] = dead
        tup['data'] = value
        # print(tup)
        data.append(tup)
    print(data)
    return data


def get_trend_data(area):
    if(area == 'china'):
        sql = "select ds,province, province_code, confirm, suspect,heal, dead, confirm_add, suspect_add, heal_add, dead_add from province_history order by province,ds"
    elif(area == 'world'):
        sql = "select ds,country, country_code, confirm, suspect,heal, dead, confirm_add, suspect_add, heal_add, dead_add from global_country_history order by country"
    elif(area == 'america'):
        # 先按cityMap分组，再按ds字段排序
        sql = "SELECT ds, city, cityMap, confirm, suspect, heal, dead, confirm_add, 0 suspect_add,0 heal_add,0 dead_add FROM america_state where cityMap <> '' ORDER BY cityMap ,ds "
    print(sql)
    res = query(sql)

    name,code, day = [], [],[]
    for i in res:
        if (len(name) == 0 or name[len(name) - 1] != i[1]):
            name.append(i[1])

    data = []
    for i in name:
        # print(i)
        tup, value = {}, {}
        day, confirm, suspect, heal, dead,confirm_add,suspect_add,heal_add,dead_add = [], [], [], [], [], [], [], [], []
        tup['name'] = i
        for j in res:
            if (j[1] == i):
                code = j[2]
                ds = j[0].strftime('%Y-%m-%d')
                day.append(ds)
                confirm.append(j[3])
                suspect.append(j[4])
                heal.append(j[5])
                dead.append(j[6])
                confirm_add.append(j[7])
                suspect_add.append(j[8])
                heal_add.append(j[9])
                dead_add.append(j[10])
        tup['code'] = code
        value['day'] = day
        value['confirm'] = confirm
        value['suspect'] = suspect
        value['heal'] = heal
        value['dead'] = dead
        value['confirm_add'] = confirm_add
        value['suspect_add'] = suspect_add
        value['heal_add'] = heal_add
        value['dead_add'] = dead_add
        tup['data'] = value
        print(tup)
        data.append(tup)
    # print(data)
    return data


def get_america_screen_data():
    sql = "select confirm,confirm_add,nowConfirm,nowConfirm_add, heal,heal_add,dead,dead_add from global_country_latest  " \
          "where country = '美国' and ds = (select ds from global_country_latest ORDER BY ds desc limit 1)"
    res = query(sql)
    return res[0]

def get_america_map_data():
    sql = "select city,confirm,heal,dead,suspect from america_state where ds = (select max(ds) from america_state) and cityMap <> '' " \
          "ORDER BY cityMap"
    res = query(sql)
    return res

def get_al1_data():
    sql = "select ds,confirm,suspect,heal,dead from global_country_history where country = '美国' " \
          "UNION all " \
          "select ds,confirm,suspect,heal,dead from global_country_latest where country = '美国'"
    res = query(sql)
    return res

def get_al2_data():
    sql = "select ds,confirm_add,heal_add,dead_add from global_country_history where country = '美国' " \
          "UNION all " \
          "select ds,confirm_add,heal_add,dead_add from global_country_latest where country = '美国'"
    res = query(sql)
    return res

def get_al3_data():
    sql = "select ds,totalTestResults, totalTestResults_add from america_history "
    res = query(sql)
    return res

def get_al4_data():
    sql = "select ds,hospitalized, nowHospitalized, hospitalized_add from america_history "
    res = query(sql)
    return res

def get_ar1_data():
    sql = "select ds,confirm,negative from america_history"
    res = query(sql)
    return res

def get_ar2_data():
    sql = "select ds,confirm_add,negative_add from america_history"
    res = query(sql)
    return res

def get_ar3_data():
    sql = "select ds, inIcu,nowInIcu from america_history"
    res = query(sql)
    return res


def get_ar4_data():
    sql = "select ds, onVentilator,nowOnVentilator from america_history"
    res = query(sql)
    return res

# 疫情词云图
def get_yq_word_cloud_data():
    word_data = pd.read_csv(r'./static/csv/yq-words-data.csv')
    word_data.head()

    word_list = []
    for i in range(0, word_data.shape[0]):  # 利用shape的第一个元素来获取数
        tup = {}
        row = word_data.iloc[i]  # 获取第每行数据
        tup['name'] = str(row[1])
        tup['value'] = str(row[2])
        word_list.append(tup)
    print(word_list)
    return word_list

# 微博热词
def get_sl1_data():
    word_data = pd.read_csv(r'./static/csv/weibo-words-data.csv')
    word_data.head()

    word_list = []
    for i in range(0, 5):  # 利用shape的第一个元素来获取数
        tup = {}
        row = word_data.iloc[i]  # 获取第每行数据
        tup['name'] = str(row[1])
        tup['value'] = str(row[2])
        word_list.append(tup)
    # print(word_list)
    return word_list

# 微博情感分析
def get_sr1_data():
    word_data = pd.read_csv(r'./static/csv/weiboComments.csv')
    word_data.head()

    sentimentslist = []
    topic, comment = [], []
    for i in range(0, word_data.shape[0]):  # 利用shape的第一个元素来获取数
        row = word_data.iloc[i]  # 获取第每行数据
        t = row['话题内容'].replace(' ', '')
        p = row['评论内容'].replace(' ', '')
        if t != '':
            topic.append(t)
        if p != '':
            comment.append(p)

    for i in comment:
        s = SnowNLP(i)
        # print(i)
        # print(s.sentiments)
        sentimentslist.append(s.sentiments)
    print(sentimentslist)
    return sentimentslist
    # import matplotlib.pyplot as plt
    # import numpy as np
    # plt.hist(sentimentslist, bins=np.arange(0, 1, 0.01), facecolor='g')
    # plt.xlabel('Sentiments Probabilty')
    # plt.ylabel('Quantity')
    # plt.title('Analysis of Sentiments')
    # plt.show()

# 微博正负评价分析
def get_sr2_data():
    data = pd.read_csv(r'./static/csv/weibo-evaluation-results.csv')
    # 积极、负面、公立评价百分比
    pos = data.sum()['positive']
    neg = data.sum()['negative']
    neu = data.sum()['neutral']

    return {'name':'positive','value':pos},{'name':'negative','value':neg},{'name':'neutral','value':neu}

if __name__ == '__main__':
    print(get_sr2_data())