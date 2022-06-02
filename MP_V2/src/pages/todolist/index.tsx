import PageHeaderContent from '@/components/PageHeaderContent';
import { getTodosList } from '@/services/todo';
import { TodoFlagType } from '@/util/const';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import BasicList from './basic-list';
import styles from './index.less';
import { getDoingNumByOkFlag } from './utils/todoUtils';

const todolist: React.FC = () => {
  const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  const { initialState } = useModel('@@initialState');

  // 这里说明一下，直接请求全表数据是不符合安全原则的，
  // 这里我请求了全表数据用来做一个数据的统计作用（因为我比较大侧重于前端开发的原因在这个项目中我这么做了）
  // 数据的筛选统计应当放在后台进行，只返回给前端结果数据而不是全表

  // 获取、刷新 数据源
  const getAllTodoData = async () => {
    const res = await getTodosList(initialState?.currentUser?.userid as number);
    setAllTodoList(res);
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
            <Statistic
              title="待处理任务（now）"
              value={`${
                allTodoList.length - getDoingNumByOkFlag(allTodoList, TodoFlagType.complete)
              }`}
            />
          </div>
          <div className={styles.statItem}>
            <Statistic
              title="总完成任务数（all）"
              value={`${getDoingNumByOkFlag(allTodoList, TodoFlagType.complete)}`}
            />
          </div>
          {/* <div className={styles.statItem}>
            <Statistic title="团队排名" value={7} suffix="/ 43" />
          </div> */}
          {/* </div> */}
        </div>
      }
      content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    >
      <Card>
        {/* 往下传只是取用来做统计时间等计算，不做直接展示。下面表格组件增删改后需要同步调用刷新函数来刷新盖层的数据 */}
        <BasicList allTodoList={allTodoList} refresh={getAllTodoData} />
      </Card>
    </PageContainer>
  );
};

export default todolist;
