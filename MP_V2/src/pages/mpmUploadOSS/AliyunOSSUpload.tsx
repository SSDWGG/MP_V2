import { uuid } from '@/util/const';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

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
  const { Dragger } = Upload;

  // https://help.aliyun.com/document_detail/31988.html
  const getOSSData = () => ({
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
      const result = await getOSSData();
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
    onChange?.([...fileList]);};

  const onPreview = (file: UploadFile) => {
    const input = document.createElement('input');
 	input.setAttribute('readonly', 'readonly');
 	input.setAttribute('value', `${OSSData?.host}/${file.url}`);
 	document.body.appendChild(input);
 	input.setSelectionRange(0, 9999);
 	input.select();
   document.execCommand('copy');
 	document.body.removeChild(input); 
   message.success('地址已复制至到剪贴板！');
    // window.open();
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
    // 使用userid和时间戳的形式避免重复 ${initialState?.currentUser?.userid}-
    const filename = `${uuid()}-${Date.now()}${file.name}`;
    // @ts-ignore   OSSData.host+'/'+
    file.url = OSSData.dir + filename;

    return file;
  };
  // directory 暂不支持上传文件夹，会和限定类型冲突
  const uploadProps: UploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    multiple: true,
    listType: 'picture-card',
    onChange: handleChange,
    onRemove,
    onPreview,
    data: getExtraData,
    beforeUpload,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">yunxiaoding-mini项目组的同学你好</p>
      <p className="ant-upload-text">
        此工具将帮助你快捷的把图片直接上传到oss的项目位置，并获取到图片地址
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload（点击或者拖拽上传）
      </p>
      <p className="ant-upload-text">Support for a singleor bulk upload.（支持单个或批量上传）</p>
      <p className="ant-upload-text">Click Preview File to copy the file address.（点击预览文件即可复制文件的oss地址）</p>
    </Dragger>
  );
};

export default AliyunOSSUpload;
