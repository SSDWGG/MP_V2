import React, { useState } from 'react';
import { useModel } from 'umi';
import './index.less';
import { Info } from '@/util/info';

const ChatRoom: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [messageValue, setMessageValue] = useState<string>('');

  const [allValue, setAllValue] = useState<{
    toUserId: string;
    contentText: string;
    userId: string;
  }>({} as any);

  let socket: any;

  function openSocket() {
    const socketUrl = `ws://${Info.wsIp}/api/pushMessage/${initialState?.currentUser?.userid}`;
    console.log(socketUrl);
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
      console.log(msg.data);
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
  }

  function sendMessage() {
    socket.send(`{
      toUserId:${initialState?.currentUser?.userid}1111,
      contentText: 'qwe'
    }`);
    // console.log(
    //   '{"toUserId":"' + allValue.toUserId + '","contentText":"' + allValue.contentText + '"}',
    // );
  }

  return (
    <>
      <p>【socket开启者的ID信息】：{initialState?.currentUser?.userid}</p>

      <p>【客户端向服务器发送的内容】：</p>
      <div>
        <input
          id="toUserId"
          name="toUserId"
          type="text"
          value={allValue.toUserId}
          onChange={(e) => {
            console.log(e);
          }}
          defaultValue={20}
        />
        <input
          id="contentText"
          name="contentText"
          type="text"
          value={allValue.contentText}
          onChange={(e) => {
            console.log(e);
          }}
          defaultValue="hello websocket"
        />
      </div>
      <p>【操作】：</p>
      <div>
        <a onClick={() => openSocket()}>开启socket</a>
      </div>
      <p>【操作】：</p>
      <div>
        <a onClick={() => sendMessage()}>发送消息</a>
      </div>
    </>
  );
};
export default ChatRoom;
