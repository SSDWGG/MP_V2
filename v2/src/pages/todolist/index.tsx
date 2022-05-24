import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Statistic } from 'antd';

import styles from './index.less';
import PageHeaderContent from '@/components/PageHeaderContent';
import BasicList from './basic-list';
import { getTodosList } from '@/services/todo';
import { useModel } from 'umi';

export default (): React.ReactNode => {
  // 国际化插件
  // const intl = useIntl();
  const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  const { initialState } = useModel('@@initialState');

  const getAllTodoData = async () => {
    const res = await getTodosList();
    setAllTodoList(res.data);
  };

  useEffect(() => {
    getAllTodoData();
  }, []);
  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="总任务数" value={allTodoList.length} />
          </div>
          <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="项目数" value={11} />
          </div>
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      <Card>
        <BasicList />
      </Card>
    </PageContainer>
  );
};
