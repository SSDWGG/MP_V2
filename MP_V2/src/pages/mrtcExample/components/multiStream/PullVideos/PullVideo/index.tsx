import React, { useContext, useState } from 'react';
import { Button, message } from 'antd';
import MRTCForm from './form/mrtcUrl';
import { PullStreamCntContext } from '../..';
import { MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';

const PullVideo: React.FC<{ width: string; id: string }> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [mrtcClientModal, setMrtcClientModal] = useState<MrtcClientModal>({} as MrtcClientModal);
  // @ts-ignore
  const [pullCnt, setPllCnt] = useContext(PullStreamCntContext);

  const { width, id } = props;
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
          autoPlay
          style={{ backgroundColor: '#222426' }}
          poster={'/videoPoster.jpeg'}
        />
        <span style={{ position: 'absolute', bottom: 8, right: 8 }}>
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
                setPllCnt(pullCnt - 1);
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
          const clientModal = new MrtcClientModal();
          try {
            await clientModal.createMrtcClient(mrtcUrl, {}, userId);
            await clientModal.subscribe(id);
            setSubscribing(true);
            setModalVisible(false);
            setPllCnt(pullCnt + 1);
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
