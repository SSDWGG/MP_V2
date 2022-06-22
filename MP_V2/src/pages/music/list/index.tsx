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
    </PageContainer>
  );
};
export default Music;
