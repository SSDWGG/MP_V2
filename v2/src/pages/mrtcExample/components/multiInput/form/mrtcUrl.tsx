import { Button, Form, Input, message, Modal, Radio } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import AppModifyForm from '@/pages/mrtcExample/common/AppModify';
import { StepsForm } from '@ant-design/pro-form';
import { mrtcSourceDict } from '@/pages/mrtcExample/common/common';
import './index.less';
import { HDVideoConfig, MrtcClientModal, getMediaDevices } from '@/pages/mrtcExample/modals/mrtc';
import DrawCanvas from '@/pages/mrtcExample/common/DrawCanvas';

interface FormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  visible: boolean;
}

const PreviewForm: React.FC<FormProps> = (props) => {
  const { onCancel, onSubmit, visible } = props;
  const formRef2 = useRef<FormInstance>(null);
  const [step, setStep] = useState(0);
  const [appModalVisible, setAppModalVisible] = useState(false);
  const [deviceModalVisible, setDeviceModalVisible] = useState(false);
  const [streamInputType, setStreamInputType] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [mrtcDomain, setMrtcDomain] = useState<string>('');
  // const [mrtcUrl, setMrtcUrl] = useState<string>('');
  const [mrtcName, setMrtcName] = useState<string>('');
  const [mrtcType, setMrtcType] = useState<number>(1);
  const [cameraId, setCameraId] = useState<string>();
  const [micId, setMicId] = useState<string>();
  const [clientModal, setClientModal] = useState<MrtcClientModal>({} as MrtcClientModal);
  const previewRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = async () => {
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    if (!appId || !appSecret) {
      message.error('未配置全局AppId和AppSecret！');
    } else {
      console.log(JSON.stringify(clientModal), 'submit');

      let url = '';
      if (mrtcType === 3) {
        url = `mrtc://${mrtcDomain}/live/${mrtcName}`;
      } else {
        // @ts-ignore
        url = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcName}`;
      }
      if (clientModal && Object.keys(clientModal).length === 0) {
        console.log('090', url);
        // eslint-disable-next-line no-useless-catch
        try {
          const cModal = new MrtcClientModal();
          await cModal.createMrtcClient(url, { videoConfig: HDVideoConfig }, userId);
          await cModal.getStream(
            streamInputType,
            'previewVideo',
            streamInputType === 4 ? 'prevideoCanvas' : 'audioFile',
            cameraId,
            micId,
          );
          setClientModal(cModal);
          return onSubmit({ clientModal: cModal, mrtcUrl: url, type: streamInputType });
        } catch (e) {
          throw e;
        }
      }
      return onSubmit({ clientModal, mrtcUrl: url, type: streamInputType });
    }
    return null;
  };

  const handleCancel = () => {
    setStreamInputType(0);
    setMrtcType(1);
    setClientModal({} as MrtcClientModal);
    onCancel();
  };

  const mrtcUrlAndTypeForm = (
    <>
      <Form.Item
        label="MRTC流名来源"
        name="mrtcType"
        rules={[
          {
            required: true,
            message: '请选择MRTC流名来源',
          },
        ]}
        initialValue={1}
      >
        <Radio.Group
          options={[
            { label: 'DEV', value: 0 },
            { label: 'TEST', value: 1 },
            { label: 'UAT', value: 2 },
            { label: '其他MRTC域名', value: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue('mrtcType') === 3 ? (
            <Form.Item
              label="MRTC域名"
              name="mrtcDomain"
              rules={[
                {
                  required: true,
                  message: '请输入MRTC域名',
                },
              ]}
            >
              <Input style={{ width: 370 }} placeholder="请输入MRTC域名" />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item label="MRTC流名" required>
        <Input.Group compact style={{ height: 32 }}>
          <Form.Item
            name="mrtcName"
            rules={[
              {
                required: true,
                message: '请输入推流流名',
              },
            ]}
          >
            <Input style={{ width: 250 }} placeholder="MRTC流名" />
          </Form.Item>
          <Form.Item name="userId">
            <Input style={{ width: 120 }} placeholder="UserID(可选)" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </>
  );

  const previewForm = (
    <>
      <Form.Item
        label="推流类型"
        name="type"
        rules={[
          {
            required: true,
            message: '请选择推流输入类型',
          },
        ]}
        initialValue={streamInputType}
      >
        <Radio.Group
          optionType="button"
          size="small"
          options={[
            { label: '屏幕和麦克风', value: 0 },
            { label: '屏幕', value: 1 },
            { label: '麦克风', value: 2 },
            { label: '桌面共享', value: 3 },
            { label: '本地视频', value: 4 },
            { label: '本地音频', value: 5 },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <div>
          <div>
            <video
              id="previewVideo"
              ref={previewRef}
              width={320}
              height={180}
              controls={streamInputType === 5}
              muted
              autoPlay
              poster={`/videoPoster.jpeg`}
            />
          </div>
          {(streamInputType === 1 || streamInputType === 2 || streamInputType === 0) && (
            <>
              <div style={{ position: 'absolute', top: 0, left: 360 }}>
                <Button
                  ghost
                  type="primary"
                  onClick={async () => {
                    setDeviceModalVisible(true);
                    await getMediaDevices('device-wrap');
                  }}
                >
                  设备列表
                </Button>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 360 }}>
                <Form.Item label="摄像头ID" name="camaraId">
                  <Input />
                </Form.Item>
                <Form.Item label="麦克风ID" name="micId">
                  <Input />
                </Form.Item>
              </div>
            </>
          )}
          {streamInputType === 4 && (
            <div style={{ position: 'absolute', bottom: 6, left: 360 }}>
              <DrawCanvas id="prevideoCanvas" key="modalCanvas" videoW={160} videoH={90} />
            </div>
          )}
          {streamInputType === 5 && (
            <div style={{ position: 'absolute', bottom: 0, left: 360 }}>
              <audio
                style={{ width: 240 }}
                controls
                id="audioFile"
                crossOrigin="anonymous"
                src={'/localAudio.mp3'}
              />
            </div>
          )}
          <div
            style={
              streamInputType !== 5
                ? { width: 320, height: 40, position: 'absolute', bottom: 0, left: 0 }
                : { width: 320, height: 40, position: 'absolute', top: 8, left: 0 }
            }
          >
            <Button
              ghost
              type="primary"
              shape="round"
              size="small"
              onClick={async () => {
                let url = '';
                if (mrtcType === 3) {
                  url = `mrtc://${mrtcDomain}/live/${mrtcName}`;
                } else {
                  // @ts-ignore
                  url = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcName}`;
                }
                console.log(url, '09000');
                // eslint-disable-next-line no-useless-catch
                try {
                  const cModal = new MrtcClientModal();
                  await cModal.createMrtcClient(url, { videoConfig: HDVideoConfig }, userId);
                  await cModal.getStream(
                    streamInputType,
                    'previewVideo',
                    streamInputType === 4 ? 'prevideoCanvas' : 'audioFile',
                    cameraId,
                    micId,
                  );
                  setClientModal(cModal);
                  console.log(JSON.stringify(cModal), '757');
                } catch (e) {
                  throw e;
                }
              }}
              style={{ position: 'absolute', right: 8 }}
            >
              预览
            </Button>
          </div>
        </div>
      </Form.Item>
    </>
  );

  console.log('render');

  return (
    <>
      <StepsForm
        key="stepForm1"
        current={step}
        onCurrentChange={setStep}
        onFinish={async () => {
          console.log(JSON.stringify(clientModal), 'submit');
          await handleSubmit();
        }}
        stepsFormRender={(dom, submitter) => (
          <Modal
            width={780}
            maskClosable={false}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            afterClose={() => {
              setStep(0);
              setStreamInputType(0);
              setMrtcType(1);
              setClientModal({} as MrtcClientModal);
            }}
            title="多种输入推流"
            visible={visible}
            onCancel={handleCancel}
            footer={[
              step === 0 ? (
                <Button key="app" type="default" onClick={() => setAppModalVisible(true)}>
                  修改AppId && AppSecret
                </Button>
              ) : (
                ''
              ),
              // submitter,
              step === 0 ? submitter : '',
              step === 1 ? (
                <Button type="primary" key="push" onClick={handleSubmit}>
                  开始推流
                </Button>
              ) : (
                ''
              ),
            ]}
          >
            {dom}
          </Modal>
        )}
      >
        <StepsForm.StepForm
          key="stepForm2"
          name="step1"
          title="推流地址和类型"
          omitNil={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onValuesChange={(changeValues) => {
            if ('mrtcDomain' in changeValues) {
              setMrtcDomain(changeValues.mrtcDomain);
            }
            if ('userId' in changeValues) {
              setUserId(changeValues.userId);
            }
            if ('mrtcName' in changeValues) {
              setMrtcName(changeValues.mrtcName);
            }
            if ('mrtcType' in changeValues) {
              setMrtcType(changeValues.mrtcType);
            }
          }}
        >
          {mrtcUrlAndTypeForm}
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="step2"
          title="预览"
          // @ts-ignore
          formRef={formRef2}
          layout="horizontal"
          omitNil={false}
          onValuesChange={(changeValues) => {
            if ('type' in changeValues) {
              setStreamInputType(changeValues.type);
              console.log(previewRef.current);
              previewRef.current!.srcObject = null;
            }
            if ('cameraId' in changeValues) {
              setCameraId(changeValues.cameraId);
            }
            if ('micId' in changeValues) {
              setMicId(changeValues.micId);
            }
          }}
        >
          {previewForm}
        </StepsForm.StepForm>
      </StepsForm>

      <AppModifyForm
        visible={appModalVisible}
        onCancel={() => setAppModalVisible(false)}
        onSubmit={() => setAppModalVisible(false)}
      />
      <Modal
        visible={deviceModalVisible}
        title="设备信息"
        width={1080}
        onCancel={() => setDeviceModalVisible(false)}
        footer={[
          <Button type="primary" onClick={() => setDeviceModalVisible(false)}>
            关闭
          </Button>,
        ]}
      >
        <div id="device-wrap">获取设备列表中...</div>
      </Modal>
    </>
  );
};
export default PreviewForm;
