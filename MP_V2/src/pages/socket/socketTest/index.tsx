import React, { useState } from 'react';
const ChatRoom: React.FC = () => {

  const [allValue,setAllValue] = useState<{
    toUserId:string,
    contentText:string,
    userId:string
  }>({
  } as any); 

  let socket: any;

  function openSocket() {

      const socketUrl = "ws://localhost:9050/api/pushMessage/" + allValue.userId;
      console.log(socketUrl);
      if (socket != null) {
          socket.close();
          socket = null;
      }
      socket = new WebSocket(socketUrl);
      //打开事件
      socket.onopen = function() {
          console.log("websocket已打开");
      };
      //获得消息事件
      socket.onmessage = function(msg :any) {
          console.log(msg.data);
          //发现消息进入,开始处理前端触发逻辑
      };
      //关闭事件
      socket.onclose = function() {
          console.log("websocket已关闭");
      };
      //发生了错误事件
      socket.onerror = function() {
          console.log("websocket发生了错误");
      }
  }

  function sendMessage() {

      socket.send('{"toUserId":"' + allValue.toUserId + '","contentText":"' + allValue.contentText + '"}');
      console.log('{"toUserId":"' +allValue.toUserId + '","contentText":"' + allValue.contentText + '"}');
  }
  return (
    <>
  <p>【socket开启者的ID信息】：</p>
        <div><input id="userId" name="userId" type="text" defaultValue="10" value={allValue.userId}/></div>
        <p>【客户端向服务器发送的内容】：</p>
            <div><input id="toUserId" name="toUserId" type="text" value={allValue.toUserId} defaultValue={20}/>
                <input id="contentText" name="contentText" type="text" value={allValue.contentText} defaultValue="hello websocket"/>
            
            </div>
            <p>【操作】：</p>
                <div><a onClick={()=>openSocket()}>开启socket</a></div>
                <p>【操作】：</p>
                    <div><a onClick={()=>sendMessage()}>发送消息</a></div>
    </>)
};
export default ChatRoom;
