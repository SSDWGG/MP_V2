import React, { useRef, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useParams, history, useModel } from 'umi';
import ProForm, { ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Button, Card, Col, message, Row, Upload } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { addMemo, deleteMemo, getMemoByMemoid, updateMemo } from '@/services/memo';
import { getTokenKey } from '@/common/utils';
import { UploadOutlined } from '@ant-design/icons';
import './index.less';
import { Info } from '@/util/info';

const TextDetail: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { memoid } = useParams<{ memoid: string }>();
  const { initialState } = useModel('@@initialState');
  const [memoCover, setMemoCover] = useState('');
  const [updateFlag, setUpdateFlag] = useState(0);

  const onFinish = async () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values) => {
        const cover = initialState?.currentUser?.avatar;
        !!memoid ? await updateMemo({ memoid, ...values }) : await addMemo({ cover, ...values });
        history.push(`/memorandum`);
        message.success(`${!!memoid ? '修改' : '添加'}成功`);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const formButton = (
    <ButtonGroup>
      <Button
        type="default"
        onClick={() => {
          onFinish();
        }}
      >
        {!!memoid ? '确认修改' : '确认添加'}
      </Button>
      <Button
        type="default"
        style={{ margin: '0 20px' }}
        onClick={() => {
          history.push(`/memorandum`);
        }}
      >
        返回列表
      </Button>
      {!!memoid && (
        <Button
          type="default"
          onClick={async () => {
            await deleteMemo(memoid as unknown as number);
            history.push(`/memorandum`);
            message.success('删除成功');
          }}
        >
          删除
        </Button>
      )}
    </ButtonGroup>
  );
  return (
    <GridContent>
      <Row gutter={24} justify="center">
        <Col lg={16} md={16} sm={16} xs={16}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <ProForm
              submitter={{
                render: () => formButton,
              }}
              params={{ updateFlag }}
              request={async () => {
                // 用来做请求和改变时候的判断
                const memo = !!memoid ? await getMemoByMemoid(memoid as unknown as number) : {};
                setMemoCover((memo as memo).cover || '');
                return { ...memo };
              }}
              formRef={formRef}
            >
              <div className="memoimg">
                <Upload
                  showUploadList={false}
                  accept=".jpg,.jpeg,.png"
                  action={`${Info.ip}v2/memo/memoCoverUpload`}
                  headers={{
                    authorization: 'authorization-text',
                    token: localStorage.getItem(getTokenKey('ryw')) as string,
                    memoid: memoid,
                  }}
                  onChange={async (info) => {
                    if (info.file.status === 'done') {
                      const memo = !!memoid
                        ? await getMemoByMemoid(memoid as unknown as number)
                        : {};
                      setMemoCover((memo as memo).cover || '');
                      // 为啥这里用params来刷新request，没有被触发
                      // setUpdateFlag(pre => pre++)

                      message.success(`图片上传成功`);
                    } else if (info.file.status === 'error') {
                      message.error(`图片上传失败`);
                    }
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
                  <img
                    src={memoCover || initialState?.currentUser?.avatar}
                    style={{ maxHeight: '70px', maxWidth: '70px' }}
                    alt="avatar"
                  />
                  <div className="mask">
                    <UploadOutlined style={{ fontSize: '30px' }} />
                  </div>
                </Upload>
              </div>
              <ProFormText
                name="title"
                label="标题"
                fieldProps={{
                  maxLength: 64,
                  showCount: true,
                }}
                rules={[
                  {
                    required: true,
                    message: '标题不能为空',
                  },
                ]}
                allowClear
              />
              <ProFormTextArea
                name="content"
                label="内容"
                fieldProps={{
                  autoSize: { minRows: 6, maxRows: 200 },
                  maxLength: 20000,
                  showCount: true,
                }}
                rules={[
                  {
                    required: true,
                    message: '内容不能为空',
                  },
                ]}
                allowClear
              />
            </ProForm>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default TextDetail;
