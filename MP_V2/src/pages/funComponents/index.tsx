import React from 'react';
import { Button } from 'antd';
import { getPublicPath } from '@/common/utils';
const Main: React.FC = () => {
  return (
   <>
      <Button
        key="downExcel"
        onClick={(e) => e.stopPropagation()}
        download="Excel模板.xlsx"
        href={getPublicPath('ExcelDoc.xlsx')}
      >
        下载excel模板
      </Button>
      <Button
        key="downImg"
        onClick={(e) => e.stopPropagation()}
        download="rabbit.jpg"
        href={getPublicPath('rabbit.jpg')}
      >
        下载rabbit图片
      </Button>
      <Button
        key="To"
        onClick={(e) => e.stopPropagation()}
        download="mouseSee.html"
        href={getPublicPath('FC/mouseSee.html')}
      >
        下载mouseSee
      </Button>
      一大波有趣的ui组件即将袭来...期待...
      </>
  );
};
export default Main;
