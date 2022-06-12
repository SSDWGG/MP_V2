import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal, Progress, Tag, Tooltip } from 'antd';
import { useModel } from 'umi';
import { deleteTodo, getTodoListByQuerySort, updateTodoType } from '@/services/todo';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { todoTableType, TodoTypeEnum } from '@/util/const';
import ButtonGroup from 'antd/lib/button/button-group';
import moment from 'moment';
import ModalShow from './modalshow';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable, useRefFunction } from '@ant-design/pro-components';
import './style.less';

const TodoTableSort: React.FC<{
  titlerefresh: () => void;
  setTableType: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const [modalType, setModalType] = useState<number | boolean>(false); //弹窗展示类型
  const [info, setInfo] = useState<todo>({} as todo); //传递给弹窗的数据默认值
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const { confirm } = Modal;
  const [todoList, setTodoList] = useState<todo[]>([] as todo[]); //请求得到的列表数据

  const reloadTable = () => {
    // 刷新表格内容
    if (actionRef.current) {
      actionRef.current.reload();
    }
    // 刷新title内容
    props.titlerefresh();
  };
  const handleSubmit = () => {
    reloadTable();
    setModalType(false);
  };
  const handleCancel = () => {
    setModalType(false);
  };
  const tableRequest = async (params: any, sort: any, filter: any) => {
    params.todotitle = !!params.todotitle ? params.todotitle : '';
    // 默认查询正在进行中任务
    params.okflag = !!params.okflag ? params.okflag : 1;
    params.userid = initialState?.currentUser?.userid;
    params.classify = !!params.classify ? params.classify : '';

    const res = await getTodoListByQuerySort(params as TodoType.ParamsgetTodoListByQuery);
    setTodoList(res.data);
    return {};
  };

  const DragHandle = SortableHandle(() => (
    <Tooltip placement="top" title="拖拽前请取消当前的其他排序的列">
      <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
    </Tooltip>
  ));

  // 拖拽
  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortContainer = SortableContainer((props: any) => <tbody {...props} />);
  const onSortEnd = useRefFunction(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      if (oldIndex !== newIndex) {
        const newData = arrayMoveImmutable([...todoList], oldIndex, newIndex).filter((el) => !!el);
        setTodoList([...newData]);
      }
    },
  );
  const DraggableContainer = (props: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = (props: any) => {
    const { className, style, ...restProps } = props;
    const index = todoList.findIndex((x) => x.todoid === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };
  const getOptions = () => {
    const arr = initialState?.currentUser?.todoclassify?.split('-');
    const options: { label: string; value: string }[] = [];
    options.push({ label: '不选择分类', value: '不选择分类' });
    arr?.forEach((item) => {
      options.push({ label: item, value: item });
    });
    return options;
  };
  const columns: ProColumns<todo>[] = [
    {
      title: '拖拽排序',
      dataIndex: 'sort',
      width: 80,
      className: 'drag-visible',
      hideInSearch: true,
      render: () => <DragHandle />,
    },
    {
      title: '任务标题',
      dataIndex: 'todotitle',
      width: 160,
      ellipsis: true,
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入任务标题',
        maxLength: 32,
      },
    },
    {
      title: '任务描述',
      dataIndex: 'tododescribe',
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '任务分类',
      dataIndex: 'classify',
      width: 200,
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择任务分类',
        options: getOptions(),
      },
      params: {},
      render: (_, item) => {
        return !!item.classify ? <Tag color="blue">{item.classify}</Tag> : '暂无分类';
      },
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
      sorter: (a, b) => {
        const aTime = new Date(a.beginTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.beginTime).getTime();
        return aTime > bTime ? 1 : -1;
      },
      // defaultSortOrder: 'descend',
    },
    {
      title: '期待结束时间',
      dataIndex: 'wantendTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
      sorter: (a, b) => {
        const aTime = new Date(a.wantendTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.wantendTime).getTime();
        return aTime > bTime ? 1 : -1;
      },
    },
    {
      title: '实际结束时间',
      dataIndex: 'infactendTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
      sorter: (a, b) => {
        const aTime = new Date(a.infactendTime).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.infactendTime).getTime();
        return aTime > bTime ? 1 : -1;
      },

      render: (_, item) => {
        return item.infactendTime || '暂未结束';
      },
    },
    {
      title: '任务状态',
      dataIndex: 'okflag',
      width: 80,
      ellipsis: true,
      valueType: 'text',
      fieldProps: {
        placeholder: '请选择任务状态（默认进行中）',
        maxLength: 32,
      },
      valueEnum: TodoTypeEnum,

      // 这个排序和筛选实在当前的请得到到的数据中做排序和筛选的，所以如果当前是进行中数据是查不到已完成的数据的
      // filters: TodoTypefiltersEnum,
      // onFilter: ((value: number, record: todo) => record.okflag === value) as any,
    },
    {
      title: '任务进度',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      sorter: (a, b) => {
        const aTime = new Date(a.schedule).getTime(); // 需要先转换成时间戳
        const bTime = new Date(b.schedule).getTime();
        return aTime > bTime ? 1 : -1;
      },

      render: (_, item) => {
        return (
          <>
            {item.schedule === 0 && '未开始'}
            {item.schedule > 0 && item.schedule < 100 && (
              <Progress percent={item.schedule} size="small" status="active" />
            )}
            {item.schedule >= 100 && <Progress percent={100} size="small" />}
          </>
        );
      },
    },
    {
      title: '任务预期剩余时间',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      sorter: (a, b) => {
        const ams = moment(a.wantendTime).unix() - moment(Date.now()).unix();
        const bms = moment(b.wantendTime).unix() - moment(Date.now()).unix();
        return ams > bms ? 1 : -1;
      },

      render: (_, item) => {
        const ms = moment(item.wantendTime).unix() - moment(Date.now()).unix();
        return (
          <>
            {item.schedule >= 100 ? (
              `已完成`
            ) : !!item.wantendTime ? (
              <>
                {ms / 3600 / 24 > 1 && `${(ms / 3600 / 24).toFixed(0)}天`}
                {ms / 3600 / 24 < 1 && ms / 3600 / 24 > 0 && `${(ms / 3600).toFixed(0)}小时`}
                {ms / 3600 < 1 && ms / 3600 / 24 > 0 && `${(ms / 60).toFixed(0)}分钟`}
                {ms / 3600 / 24 < 0 && `已超时`}
              </>
            ) : (
              <>未设置预期结束时间</>
            )}
          </>
        );
      },
    },
    // 操作
    {
      title: '操作',
      fixed: 'right',
      width: 160,
      hideInSearch: true,
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
              {item.okflag === 2 ? <>启用任务</> : <>编辑任务</>}
            </Button>
            {item.okflag === 0 ||
              (item.okflag === 1 && (
                <Button
                  key="stop"
                  type="ghost"
                  size="small"
                  onClick={() => {
                    confirm({
                      title: '阻塞',
                      content: '确定要阻塞任务吗？',
                      onOk: async () => {
                        await updateTodoType(item, 2);
                        message.success('操作成功');
                        reloadTable();
                      },
                    });
                  }}
                >
                  阻塞
                </Button>
              ))}

            <Button
              key="delete"
              type="dashed"
              size="small"
              onClick={() => {
                confirm({
                  title: '删除',
                  content: '确定要删除任务吗？',
                  onOk: async () => {
                    await deleteTodo(item.todoid);
                    message.success('删除成功');
                    reloadTable();
                  },
                });
              }}
            >
              删除
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<todo>
        columns={columns}
        actionRef={actionRef}
        scroll={{ x: 1200 }}
        rowKey={(record) => `${record.todoid}`}
        columnEmptyText="未设定"
        headerTitle="日程任务表（拖拽）"
        // 做数据排序，必须受控（接口优化，减少每次改变排序都要请求，所以我把排序在前端进行（数据量小））
        dataSource={todoList}
        request={tableRequest}
        pagination={false}
        form={{
          layout: 'vertical',
          autoFocusFirstInput: false,
          labelCol: { span: 0 },
          defaultCollapsed: false,
          span: 6,
        }}
        toolBarRender={() => [
          <Button
            type="ghost"
            key="changeTableType"
            onClick={() => {
              props.setTableType(todoTableType.page);
            }}
          >
            切换展示分页表格
          </Button>,

          <Button
            type="ghost"
            key="add"
            onClick={() => {
              setModalType(1);
            }}
          >
            <PlusOutlined /> 添加任务
          </Button>,
        ]}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
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
    </>
  );
};
export default TodoTableSort;
