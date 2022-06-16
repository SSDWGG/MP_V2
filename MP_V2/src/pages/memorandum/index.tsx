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
          <Statistic title="备忘录数" value={`1`} />
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      {/* 先使用text来存储，之后再做一个富文本的模式 */}
      <Projects />
      开发中...
    </PageContainer>
  );
};
export default Memorandum;
