import React, { useRef } from 'react';
import { message, Modal } from 'antd';
import ProForm, { ProFormDateTimePicker } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { formatTimesTampDate } from '@/common/utils';
import { updateUser } from '@/services/user';

interface CreateFormProps {
  onCancel: () => void;
  onSubmit: () => Promise<void> | void;
  modalType?: number | boolean | undefined;
  info: user;
}

const enumText = {
  1: '限制登录',
};
const ModalShow: React.FC<CreateFormProps> = (props) => {
  const { onSubmit, onCancel, modalType } = props;

  const formRef = useRef<ProFormInstance>();

  const handleCancel = () => {
    onCancel?.();
  };
  // 确认触发检验和发送请求
  const handleSubmit = () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (value) => {
        if (
          !!value.overTime &&
          formatTimesTampDate(value.overTime) < Date.parse(new Date() as unknown as string)
        ) {
          message.warning('限制登录时间不能早于当前，请重新设置');
        } else {
          if (modalType === 1) {
            const p = { ...props.info };
            p.blackTime = value.overTime;
            console.log(p);
            await updateUser(p);
            message.success('操作成功');
          }
          onSubmit?.();
        }
      })
      .catch(() => {});
  };

  const renderContent = () => {
    switch (modalType) {
      case 1:
        return (
          <>
            <ProFormDateTimePicker
              name="overTime"
              label="限制结束时间"
              placeholder="请输入限制结束时间"
              rules={[{ required: true, message: '请输入限制结束时间' }]}
              fieldProps={{
                format: 'YYYY-MM-DD HH:mm:ss',
              }}
            />
          </>
        );
      case 2:
        return <></>;
      default:
        return <></>;
    }
  };
  return (
    <Modal
      width={400}
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
        // labelCol={{ span: 5 }}
        name="modal"
        submitter={false}
        formRef={formRef}
        validateTrigger="onBlur"
        preserve={false}
      >
        {renderContent()}
      </ProForm>
    </Modal>
  );
};
export default ModalShow;
