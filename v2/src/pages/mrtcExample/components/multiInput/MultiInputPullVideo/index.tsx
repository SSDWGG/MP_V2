import React, { useState } from 'react';
import { Button, message } from 'antd';
import MRTCForm from './form/mrtcUrl';
import { MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';

const PullVideo: React.FC<{ width: string; id: string; isAudio: boolean }> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [mrtcClientModal, setMrtcClientModal] = useState<MrtcClientModal>({} as MrtcClientModal);

  const { width, id, isAudio } = props;
  return (
    <>
      <span
        style={{ position: 'relative', background: '#222426', borderRight: '0px solid #222426' }}
      >
        <video
          id={id}
          width={width}
          height="100%"
          muted
          controls={isAudio}
          autoPlay
          style={{ backgroundColor: '#222426' }}
          poster={'/videoPoster.jpeg'}
        />
        <span
          style={
            isAudio
              ? { position: 'absolute', bottom: 64, right: 8 }
              : { position: 'absolute', bottom: 8, right: 8 }
          }
        >
          {!subscribing ? (
            <Button
              ghost
              type="primary"
              shape="round"
              size="small"
              onClick={() => setModalVisible(true)}
            >
              拉流
            </Button>
          ) : (
            <Button
              ghost
              type="default"
              size="small"
              shape="round"
              onClick={async () => {
                console.log(mrtcClientModal);
                await mrtcClientModal.unsubscribe(id);
                // clientModal.stream.getTracks().forEach((track: any) => {track.stop()})
                setSubscribing(false);
              }}
            >
              取消拉流
            </Button>
          )}
        </span>
      </span>

      <MRTCForm
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        onSubmit={async (values) => {
          const { mrtcUrl, userId } = values;
          try {
            const clientModal = new MrtcClientModal();
            console.log(mrtcUrl, 'mrtcUrl');
            console.log(userId, 'uid');

            await clientModal.createMrtcClient(mrtcUrl, {}, userId);
            await clientModal.subscribe(id);

            setSubscribing(true);
            setModalVisible(false);
            setMrtcClientModal(clientModal);
          } catch (error: any) {
            message.error(error.message);
          }
        }}
      />
    </>
  );
};
export default PullVideo;
