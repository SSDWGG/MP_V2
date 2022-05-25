import React, { useRef } from 'react';
import { Modal, message } from 'antd';
import ProForm, {
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormSlider,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { AddTodo, updateTodo } from '@/services/todo';
import moment from 'moment';

interface CreateFormProps {
  onCancel: () => void;
  onSubmit: () => Promise<void> | void;
  modalType?: number | boolean | undefined;
  info: todo;
}

const enumText = {
  1: '添加任务',
  2: '修改任务',
};
const ModalShow: React.FC<CreateFormProps> = (props) => {
  const { onSubmit, onCancel, modalType, info } = props;

  const formRef = useRef<ProFormInstance>();
  // value和initvalue会冲突，会默认采取受控的value
  // const [sliderValue, setSliderValue] = useState<number>(0);
  const handleCancel = () => {
    onCancel?.();
  };
  // 确认触发检验和发送请求
  const handleSubmit = () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (value) => {
        if (modalType === 1) {
          await AddTodo(value);
          message.success({
            content: '添加成功',
          });
        } else if (modalType === 2) {
          value.todoid = info.todoid;
          value.infactendTime =
            value.schedule >= 100 ? moment(Date.now()).format('YYYY-MM-DD HH:mm') : '';
          await updateTodo(value);
          message.success({
            content: '修改成功',
          });
        }
        onSubmit?.();
      })
      .catch(() => {});
  };
  // 弹窗默认值
  const getInitialValues = () => {
    switch (modalType) {
      case 1:
        return undefined;
      case 2:
        const data: any = { ...info };
        data.beginTime = data.beginTime == '' ? null : data.beginTime;
        data.endTime = data.endTime == '' ? null : data.endTime;
        return data;
      default:
        return undefined;
    }
  };

  const renderContent = () => {
    switch (modalType) {
      case 1:
        return (
          <>
            <ProFormText
              name="todotitle"
              label="任务标题"
              validateFirst //阻塞校验
              fieldProps={{
                maxLength: 32,
                showCount: true,
                placeholder: '请输入任务标题',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入任务标题',
                },
              ]}
              allowClear
            />
            <ProFormTextArea
              name="tododescribe"
              label="任务描述"
              validateFirst
              // rules={[{ required: true, message: '请输入任务描述' }]}
              fieldProps={{
                showCount: true,
                maxLength: 255,
                allowClear: true,
                autoSize: { minRows: 3, maxRows: 6 },
                placeholder: '请输入任务描述',
              }}
              allowClear
            />

            <ProFormDependency name={['schedule']}>
              {({ schedule }) => {
                return (
                  <ProFormDateTimePicker
                    name="beginTime"
                    label="开始时间"
                    placeholder="请输入开始时间"
                    width={'xl'}
                    rules={[
                      { required: schedule === 100, message: '任务被设置完成，请输入开始时间' },
                    ]}
                  />
                );
              }}
            </ProFormDependency>
            <ProFormDependency name={['schedule']}>
              {({ schedule }) => {
                return (
                  <ProFormDateTimePicker
                    name="endTime"
                    label="期望结束时间"
                    placeholder="请输入期望结束时间"
                    width={'xl'}
                    rules={[
                      { required: schedule === 100, message: '任务被设置完成，请输入期望结束时间' },
                    ]}
                  />
                );
              }}
            </ProFormDependency>

            <ProFormSlider
              name="schedule"
              label="任务进度"
              initialValue={20}
              marks={{
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100',
              }}
            />
          </>
        );
      case 2:
        return (
          <>
            <ProFormText
              name="todotitle"
              label="任务标题"
              validateFirst
              fieldProps={{
                maxLength: 32,
                showCount: true,
                placeholder: '请输入任务标题',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入任务标题',
                },
              ]}
              allowClear
            />
            <ProFormTextArea
              name="tododescribe"
              label="任务描述"
              validateFirst
              fieldProps={{
                showCount: true,
                maxLength: 255,
                allowClear: true,
                autoSize: { minRows: 3, maxRows: 6 },
                placeholder: '请输入任务描述',
              }}
              allowClear
            />
            <ProFormDependency name={['schedule']}>
              {({ schedule }) => {
                return (
                  <ProFormDateTimePicker
                    name="beginTime"
                    label="开始时间"
                    placeholder="请输入开始时间"
                    width={'xl'}
                    rules={[
                      { required: schedule === 100, message: '任务被设置完成，请输入开始时间' },
                    ]}
                  />
                );
              }}
            </ProFormDependency>
            <ProFormDependency name={['schedule']}>
              {({ schedule }) => {
                return (
                  <ProFormDateTimePicker
                    name="endTime"
                    label="期望结束时间"
                    placeholder="请输入期望结束时间"
                    width={'xl'}
                    rules={[
                      { required: schedule === 100, message: '任务被设置完成，请输入期望结束时间' },
                    ]}
                  />
                );
              }}
            </ProFormDependency>
            <ProFormSlider
              name="schedule"
              label="任务进度"
              // fieldProps={{
              //   value: sliderValue,
              //   onChange: (e: number) => {
              //     setSliderValue(e);
              //   },
              // }}
              marks={{
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100',
              }}
            />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      width={600}
      bodyStyle={{ paddingBottom: 0 }}
      destroyOnClose={true}
      maskClosable={false}
      title={enumText[modalType as number]}
      visible={!modalType === false}
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <ProForm
        layout="horizontal"
        labelCol={{ span: 5 }}
        name="modal"
        submitter={false}
        formRef={formRef}
        validateTrigger="onBlur"
        preserve={false}
        initialValues={getInitialValues()}
      >
        {renderContent()}
      </ProForm>
    </Modal>
  );
};
export default ModalShow;
