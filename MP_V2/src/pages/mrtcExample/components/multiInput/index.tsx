import React, { useRef, useState } from 'react';
import { Alert, Button, Card, message } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import MRTCForm from './form/mrtcUrl';
import PullVideo from './MultiInputPullVideo';
import { history } from 'umi';
import './index.less';
import type { MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';
import DrawCanvas from '@/pages/mrtcExample/common/DrawCanvas';
import { useUpdate } from 'ahooks';

const MultiInputPage: React.FC = () => {
  const [publishing, setPublishing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [streamInputType, setStreamInputType] = useState();
  const [currentClientModal, setCurrentClientModal] = useState<MrtcClientModal>(
    {} as MrtcClientModal,
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const update = useUpdate();

  return (
    <div className="multiInput">
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

      <Card bordered={false} bodyStyle={{ backgroundColor: '#222426', height: 1500 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <video
            width="90%"
            height="90%"
            muted
            autoPlay
            controls={streamInputType === 5}
            id="multiInput"
            poster={'/videoPoster.jpeg'}
          />
          <div
            style={
              streamInputType === 5
                ? {
                    position: 'absolute',
                    bottom: 64,
                    right: 8 + document.documentElement.clientHeight * 0.1,
                  }
                : {
                    position: 'absolute',
                    bottom: 8,
                    right: 8 + document.documentElement.clientHeight * 0.1,
                  }
            }
          >
            {!publishing ? (
              <Button
                ghost
                type="primary"
                shape="round"
                size="small"
                onClick={() => setModalVisible(true)}
              >
                推流
              </Button>
            ) : (
              <Button
                ghost
                type="default"
                shape="round"
                size="small"
                onClick={async () => {
                  console.log(currentClientModal, 'clientModalList');
                  await currentClientModal.unpublish('multiInput');
                  currentClientModal
                    .getState()
                    .stream.getTracks()
                    .forEach((track: any) => {
                      track.stop();
                    });
                  setPublishing(false);
                  // @ts-ignore
                  setStreamInputType(0);
                  // if (streamInputType === 4) {
                  //   videoRef.current?.load();
                  //   videoRef.current?.play();
                  //   setTimeout(() => {
                  //     videoRef.current?.pause();
                  //   }, 100);
                  // }
                  if (streamInputType === 5) {
                    console.log('inAudio', audioRef.current, audioRef);

                    audioRef.current?.load();
                    audioRef.current?.pause();
                  }
                }}
              >
                取消推流
              </Button>
            )}
          </div>
          <div
            style={
              streamInputType === 4
                ? { position: 'absolute', top: 8, right: 76 }
                : { display: 'none' }
            }
          >
            <div style={{ background: '#222426' }}>
              <div
                style={{
                  border: '8px solid #222426',
                }}
              >
                <DrawCanvas id="pushCanvas" key="pageCanvas" videoW={320} videoH={180} />
              </div>
            </div>
          </div>
          <div
            style={
              streamInputType === 5
                ? { position: 'absolute', top: 8, right: 76 }
                : { display: 'none' }
            }
          >
            <div style={{ background: '#222426' }}>
              <div
                style={{
                  borderTop: '8px solid #222426',
                  borderLeft: '8px solid #222426',
                  borderBottom: '4px solid #222426',
                  borderRight: '8px solid #222426',
                }}
              >
                <audio
                  style={{ width: 320 }}
                  controls
                  ref={audioRef}
                  loop
                  id="audioFilePush"
                  crossOrigin="anonymous"
                  src={'/localAudio.mp3'}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <PullVideo width="90%" id="multiInputPullVideo" isAudio={streamInputType === 5} />
        </div>
      </Card>
      <MRTCForm
        onCancel={() => {
          setModalVisible(false);
          setPublishing(false);
        }}
        visible={modalVisible}
        onSubmit={async (values: any) => {
          const { clientModal, type } = values;
          console.log(JSON.stringify(clientModal), 'clientGot');
          setStreamInputType(type);
          await update();
          try {
            if (type === 4) {
              await clientModal.playCanvasStream('pushCanvas');
            }
            if (type === 5) {
              await clientModal.playAudioStream('audioFilePush');
            }
            if (clientModal && Object.keys(clientModal).length > 0) {
              console.log(clientModal, 'lkl');

              await clientModal.startPublish('multiInput');
              setModalVisible(false);
              setCurrentClientModal(clientModal);
              setPublishing(true);
              message.success('推流成功！');
            }
          } catch (error: any) {
            setStreamInputType(undefined);
            message.error(error.message);
          }
        }}
      />
    </div>
  );
};
export default MultiInputPage;
