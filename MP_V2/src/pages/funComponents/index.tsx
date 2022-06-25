import React from 'react';
import { Button } from 'antd';
import { getPublicPath } from '@/common/utils';
import './index.less';
import { FCNams } from './const';

const Main: React.FC = () => {
  return (
    <>
      {/* <Button
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
      </Button> */}
      {FCNams.map((item) => {
        return (
          <Button
            key={item}
            onClick={(e) => e.stopPropagation()}
            download={`${item}.zip`}
            href={getPublicPath(`FC/${item}.zip`)}
          >
            下载 《{`${item}`}》
          </Button>
        );
      })}

      <p>本页展示并提供一些收录的好玩的前端组件，好玩的动效，好玩的静态页面样式等</p>
      <p>文件下载完成后，解压文件，直接打开html文件即可预览和调试</p>
      <p>一大波有趣的ui/组件/html/样式即将袭来...期待...（更新测试中）</p>
      <div className="mzsm">
        <p>
          <strong>免责声明：</strong>
        </p>
        <p>本库部分资源，来自网络，版权争议与本站无关</p>
        <p> 所有内容仅限用于学习和研究目的。</p>
        <p> 联系请致信E-mail：1982549567@qq.com</p>
      </div>
    </>
  );
};
export default Main;
