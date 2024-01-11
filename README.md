**MP_V2项目地址**：[github 地址](https://github.com/SSDWGG/MP_V2.git)
**MP_V2项目地址**：[项目线上地址请点击](http://todo.ssdwgg.cn/)

# MP_V2

### 前言

这是一个多功能集合的项目，该项目主要基于 ant design pro 框架

前台使用 ant design pro 为基础开发
服务端 使用 springboot 来启服务
node 版本 （请使用小于17的node版本，作者使用16.18.1）

项目启动方式：
1.在 mysql 数据库中建立数据库（库名：MP_V2），导入 sql 文件

2.后端配置数据库：进入application.properties文件夹中修改设置（默认使用端口为3306  默认数据库MP_V2 默认账号root 默认密码123456）请根据你的实际情况修改
![数据库配置](V2_imgList/db.png)

3.服务端启动 ：正常java启动 接口端口默认开启为9050

4.前端启动 ： 进入 antpro 文件夹 使用 npm install 安装依赖 使用 npm start 启动 打开localhost:8000页面

5.登录注册：注册一个用户，然后使用账号密码登录


（项目中的上传下载功能，需要根据不同的服务器调整，如果有问题欢迎提问）
项目启动出现任何问题可以发起提问。本项目持续更新开发中...
<br/>

### 1.项目部分截图

![注册](V2_imgList/register.png)
![日程表todolist](V2_imgList/todoList.png)
![富文本备忘录](V2_imgList/beiwangluUpdate.png)
![趣味组件库](V2_imgList/FC.png)
![socket通信](V2_imgList/socketHello.png)
![个人设置](V2_imgList/accountSettingBase.png)
![jntm](V2_imgList/jntm.png)

<br/>

### 2.项目功能列举

现有的项目功能
- [x] 使用 jwt 接口鉴权和注册.登录.邮箱验证修改密码功能
- [x] 日程表功能（todoList）
- [x] 富文本备忘录功能
- [x] 鉴权管理员管理功能
- [x] socket通信功能
- [x] 趣味组件库（作者收录的一些有趣的页面和组件的代码，可下载）
- [x] 用户个账号页面性化配置（头像，信息，系统页面配置等）



<br/>

### 3.功能模块介绍
- [x] 用户注册功能  ，按照表单填写信息即可，用户名这里我用了一个重复性校验。如果用户名已经被使用，会有提示。

- [x] 通过邮箱验证码修改密码功能（html邮件） 默认使用25端口（云服务器厂商需要申请解封该端口）
![日程表todolist](V2_imgList/updatePassword.png)
![日程表todolist](V2_imgList/acceptCode.png)

- [x] 用户登录功能 ， 填写用户名和密码，后台通过校验会返回一个token，前端将token存放在浏览器中，并且在请求拦截器中，加入这个token到头部，后端会校验token是否可用
[springboot整合jwt 技术参考](https://blog.csdn.net/weixin_46195957/article/details/115326648)
（类似登录注册模块的部分接口token验证放开，其余接token后端需要开启token验证）


- [x] 日程表todolist功能 ： 
![日程表todolist](V2_imgList/todoList.png)
头部展示了一些用户信息，如果想修改这些用户信息，可以在用户信息模块修改配置

搜索栏有三个搜索项，任务标题，任务分类，任务进行状态

表格主体使用的是protable来实现的，这里包含了两张表格（分页显示和拖拽排序显示），因为两者是不兼容的，可以点击切换

表格中的一些时间项可以用来排序（在表头部分）

- [x] 个人信息展示和配置功能：

子页面1：个人卡片  展示了一些个人信息和个人标签组件
![个人卡片](V2_imgList/accountCard.png)

子页面2：配置项管理   在这个页面里面可以配置系统的多处信息，个人账号的一些账号密码修改。todo列表的一些配置
![个人设置base](V2_imgList/accountSettingBase.png)
![个人设置security](V2_imgList/accountSettingSecurity.png)
![个人设置todo](V2_imgList/accountSettingTodo.png)

- [x] 备忘录功能：
![备忘录](V2_imgList/beiwanglu.png)
![备忘录详细](V2_imgList/beiwangluUpdate.png)

- [x] 管理员管理功能：对于识别为管理员的用户会有一些特殊的权限页面，管理员的标识为users表中的admin字段   admin==1 为管理员
![管理员管理账号](V2_imgList/adminAccount.png)

- [x] 趣味组件库功能：提供了大量的作者收录的有趣的html，css动效，codeopen，个人开发者，组件库等公开的组件，提供zip压缩包下载，并使用gif展示每个组件的预览和点击放大预览。库持续更新...
![趣味组件库](V2_imgList/FC.png)

<br/>

### 4.部署
请求用了统一的api头，所以nginx代理配置转发就行。

贴下本项目的nginx配置
配置完成后可以直接通过localhost访问本地项目

```
server {
        listen       *  default_server;
        server_name  localhost;
        # 前端dist文件地址，此处是我的地址
        root       /Users/renshuaiweidemac/Desktop/localhostProject/MP_V2/dist;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
                #资源访问失败后定向到index.html
            try_files $uri $uri/ /index.html;
        }
        
        # 请求转发服务
	      location /v2/{
        proxy_pass http://localhost:9050;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   X-Real-IP         $remote_addr;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```

提醒本项目的图片文件的上传是指定上传到服务器的，如果你想部署使用该功能需要根据项目部署的实际路径改一下配置（前端upload组件和后端对应接口一起改下ip和存储地址），或者使用oss资源更加快速方便。
<!-- 联系请致信E-mail：1982549567@qq.com -->