import { getTokenKey } from '@/common/utils';
import { sendCode, testCode, updatePasswordByEmail } from '@/services/user';
import { PasswordReg } from '@/util/const';
import { LockOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormCaptcha,
  ProFormDependency,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { FC, useRef, useState } from 'react';
import { history,Link } from 'umi';
import styles from './style.less';

const Register: FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [captchaOk, setCaptchaOk] = useState(true);

  // 二次密码校验
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== formRef.current?.getFieldValue('password')) {
      return promise.reject('两次密码不一致');
    }
    return promise.resolve();
  };
  // 修改密码
  const updatePassword = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
    const res=  await updatePasswordByEmail(values)
    !!res.state?message.success("修改成功"):message.error("修改失败")
    localStorage.removeItem(getTokenKey('ryw'));
    history.replace('/user/login');


    });
  };

  // 验证验证码（可以优化后端限定验证次数），然后取反标识符
  const checkCode = async (value: string, email: string) => {
    const params = {
      code: value,
      email: email,
    };
    const res = await testCode(params);
    if (res === false) {
      setCaptchaOk(true)

      return Promise.reject(`邮箱验证失败`);
    }
    setCaptchaOk(false)
    return Promise.resolve();
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
                disabled: !captchaOk,

                // prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              allowClear
            />

            <ProFormDependency name={['email']}>
              {({ email }) => {
                return (
                  <>
                    <ProFormCaptcha
                      fieldProps={{
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      // captchaProps={{
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
                        {
                          validator: (rule,value) => checkCode(value, email),
                        },
                      ]}
                      onGetCaptcha={async (email) => {
                        const result = await sendCode(email);                        
                        if (result === "success") {
                          message.success("文本邮件发送成功！");
                        }
                        if (result === "false") {
                          message.warning("目标邮箱不存在");
                          return;
                        }if (result === "failure") {
                          message.warning("文本邮件发送异常");
                          return;
                        }
                      }}
                    />
                  </>
                );
              }}
            </ProFormDependency>

 
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
              placeholder={captchaOk ? '请先通过账号邮箱验证' : '请输入密码'}
              fieldProps={{
                minLength: 8,
                maxLength: 20,
                showCount: true,
                disabled: captchaOk,
              }}
              allowClear
            />
            <ProFormText.Password
              name="confirm"
              validateFirst
              label="确认密码"
              dependencies={['password']}
              placeholder={captchaOk ? '请先通过账号邮箱验证' : '请再次输入密码'}
              fieldProps={{
                disabled: captchaOk,
              }}
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
              disabled={captchaOk}
              onClick={updatePassword}
            >
              <span>确认修改</span>
            </Button>
          </>
          <Link className={styles.login} to="/user/login">
            <span>返回登录</span>
          </Link>
        </ProForm>
      </div>
    </div>
  );
};
export default Register;
