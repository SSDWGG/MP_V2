import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import PageHeaderContent from '@/components/PageHeaderContent';
import { Button, Card, Statistic } from 'antd';
import { history, useModel } from 'umi';
import Projects from './projects';
import { getUserAllMemos } from '@/services/memo';
import { PlusOutlined } from '@ant-design/icons';

const Memorandum: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [memosData, setMemoData] = useState<memo[]>([]);

  const getMemoDate = async () => {
    const resMemo = await getUserAllMemos();
    !!resMemo ? setMemoData(resMemo) : setMemoData([]);
    return resMemo;
  };

  useEffect(() => {
    getMemoDate();
  }, []);
  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div>
          <Statistic title="备忘录数" value={`${memosData.length}`} />
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      <Card>
        <Button
          type="dashed"
          onClick={() => {
            history.push(`/memorandum/addTextDetail`);
          }}
          style={{ width: '100%', marginBottom: 15 }}
        >
          <PlusOutlined />
          添加备忘录
        </Button>
        {/* 先使用text来存储，之后的版本再做富文本的模式 */}
        <Projects memosData={memosData} />
      </Card>
    </PageContainer>
  );
};
export default Memorandum;
