import { FC, useState } from 'react';
import { Alert, Card, Col, Row } from 'antd';
import Marquee from 'react-fast-marquee';
import styles from './style.less';
import Info from './titleinfo';
import { averageTime, filterTimeTodo, getDoingNumByOkFlag } from '../utils/todoUtils';
import { TodoFlagType, todoTableType } from '@/util/const';
import { millisecondFormatDate } from '@/common/utils';
import TodoTablePage from './TodoTablePage';
import TodoTableSort from './TodoTableSort';
import { useModel } from 'umi';

// 未开始0，进行中1，暂停2，完成3
export const BasicList: FC<{ allTodoList: todo[]; refresh: () => void }> = (props) => {
  const [tableType, setTableType] = useState<number>(todoTableType.sort); //table展示类型（1 分页table，2 拖拽、排序table）
  const { initialState } = useModel('@@initialState');

  return (
    <div className={styles.standardList}>
      <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <Info
              title={`进行中任务（now）`}
              value={`${getDoingNumByOkFlag(props.allTodoList, TodoFlagType.doing)}`}
              bordered
            />
          </Col>
          <Col sm={8} xs={24}>
            <Info
              title={`近期任务平均完成时间（周）`}
              value={`${millisecondFormatDate(averageTime(props.allTodoList))}`}
              bordered
            />
          </Col>
          <Col sm={8} xs={24}>
            <Info
              title="近期完成任务（周）"
              value={`${filterTimeTodo(props.allTodoList).length}`}
            />
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
        <TodoTablePage titlerefresh={props.refresh} setTableType={setTableType} />
      )}
      {tableType === todoTableType.sort && (
        <TodoTableSort titlerefresh={props.refresh} setTableType={setTableType} />
      )}
    </div>
  );
};

export default BasicList;
