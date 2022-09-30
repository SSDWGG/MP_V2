import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const AliyunOSSUpload = ({ value, onChange }: AliyunOSSUploadProps) => {
  const [OSSData, setOSSData] = useState<OSSDataType>();
  const { initialState } = useModel('@@initialState');
  const { Dragger } = Upload;

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  const mockGetOSSData = () => ({
    dir: 'yunxiaoding-mini/system/assets/images/', //路径
    expire: '1577811661', //过期时间
    host: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com', //bucket
    accessId: 'LTAIa2dE04R5knjA', //账号
    policy:
      'eyJleHBpcmF0aW9uIjoiMjA5OS0wMS0wMlQxNzowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==', // 策略    ,
    signature: 'eHCOz2eHMdmNGu38NF0WBaScFxE=', // 签名
  });

  const init = async () => {
    try {
      const result = await mockGetOSSData();
      setOSSData(result);
    } catch (error) {
      message.error(error as any);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    onChange?.([...fileList]);
    // 多条加载，是非线性的
    // 防抖判断所有进度是否都到达100，到达100，将文件名存储到数据中，等到所有都上传完成再一起抛出提示和复制链接，并存储到消息记录栈中
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    // const suffix = file.name.slice(file.name.lastIndexOf('.'));
    // 使用userid和时间戳的形式避免重复
    const filename = `${initialState?.currentUser?.userid}-${Date.now()}${file.name}`;
    // @ts-ignore   OSSData.host+'/'+
    file.url = OSSData.dir + filename;

    return file;
  };
  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    directory:true,
    multiple:true,
    listType:'picture-card',
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps}>
      {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p>yunxiaoding-mini项目组的同学你好，此工具可以帮助你将图片直接上传到oss，并获取到图片地址</p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  );
};

export default AliyunOSSUpload;
