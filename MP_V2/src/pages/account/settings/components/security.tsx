import React, { useState } from 'react';
import { List } from 'antd';
import { useModel } from 'umi';
import ModalShow from './modalshow';

const SecurityView: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [modalType, setModalType] = useState<number | boolean>(false); //弹窗展示类型

  const getData = () => [
    {
      title: '账户密码',
      description: `当前密码：**************`,
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setModalType(1);
          }}
        >
          修改
        </a>,
      ],
    },
    {
      title: '手机',
      description: `已绑定手机：${initialState?.currentUser?.phone}`,
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setModalType(2);
          }}
        >
          修改
        </a>,
      ],
    },

    {
      title: '邮箱',
      description: `已绑定邮箱：${initialState?.currentUser?.email}`,
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setModalType(3);
          }}
        >
          修改
        </a>,
      ],
    },
  ];
  const handleSubmit = () => {
    refresh();
    setModalType(false);
  };
  const handleCancel = () => {
    setModalType(false);
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ModalShow
        modalType={modalType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        info={initialState?.currentUser as user}
      />
    </>
  );
};

export default SecurityView;
