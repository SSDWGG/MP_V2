import { updateUser } from '@/services/user';
import ProForm, { ProFormInstance, ProFormTextArea } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useRef } from 'react';
import { useModel } from 'umi';
const TodoSetting: React.FC = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();
  const handleFinish = async () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const p = { ...values };
      p.userid = initialState?.currentUser?.userid;
      delete p.province;
      delete p.city;
      await updateUser(p);
      await refresh();
      message.success('更新基本信息成功');
    });
  };
  return (
    <ProForm
      layout="vertical"
      onFinish={handleFinish}
      validateTrigger="onBlur"
      formRef={formRef}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          children: '更新基本信息',
        },
      }}
      initialValues={initialState?.currentUser}
      hideRequiredMark
    >
      <ProFormTextArea
        name="signature"
        label="头部格言"
        width="lg"
        rules={[
          {
            required: true,
            message: '请输入个人格言!',
          },
        ]}
        placeholder="个人格言"
      />
      <ProFormTextArea
        name="scrolltip"
        label="滚动格言"
        width="lg"
        rules={[
          {
            required: true,
            message: '请输入个人格言!',
          },
        ]}
        placeholder="个人格言"
      />
      {/* <ProFormTextArea
        name="11111"
        label="日程分类"
        width="lg"
        rules={[
          {
            required: true,
            message: '请输入个人格言!',
          },
        ]}
        placeholder="个人格言"
      /> */}
    </ProForm>
  );
};

export default TodoSetting;
