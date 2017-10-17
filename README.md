# Twitter-search-serve
使用express框架完成的搜索推特内容的服务器网站
## Synopsis 项目大纲
此项目是使用相关的Twitter的API借口，搭建一个可以查询足球队员信息的网站。同时在网站中能够显示最近一周时间内，与用户需要查询信息相关的每日推特数量。最后，如果查询曼联或者切尔西球员的twitter主页，还需要在网站中显示该球员的信息，包括身高体重，场上位置，身处俱乐部名称，此类信息通过调用维基百科的相关数据来显示。
## Motivation 创作动机
此项目是Intelligent Web课程的课程设计,占总成绩的100%。
## Installation 如何安装
在下载此项目前，需在用户电脑中配置好nodeJS环境以及npm环境。下载此项目，使用IDE打开(CODE)Serve文件夹或者在命令行窗口将文件目标路径定位到此文件夹。在命令行中输入npm install，能够自动下载package.js中的相关modules。在命令行中定位到bin文件夹，输入node www或者在IDE里执行bin／www，然后在浏览器中输入localhost:3000,即可进入网站进行相关操作(注:需要科学上网才能访问Twitter服务器)。
## API Reference
需要提前安装nodeJS环境，可以通过[nodeJS官方网站](http://nodejs.cn/)进行了解和安装。

需要提前安装npm环境，可以通过[npm官方网站](https://www.npmjs.com/)进行了解和安装。可以使用淘宝镜像访问npm服务器，可以通过[淘宝镜像](http://npm.taobao.org/)进行了解。

相关Twitter API信息，可以通过[Twitter Develpoment](dev.twitter.com/)进行了解和查询。

维基百科的相关信息是通过[DBpedia](http://wiki.dbpedia.org/)进行提取的。具体sparql的语法可以查询[介绍sparql的网站](http://www.xjtushilei.com/2012/11/04/sparql%E5%AD%A6%E4%B9%A0sparql%E7%A4%BA%E4%BE%8B-dbpedia%E5%9C%A8%E7%BA%BF%E9%AA%8C%E8%AF%81/)进行学习。sparql的语句可以在[wiki的官方在线测试网站](http://dbpedia.org/sparql)进行测试。
## Tests 项目运行效果
进入网站的主界面：![](https://github.com/frayds/Twitter-search-serve/raw/master/mainPage.png)

## Contributors 参与者介绍
濮一帆:advanced Computer Science, Department of Computer Science, University of Sheffield

Dr Steve Maddock:3D Computer Graphics 的授课老师,老师的相关信息可以前往-- [他的网站](http://staffwww.dcs.shef.ac.uk/people/S.Maddock/index.shtml)。
