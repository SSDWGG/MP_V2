import React, { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import cityData from '@/util/geographic/city.json';
import provinceData from '@/util/geographic/province.json';

import styles from './BaseView.less';
import { avatarUpload, checkhave, updateUser } from '@/services/user';
import { UploadFile } from 'antd/lib/upload/interface';

const BaseView: React.FC = () => {
  //  获取用户信息
  const { initialState, refresh } = useModel('@@initialState');
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
      if (typeof p.province === 'object') p.geographic = `${p.province.label}-${p.city}`;
      if (typeof p.province === 'string') {
        const province = provinceData.find((item) => {
          return item.id == p.province;
        });

        p.geographic = `${province?.name}-${p.city}`;
      }
      p.userid = initialState?.currentUser?.userid;
      delete p.province;
      delete p.city;
      await updateUser(p);
      await refresh();
      message.success('更新基本信息成功');
    });
  };
  const getGeographicInit = () => {
    const arr = initialState?.currentUser?.geographic?.split('-');

    if (!!arr) {
      const province = provinceData.find((item) => {
        return item.name === (arr as any)[0];
      });
      return {
        province: province?.id,
        city: (arr as any)[1],
      };
    }
    return {};
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
            initialValues={initialState?.currentUser}
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
              name="title"
              label="身份"
              validateFirst //阻塞校验
              fieldProps={{
                maxLength: 20,
                showCount: true,
                placeholder: '请输入身份',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入身份',
                },
                {
                  pattern: /^\S.*$/,
                  message: '首字符不能为空格',
                },
              ]}
              allowClear
            />
            <ProFormText
              name="gender"
              label="性别"
              width="md"
              validateFirst //阻塞校验
              fieldProps={{
                maxLength: 12,
                showCount: true,
                placeholder: '请输入您的性别',
              }}
              rules={[
                {
                  required: true,
                  message: '请输入您的性别',
                },
                {
                  pattern: /^\S.*$/,
                  message: '首字符不能为空格',
                },
              ]}
              allowClear
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

            {/* 所在省市有点bug，但是最近不打算修改，之后还是考虑直接使用组件 */}
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
                  defaultValue: getGeographicInit().province,
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
                      fieldProps={{
                        defaultValue: getGeographicInit().city,
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

            <ProFormText width="md" name="address" label="街道地址" />
          </ProForm>
        </div>
        <div className={styles.right}>
          <>
            <div className={styles.avatar_title}>头像</div>
            <div className={styles.avatar}>
              <img src={initialState?.currentUser?.avatar} alt="avatar" />
            </div>
            <Upload
              showUploadList={false}
              accept=".jpg,.jpeg,.png"
              customRequest={({ file }) => {
                avatarUpload(file as UploadFile, initialState?.currentUser?.userid as number);
                // if (isSuccess(res?.code)) {
                //   setLoading(false);
                //   !!afterSave && afterSave();
                //   !!afterUploadSuccessMessage
                //     ? afterUploadSuccessMessage(res)
                //     : message.success('上传成功');
                // } else {
                //   setLoading(false);
                //   message.error('上传失败');
                // }
              }}
              beforeUpload={(file) => {
                let shouldUpload = false;
                const isAccept = /\.(jpg|png|jpeg?g)$/.test(file.name.toLowerCase());
                const isLt1M = !!file.size ? file.size / 1024 / 1024 < 10 : true;
                if (!isAccept) {
                  message.error('图片上传格式不正确，请使用.jpg,.jpeg,.png 结尾的图片文件');
                } else if (!isLt1M) {
                  message.error('图片需小于10MB!');
                } else {
                  shouldUpload = true;
                }
                return shouldUpload;
              }}
            >
              <div className={styles.button_view}>
                <Button>
                  <UploadOutlined />
                  更换头像
                </Button>
              </div>
            </Upload>
          </>{' '}
        </div>
      </>
    </div>
  );
};

export default BaseView;
