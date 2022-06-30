import { addUser } from '@/services/user';
import { PasswordReg } from '@/util/const';
import { LockOutlined } from '@ant-design/icons';
import ProForm, { ProFormCaptcha, ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, message, Modal, Result } from 'antd';
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
              <div>
                <div>注册成功</div>
                {values.username.length > 3 ? (
                  <span>您的账户名：{values.username.slice(0, 3)}... </span>
                ) : (
                  <span>账户名：{values.username} </span>
                )}
              </div>
            }
            subTitle="激活邮件稍后将会发送到您的邮箱中，请查收。"
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
        <h1 className="login__title">重置密码</h1>
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
              name="email"
              label="邮箱"
              validateFirst
              rules={[
                {
                  required: true,
                  message: '请输入邮箱以验证账号',
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
                // prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              allowClear
            />

            <ProFormCaptcha
              fieldProps={{
                // size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              // captchaProps={{
              //   size: 'large',
              // }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} 获取验证码`;
                }
                return '获取验证码';
              }}
              phoneName="email"
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (mobile) => {
                console.log(mobile);
                const result = false;
                if (result === false) {
                  return;
                }
                message.success('获取验证码成功！验证码为：1234');
              }}
            />


{/* 这仨用依赖来显示是否可以改和点击   验证码失焦自动校验 */}
            <ProFormText.Password
              name="password"
              validateFirst
              label="新密码"
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
              label="确认新密码"
              dependencies={['password']}
              placeholder="请再次输入密码"
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
              <span>确认修改</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>返回登录</span>
            </Link>
          </>
        </ProForm>
      </div>
    </div>
  );
};
export default Register;

{
  /* <>

<ProFormCaptcha
  fieldProps={{
    size: 'large',
    prefix: <LockOutlined className={styles.prefixIcon} />,
  }}
  captchaProps={{
    size: 'large',
  }}
  placeholder={'请输入验证码'}
  captchaTextRender={(timing, count) => {
    if (timing) {
      return `${count} 获取验证码`;
    }
    return '获取验证码'
  }}
  phoneName="mobile"

  name="captcha"
  rules={[
    {
      required: true,
      message: "请输入验证码！",
    },
  ]}
  onGetCaptcha={async (mobile) => {
    console.log(mobile);
    
    const result = false
    if (result === false) {
      return;
    }
    message.success('获取验证码成功！验证码为：1234');
  }}
/>
</> */
}
