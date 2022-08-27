import { formatTimesTampDate, getTokenKey } from '@/common/utils';
import { login } from '@/services/user';
import { DeploymentUnitOutlined, LikeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, notification } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { history, Link, useModel } from 'umi';
import style from './index.less';
import { GetHelloContent } from '@/util/const';


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

    if (!!userInfo) {
      // 账号密码正确，验证是否在黑名单中（这个黑名单的验证操作，最好由后端来做请求拦截验证，而不是前端请求验证，前端的时间获取是不安全的）
      if (formatTimesTampDate(userInfo.blackTime) < Date.parse(new Date() as unknown as string)) {
        message.success('登录成功！正在为您跳转主页...');
        // refresh(); 切换账号登录，主动刷新intistate内容
        await setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
        goto('/todolist');
        setTimeout(() => {
          notification.success({
            message: GetHelloContent(),
            description: `欢迎登录, ${userInfo.username}~`,
            duration:10,
            icon:<DeploymentUnitOutlined />,
            className: 'notification-class',
            
          });
        }, 2000);
      } else {
        notification.error({
          message: '暂无登录权限',
          description: `账号被限制登录,下次允许登录时间${moment(userInfo.blackTime).fromNow()}`,          
        });
        // message.error(`账号被限制登录,下次允许登录时间${moment(userInfo.blackTime).fromNow()}`);
      }
    }
  };
  async function onFinish(values: FormValues) {
    setSubmitting(true);
    const token_key = getTokenKey('ryw');

    const loginRes = await login(values);

    if (!!loginRes) {
      localStorage.setItem(token_key, loginRes);

      await fetchUserInfo();
    } else {
      message.error('登录失败，请重新尝试输入账号密码！');
    }
    setSubmitting(false);
  }

  return (
    <div className={style.loginPage}>
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
          {/* <Tooltip title="请联系管理员重置" placement="bottom" color="bule"> */}
          <Link to="/user/forget">忘记密码？</Link>
          {/* </Tooltip> */}
          <Link to="/user/register">申请账号</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
