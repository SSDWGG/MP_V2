import { FC, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Row } from 'antd';
import Marquee from 'react-fast-marquee';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import Info from './titleinfo';
import { averageTime, filterTimeTodo, getDoingNumByOkFlag } from '../utils/todoUtils';
import { TodoFlagType } from '@/util/const';
import { millisecondFormatDate } from '@/common/utils';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ButtonGroup from 'antd/lib/button/button-group';
import ModalShow from './modalshow';

// 未开始0，进行中1，暂停2，完成3
export const BasicList: FC<{ allTodoList: todo[]; refresh: () => void }> = (props) => {
  const [modalType, setModalType] = useState<number | boolean>(false); //弹窗展示类型
  const [info, setInfo] = useState<todo>({} as todo); //传递给弹窗的数据默认值
  // const [todoList, setTodoList] = useState<todo[]>([] as todo[]); //展示的列表数据
  // const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  // const [dataType, setDataType] = useState<number>(1); //展示的列表数据类型 ，默认展示进行中

  const actionRef = useRef<ActionType>();
  // const { confirm } = Modal;

  // const getTodoListData = async (type: number) => {
  //   let res;
  //   if (type == 99) res = await getTodosList();
  //   else res = await getTodosListByType(type);
  //   setTodoList(res.data);
  // };
  // const getAllTodoData = async () => {
  //   const res = await getTodosList();
  //   setAllTodoList(res.data);
  // };
  // // 拿到展示的todolist数据
  // useEffect(() => {
  //   getTodoListData(dataType);
  //   getAllTodoData();
  // }, []);
  //状态按钮切换立刻重新请求数据
  // useEffect(() => {
  //   reloadTable();
  // }, [dataType]);
  const reloadTable = () => {
    props.refresh();
  };
  const handleSubmit = () => {
    reloadTable();
    setModalType(false);
  };
  const handleCancel = () => {
    setModalType(false);
  };
  // const EffectEnum = {
  //   0: { text: '未开始', status: 'Warning' },
  //   1: {
  //     text: '进行中',
  //     status: 'Success',
  //   },
  //   2: {
  //     text: '阻塞中',
  //     status: 'Default',
  //   },
  //   3: {
  //     text: '已完成',
  //     status: 'Processing',
  //   },
  // };

  const columns: ProColumns<todo>[] = [
    {
      title: '任务标题',
      dataIndex: 'todotitle',
      width: 200,
      ellipsis: true,
      valueType: 'text',
    },
    {
      title: '任务描述',
      dataIndex: 'tododescribe',
      width: 200,
      ellipsis: true,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 160,
      ellipsis: true,
      valueType: 'text',
      render: (_, item) => {
        return item.beginTime || '未设定';
      },
    },
    {
      title: '期待结束时间',
      dataIndex: 'endTime',
      width: 160,
      ellipsis: true,
      valueType: 'text',
      render: (_, item) => {
        return item.wantendTime || '未设定';
      },
    },
    {
      title: '实际结束时间',
      dataIndex: 'infactendTime',
      width: 160,
      ellipsis: true,
      valueType: 'text',
      render: (_, item) => {
        return item.infactendTime || '暂未结束';
      },
    },
    // {
    //   title: '任务状态',
    //   dataIndex: 'okflag',
    //   width: 80,
    //   ellipsis: true,
    //   valueType: 'text',
    //   valueEnum: EffectEnum,
    // },
    // {
    //   title: '任务进度',
    //   width: 150,
    //   ellipsis: true,
    //   render: (_, item) => {
    //     return (
    //       <>
    //         {item.schedule === 0 && '未开始'}
    //         {item.schedule > 0 && item.schedule < 100 && (
    //           <Progress percent={item.schedule} size="small" status="active" />
    //         )}
    //         {item.schedule >= 100 && <Progress percent={100} size="small" />}
    //       </>
    //     );
    //   },
    // },
    // {
    //   title: '任务剩余时间（约）',
    //   width: 150,
    //   ellipsis: true,
    //   render: (_, item) => {
    //     let ms = moment(item.endTime).unix() - moment(Date.now()).unix();
    //     return (
    //       <>
    //         {item.schedule >= 100 ? (
    //           `已完成`
    //         ) : (
    //           <>
    //             {ms / 3600 / 24 > 1 && `${(ms / 3600 / 24).toFixed(0)}天`}
    //             {ms / 3600 / 24 < 1 && ms / 3600 / 24 > 0 && `${(ms / 3600).toFixed(0)}小时`}
    //             {ms / 3600 < 1 && ms / 3600 / 24 > 0 && `${(ms / 60).toFixed(0)}分钟`}
    //             {ms / 3600 / 24 < 0 && `已超时`}
    //           </>
    //         )}
    //       </>
    //     );
    //   },
    // },
    // 操作
    {
      title: '操作',
      fixed: 'right',
      width: 130,
      search: false,
      dataIndex: 'option',
      render: (_, item) => {
        return (
          <ButtonGroup>
            <Button
              key="detail"
              type="ghost"
              size="small"
              onClick={() => {
                setInfo(item);
                setModalType(2);
              }}
            >
              更新
            </Button>
            <Button
              key="stop"
              type="ghost"
              size="small"
              onClick={() => {
                // confirm({
                //   title: '阻塞',
                //   content: '确定要阻塞任务吗？',
                //   onOk: async () => {
                //     await updateTodoType(item.todoid, 2);
                //     message.success('操作成功');
                //     reloadTable();
                //   },
                // });
              }}
            >
              阻塞
            </Button>
            <Button
              key="delete"
              type="dashed"
              size="small"
              onClick={() => {
                // confirm({
                //   title: '删除',
                //   content: '确定要删除任务吗？',
                //   onOk: async () => {
                //     await deleteTodo(item.todoid);
                //     message.success('删除成功');
                //     reloadTable();
                //   },
                // });
              }}
            >
              删除
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  // const extraContent = (
  //   <div className={styles.extraContent}>
  //     <Radio.Group
  //       onChange={(e) => {
  //         setDataType(-100);
  //         setDataType(e.target.value);
  //       }}
  //       buttonStyle="solid"
  //       value={dataType}
  //     >
  //       <Radio.Button value={99}>全部</Radio.Button>
  //       <Radio.Button value={1}>进行中</Radio.Button>
  //       <Radio.Button value={0}>未开始</Radio.Button>
  //       <Radio.Button value={3}>已完成</Radio.Button>
  //       <Radio.Button value={2}>阻塞中</Radio.Button>
  //     </Radio.Group>

  //     <Search
  //       className={styles.extraContentSearch}
  //       placeholder="请输入"
  //       onSearch={async (value) => {
  //         const res = await getTodosListByTitle(value);
  //         setTodoList(res.data);
  //       }}
  //     />
  //   </div>
  // );
  return (
    <div>
      <PageContainer
        header={{
          title: '',
          breadcrumb: {},
        }}
      >
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
                成功的道路并不拥挤，因为能坚持的人不多。
              </Marquee>
            }
          />
          <ProTable<todo>
            columns={columns}
            actionRef={actionRef}
            scroll={{ x: 1200 }}
            dataSource={props.allTodoList}
            rowKey={(record) => `${record.todoid}`}
            search={false}
            columnEmptyText="未设定"
            headerTitle="日程任务表"
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setModalType(1);
                }}
              >
                <PlusOutlined /> 添加任务
              </Button>,
            ]}
          />
        </div>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => {
          setModalType(1);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加任务
      </Button>
      <ModalShow
        modalType={modalType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        info={info}
      />
    </div>
  );
};

export default BasicList;
