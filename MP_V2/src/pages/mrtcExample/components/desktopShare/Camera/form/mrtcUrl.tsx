import { Form, Input, message, Modal, Radio } from 'antd';
import React from 'react';
import { mrtcSourceDict } from '@/pages/mrtcExample/common/common';

interface FormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  visible: boolean;
}
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const PreviewForm: React.FC<FormProps> = (props) => {
  const { onCancel, onSubmit, visible } = props;
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    if (!appId || !appSecret) {
      message.error('未配置全局AppId和AppSecret！');
    } else {
      const { mrtcType, mrtcName, mrtcDomain, userId } = fieldsValue;
      let mrtcUrl = '';
      if (mrtcType === 3) {
        mrtcUrl = `mrtc://${mrtcDomain}/live/${mrtcName}`;
      } else {
        // @ts-ignore
        mrtcUrl = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcName}`;
      }
      return onSubmit({ mrtcUrl, userId });
    }
    return null;
  };

  const handleCancel = () => {
    form.resetFields();
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
                <Input style={{ width: 370 }} placeholder="请输入MRTC域名" />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item label="MRTC流名(摄像头)" required>
          <Input.Group compact>
            <Form.Item
              name="mrtcName"
              rules={[
                {
                  required: true,
                  message: '请输入MRTC流名(摄像头)',
                },
              ]}
            >
              <Input style={{ width: 250 }} placeholder="MRTC流名" />
            </Form.Item>
            <Form.Item name="userId">
              <Input style={{ width: 120 }} placeholder="UserID(可选)" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '24px' }}
      destroyOnClose
      title="摄像头推流地址"
      okText="开始推流"
      cancelText="取消"
      onOk={handleSubmit}
      visible={visible}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form {...formLayout} form={form} validateTrigger={['onChange', 'onBlur']} preserve={false}>
        {renderContent()}
      </Form>
    </Modal>
  );
};
export default PreviewForm;
