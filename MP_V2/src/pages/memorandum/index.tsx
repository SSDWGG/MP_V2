import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PageHeaderContent from '@/components/PageHeaderContent';
import { Statistic } from 'antd';
import { useModel } from 'umi';
import Projects from './projects';

const Memorandum: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div>
          <Statistic title="备忘录数" value={`0`} />
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      <Projects />
    </PageContainer>
  );
};
export default Memorandum;
