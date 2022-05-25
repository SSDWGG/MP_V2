import { Alert, Button, Card, Form, Input, message } from 'antd';
import type { FormInstance } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { history } from 'umi';

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    formRef.current?.setFieldsValue({ appId, appSecret });
  }, []);

  return (
    <div className="home">
      <Alert
        message={
          <div>
            <MenuUnfoldOutlined
              onMouseOver={() => setVisible(true)}
              style={{ marginBottom: 16, marginTop: 18, color: '#FFF' }}
            />
            <div style={{ display: 'inline-block', lineHeight: '20px' }}>
              <Button type="link" onClick={() => history.push('/mrtcExample')}>
                <span
                  style={{
                    color: '#fff',
                    fontWeight: 'bolder',
                    fontSize: '20px',
                    textShadow: '5px 5px 5px #ECECEC',
                  }}
                >
                  MRTC WEB SDK EXAMPLE
                </span>
              </Button>
            </div>
          </div>
        }
        banner
        showIcon={false}
        // type='warning'
        style={{ backgroundColor: '#2F3437' }}
      />
      <div
        style={
          visible
            ? {
                width: 200,
                height: '100%',
                position: 'absolute',
                top: 64,
                left: 0,
                zIndex: 1,
                backgroundColor: '#2F3437',
              }
            : { display: 'none' }
        }
        onMouseLeave={() => setVisible(false)}
      >
        <ul>
          <div
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '1px solid #222426',
              borderBottom: '1px solid #222426',
            }}
          >
            <Button
              type="link"
              onClick={() => history.push('/mrtcExample/multiStream')}
              style={{ color: '#FFF' }}
            >
              推/拉多路流
            </Button>
          </div>
          <div
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #222426',
            }}
          >
            <Button
              type="link"
              onClick={() => history.push('/mrtcExample/screenShare')}
              style={{ color: '#FFF' }}
            >
              桌面/摄像头混流
            </Button>
          </div>
          <div
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid #222426',
            }}
          >
            <Button
              type="link"
              onClick={() => history.push('/mrtcExample/multiInput')}
              style={{ color: '#FFF' }}
            >
              多种流输入推流
            </Button>
          </div>
        </ul>
      </div>

      <Card
        bordered={false}
        bodyStyle={{ backgroundColor: '#222426', height: document.documentElement.clientHeight }}
      >
        <div style={{ marginTop: 200, marginBottom: 400 }}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            labelAlign="right"
            ref={formRef}
            onFinish={(formValues) => {
              const { appId, appSecret } = formValues;
              localStorage.setItem('appId', appId);
              localStorage.setItem('appSecret', appSecret);
              message.success('保存成功！');
              formRef.current?.setFieldsValue({ appId, appSecret });
            }}
          >
            <Form.Item
              label={<span style={{ color: '#fff' }}>AppID：</span>}
              name="appId"
              colon={false}
              rules={[{ required: true, message: '请输入AppId' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: '#fff' }}>AppSecret：</span>}
              name="appSecret"
              colon={false}
              rules={[{ required: true, message: '请输入AppSecret' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 20 }}>
              <Button type="primary" htmlType="submit" ghost shape="round">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default Home;
