import React from 'react';
import AliyunOSSUploadWGGW from './AliyunOSSUploadWGGW';
import AliyunOSSUploadCommon from './AliyunOSSUploadCommon';
import style from './index.less';

const mpmToOSS: React.FC = () => (
  <div className={style.AliyunOSSUpload}>
    <AliyunOSSUploadWGGW />
    <AliyunOSSUploadCommon />
  </div>
);

export default mpmToOSS;
