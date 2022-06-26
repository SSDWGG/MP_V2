import React from 'react';
import { Button, Card, List } from 'antd';
import { getPublicPath } from '@/common/utils';
import './index.less';
import { FCNams } from './const';

const Main: React.FC = () => {
  return (
    <>
      <Card>
        <div className="mzsm">
          <p>
            <strong>免责声明：</strong>
          </p>
          <p>本库部分资源，来自网络，版权争议与本站无关,所有内容仅限用于学习和研究目的。</p>
          <p> 联系请致信E-mail：1982549567@qq.com</p>
        </div>
        <p>本页展示并提供一些收录的好玩的前端组件，好玩的动效，好玩的静态页面样式等</p>
        <p>文件下载完成后，解压文件，直接打开html文件即可预览和调试</p>
        <p>一大波有趣的ui/组件/html/样式即将袭来...（库持续更新中）</p>

        <Button
          key="downImg"
          onClick={(e) => e.stopPropagation()}
          download="rabbit.jpg"
          href={getPublicPath('rabbit.jpg')}
        >
          下载 站标rabbit图片
        </Button>
        {/* <Button
          key="downExcel"
          onClick={(e) => e.stopPropagation()}
          download="Excel模板.xlsx"
          href={getPublicPath('ExcelDoc.xlsx')}
        >
          下载excel模板（之后会做一些支持excel的操作功能）
        </Button> */}
        <List<string>
          grid={{
            gutter: 20,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={FCNams}
          renderItem={(item) => (
            <List.Item>
              <div className="listitem">
                <div className="dlButton">
                  <Button
                    key={item}
                    type="dashed"
                    onClick={(e) => e.stopPropagation()}
                    download={`${item}.zip`}
                    href={getPublicPath(`FC/${item}.zip`)}
                  >
                    下载 《{`${item}`}》
                  </Button>
                </div>
                <a href={getPublicPath(`FC/gif/${item}.gif`)} className="agifImg">
                  <img src={`/FC/gif/${item}.gif`} className="gifImg" alt={item} />
                </a>
              </div>
            </List.Item>
          )}
        ></List>
      </Card>
    </>
  );
};
export default Main;
