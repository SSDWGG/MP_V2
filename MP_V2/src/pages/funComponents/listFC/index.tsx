import React from 'react';
import { Button, Card, List } from 'antd';
import { handleDownload } from '@/common/utils';
import styles from './index.less';
import { FCNams } from '../const';
import { Info } from '@/util/info';

const ListFC: React.FC = () => {



  return (
    <>
      <Card className={styles.ListFC}>
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
          {/* <Button
            key="downImg"
            onClick={(e) => e.stopPropagation()}
            download="rabbit.jpg"
            href={getPublicPath('rabbit.jpg')}
          >
            下载 站标rabbit图片
          </Button> */}
          {/* <Button
          key="downExcel"
          onClick={(e) => e.stopPropagation()}
          download="Excel模板.xlsx"
          href={getPublicPath('ExcelDoc.xlsx')}
        >
          下载excel模板（之后会做一些支持excel的操作功能）
        </Button> */}
        </p>

        <h3>
          如果觉得对您有些许帮助，期待您给本项目点个star-------{'>'}
          <strong>
            <a href={`${Info.github}/MP_V2`}>star</a>
          </strong>
        </h3>

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

        <List<string>
          rowKey={0}
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
                    onClick={()=>handleDownload(item+'.zip')}
                  >
                    下载 《{`${item}`}》
                  </Button>
                </div>
                <a  className="agifImg">
                  <img src={`${Info.ossBaseUrl}FC/gif/${item}.gif`} className="gifImg" alt={item} />
                </a>
              </div>
            </List.Item>
          )}
        ></List>
      </Card>
    </>
  );
};
export default ListFC;
