
import time, json, requests,pymysql
import traceback
from selenium.webdriver import Chrome, ChromeOptions
import time
def get_hotnews_data():
    url = "https://voice.baidu.com/act/newpneumonia/newpneumonia/"
    # 无头模式，无需打开浏览器，效率快
    option = ChromeOptions()
    # 隐藏浏览器
    option.add_argument("--headless")
    # # linux部署
    option.add_argument("--no-sandbox")
    browser = Chrome(options = option)
    # 打开百度疫情数据
    browser.get(url)
    # 整个网站的源码
    # print(browser.page_source)
    # 模拟按钮模仿人浏览网站点击展开
    but = browser.find_element_by_css_selector('#ptab-1 > div.Virus_1-1-295_2SKAfr > div.Common_1-1-295_3lDRV2 > span')
    # 模拟点击按钮，点击展开
    but.click()
    # 等待1秒
    time.sleep(1)
    link = []
    content = []
    # 获取热搜头条信息
    news = browser.find_elements_by_xpath('//*[@id="ptab-1"]/div[3]/div/div[2]/a/div')
    a = browser.find_elements_by_xpath('//*[@id="ptab-1"]/div[3]/div/div[2]/a')

    for i, j in zip(news, a):
        # 热搜头条标题
        content.append(i.text)
        link.append(j.get_attribute("href"))
        print(i.text)
        print(j.get_attribute("href"))
        print("\n")
    # 获取头条全文链接

    # 关闭浏览
    # browser.close()
    return content

context = get_hotnews_data()
print(context)