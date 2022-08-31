import React, { useRef } from 'react';
import { Modal, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { MobileReg, PasswordReg } from '@/util/const';
import { checkhave, updateUser, updateUserPassword } from '@/services/user';
import { getTokenKey } from '@/common/utils';
import { history, useModel } from 'umi';

interface CreateFormProps {
  onCancel: () => void;
  onSubmit: () => Promise<void> | void;
  modalType?: number | boolean | undefined;
  info: user;
}

const enumText = {
  1: '修改密码',
  2: '更换绑定手机',
  3: '更换绑定邮箱',
};
const ModalShow: React.FC<CreateFormProps> = (props) => {

  const { initialState } = useModel('@@initialState');

  const { onSubmit, onCancel, modalType, info } = props;

  const formRef = useRef<ProFormInstance>();

  const handleCancel = () => {
    onCancel?.();
  };
  // 确认触发检验和发送请求
  const handleSubmit = () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (value) => {
        const p = { ...value };
        p.userid = info.userid;
        p.admin = info.admin;
        if (modalType == 1) {
          await updateUserPassword(p);
          localStorage.removeItem(getTokenKey('ryw'));
          history.replace('/user/login');
        } else await updateUser(p);
        message.success({
          content: '修改成功',
        });
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
        return info;
      default:
        return info;
    }
  };
  // 二次密码校验
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== formRef.current?.getFieldValue('password')) {
      return promise.reject('两次密码不一致');
    }
    return promise.resolve();
  };

  // 邮箱重复性校验 
  const checkAlreadyHave = async (rule: any, value: any) => {
    const params = {
      [rule.field]: value,
    };
    const res = await checkhave(params);
    
    if (res.length == 1 && res[0].email !== initialState?.currentUser?.email) {
      return Promise.reject(`已被占用，请尝试其他邮箱`);
    }
    return Promise.resolve();
  };

  const renderContent = () => {
    switch (modalType) {
      case 1:
        return (
          <>
            <ProFormText.Password
              name="password"
              validateFirst
              label="新密码"
              rules={[
                { required: true, message: '请输入新密码' },
                {
                  pattern: PasswordReg,
                  message: '请输入8-20位包含大小写字母和数字',
                },
              ]}
              fieldProps={{
                minLength: 8,
                maxLength: 20,
                showCount: true,
                placeholder: '请输入新密码',
              }}
              allowClear
            />
            <ProFormText.Password
              name="confirm"
              validateFirst
              label="确认新密码"
              dependencies={['password']}
              placeholder="请再次输入新密码"
              rules={[
                {
                  required: true,
                  message: '请再次输入新密码',
                },
                {
                  validator: checkConfirm,
                },
              ]}
              allowClear
            />
          </>
        );
      case 2:
        return (
          <>
            <ProFormText
              name="phone"
              label="手机号"
              validateFirst
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  pattern: MobileReg,
                  message: '请输入正确的11位手机号',
                },
                // {
                //   validator: checkAlreadyHave,
                // },
              ]}
              fieldProps={{
                maxLength: 11,
                showCount: true,
                placeholder: '请输入手机号',
              }}
              allowClear
            />
          </>
        );
      case 3:
        return (
          <ProFormText
            name="email"
            label="邮箱"
            validateFirst
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
              {
                type: 'email',
                message: '请输入正确的邮箱格式',
              },
              {
                validator: checkAlreadyHave,
              },
            ]}
            fieldProps={{
              maxLength: 32,
              showCount: true,
              placeholder: '请输入邮箱',
            }}
            allowClear
          />
        );
      default:
        return null;
    }
  };
  return (
    <Modal
      width={500}
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
