import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import './index.less';
import { Info } from '@/util/info';
import { message } from 'antd';

const ChatRoom: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [messageValue, setMessageValue] = useState<string>('哈哈哈');

  // // 登录用户
  // user: '',
  // // 消息记录列表
  // msgList: [],
  // // 发送的消息
  // message: {
  //   time:null,//时间
  //   to: '',//发给谁
  //   from: '',
  //   msg: ''
  // },
  // // 在线用户列表
  // userList: []

  let socket: any;
  const openSocket = () => {

   if(typeof (WebSocket) == "undefined" ){
    message.error('您的浏览器不支持WebSocket')
    return
   } 

    const socketUrl = `ws://${Info.wsIp}/api/pushMessage/${initialState?.currentUser?.userid}`;
    // 关闭之前的ws
    if (socket != null) {
      socket.close();
      socket = null;
    }
    // ['用户的token']
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      console.log('websocket已打开');
    };
    //获得消息事件
    socket.onmessage = function (msg: any) {
      let data = JSON.parse(msg.data)
      console.log('此处是收到的信息', data);
      message.success(`${data.contentText}`);
      //发现消息进入,开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function () {
      console.log('websocket已关闭');
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log('websocket发生了错误');
    };
  };
  useEffect(() => {
    openSocket();
    return !!socket && socket.onclose;
  }, []);

  const sendMessage = () => {
    let message = {
      toUserId: initialState?.currentUser?.userid,
      contentText: messageValue,
    };
    !!socket ? socket.send(JSON.stringify(message)) : openSocket();
  };

  return (
    <>
      <p>【socket开启者的ID信息】：{initialState?.currentUser?.userid}</p>

      <p>【客户端向服务器发送的内容】：</p>
      <h1>{messageValue}</h1>
      <div>
        <a onClick={() => sendMessage()}>发送消息</a>
      </div>
    </>
  );
};
export default ChatRoom;
