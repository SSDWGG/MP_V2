import { Button, message } from 'antd';
import React, { useState } from 'react';
import MRTCForm from './form/mrtcUrl';
import { MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';

const Desktop = () => {
  const [sharing, setSharing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mrtcClientModal, setMrtcClientModal] = useState<MrtcClientModal>({} as MrtcClientModal);

  return (
    <>
      <div style={{ width: '100%', position: 'relative', background: '#222426' }}>
        <video width="100%" id="desktopShare" poster={'/videoPoster.jpeg'} autoPlay muted />
        <div style={{ position: 'absolute', bottom: 16, right: 8 }}>
          <Button
            type={!sharing ? 'primary' : 'default'}
            shape="round"
            size="small"
            ghost
            onClick={async () => {
              if (sharing) {
                await mrtcClientModal.unpublish('desktopShare');
                mrtcClientModal
                  .getState()
                  .stream.getTracks()
                  .forEach((track: any) => {
                    track.stop();
                  });
                setSharing(false);
              } else {
                setSharing(true);
                setModalVisible(true);
              }
            }}
          >
            {!sharing ? '桌面共享' : '取消共享'}
          </Button>
        </div>
      </div>

      <MRTCForm
        onCancel={() => {
          setModalVisible(false);
          setSharing(false);
        }}
        visible={modalVisible}
        onSubmit={async (values) => {
          const { mrtcUrlShare, userId } = values;
          try {
            const clientModal = new MrtcClientModal();
            await clientModal.createMrtcClient(mrtcUrlShare, {}, userId);
            await clientModal.screenShare();
            await clientModal.startPublish('desktopShare');
            clientModal.getState().stream.getVideoTracks()[0].onended = async () => {
              await clientModal.unpublish('desktopShare');
              setSharing(false);
            };
            setModalVisible(false);
            setMrtcClientModal(clientModal);
            setSharing(true);
          } catch (error: any) {
            message.error(error.message);
          }
        }}
      />
    </>
  );
};
export default Desktop;
