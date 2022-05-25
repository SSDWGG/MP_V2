import React, { useRef, useState } from 'react';
import { Alert, Button, Card, message, Modal, Form, Radio } from 'antd';
import { Link } from 'react-router-dom';
import MRTCForm from './form/mrtcUrl';
import { MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';
import type { FormInstance } from 'antd';

const MobilePush: React.FC = () => {
  const [publishing, setPublishing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [changeCameraModalVisible, setChangeCameraModalVisible] = useState(false);
  const [currentClientModal, setCurrentClientModal] = useState<MrtcClientModal>(
    {} as MrtcClientModal,
  );
  const [audioOptions, setAudioOptions] = useState<{ label: string; value: string }[]>([]);
  const [videoOptions, setVideoOptions] = useState<{ label: string; value: string }[]>([]);
  const formRef = useRef<FormInstance>(null);

  return (
    <div>
      <Alert
        message={
          <div>
            <div
              style={{
                display: 'inline-block',
                lineHeight: '48px',
                fontSize: '16px',
                fontWeight: 'bolder',
                color: '#FFF',
                textShadow: '5px 5px 5px #ECECEC',
              }}
            >
              <Link to="/">
                <span style={{ color: '#fff' }}>Mobile Push</span>
              </Link>
            </div>
            <div style={{ position: 'absolute', right: 8, top: 20 }}>
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
                <div>
                  <Button
                    ghost
                    type="primary"
                    shape="round"
                    size="small"
                    style={{ marginRight: 8 }}
                    onClick={() => {
                      setChangeCameraModalVisible(true);
                    }}
                  >
                    切换摄像头
                  </Button>
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
                    }}
                  >
                    取消推流
                  </Button>
                </div>
              )}
            </div>
          </div>
        }
        banner
        showIcon={false}
        style={{ backgroundColor: '#2F3437' }}
      />

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
            controls
            id="multiInput"
            poster={`/videoPoster.jpeg`}
          />
        </div>
      </Card>
      <MRTCForm
        onCancel={() => {
          setModalVisible(false);
          setPublishing(false);
        }}
        visible={modalVisible}
        onSubmit={async (values: any) => {
          const { mrtcUrl, cameraId, micId, audioInputOptions, videoInputOptions, userId } = values;
          setAudioOptions(audioInputOptions);
          setVideoOptions(videoInputOptions);
          try {
            const clientModal = new MrtcClientModal();
            console.log(clientModal, 'lkl');
            await clientModal.createMrtcClient(
              mrtcUrl,
              {
                videoConfig: { deviceId: cameraId, width: 1280, height: 720 },
                audioConfig: { deviceId: micId },
              },
              userId,
            );
            await clientModal.cameraAndMic();
            await clientModal.startPublish('multiInput');
            setModalVisible(false);
            setCurrentClientModal(clientModal);
            setPublishing(true);
            message.success('推流成功！');
          } catch (error: any) {
            message.error(error.message);
          }
        }}
      />
      <Modal
        visible={changeCameraModalVisible}
        title="切换音视频输出"
        width={1080}
        destroyOnClose
        onCancel={() => setChangeCameraModalVisible(false)}
        footer={[
          <Button
            type="primary"
            onClick={async () => {
              const fieldsValues = await formRef.current?.validateFields();
              console.log(fieldsValues, 'fieldsValues');

              const { micChangeId, cameraChangeId } = fieldsValues;
              await currentClientModal.cameraAndMicWithTracksConfig({
                videoConfig: { deviceId: cameraChangeId },
                audioConfig: { deviceId: micChangeId },
              });
              await currentClientModal.switchTo('multiInput');
              setChangeCameraModalVisible(false);
            }}
          >
            确定切换
          </Button>,
        ]}
      >
        {
          <Form ref={formRef} preserve={false}>
            <Form.Item label="音频输入设备" name="micChangeId" rules={[{ required: true }]}>
              <Radio.Group options={audioOptions} />
            </Form.Item>
            <Form.Item label="视频输入设备" name="cameraChangeId" rules={[{ required: true }]}>
              <Radio.Group options={videoOptions} />
            </Form.Item>
          </Form>
        }
      </Modal>
    </div>
  );
};
export default MobilePush;
