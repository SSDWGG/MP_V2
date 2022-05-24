import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import type { FormInstance } from 'antd';

interface FormProps {
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
}
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const AppModifyForm: React.FC<FormProps> = (props) => {
  const { onCancel, onSubmit, visible } = props;
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const appId = localStorage.getItem('appId');
        const appSecret = localStorage.getItem('appSecret');
        console.log(appId, appSecret, formRef.current);

        formRef.current?.setFieldsValue({ appId, appSecret });
      }, 100);
    }
  }, [visible]);

  const handleSubmit = async () => {
    const fieldsValue = await formRef.current?.validateFields();
    const { appId, appSecret } = fieldsValue;
    localStorage.setItem('appId', appId);
    localStorage.setItem('appSecret', appSecret);
    message.success('保存成功！');
    return onSubmit();
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    onCancel();
  };
  const renderContent = () => {
    return (
      <>
        <Form.Item
          label="AppId"
          name="appId"
          rules={[
            {
              required: true,
              message: '请输入AppId',
            },
            // {
            //   pattern: /^[\da-zA-Z]{9}$/,
            //   message: '请输入正确的MRTC流名'
            // }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="AppSecret"
          name="appSecret"
          rules={[
            {
              required: true,
              message: '请输入AppSecret',
            },
            // {
            //   pattern: /^[\da-zA-Z]{9}$/,
            //   message: '请输入正确的MRTC流名'
            // }
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      width={560}
      bodyStyle={{ padding: '24px' }}
      destroyOnClose
      title="AppId && AppSecret"
      okText="保存"
      cancelText="取消"
      onOk={handleSubmit}
      visible={visible}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form {...formLayout} ref={formRef} validateTrigger={['onChange', 'onBlur']} preserve={false}>
        {renderContent()}
      </Form>
    </Modal>
  );
};
export default AppModifyForm;
