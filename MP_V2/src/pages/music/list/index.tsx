import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PageHeaderContent from '@/components/PageHeaderContent';
import { Statistic } from 'antd';
import { useModel } from 'umi';
import { Info } from '@/util/info';


const Music: React.FC = () => {
  const { initialState } = useModel('@@initialState');

//   const toggleSound = ()=> {
//     let music = document.getElementById("bgMusic") as any;//获取ID
//         console.log(music);
//     if (!!music&&music.paused) { //判读是否播放
//         music.paused=false;
//         music.play(); //没有就播放
//     }

// }
// toggleSound()
  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div>
          <Statistic title="音乐曲库数目" value={`1`} />
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      music 开发中...敬请期待
      <div>
        {/* 不同浏览器有一些不同的限制自动播放的策略 */}
    <audio id="bgMusic"  muted autoPlay loop  controls src={`${Info.ossBaseUrl}musiclist/周杰伦-简单爱.flac`}>
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
