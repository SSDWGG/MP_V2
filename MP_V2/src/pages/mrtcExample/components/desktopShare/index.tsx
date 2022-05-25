import React, { useState } from 'react';
import Desktop from './Desktop';
import Camera from './Camera';
import { Alert, Button, Card } from 'antd';
import './index.less';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { history } from 'umi';

const DesktopShare: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="desktopShare">
      <div>
        <Alert
          message={
            <div>
              <MenuUnfoldOutlined
                onMouseOver={() => setVisible(true)}
                style={{ marginBottom: 16, marginTop: 18, color: '#fff' }}
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
      </div>
      <Card
        bordered={false}
        bodyStyle={{
          padding: 16,
          backgroundColor: '#222426',
          position: 'relative',
          height: 840,
        }}
      >
        <div style={{ width: '100%' }}>
          <Desktop />
        </div>
        <div style={{ position: 'absolute', top: 24, right: 24 }}>
          <Camera />
        </div>
      </Card>
    </div>
  );
};
export default DesktopShare;
