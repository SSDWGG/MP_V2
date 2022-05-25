import { Alert, Button, Card, Drawer, Popover } from 'antd';
import React, { useState } from 'react';
import PullVideo from './PullVideos';
import PushVideo from './PushVideo';
import './index.less';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { Base64 } from 'js-base64';
import { history } from 'umi';

// @ts-ignore
export const PullStreamCntContext = React.createContext();
// @ts-ignore
export const QrUrlContext = React.createContext();

const App: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pullCnt, setPullCnt] = useState(0);
  const [qrcodeUrl, setQrcodeUrl] = useState<string>('');
  console.log(`${window.location.origin}/mrtcExample/audience?Info=${Base64.encode(qrcodeUrl)}`);

  return (
    <div className="multiStreamStyle">
      <div>
        <Alert
          message={
            <div style={{ position: 'relative' }}>
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
              <div className="currentPullStream">当前拉流数：{pullCnt || '0'}</div>
              <div className="qrcode">
                <Popover
                  content={
                    <QRCode
                      value={`${window.location.origin}/mrtcExample/audience?Info=${Base64.encode(
                        qrcodeUrl,
                      )}`}
                    />
                  }
                >
                  <div>二维码</div>
                </Popover>
              </div>
              {/* <Link to={`/audience?Info=${Base64.encode(qrcodeUrl)}`}>BTN</Link> */}
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
        }}
      >
        <div style={{ width: '60%', height: '60%' }}>
          <QrUrlContext.Provider value={[qrcodeUrl, setQrcodeUrl]}>
            <PushVideo />
          </QrUrlContext.Provider>
        </div>
        <div>
          <PullStreamCntContext.Provider value={[pullCnt, setPullCnt]}>
            <PullVideo />
          </PullStreamCntContext.Provider>
        </div>
      </Card>

      {/* tooltips */}
      <Drawer
        visible={drawerVisible}
        title="使用帮助"
        width={400}
        onClose={() => setDrawerVisible(false)}
      >
        <h1>推流</h1>
        <p>1）点击主视频框右下角推流按钮，在弹窗内输入大小流的MRTC推流地址；</p>
        <p>2）点击弹窗的开始推流按钮，进行推流，主视频框内会展示推流的画面；</p>
        <h1>拉流</h1>
        <p>1）开始推流后，点击屏幕右侧或下侧的拉流视频框内拉流按钮，在弹窗内输入MRTC拉流地址；</p>
        <p>2）点击弹窗开始推流按钮，相应的拉流视频框内会展示拉流的画面；</p>
      </Drawer>
    </div>
  );
};

export default App;
