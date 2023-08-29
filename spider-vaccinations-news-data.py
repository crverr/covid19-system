import time,jieba,csv
import re,requests
import pandas as pd
from selenium.webdriver import Chrome, ChromeOptions
import chardet
from bs4 import BeautifulSoup,Comment
from collections import Counter

# fp = open('./static/csv/vaccinations-news-data.csv','a',newline='',encoding='utf-8-sig')
# writer = csv.writer(fp)
# writer.writerow(('标题',"时间","URL","正文内容","来源"))

# ----------------基于文本密度的新闻正文抽取方法start-----------------------
# 处理每个网页的编码问题，参数输入为request.content,返回值就是该网页的编码。
def GetCharset(content):
     return chardet.detect(content)['encoding']

# 请求网页html代码
def getcontentfromweb(src):
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
    }
    obj = requests.get(src, headers)
    obj.encoding = GetCharset(obj.content)
    # return obj.text.encode('utf-8')
    return obj.text

# 过滤html标签
def filter_tags(html_str):
    soup =BeautifulSoup(html_str,'lxml')
    # print(soup)
    # title =soup.title.string.encode().decode('utf-8')
    # 把html文本里的script、style清理掉
    [script.extract() for script in soup.findAll('script')]
    [style.extract() for style in soup.findAll('style')]
    #去掉html代码中的注释：
    comments = soup.findAll(text=lambda text: isinstance(text, Comment))
    [comment.extract() for comment in comments]
    #去掉html标签
    reg1 = re.compile("<[^>]*>")
    content = reg1.sub('', soup.prettify()).split('\n')
    #content是纯文本，但仍有许多空白行和空字符串
    return content

# 过滤+提取新闻正文内容
def getcontent(lst):
    # 文本各个小段长度
    lstlen = [len(x) for x in lst]
#     print(lstlen)
    threshold=50
    startindex = 0
    # 找出文本列表中数量最大的索引
    maxindex = lstlen.index(max(lstlen))
    endindex = 0
    #enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标
    # 找出密集长段落文本的开头和结尾的索引值
    for i,v in enumerate(lstlen[:maxindex-3]):
        # 找出文本段落长度大于50个字符的索引，并且之后的文本段落都大于5
        if v> threshold and lstlen[i+1]>5 and lstlen[i+2]>5 and lstlen[i+3]>5:
            startindex = i
            break
    for i,v in enumerate(lstlen[maxindex:]):
        if v< threshold and lstlen[maxindex+i+1]<10 and lstlen[maxindex+i+2]<10 and lstlen[maxindex+i+3]<10:
            endindex = i
            break
    #strip() 方法用于移除字符串头尾指定的字符（默认为空格或换行符）或字符序列。
    content =[x.strip() for x in lst[startindex:endindex+maxindex] if len(x.strip())>0]
    return content

# 提取新闻正文函数
def extract_news_contents(url):
    ctthtml=getcontentfromweb(url)
    content =filter_tags(ctthtml)
    newcontent =getcontent(content)
    ctt =''.join(newcontent)
    return ctt

# ----------------基于文本密度的新闻正文抽取方法end------------------------
# ----------------获取疫苗新闻数据start------------------------
# 获取疫苗新闻数据
def get_vaccinations_news_data():
    fp = open('./static/csv/vaccinations-news-data.csv', 'a', newline='', encoding='utf-8-sig')
    writer = csv.writer(fp)
    writer.writerow(('标题', "时间", "URL", "正文内容", "来源"))
    url = "https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&rsv_dl=ns_pc&word=%E7%96%AB%E8%8B%97&tngroupname=organic_news&newVideo=12&x_bfe_rqs=03E80&x_bfe_tjscore=0.100000&pn={}"
    # 无头模式，无需打开浏览器，效率快
    option = ChromeOptions()
    # 隐藏浏览器
    option.add_argument("--headless")
    # linux部署
    option.add_argument("--no-sandbox")
    browser = Chrome(options=option)
    news = []
    page=1
    for i in range(0,20):
        # 获取不同页数的网页信息
        try:
            i*=10
            browser.get(url.format(str(i)))
            time.sleep(2)
        # 解决加载超时出错
        except TimeoutError:
            print("TimeoutError")
        print("爬取第{}页内容".format(page))

        # 获取网页信息
        try:
            # 查询到的主体内容
            main = browser.find_elements_by_class_name('result-op')
            for context in main:
                title = context.find_element_by_class_name('news-title_1YtI1')
                link = title.find_element_by_tag_name('a')   #新闻链接
                href = link.get_attribute('href')     # 新闻url
                source = context.find_element_by_class_name('news-source').find_elements_by_tag_name("span")
                laiyuan = source[0].text  # 新闻来源
                time2 = source[1].text  # 时间
                topic = title.text  # 新闻标题

                # 获取新闻正文
                print(href)
                content = extract_news_contents(href)
                news.append([topic,time2,href,content,laiyuan])
                # 写入csv文件中
                writer.writerow((topic,time2,href,content,laiyuan))
                # print(news)
        except Exception as err:
            print("未爬取成功：",err)
        page += 1
    fp.close()
    return news

