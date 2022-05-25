import { Button, Form, Input, message, Modal, Radio } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import AppModifyForm from '@/pages/mrtcExample/common/AppModify';
import { mrtcSourceDict } from '@/pages/mrtcExample/common/common';

interface FormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  visible: boolean;
}
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

const PreviewForm: React.FC<FormProps> = (props) => {
  const { onCancel, onSubmit, visible } = props;
  const formRef = useRef<FormInstance>(null);
  const [appModalVisible, setAppModalVisible] = useState(false);

  const handleSubmit = async () => {
    const fieldsValue = await formRef.current?.validateFields();
    console.log(fieldsValue, 'fieldsValue');

    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    if (!appId || !appSecret) {
      message.error('未配置全局AppId和AppSecret！');
    } else {
      const { mrtcType, mrtcNameHD, mrtcNameLD, mrtcDomain, userIdHD, userIdLD } = fieldsValue;
      let mrtcUrlHD = '';
      let mrtcUrlLD = '';
      if (mrtcType === 3) {
        mrtcUrlHD = `mrtc://${mrtcDomain}/live/${mrtcNameHD}`;
        mrtcUrlLD = `mrtc://${mrtcDomain}/live/${mrtcNameLD}`;
      } else {
        // @ts-ignore
        mrtcUrlHD = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcNameHD}`;
        // @ts-ignore
        mrtcUrlLD = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcNameLD}`;
      }
      return onSubmit({ mrtcUrlHD, mrtcUrlLD, userIdHD, userIdLD });
    }
    return null;
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    onCancel();
  };
  const renderContent = () => {
    return (
      <>
        <Form.Item
          label="MRTC流名来源"
          name="mrtcType"
          rules={[
            {
              required: true,
              message: '请选择MRTC流名来源',
            },
            // {
            //   pattern: /^[\da-zA-Z]{9}$/,
            //   message: '请输入正确的MRTC流名'
            // }
          ]}
          initialValue={1}
        >
          <Radio.Group
            options={[
              { label: 'DEV', value: 0 },
              { label: 'TEST', value: 1 },
              { label: 'UAT', value: 2 },
              { label: '其他MRTC域名', value: 3 },
            ]}
          />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) =>
            getFieldValue('mrtcType') === 3 ? (
              <Form.Item
                label="MRTC域名"
                name="mrtcDomain"
                rules={[
                  {
                    required: true,
                    message: '请输入MRTC域名',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item label="MRTC流名-低清" required>
          <Input.Group compact>
            <Form.Item name="mrtcNameLD" rules={[{ required: true, message: '请输入MRTC流名' }]}>
              <Input style={{ width: 250 }} placeholder="MRTC流名" />
            </Form.Item>
            <Form.Item name="userIdLD">
              <Input style={{ width: 120 }} placeholder="UserID(可选)" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="MRTC流名-高清" required>
          <Input.Group compact>
            <Form.Item name="mrtcNameHD" rules={[{ required: true, message: '请输入MRTC流名' }]}>
              <Input style={{ width: 250 }} placeholder="MRTC流名" />
            </Form.Item>
            <Form.Item name="userIdHD">
              <Input style={{ width: 120 }} placeholder="UserID(可选)" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </>
    );
  };

  return (
    <>
      <Modal
        width={640}
        bodyStyle={{ padding: '24px' }}
        destroyOnClose
        title="推流地址"
        okText="开始推流"
        cancelText="取消"
        onOk={handleSubmit}
        visible={visible}
        onCancel={handleCancel}
        maskClosable={false}
        footer={
          <>
            <Button type="default" onClick={() => setAppModalVisible(true)}>
              修改AppId && AppSecret
            </Button>
            <Button onClick={() => handleCancel()}>取消</Button>
            <Button type="primary" onClick={() => handleSubmit()}>
              开始推流
            </Button>
          </>
        }
        className="pushVideoStyle"
      >
        <Form {...formLayout} ref={formRef} preserve={false}>
          {renderContent()}
        </Form>
      </Modal>
      <AppModifyForm
        visible={appModalVisible}
        onCancel={() => setAppModalVisible(false)}
        onSubmit={() => setAppModalVisible(false)}
      />
    </>
  );
};
export default PreviewForm;
