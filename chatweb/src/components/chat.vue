<template>
  <div align="center">
    <el-row style="width: 50%;">
      <!--      用户列表-->
      <el-col :span="6">
        <el-card style="width: 100%;height: 800px">
          <div style="text-align: center;font-size: 28px;margin-bottom: 10px">当前聊天室成员</div>
          <div style="height: 700px;overflow-y:auto;border:1px solid #000000;border-radius: 5px">
            <div v-for="(item,index) in userList" :key="index" style="padding: 10px;margin-top: 10px;font-size: 20px">
              {{item}}
            </div>
          </div>
        </el-card>
      </el-col>
      <!--      聊天室-->
      <el-col :span="18">
        <div style="width: 100%;">
          <el-card style="width: 100%;height: 800px">
            <div style="text-align: center;font-size: 28px;margin-bottom: 10px">一起聊天吧</div>
            <div style="width: 100%;height: 550px;border:1px solid #000000;border-radius: 5px;overflow-y:auto;margin-bottom: 10px">
              <div v-for="(item,index) in msgList" :key="index">
<!--                {{item.from}}{{item.msg}}{{item.time}}-->
                <div align="right" v-if="item.from===user" style="color: dodgerblue">{{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.msg}}<el-tag size="mini">{{item.from}}</el-tag></div>
                <div align="left" v-else style="color: coral"><el-tag size="mini" type="danger">{{item.from}}</el-tag>{{item.msg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}</div>
              </div>
            </div>
            <el-input @keyup.enter.native="send" type="textarea" v-model="message.msg" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入聊天内容"></el-input>
            <div align="right">
              <el-button type="primary" style="margin-top: 10px" @click="send">发送</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  let socket;

  export default {
    name: 'chat',
    data() {
      return {
        // 登录用户
        user: '',
        // 消息记录列表
        msgList: [],
        // 发送的消息
        message: {
          time:null,//时间
          to: '',//发给谁
          from: '',
          msg: ''
        },
        // 在线用户列表
        userList: []
      }
    },
    methods: {
      init() {
        // 如果sessionStorage中没有用户信息，则跳转登录页面
        this.user = sessionStorage.getItem('user')
        if (!this.user) {
          this.$router.push('/')
        }
        let that = this;
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          console.log("您的浏览器支持WebSocket");
          let socketUrl = "ws://localhost:9050/socket/" + this.user;
          if (socket != null) {
            socket.close();
            socket = null;
          }
          // 开启一个websocket服务
          socket = new WebSocket(socketUrl);
          //打开事件
          socket.onopen = function () {
            console.log("websocket已打开");
          };
          //  浏览器端收消息，获得从服务端发送过来的文本消息
          socket.onmessage = function (msg) {
            console.log("收到数据====" + msg.data)
            let data = JSON.parse(msg.data)
            if (data.userNames) {
              // userNames存在则是有人登录，获取在线人员信息
              that.userList = data.userNames
            } else {
              // userNames不存在则是有人发消息
              that.msgList.push(data)
            }
          };
          //关闭事件
          socket.onclose = function () {
            console.log("websocket已关闭");
          };
          //发生了错误事件
          socket.onerror = function () {
            console.log("websocket发生了错误");
          }
        }
      },
      send() {
        if (!this.message.msg) {
          this.$message({
            message: '大兄弟，请输入聊天消息！',
            type: 'warning'
          });
        } else {
          if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
          } else {
            console.log("您的浏览器支持WebSocket");
            this.message.from=this.user;
            this.message.time=new Date().toLocaleTimeString();
            socket.send(JSON.stringify(this.message));
            this.message.msg = '';
          }
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
