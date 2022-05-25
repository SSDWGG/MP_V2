import { Button, Form, Input, message, Modal, Radio } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import AppModifyForm from '@/pages/mrtcExample/common/AppModify';
import { StepsForm } from '@ant-design/pro-form';
import { getMediaDevices } from '@/pages/mrtcExample/modals/mrtc';
import { mrtcSourceDict } from '@/pages/mrtcExample/common/common';
import './index.less';

interface FormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  visible: boolean;
}

const PreviewForm: React.FC<FormProps> = (props) => {
  const { onCancel, onSubmit, visible } = props;
  const formRef = useRef<FormInstance>(null);
  const [step, setStep] = useState(0);
  const [appModalVisible, setAppModalVisible] = useState(false);
  const [mrtcType, setMrtcType] = useState<number>(1);
  // const [mrtcUrl, setMrtcUrl] = useState<string>('');
  const [mrtcName, setMrtcName] = useState<string>('');
  const [mrtcDomain, setMrtcDomain] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  // const [cameraId, setCameraId] = useState<string>();
  // const [micId, setMicId] = useState<string>();
  const [audioInputOptions, setAudioInputOptions] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [videoInputOptions, setVideoInputOptions] = useState<{ label: string; value: string }[]>(
    [],
  );

  const getDeviceOptions = async () => {
    try {
      const deviceList = await getMediaDevices();
      console.log(deviceList, 'diviceList');

      setAudioInputOptions(
        deviceList
          .filter((item) => item.kind === 'audioinput')
          .map((r, index) => {
            return { label: r.label || `音频输入${index}`, value: r.deviceId };
          }),
      );
      setVideoInputOptions(
        deviceList
          .filter((item) => item.kind === 'videoinput')
          .map((r, index) => {
            return { label: r.label || `视频输入${index}`, value: r.deviceId };
          }),
      );
      message.success('获取设备成功，请在下方选择音视频设备！');
    } catch (e: any) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    if (step === 1) {
      getDeviceOptions();
    }
  }, [step]);

  const handleSubmit = async () => {
    const appId = localStorage.getItem('appId');
    const appSecret = localStorage.getItem('appSecret');
    if (!appId || !appSecret) {
      message.error('未配置全局AppId和AppSecret！');
    } else {
      const fieldsValue = await formRef.current?.validateFields();
      console.log(fieldsValue, 'fieldsValue');
      let url = '';
      if (mrtcType === 3) {
        url = `mrtc://${mrtcDomain}/live/${mrtcName}`;
      } else {
        // @ts-ignore
        url = `mrtc://mdc-api.${mrtcSourceDict[mrtcType]}.mudu.tv/live/${mrtcName}`;
      }
      return onSubmit({
        ...fieldsValue,
        mrtcUrl: url,
        audioInputOptions,
        videoInputOptions,
        userId,
      });
    }
    return null;
  };

  const handleCancel = () => {
    setMrtcType(1);
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
              <Input style={{ width: 340 }} placeholder="请输入MRTC域名" />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item label="MRTC流名(摄像头)" required>
        <Input.Group compact>
          <Form.Item
            name="mrtcName"
            rules={[
              {
                required: true,
                message: '请输入推流流名',
              },
            ]}
          >
            <Input style={{ width: 220 }} placeholder="MRTC流名" />
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
      <Form.Item label="音频输入设备" name="micId" rules={[{ required: true }]}>
        <Radio.Group options={audioInputOptions} />
      </Form.Item>
      <Form.Item
        label="视频输入设备"
        name="cameraId"
        rules={[{ required: true }]}
        wrapperCol={{ span: 10 }}
      >
        <Radio.Group options={videoInputOptions} />
      </Form.Item>
    </>
  );

  console.log('render');

  return (
    <>
      <StepsForm
        current={step}
        onCurrentChange={setStep}
        onFinish={async () => {
          await handleSubmit?.();
        }}
        stepsFormRender={(dom, submitter) => (
          <Modal
            width={750}
            maskClosable={false}
            bodyStyle={{ padding: '24px' }}
            destroyOnClose
            afterClose={() => setStep(0)}
            title="手机端推流"
            visible={visible}
            onCancel={handleCancel}
            footer={[
              step === 0 ? (
                <Button type="default" onClick={() => setAppModalVisible(true)}>
                  修改AppId && AppSecret
                </Button>
              ) : (
                ''
              ),
              // submitter,
              step === 0 ? submitter : '',
              step === 1 ? (
                <Button type="primary" onClick={handleSubmit}>
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
          name="step1"
          title="推流地址"
          omitNil={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          onValuesChange={(changeValues) => {
            if ('mrtcName' in changeValues) {
              setMrtcName(changeValues.mrtcName);
            }
            if ('mrtcType' in changeValues) {
              setMrtcType(changeValues.mrtcType);
            }
            if ('mrtcDomain' in changeValues) {
              setMrtcDomain(changeValues.mrtcDomain);
            }
            if ('userId' in changeValues) {
              setUserId(changeValues.userId);
            }
          }}
        >
          {mrtcUrlAndTypeForm}
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="step2"
          title="音视频输入"
          // @ts-ignore
          formRef={formRef}
          layout="horizontal"
          labelCol={{ span: 5 }}
          labelAlign="right"
          omitNil={false}
          // onValuesChange={(changeValues) => {
          //   if ('cameraId' in changeValues) {
          //     setCameraId(changeValues.cameraId);
          //     console.log('camera', changeValues.cameraId, 'end');
          //   }
          //   if ('micId' in changeValues) {
          //     setMicId(changeValues.micId)
          //   }
          // }}
        >
          {previewForm}
        </StepsForm.StepForm>
      </StepsForm>

      <AppModifyForm
        visible={appModalVisible}
        onCancel={() => setAppModalVisible(false)}
        onSubmit={() => setAppModalVisible(false)}
      />
    </>
  );
};
export default PreviewForm;
