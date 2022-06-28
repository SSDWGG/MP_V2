import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { getPublicPath } from '@/common/utils';
import styles from './index.less';
import { FCNams } from './const';

const Main: React.FC = () => {
  const [activeFC, setActiveFC] = useState('看鼠标');

  return (
    <>
      <Card className={styles.Main}>
        <div className="mzsm">
          <p>
            <strong>免责声明：</strong>
          </p>
          <p>本库部分资源，来自网络，版权争议与本站无关,所有内容仅限用于学习和研究目的。</p>
          <p> 联系请致信E-mail：1982549567@qq.com</p>
        </div>
        <p>本页展示并提供一些收录的好玩的前端组件，好玩的动效，好玩的静态页面样式等</p>
        <p>文件下载完成后，解压文件，直接打开html文件即可预览和调试</p>
        <p>
          一大波有趣的ui/组件/html/样式即将袭来...（库持续更新中）
          <Button
            key="downImg"
            onClick={(e) => e.stopPropagation()}
            download="rabbit.jpg"
            href={getPublicPath('rabbit.jpg')}
          >
            下载 站标rabbit图片
          </Button>
        </p>

        <h3>
          如果觉得对您有些许帮助，期待您给本项目点个star-------{'>'}
          <strong>
            <a href="https://github.com/SSDWGG/MP_V2">star</a>
          </strong>
        </h3>

        <div className='chooseDiv'>
          {FCNams.map((item) => {
            return (
              <div className="FCDiv">
                <Button
                  key={item}
                  type="dashed"
                  onClick={() => {
                    setActiveFC(item);
                  }}
                >
                  《{`${item}`}》
                </Button>
              </div>
            );
          })}
        </div>

        <div className="listitem">
          <div className="dlButton">
            <Button
              key={activeFC}
              type="primary"
              onClick={(e) => e.stopPropagation()}
              download={`${activeFC}.zip`}
              href={getPublicPath(`FC/${activeFC}.zip`)}
            >
              下载 《{`${activeFC}`}》
            </Button>
          </div>
          <a href={getPublicPath(`FC/gif/${activeFC}.gif`)} className="agifImg">
            <img src={`/FC/gif/${activeFC}.gif`} className="gifImg" alt={activeFC} />
          </a>
        </div>
      </Card>
    </>
  );
};
export default Main;
