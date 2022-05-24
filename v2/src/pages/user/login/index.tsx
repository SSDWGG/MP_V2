import React, { useState } from 'react';
import { login } from '@/services/user';
import { Button, Form, Input, message, Tooltip } from 'antd';
import { history, Link, useModel } from 'umi';
import style from './index.less';
import { getTokenKey } from '@/common/utils';

interface FormValues {
  username: string;
  password: string;
}

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = (path: string) => {
  if (!history) return;
  setTimeout(() => {
    history.replace(`${path}`);
  }, 800);
};
const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      message.success('登录成功！正在为您跳转主页...');
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
      goto('/todolist');
    }
  };
  async function onFinish(values: FormValues) {
    setSubmitting(true);
    const token_key = getTokenKey('ryw');
    try {
      const loginRes = await login(values);
      localStorage.setItem(token_key, loginRes.token);
      try {
        await fetchUserInfo();
      } catch (error) {
        message.error('账号暂无权限，请联系管理员！');
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  }

  return (
    <div className={style.loginPage}>
      <div className="login__left-text">
        <div className="login-page__welcome">
          {/* 定位是个人管理，v1不考虑多用户模式 */}
          <h1>WGG的私人管理平台</h1>
          <p className="login-page__welcome_EnglishTitle">Wgg Personal management platform</p>
          <p>全数字化管理平台</p>
        </div>
        <div className="login-page__logo">
          <img src="/login.png" />
        </div>
      </div>
      <div className="login__form-container">
        <h1 className="login__title">欢迎登录</h1>
        <Form
          className="login__form"
          form={form}
          onFinish={onFinish}
          initialValues={{ protocolChecked: false }}
        >
          <Form.Item
            className="ryw-login-item"
            name="username"
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('请输入您的用户名');
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input className="ryw-login-input" placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            className="ryw-login-item login__form-password"
            name="password"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('请输入您的密码');
                  }

                  return Promise.resolve();
                },
              }),
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password className="ryw-login-input" placeholder="请输入8-20位密码" />
          </Form.Item>

          <Form.Item className="login__form-login-btn-item">
            <Button
              className="login__form-login-btn"
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="login__extra-link">
          <Tooltip title="请联系管理员" placement="bottom" color="bule">
            <a>忘记密码？</a>
          </Tooltip>
          <Link to="/user/register">申请账号</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
