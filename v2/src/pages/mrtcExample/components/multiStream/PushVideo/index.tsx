import { Button, message } from 'antd';
import React, { useContext, useState } from 'react';
import MRTCForm from './form/mrtcUrl';
import { QrUrlContext } from '..';
import { HDVideoConfig, LDVideoConfig, MrtcClientModal } from '@/pages/mrtcExample/modals/mrtc';

const PushVideo: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [mrtcClientModalList, setMrtcClientModalList] = useState<MrtcClientModal[]>([]);
  // @ts-ignore
  const [, setQrcodeUrl] = useContext(QrUrlContext);

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative', background: '#222426' }}>
        <video
          width="100%"
          id="pushVideo"
          height="100%"
          muted
          autoPlay
          poster={'/videoPoster.jpeg'}
        />
        <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
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
              onClick={() => {
                console.log(mrtcClientModalList, 'clientModalList');

                mrtcClientModalList.forEach(async (client: MrtcClientModal) => {
                  await client.unpublish('pushVideo');
                  client
                    .getState()
                    .stream.getTracks()
                    .forEach((track: any) => {
                      track.stop();
                    });
                  setPublishing(false);
                  setQrcodeUrl('');
                });
              }}
            >
              取消推流
            </Button>
          )}
        </div>
      </div>

      {/* 弹出的确认地址的弹窗 */}
      <MRTCForm
        onCancel={() => {
          setModalVisible(false);
          setPublishing(false);
        }}
        visible={modalVisible}
        onSubmit={async (values) => {
          const { mrtcUrlLD, mrtcUrlHD, userIdHD, userIdLD } = values;
          try {
            const clientModalHD = new MrtcClientModal();
            const clientModalLD = new MrtcClientModal();

            await clientModalHD.createMrtcClient(
              mrtcUrlHD,
              { videoConfig: HDVideoConfig },
              userIdHD,
            );
            await clientModalLD.createMrtcClient(
              mrtcUrlLD,
              { videoConfig: LDVideoConfig },
              userIdLD,
            );

            await clientModalHD.cameraAndMic();
            await clientModalLD.cameraAndMic();

            await clientModalHD.startPublish('pushVideo');
            // await clientModalLD.startPublish('');

            setModalVisible(false);
            setMrtcClientModalList([clientModalHD, clientModalLD]);
            setPublishing(true);
            message.success('推流成功！');
            setQrcodeUrl(JSON.stringify(clientModalHD.getState().clientConfig));
          } catch (error: any) {
            message.error(error.message);
          }
        }}
      />
    </>
  );
};
export default PushVideo;
