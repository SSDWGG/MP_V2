import { addUser } from '@/services/user';
import { MobileReg, PasswordReg } from '@/util/const';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, Modal, Result } from 'antd';
import { FC, useRef } from 'react';
import { history, Link } from 'umi';
import styles from './style.less';

const Register: FC = () => {
  const formRef = useRef<ProFormInstance>();
  // 二次密码校验
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== formRef.current?.getFieldValue('password')) {
      return promise.reject('两次密码不一致');
    }
    return promise.resolve();
  };

  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const p = { ...values };
      delete p.confirm;
      await addUser(p);
      Modal.success({
        title: null,
        icon: false,
        okText: ' 返回登录',
        onOk: () => {
          history.push('/user/login');
        },
        content: (
          <Result
            status="success"
            title={
              <div className={styles.title}>
                <span>账户：{values.username} 注册成功</span>
              </div>
            }
            subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
          />
        ),
      });
    });
  };
  return (
    <div className={styles.loginPage}>
      <div className="login__left-text">
        <div className="login-page__welcome">
          <h1>多功能全数字化平台</h1>
          <p className="login-page__welcome_EnglishTitle">Versatile and fully digital platform</p>
          <p>全数字化管理</p>
        </div>
        <div className="login-page__logo">
          <img src="/login.png" />
        </div>
      </div>
      <div className={styles.main}>
        <h1 className="login__title">注册</h1>
        <ProForm
          layout="horizontal"
          labelCol={{ span: 5 }}
          submitter={false}
          formRef={formRef}
          validateTrigger="onBlur"
          preserve={false}
        >
          <>
            <ProFormText
              name="username"
              label="用户名"
              validateFirst //阻塞校验
              fieldProps={{
                maxLength: 32,
                showCount: true,
                placeholder: '请输入用户名',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  pattern: /^\S.*$/,
                  message: '首字符不能为空格',
                },
                // {
                //   validator: checkAlreadyHave,
                // },
              ]}
              allowClear
            />
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
                // {
                //   validator: checkAlreadyHave,
                // },
              ]}
              fieldProps={{
                maxLength: 32,
                showCount: true,
                placeholder: '请输入邮箱',
              }}
              allowClear
            />

            <ProFormText.Password
              name="password"
              validateFirst
              label="密码"
              rules={[
                { required: true },
                {
                  pattern: PasswordReg,
                  message: '请输入8-20位字符，必须包含大小写字母和数宇',
                },
              ]}
              fieldProps={{
                minLength: 8,
                maxLength: 20,
                showCount: true,
                placeholder: '请输入密码',
              }}
              allowClear
            />
            <ProFormText.Password
              name="confirm"
              validateFirst
              label="确认密码"
              dependencies={['password']}
              placeholder="请在再次输入密码"
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
            <Button
              size="middle"
              className={styles.submit}
              type="primary"
              onClick={validateAndGetFormatValue}
            >
              <span>注册</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </>
        </ProForm>
      </div>
    </div>
  );
};
export default Register;