# ----------------中文分词------------------------
# 保存高频词
def save_key_word():
    news = get_vaccinations_news_data()
    content = ''
    for i in news:
        content += i[0]+":"+i[3] + " "
    all_words = jieba.cut(content,cut_all=False)
    # 词频统计
    c = Counter()
    for x in all_words:
        if(len(x)>1 and x != '\r\n'):
            c[x] += 1

    # 输出词频最高的前10个词
    # for(k,v) in c.most_common(20):
    #     print("%s:%d"%(k,v))
    # 存储数据
    name = "./static/csv/vaccinations-words-data.csv"
    fw = open(name, 'w',encoding='utf-8')
    i=1
    # 输出词频最高的前50个词到csv文件
    try:
        for(k,v) in c.most_common(50):
            fw.write(str(i) + "," + str(k)+","+str(v)+"\n")
            i += 1
        fw.close()
    except:
        print("Over write file!")
        fw.close()

# save_key_word()


# 获取疫情新闻数据
def get_yiqing_news_data():
    fp = open('./static/csv/yq-news-data.csv', 'a', newline='', encoding='utf-8-sig')
    writer = csv.writer(fp)
    writer.writerow(('标题', "时间", "URL", "正文内容", "来源"))
    url = "https://www.baidu.com/s?ie=utf-8&medium=0&rtt=1&bsst=1&rsv_dl=news_b_pn&cl=2&wd=%E6%96%B0%E5%86%A0%E7%96%AB%E6%83%85&tn=news&rsv_bp=1&rsv_sug3=9&rsv_sug1=2&rsv_sug7=100&oq=&rsv_sug2=0&rsv_btype=t&f=8&inputT=1388&rsv_sug4=1896&x_bfe_rqs=03E80&x_bfe_tjscore=0.100000&tngroupname=organic_news&newVideo=12&pn={}"
    # 无头模式，无需打开浏览器，效率快
    option = ChromeOptions()
    # 隐藏浏览器
    option.add_argument("--headless")
    # linux部署
    option.add_argument("--no-sandbox")
    browser = Chrome(options=option)
    news = []
    page=1
    for i in range(0,20):
        # 获取不同页数的网页信息
        try:
            i*=10
            browser.get(url.format(str(i)))
            time.sleep(2)
        # 解决加载超时出错
        except TimeoutError:
            print("TimeoutError")
        print("爬取第{}页内容".format(page))

        # 获取网页信息
        try:
            # 查询到的主体内容
            main = browser.find_elements_by_class_name('result-op')
            for context in main:
                title = context.find_element_by_class_name('news-title_1YtI1')
                link = title.find_element_by_tag_name('a')   #新闻链接
                href = link.get_attribute('href')     # 新闻url
                source = context.find_element_by_class_name('news-source').find_elements_by_tag_name("span")
                laiyuan = source[0].text  # 新闻来源
                time2 = source[1].text  # 时间
                topic = title.text  # 新闻标题

                # 获取新闻正文
                print(href)
                content = extract_news_contents(href)
                news.append([topic,time2,href,content,laiyuan])
                # 写入csv文件中
                writer.writerow((topic,time2,href,content,laiyuan))
                # print(news)
        except Exception as err:
            print("未爬取成功：",err)
        page += 1
    fp.close()
    return news

def save_yiqing_key_word():
    news = get_yiqing_news_data()

    content = ''
    for i in news:
        content += i[0]+":"+i[3] + " "
    all_words = jieba.cut(content,cut_all=False)
    # 词频统计
    c = Counter()
    for x in all_words:
        if(len(x)>1 and x != '\r\n'):
            c[x] += 1

    # 输出词频最高的前10个词
    # for(k,v) in c.most_common(20):
    #     print("%s:%d"%(k,v))
    # 存储数据
    name = "./static/csv/yq-words-data.csv"
    fw = open(name, 'w',encoding='utf-8')
    i=1
    # 输出词频最高的前50个词到csv文件
    for(k,v) in c.most_common(500):
        fw.write(str(i) + "," + str(k)+","+str(v)+"\n")
        i += 1
    fw.close()

save_yiqing_key_word()
