import React, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useParams, history, useModel } from 'umi';
import { Button, Card, Col, Input, message, Row, Upload } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import WangEditor from '@/components/WangEditor';
import { addMemo, deleteMemo, getMemoByMemoid, updateMemo } from '@/services/memo';
import { editorH5ToNormal, getTokenKey } from '@/common/utils';
import { UploadOutlined } from '@ant-design/icons';
import './index.less';
import { Info } from '@/util/info';
import { getEditorDefaultValue, maxContentLength } from '@/util/const';
import { IDomEditor } from '@wangeditor/editor';

const TextDetail: React.FC = () => {
  const { memoid } = useParams<{ memoid: string }>();
  const { initialState } = useModel('@@initialState');
  // 编辑器内容
  const [memo, setMemo] = useState<memo>({
    h5content: getEditorDefaultValue(initialState?.currentUser?.username as string),
  } as memo);
  const getMemoData = async () => {
    // 用来做请求和改变时候的判断
    const memo = await getMemoByMemoid(memoid as unknown as number);
    setMemo(memo);
  };
  useEffect(() => {
    getMemoData();
  }, []);

  const onFinish = async () => {
    console.log(memo);

    if (memo.title.length <= 0) {
      message.warning('请输入标题内容');
      return;
    }
    const content = editorH5ToNormal(memo.h5content);
    if (content.length > maxContentLength) {
      message.warning('内容长度超出最大限制');
      return;
    }
    !!memoid
      ? await updateMemo({ ...memo, content })
      : await addMemo({
          cover: initialState?.currentUser?.avatar as string,
          title: memo.title,
          h5content: memo.h5content,
          content,
        } as memo);
    history.push(`/memorandum`);
    message.success(`${!!memoid ? '修改' : '添加'}成功`);
  };
  const handleChangeEditor = (editor: IDomEditor) => {
    setMemo((memo) => {
      return {
        ...memo,
        h5content: editor.getHtml(),
      };
    });
  };

  const formButtonNode = (
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
                    getMemoData();
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
                  src={memo.cover || initialState?.currentUser?.avatar}
                  style={{ maxHeight: '100px', maxWidth: '100px' }}
                  alt="avatar"
                />
                <div className="mask">
                  <UploadOutlined style={{ fontSize: '30px' }} />
                </div>
              </Upload>
            </div>
            {!(!!memoid && !memo.title) && (
              <Input
                allowClear
                placeholder="please insert title | 请输入标题"
                defaultValue={memo.title}
                maxLength={32}
                showCount
                className="title"
                onChange={(e) => {
                  memo.title = e.target.value;
                  setMemo(memo);
                }}
              />
            )}
            <WangEditor h5Content={memo.h5content} onChange={handleChangeEditor} />
            {formButtonNode}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default TextDetail;
