import React, { useEffect, useRef, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useParams, history, useModel } from 'umi';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { Button, Card, Col, message, Row, Upload } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { addMemo, deleteMemo, getMemoByMemoid, updateMemo } from '@/services/memo';
import { getTokenKey } from '@/common/utils';
import { UploadOutlined } from '@ant-design/icons';
import './index.less';
import { Info } from '@/util/info';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

const TextDetail: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const { memoid } = useParams<{ memoid: string }>();
  const { initialState } = useModel('@@initialState');
  const [memoCover, setMemoCover] = useState('');

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // 编辑器内容
  const [html, setHtml] = useState('');
  const [htmlLength, setHtmlLength] = useState(0);
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
  };
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  const onChangeEditor = (editor: any) => {
    setHtml(editor.getHtml());
    const regex = /(<([^>]+)>)/gi;
    const content = editor.getHtml();
    const htmlLength = content.replace(regex, '').length;
    setHtmlLength(htmlLength);
  };
  // 富文本转普通文本
  const editorH5ToNormal = (h5Content: string) => {
    let regex = /(<([^>]+)>)/gi;
    // return h5Content.replace(regex, '').replaceAll('&nbsp;', '');
    return h5Content.replace(regex, '');
  };
  // pc富文本转小程序富文本
  const editorH5ToMini = (h5Content: string) => {
    /**
     * 转译标签收集
     * p -> view
     *  <p></p>
     * div -> view
     *  <div></div>
     * span -> text
     *  <span></span>
     * px -> %
     * '<p', '</p>', '<div', '<div/>', '<span', '<span/>'
     */
    let minDom = {
      '<p': '<view',
      '</p>': '</view>',
      '<div': '<view',
      '</div>': '</view>',
      '<span': '<text',
      '</span>': '</text>',
      '<img ': '<image mode="widthFix" ',
      '<strong>': '<text class="strong">',
      '</strong>': '</text>',
      '18px': '40rpx',
      '16px': '34rpx',
      '14px': '30rpx',
      '12px': '28rpx',
      scaleToFill: 'widthFix',
      '&nbsp;': '<text> </text>',
      '><source': '',
      'type="video/mp4"/></video>': 'type="video/mp4"></video>',
    };
    let miniContent = h5Content;
    Object.keys(minDom).forEach((item) => {
      miniContent = miniContent.replaceAll(item, minDom[item]);
    });
    return miniContent;
  };

  const getRequestMemoData = async () => {
    // 用来做请求和改变时候的判断
    const memo = !!memoid ? await getMemoByMemoid(memoid as unknown as number) : {};
    console.log(memo);
    setHtml((memo as any).h5content);

    setMemoCover((memo as memo).cover || '');
    return { ...memo };
  };

  const onFinish = async () => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then(async (values) => {
        const cover = initialState?.currentUser?.avatar;
        const h5content = html;
        const content = editorH5ToNormal(html);
        !!memoid
          ? await updateMemo({ memoid, h5content,content, ...values })
          : await addMemo({ cover, h5content, content, ...values });
        history.push(`/memorandum`);
        message.success(`${!!memoid ? '修改' : '添加'}成功`);
      })
      .catch((err) => {
        console.log('error', err);
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
            <ProForm
              submitter={{
                render: () => null,
              }}
              request={getRequestMemoData}
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
            </ProForm>
            <div className="page-editor">
              <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                  editor={editor}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                  defaultConfig={editorConfig}
                  value={html}
                  onCreated={setEditor}
                  onChange={(e) => onChangeEditor(e)}
                  mode="default"
                  style={{ height: '400px', overflowY: 'hidden' }}
                />
              </div>
              {htmlLength > 5000 ? (
                <div className="htmlLength c-r">{`${htmlLength}/5000`}</div>
              ) : (
                <div className="htmlLength">{`${htmlLength}/5000`}</div>
              )}
              {/* <div style={{ marginTop: '15px' }}>1{html}</div>
              <div style={{ marginTop: '15px' }}>2{editorH5ToNormal(html)}</div>
              <div style={{ marginTop: '15px' }}>3{editorH5ToMini(html)}</div> */}
            </div>
            {formButtonNode}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default TextDetail;
