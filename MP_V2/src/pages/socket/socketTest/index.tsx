import React, {  useState } from 'react';
import { useModel } from 'umi';
import './index.less';
import { Card } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const WStestRoom: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [messageValue, setMessageValue] = useState<string>('你好呀~');

  const sendMessage = async() => {
    let messageData = {
      userId: initialState?.currentUser?.userid,
      content: messageValue,
    };
    if (!!initialState?.socket) {
      initialState?.socket.send(JSON.stringify(messageData));
    } else {
    await( initialState?.openSocket as any)(initialState?.currentUser?.userid as  number)
    initialState?.socket.send(JSON.stringify(messageData));

    }
  };

  return (
    <Card className="wstestroom">
      <p>在此您可以向全体正在使用网站的小伙伴打招呼~</p>

      <p>在下方输入您要传达的内容</p>
      <TextArea
        maxLength={50}
        showCount
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder="请输入您要传递的内容"
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
