import { millisecondFormatDate } from '@/common/utils';
import PageHeaderContent from '@/components/PageHeaderContent';
import { getTodosList } from '@/services/todo';
import { TodoFlagType, todoTableType } from '@/util/const';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useModel } from 'umi';
import Info from './basic-list/titleinfo';
import TodoTablePage from './basic-list/TodoTablePage';
import TodoTableSort from './basic-list/TodoTableSort';
import styles from './index.less';
import titleStyle from './basic-list/style.less';

import { averageTime, filterTimeTodo, getDoingNumByOkFlag } from './utils/todoUtils';

const todolist: React.FC = () => {
  const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  const { initialState } = useModel('@@initialState');
  const [tableType, setTableType] = useState<number>(todoTableType.page); //table展示类型（1 分页table，2 拖拽、排序table）
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
        <div className={titleStyle.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info
                  title={`进行中任务（now）`}
                  value={`${getDoingNumByOkFlag(allTodoList, TodoFlagType.doing)}`}
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title={`近期任务平均完成时间（周）`}
                  value={`${millisecondFormatDate(averageTime(allTodoList))}`}
                  bordered
                />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="近期完成任务（周）" value={`${filterTimeTodo(allTodoList).length}`} />
              </Col>
            </Row>
          </Card>
          <Alert
            banner
            type="success"
            showIcon={false}
            message={
              <Marquee pauseOnHover gradient={false}>
                {`${
                  initialState?.currentUser?.scrolltip || '成功的道路并不拥挤，因为坚持的人并不多。'
                }`}
              </Marquee>
            }
          />
          {tableType === todoTableType.page && (
            <TodoTablePage titlerefresh={getAllTodoData} setTableType={setTableType} />
          )}
          {tableType === todoTableType.sort && (
            <TodoTableSort titlerefresh={getAllTodoData} setTableType={setTableType} />
          )}
        </div>
      </Card>
    </PageContainer>
  );
};

export default todolist;
