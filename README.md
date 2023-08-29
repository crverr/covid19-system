# covid19-system

#### 介绍
基于Python的全国疫情监控系统
基于 Python+Flask+Echarts 技术，疫情数据收集通过网络爬虫技术爬取实时疫情、网站的搭建是基于Flask 框架，在此基础上搭配 Echarts 来将数据库中的数据映射成图表形式，实现数据可视化，同时利用 Ajax 技术局部刷新页面完成数据不断更新。

#### 技术栈
- HTML+CSS+JavaScript 三剑客
- Python
- Flask
- MYSQL
- Echarts

#### 安装教程

1. Flask框架

   官方文档：[https://flask.palletsprojects.com/en/2.0.x/](https://flask.palletsprojects.com/en/2.0.x/)

   中文文档：[https://dormousehole.readthedocs.io](https://dormousehole.readthedocs.io)

2.  主入口文件

运行主入口文件 app.py， 网页 http://localhost:8080

3. 导入数据库
   covid19-system\static\sql\cov.sql

   

#### 系统已完成功能

1.全国/世界疫情数据概览
2.全国/世界疫情地图
3.全国/世界累计趋势
4.全国/世界新增趋势
5.全国/世界各地本土病例表
6.全国/世界病患总数排名
7.全国境外输入病例趋势
8.全球疫苗接种数据情况
9.新闻实时播报，按时间顺序呈现近期关于肺炎疫情新闻。




#### 系统界面

![](F:\DeskTop\本科毕设\covid19-system\static\images\1.png)

![2](F:\DeskTop\本科毕设\covid19-system\static\images\2.png)

![3](F:\DeskTop\本科毕设\covid19-system\static\images\3.png)

![4](F:\DeskTop\本科毕设\covid19-system\static\images\4.png)

![5](F:\DeskTop\本科毕设\covid19-system\static\images\5.png)

![6](F:\DeskTop\本科毕设\covid19-system\static\images\6.png)



#### 数据库设计

热搜新闻Hotsearch数据表字段说明

| 列名        | 数据类型     | 是否为空 | 约束条件 | 说明     |
| ----------- | ------------ | -------- | -------- | -------- |
| id          | int(11)      | not null | 主键     | 序号     |
| update_time | datetime     | null     | 无       | 更新时间 |
| content     | varchar(255) | null     | 无       | 新闻标题 |
| link        | varchar(255) | null     | 无       | 新闻链接 |

 

 地区风险Localrisk数据表字段说明

| 列名        | 数据类型    | 是否为空 | 约束条件 | 说明         |
| ----------- | ----------- | -------- | -------- | ------------ |
| id          | int(11)     | not null | 主键     | 序号         |
| update_time | datetime    | null     | 无       | 更新时间     |
| province    | varchar(10) | null     | 无       | 省份名称     |
| city        | varchar(10) | null     | 无       | 市区名称     |
| confirm     | int(11)     | null     | 无       | 确诊人数     |
| confirm_add | int(11)     | null     | 无       | 确诊新增人数 |
| nowConfirm  | int(11)     | null     | 无       | 现有确诊人数 |
| heal        | int(11)     | null     | 无       | 治愈人数     |
| dead        | int(11)     | null     | 无       | 死亡人数     |
| grade       | varchar(20) | null     | 无       | 地区风险等级 |

 

全国每日疫情数据表字段说明

| 列名        | 数据类型    | 是否为空 | 约束条件 | 说明         |
| ----------- | ----------- | -------- | -------- | ------------ |
| id          | int(11)     | not null | 主键     | 序号         |
| update_time | datetime    | null     | 无       | 更新时间     |
| province    | varchar(10) | null     | 无       | 省份名称     |
| city        | varchar(10) | null     | 无       | 市区名称     |
| confirm     | int(11)     | null     | 无       | 确诊人数     |
| confirm_add | int(11)     | null     | 无       | 确诊新增人数 |
| nowConfirm  | int(11)     | null     | 无       | 现有确诊人数 |
| suspect     | int(11)     | null     | 无       | 疑似人数     |
| heal        | int(11)     | null     | 无       | 治愈人数     |
| dead        | int(11)     | null     | 无       | 死亡人数     |
| heal_rate   | varchar(20) | null     | 无       | 治愈率       |
| dead_rate   | varchar(20) | null     | 无       | 死亡率       |

 

 中国疫情历史数据表字段说明

| 列名             | 数据类型 | 是否为空 | 约束条件 | 说明               |
| ---------------- | -------- | -------- | -------- | ------------------ |
| update_time      | datetime | not null | 主键     | 更新时间           |
| confirm          | int(11)  | null     | 无       | 确诊人数           |
| confirm_add      | int(11)  | null     | 无       | 确诊新增人数       |
| suspect          | int(11)  | null     | 无       | 疑似人数           |
| suspect_add      | int(11)  | null     | 无       | 疑似新增人数       |
| heal             | int(11)  | null     | 无       | 治愈人数           |
| heal_add         | int(11)  | null     | 无       | 治愈新增人数       |
| heal_rate        | int(11)  | null     | 无       | 治愈率             |
| heal_rate_add    | int(11)  | null     | 无       | 新增治愈率         |
| dead             | int(11)  | null     | 无       | 死亡人数           |
| dead_add         | int(11)  | null     | 无       | 死亡新增人数       |
| dead_rate        | int(11)  | null     | 无       | 死亡率             |
| dead_rate_add    | int(11)  | null     | 无       | 新增死亡率         |
| importesCase     | int(11)  | null     | 无       | 境外输入           |
| importesCase_add | int(11)  | null     | 无       | 境外输入新增       |
| noInfect         | int(11)  | null     | 无       | 无症状感染人数     |
| noInfect_add     | int(11)  | null     | 无       | 新增无症状感染人数 |
| localConfirm     | int(11)  | null     | 无       | 本土确诊人数       |
| localConfirm_add | int(11)  | null     | 无       | 本土新增确诊人数   |
| nowConfrim       | int(11)  | null     | 无       | 现有确诊人数       |
| nowSevere        | int(11)  | null     | 无       | 现有重症病例       |

 

美国疫情历史数据表字段说明

| 列名                 | 数据类型 | 是否为空 | 约束条件 | 说明           |
| -------------------- | -------- | -------- | -------- | -------------- |
| update_time          | datetime | not null | 主键     | 更新时间       |
| confirm              | int(11)  | null     | 无       | 确诊人数       |
| confirm_add          | int(11)  | null     | 无       | 确诊新增人数   |
| suspect              | int(11)  | null     | 无       | 疑似人数       |
| heal                 | int(11)  | null     | 无       | 治愈人数       |
| dead                 | int(11)  | null     | 无       | 死亡人数       |
| dead_add             | int(11)  | null     | 无       | 死亡新增人数   |
| nagative             | int(11)  | null     | 无       | 阴性检测数     |
| nagative_add         | int(11)  | null     | 无       | 新增阴性检测数 |
| hospitalized         | int(11)  | null     | 无       | 累计住院人数   |
| hospitalized_add     | int(11)  | null     | 无       | 新增住院人数   |
| nowHospitalized      | int(11)  | null     | 无       | 现有住院人数   |
| inIcu                | int(11)  | null     | 无       | 累计ICU人数    |
| nowInIcu             | int(11)  | null     | 无       | 当前ICU人数    |
| onVentilator         | int(11)  | null     | 无       | 累计使用呼吸机 |
| nowOnVentilator      | int(11)  | null     | 无       | 当前使用呼吸机 |
| totalTestResults     | int(11)  | null     | 无       | 累计检测人数   |
| totalTestResults_add | int(11)  | null     | 无       | 新增检测人数   |

 

美国各州每日疫情数据表字段说明

| 列名        | 数据类型     | 是否为空 | 约束条件 | 说明         |
| ----------- | ------------ | -------- | -------- | ------------ |
| id          | int(11)      | not null | 主键     | 序号         |
| update_time | datetime     | not null | 无       | 更新时间     |
| name        | varchar(50)  | null     | 无       | 国家         |
| city        | varchar(50)  | null     | 无       | 城市中文     |
| cityMap     | varchar(100) | null     | 无       | 城市英文     |
| confirm     | int(11)      | null     | 无       | 确诊人数     |
| confirm_add | int(11)      | null     | 无       | 确诊新增人数 |
| suspect     | int(11)      | null     | 无       | 疑似人数     |
| suspect_add | int(11)      | null     | 无       | 疑似新增人数 |
| heal        | int(11)      | null     | 无       | 治愈人数     |
| dead        | int(11)      | null     | 无       | 死亡人数     |

 

全球疫情历史数据表字段说明

| 列名        | 数据类型 | 是否为空 | 约束条件 | 说明         |
| ----------- | -------- | -------- | -------- | ------------ |
| update_time | datetime | not null | 主键     | 更新时间     |
| confirm     | int(11)  | null     | 无       | 确诊人数     |
| confirm_add | int(11)  | null     | 无       | 确诊新增人数 |
| heal        | int(11)  | null     | 无       | 治愈人数     |
| dead        | int(11)  | null     | 无       | 死亡人数     |
| heal_rate   | int(11)  | null     | 无       | 治愈率       |
| dead_rate   | int(11)  | null     | 无       | 死亡率       |

 

全球各国疫情历史数据表字段说明

| 列名           | 数据类型    | 是否为空 | 约束条件 | 说明             |
| -------------- | ----------- | -------- | -------- | ---------------- |
| id             | int(11)     | not null | 主键     | 序号             |
| update_time    | datetime    | null     | 无       | 更新时间         |
| country        | varchar(50) | null     | 无       | 国家             |
| country_code   | varchar(50) | null     | 无       | 国家代码         |
| confirm        | int(11)     | null     | 无       | 确诊人数         |
| confirm_add    | int(11)     | null     | 无       | 确诊新增人数     |
| nowConfirm     | int(11)     | null     | 无       | 现有确诊人数     |
| nowConfirm_add | int(11)     | null     | 无       | 新增现有确诊人数 |
| suspect        | int(11)     | null     | 无       | 疑似人数         |
| suspect_add    | int(11)     | null     | 无       | 新增疑似人数     |
| heal           | int(11)     | null     | 无       | 治愈人数         |
| heal_add       | int(11)     | null     | 无       | 新增治愈人数     |
| dead           | int(11)     | null     | 无       | 死亡人数         |
| dead_add       | int(11)     | null     | 无       | 新增死亡人数     |

 

 全球各国疫情最新数据表字段说明

| 列名           | 数据类型    | 是否为空 | 约束条件 | 说明             |
| -------------- | ----------- | -------- | -------- | ---------------- |
| id             | int(11)     | not null | 主键     | 序号             |
| update_time    | datetime    | null     | 无       | 更新时间         |
| country        | varchar(50) | null     | 无       | 国家             |
| country_code   | varchar(50) | null     | 无       | 国家代码         |
| confirm        | int(11)     | null     | 无       | 确诊人数         |
| confirm_add    | int(11)     | null     | 无       | 确诊新增人数     |
| nowConfirm     | int(11)     | null     | 无       | 现有确诊人数     |
| nowConfirm_add | int(11)     | null     | 无       | 新增现有确诊人数 |
| suspect        | int(11)     | null     | 无       | 疑似人数         |
| heal           | int(11)     | null     | 无       | 治愈人数         |
| heal_add       | int(11)     | null     | 无       | 新增治愈人数     |
| dead           | int(11)     | null     | 无       | 死亡人数         |
| dead_add       | int(11)     | null     | 无       | 新增死亡人数     |

 

全球完全接种疫苗数据表字段说明

| 列名                                  | 数据类型    | 是否为空 | 约束条件 | 说明                   |
| ------------------------------------- | ----------- | -------- | -------- | ---------------------- |
| id                                    | int(11)     | not null | 主键     | 序号                   |
| update_time                           | datetime    | null     | 无       | 更新时间               |
| country                               | varchar(50) | null     | 无       | 国家                   |
| code                                  | varchar(50) | null     | 无       | 国家代码               |
| people_fully_vaccinated               | int(20)     | null     | 无       | 完全接种疫苗人数       |
| people_fully_vaccinated  _per_hundred | float(11)   | null     | 无       | 每百人完全接种疫苗人数 |

 

全球至少接种一剂疫苗数据表字段说明

| 列名                            | 数据类型    | 是否为空 | 约束条件 | 说明                   |
| ------------------------------- | ----------- | -------- | -------- | ---------------------- |
| id                              | int(11)     | not null | 主键     | 序号                   |
| update_time                     | datetime    | null     | 无       | 更新时间               |
| country                         | varchar(50) | null     | 无       | 国家                   |
| code                            | varchar(50) | null     | 无       | 国家代码               |
| people_ vaccinated              | int(20)     | null     | 无       | 至少接种一剂疫苗人数   |
| people_vaccinated  _per_hundred | float(11)   | null     | 无       | 每百人至少接种一剂人数 |

 

全球疫苗接种数据表字段说明

| 列名               | 数据类型    | 是否为空 | 约束条件 | 说明               |
| ------------------ | ----------- | -------- | -------- | ------------------ |
| id                 | int(11)     | not null | 主键     | 序号               |
| update_time        | datetime    | null     | 无       | 更新时间           |
| country            | varchar(50) | null     | 无       | 国家               |
| code               | varchar(50) | null     | 无       | 国家代码           |
| total_vaccinations | int(20)     | null     | 无       | 累计接种疫苗人数   |
| per_hundred        | float(11)   | null     | 无       | 每百人接种疫苗人数 |
