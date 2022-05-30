import { addUser } from '@/services/user';
import { Button, Form, Input, Modal, Popover, Progress, Result, Select } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { history, Link } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  // const [count, setCount]: [number, any] = useState(0);
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  // 验证码倒计时
  // const onGetCaptcha = () => {
  //   let counts = 59;
  //   setCount(counts);
  //   interval = window.setInterval(() => {
  //     counts -= 1;
  //     setCount(counts);
  //     if (counts === 0) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const onFinish = async (values: UserType.ParamsAddUser) => {
    const p = { ...values };
    // delete p.confirm;

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
              <span>你的账户：{values.username} 注册成功</span>
            </div>
          }
          subTitle="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
        />
      ),
    });
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.loginPage}>
      <div className="login__left-text">
        <div className="login-page__welcome">
          {/* 定位是个人管理，v1不考虑多用户模式 */}
          <h1>多功能全数字化平台</h1>
          <p className="login-page__welcome_EnglishTitle">Wgg Personal management platform</p>
          <p>全数字化管理平台</p>
        </div>
        <div className="login-page__logo">
          <img src="/login.png" />
        </div>
      </div>
      <div className={styles.main}>
        <h1 className="login__title">注册</h1>{' '}
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账户名!',
              },
            ]}
          >
            <Input size="large" placeholder="账户名" />
          </FormItem>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="确认密码" />
          </FormItem>
          <InputGroup compact>
            <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
              <Option value="86">+86</Option>
            </Select>
            <FormItem
              style={{ width: '80%' }}
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^\d{11}$/,
                  message: '手机号格式错误!',
                },
              ]}
            >
              <Input size="large" placeholder="手机号" />
            </FormItem>
          </InputGroup>
          {/* <Row gutter={8}>
            <Col span={16}>
              <FormItem
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
              >
                <Input size="large" placeholder="验证码" />
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                size="large"
                disabled={!!count}
                className={styles.getCaptcha}
                onClick={onGetCaptcha}
              >
                {count ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row> */}
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱地址!',
              },
              {
                type: 'email',
                message: '邮箱地址格式错误!',
              },
            ]}
          >
            <Input size="large" placeholder="邮箱" />
          </FormItem>
          <FormItem>
            <Button size="large" className={styles.submit} type="primary" htmlType="submit">
              <span>注册</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default Register;
