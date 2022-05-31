import PageHeaderContent from '@/components/PageHeaderContent';
import { PageContainer } from '@ant-design/pro-layout';
import { Statistic } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const todolist: React.FC = () => {
  // const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  const { initialState } = useModel('@@initialState');

  // const getAllTodoData = async () => {
  //   const res = await getTodosList();
  //   setAllTodoList(res.data);
  // };

  // useEffect(() => {
  //   getAllTodoData();
  // }, []);
  return (
    <PageContainer
      header={{
        title: `${initialState?.currentUser?.signature}`,
        breadcrumb: {},
      }}
      extraContent={
        <div className={styles.extraContent}>
          <div className={styles.statItem}>
            <Statistic title="总待办数" value={10} />
          </div>
          {/* <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div>
          <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" /> */}
          {/* </div> */}
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      {/* <Card>
        <BasicList />
      </Card> */}
    </PageContainer>
  );
};

export default todolist;
