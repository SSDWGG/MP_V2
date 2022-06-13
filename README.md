**MP_V2项目地址**：[github 地址](https://github.com/SSDWGG/MP_V2.git)

# MP_V2

### 前言

这是一个多功能集合的项目，该项目主要基于 ant design pro 框架

前台使用 ant design pro 为基础开发
服务端 使用 springboot 来启服务

项目启动方式：
在 mysql 数据库中建立数据库，导入 sql 文件
后端 中链接数据库和端口等设置
服务端启动 ：java启动
前端启动 ： 进入 antpro 文件夹 使用 npm install 安装依赖之后 使用 npm start 启动


项目持续更新开发中...
<br/>

### 1.项目截图

![登录](V2_imgList/login.png)
![注册](V2_imgList/register.png)
![注册结果](V2_imgList/registerResult.png)
![日程表todolist](V2_imgList/todoList.png)
![个人卡片](V2_imgList/accountCard.png)
![个人设置base](V2_imgList/accountSettingBase.png)
![个人设置security](V2_imgList/accountSettingSecurity.png)
![个人设置todo](V2_imgList/accountSettingTodo.png)
<br/>

### 2.项目功能列举

现有的项目功能
- [x] 用户注册功能
- [x] 用户登录功能
- [x] 使用 jwt 完成账号的权限验证
- [x] 日程表功能（todoList）
- [x] 用户个性化配置（头像，信息，系统页面配置等）

未来将会开发的功能
- [x] 备忘录功能
- [x] socket聊天室功能
- [x] 音乐播放器功能
- [x] 一些其他的定制功能


<br/>

### 3.功能模块介绍
用户注册功能  ，按照表单填写信息即可，用户名这里我用了一个重复性校验。如果用户名已经被使用，会有提示。邮箱注册暂未开放验证码，如果有需要可以参考我的rabbitmall项目中的注册，使用到了邮箱验证注册的功能

用户登录功能 ， 填写用户名和密码，后台通过校验会返回一个token，前端将token存放在浏览器中，并且在请求拦截器中，加入这个token到头部，后端会校验token是否可用
[springboot整合jwt 技术参考](https://blog.csdn.net/weixin_46195957/article/details/115326648)
（登录注册模块的接口token验证放开，其余接token后端需要开启token验证）


日程表todolist功能 ： 

头部展示了一些用户信息，如果想修改这些用户信息，可以在用户信息模块修改配置
搜索栏有三个搜索项，任务标题，任务分类，任务进行状态
表格主体使用的是protable来实现的，这里包含了两张表格（分页显示和拖拽排序显示），因为两者是不兼容的，可以点击切换
表格中的一些时间项可以用来排序（在表头部分）



个人信息展示和配置功能：

子页面1：个人卡片  展示了一些个人信息和个人标签组件

子页面2：配置项管理   在这个页面里面可以配置系统的多处信息（目前头像上传功能暂时未开启，因为我是直接传头像到服务器的，也可以尝试转base64直接存数据库）