import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import './index.less';
import { SocketInfo } from '@/util/info';
import { Card, Input, message, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const WStestRoom: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [messageValue, setMessageValue] = useState<string>('你好呀~');

  let socket: any;
  const openSocket = () => {
    if (typeof WebSocket == 'undefined') {
      message.error('您的浏览器不支持WebSocket');
      return;
    }

    const socketUrl = SocketInfo.socketAllUserUrl + initialState?.currentUser?.userid;
    // 关闭之前的ws
    if (socket != null) {
      socket.close();
      socket = null;
    }
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      console.log('websocket已打开');
    };
    //获得消息事件
    socket.onmessage = function (msg: any) {
      let data = JSON.parse(msg.data);
      notification.open({
        message: `编号${data.userId.substring(data.userId.length - 4)}向您发来一条新消息~`,
        description: `${data.content}`,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        duration: 0,
      });
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
    let messageData = {
      userId: initialState?.currentUser?.userid,
      content: messageValue,
    };
    if (!!socket) {
      socket.send(JSON.stringify(messageData));
    } else {
      message.warning(`通信连接断开，目前正在重新为您建立通信连接，请尝试再次发送信息`);
      openSocket();
    }
  };

  return (
    <Card className="wstestroom">
      <p>在此您可以向全体正在使用网站通信连接的小伙伴打招呼~</p>

      <p>在下方输入您要传达的内容</p>
      <TextArea
        maxLength={50}
        showCount
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder="请输入您要传递的内内容"
        value={messageValue}
        onChange={(e) => {
          setMessageValue(e.target.value);
        }}
      />
      <div>
        <a onClick={() => sendMessage()}>发送消息</a>
      </div>
    </Card>
  );
};
export default WStestRoom;
