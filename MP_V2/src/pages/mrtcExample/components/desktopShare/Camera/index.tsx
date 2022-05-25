import { Button, message } from 'antd';
import React, { useState } from 'react';
import MRTCForm from './form/mrtcUrl';
import { MrtcClientModal, LDVideoConfig } from '@/pages/mrtcExample/modals/mrtc';

const Camera = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [mrtcClientModal, setMrtcClientModal] = useState<MrtcClientModal>({} as MrtcClientModal);

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#222426' }}>
        <div style={{ border: '8px solid #222426', borderBottom: '2px solid #222426' }}>
          <video
            width="100%"
            id="camera"
            height={180}
            poster={'/videoPoster.jpeg'}
            autoPlay
            muted
          />
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Button
            type={!publishing ? 'primary' : 'default'}
            shape="round"
            size="small"
            ghost
            onClick={async () => {
              if (publishing) {
                await mrtcClientModal.unpublish('camera');
                mrtcClientModal
                  .getState()
                  .stream.getTracks()
                  .forEach((track: any) => {
                    track.stop();
                  });
                setPublishing(false);
              } else {
                setPublishing(true);
                setModalVisible(true);
              }
            }}
          >
            {!publishing ? '推流' : '取消推流'}
          </Button>
        </div>
      </div>

      <MRTCForm
        onCancel={() => {
          setModalVisible(false);
          setPublishing(false);
        }}
        visible={modalVisible}
        onSubmit={async (values) => {
          const { mrtcUrl, userId } = values;
          try {
            const clientModal = new MrtcClientModal();
            await clientModal.createMrtcClient(mrtcUrl, { videoConfig: LDVideoConfig }, userId);
            await clientModal.cameraAndMic();
            await clientModal.startPublish('camera');
            setModalVisible(false);
            console.log(clientModal, 'clients');

            setMrtcClientModal(clientModal as MrtcClientModal);
            setPublishing(true);
          } catch (error: any) {
            message.error(error.message);
          }
        }}
      />
    </>
  );
};
export default Camera;
