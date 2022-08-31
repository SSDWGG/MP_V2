import React, { useEffect, useState } from 'react';
import { Button, Card, Spin } from 'antd';
import { getPublicPath, handleDownload } from '@/common/utils';
import styles from './index.less';
import { FCNams } from './const';
import { Info } from '@/util/info';
import { LoadingOutlined } from '@ant-design/icons';

const Main: React.FC = () => {
  const [activeFC, setActiveFC] = useState('看鼠标');
  const [loading, setLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const buttonList = FCNams.map((item) => {
    return (
      <div className="FCDiv" key={item}>
        <Button
          key={item}
          type="dashed"
          onClick={() => {
            setLoading(true);
            setActiveFC(item);
          }}
        >
          《{`${item}`}》
        </Button>
      </div>
    );
  });
  const FCItem = (
    <div className="listitem">
      <div className="dlButton">
        <Button
          key={activeFC}
          type="primary"
          // onClick={(e) => e.stopPropagation()}
          onClick={() => handleDownload(activeFC)}
          // download={`${activeFC}.zip`}
          // href={getPublicPath(`FC/${activeFC}.zip`)}
        >
          下载 《{`${activeFC}`}》
        </Button>
      </div>
      {/* <a href={getPublicPath(`FC/gif/${activeFC}.gif`)} className="agifImg">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <img src={`/FC/gif/${activeFC}.gif`} className="gifImg" alt={activeFC} />
        )}
      </a> */}
      <a href={`${Info.ossBaseUrl}${activeFC}.gif`} className="agifImg">
        {loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <img src={`${Info.ossBaseUrl}${activeFC}.gif`} className="gifImg" alt={activeFC} />
        )}
      </a>
    </div>
  );

  useEffect(() => {
    setLoading(false);
  }, [FCItem]);
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
        {/* <Card>
          <h3>
            <strong>FAQ</strong>
          </h3>
          <h3>
            <strong>Q：为什么该页面加载这么卡顿，动图播放不流畅？</strong>{' '}
          </h3>
          <h3>
            <strong>
              A：受限于服务器带宽和性能（1g），目前图片没有使用在cdn等外链加速，
              所以传输速度确实是非常慢，后期可能会进行服务器升级和cdn优化等。
              每一张动图由于压缩导致丢失了一定的画质和帧率，可以耐心等待一会儿，加载完成后可以点击图片放大浏览。
              如果感觉该组件还不错，可以在加载完毕后点击下载源码，在本地查看和调试页面。
            </strong>
          </h3>
          <h3>
            <strong>Q：为什么下载缓慢？</strong>
          </h3>
          <h3>
            <strong>
              A：受限于服务器带宽和性能（1g），目前只有gif图片在使用在oss加速，后期会进行服务器升级和cdn优化静态资源。
            </strong>
          </h3>
        </Card> */}

        <h3 style={{ margin: '13px' }}>
          如果觉得对您有些许帮助，期待您给本项目点个star-------{'>'}
          <strong>
            <a href={`${Info.github}/MP_V2`}>star</a>
          </strong>
        </h3>

        <div className="chooseDiv">{buttonList}</div>
        {FCItem}
      </Card>
    </>
  );
};
export default Main;
