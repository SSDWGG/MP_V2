import React, { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import cityData from '@/util/geographic/city.json';
import provinceData from '@/util/geographic/province.json';

import styles from './BaseView.less';
import { MobileReg } from '@/util/const';
import { checkhave, updateUser } from '@/services/user';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  //  获取用户信息
  const { initialState } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();

  // 用户名重复性校验  用户注册，用户名不得重复
  const checkAlreadyHave = async (rule: any, value: any) => {
    const params = {
      [rule.field]: value,
    };
    const res = await checkhave(params);
    if (res.length == 1 && res[0].username !== initialState?.currentUser?.username) {
      return Promise.reject(`已被占用，请尝试其他用户名`);
    }
    return Promise.resolve();
  };
  // 提交信息
  const handleFinish = async () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const p = { ...values };
      p.geographic = `${p.province.label}-${p.city}`;
      p.userid = initialState?.currentUser?.userid;
      delete p.province;
      delete p.city;
      console.log(p);
      await updateUser(p);
      message.success('更新基本信息成功');
    });
  };
  const getGeographicInit = () => {
    const arr = initialState?.currentUser?.geographic?.split('-');
    const province = provinceData.find((item) => {
      return item.name === (arr as any)[0];
    });

    console.log(province);
    return {
      province: province?.id,
      city: (arr as any)[1],
    };
  };

  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            validateTrigger="onBlur"
            formRef={formRef}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{
              ...initialState?.currentUser,
            }}
            hideRequiredMark
          >
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
                {
                  validator: checkAlreadyHave,
                },
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
              ]}
              fieldProps={{
                maxLength: 11,
                showCount: true,
                placeholder: '请输入手机号',
              }}
              allowClear
            />
            <ProFormText
              width="md"
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            />
            {/* 地区前端固定写中国 */}
            <ProFormSelect
              width="sm"
              name="country"
              label="国家/地区"
              initialValue={'China'}
              rules={[
                {
                  required: true,
                  message: '请输入您的国家或地区!',
                },
              ]}
              options={[
                {
                  label: '中国',
                  value: 'China',
                },
              ]}
            />

            <ProForm.Group title="所在省市" size={8}>
              <ProFormSelect
                rules={[
                  {
                    required: true,
                    message: '请输入您的所在省!',
                  },
                ]}
                width="sm"
                fieldProps={{
                  labelInValue: true,
                }}
                initialValue={getGeographicInit().province}
                name="province"
                className={styles.item}
                request={async () => {
                  return provinceData.map((item) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  });
                }}
              />
              <ProFormDependency name={['province']}>
                {({ province }) => {
                  return (
                    <ProFormSelect
                      params={{
                        key: province?.value,
                      }}
                      initialValue={getGeographicInit().city}
                      name="city"
                      width="sm"
                      rules={[
                        {
                          required: true,
                          message: '请输入您的所在城市!',
                        },
                      ]}
                      disabled={!province}
                      className={styles.item}
                      request={async () => {
                        if (!province?.key) {
                          return [];
                        }
                        return cityData[province.key || ''].map((item: { name: any; id: any }) => {
                          return {
                            label: item.name,
                            value: item.name,
                          };
                        });
                      }}
                    />
                  );
                }}
              </ProFormDependency>
            </ProForm.Group>
            <ProFormText
              width="md"
              name="address"
              label="街道地址"
              rules={[
                {
                  required: true,
                  message: '请输入您的街道地址!',
                },
              ]}
            />
            <ProFormTextArea
              name="signature"
              label="个人格言"
              rules={[
                {
                  required: true,
                  message: '请输入个人格言!',
                },
              ]}
              placeholder="个人格言"
            />
          </ProForm>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={initialState?.currentUser?.avatar as string} />
        </div>
      </>
    </div>
  );
};

export default BaseView;
