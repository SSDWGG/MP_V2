import React, { useState } from 'react';
import { useModel } from 'umi';
import './index.less';
import { Card } from 'antd';
import WangEditor from '@/components/WangEditor';
import { IDomEditor } from '@wangeditor/editor';
import { socketEditorDefaultValue } from '@/util/const';
import { editorH5ToNormal } from '@/common/utils';

const WStestRoom: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [messageValue, setMessageValue] = useState<string>( socketEditorDefaultValue);

  const sendMessage = async () => {
    console.log(messageValue);
    
    let messageData = {
      userId: initialState?.currentUser?.userid,
      content:editorH5ToNormal(messageValue) ,
    };
    if (!!initialState?.socket) {
      initialState?.socket.send(JSON.stringify(messageData));
    } else {
      await (initialState?.openSocket as any)(initialState?.currentUser?.userid as number);
      initialState?.socket.send(JSON.stringify(messageData));
    }
  };

  const handleChangeEditor = (editor: IDomEditor) => {
    setMessageValue(editor.getHtml());
  };
  return (
    <Card className="wstestroom">
      <p>此工具可以帮助您向全站在线的的小伙伴进行广播~</p>
      <WangEditor h5Content={messageValue} onChange={handleChangeEditor} />

      <div>
        <a onClick={() => sendMessage()}>发送消息</a>
      </div>
    </Card>
  );
};
export default WStestRoom;
