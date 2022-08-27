import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PageHeaderContent from '@/components/PageHeaderContent';
import { Statistic } from 'antd';
import { useModel } from 'umi';
const Music: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div>
          <Statistic title="音乐曲库数目" value={`0`} />
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      music 开发中...敬请期待
      <div>
      {/* <audio controls>
      <source src="/musiclist/hrzj.mp3" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <audio controls>
      <source src="/musiclist/周杰伦-告白气球.flac" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <audio controls>
      <source src="/musiclist/周杰伦-轨迹(Live).flac" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio> */}
    <audio controls>
      <source src="/musiclist/周杰伦-简单爱.flac" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
    {/* <audio controls>
      <source src="/musiclist/周杰伦-开不了口.flac" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio> */}
      </div>
     
    </PageContainer>
  );
};
export default Music;
