import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal, Progress } from 'antd';
import { useModel } from 'umi';
import { deleteTodo, getTodoListByQueryPage, updateTodoType } from '@/services/todo';
import { PlusOutlined } from '@ant-design/icons';
import { todoTableType, TodoTypeEnum } from '@/util/const';
import ButtonGroup from 'antd/lib/button/button-group';
import moment from 'moment';
import ModalShow from './modalshow';

const TodoTablePage: React.FC<{
  titlerefresh: () => void;
  setTableType: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const [modalType, setModalType] = useState<number | boolean>(false); //弹窗展示类型
  const [info, setInfo] = useState<todo>({} as todo); //传递给弹窗的数据默认值
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const { confirm } = Modal;

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
  const tableRequest = async (p: any) => {
    const params = { ...p };
    params.todotitle = !!params.todotitle ? params.todotitle : '';
    // 默认查询正在进行中任务
    params.okflag = !!params.okflag ? params.okflag : 1;
    params.userid = initialState?.currentUser?.userid;
    const res = await getTodoListByQueryPage(params as TodoType.ParamsgetTodoListByQuery);
    return {
      // 这里使用分页来降低传输数据的体量，减少网络传输
      data: res.data,
      pageSize: res.pageSize,
      current: res.current,
      total: res.total,
    };
  };

  const columns: ProColumns<todo>[] = [
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
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '期待结束时间',
      dataIndex: 'wantendTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '实际结束时间',
      dataIndex: 'infactendTime',
      width: 180,
      ellipsis: true,
      valueType: 'text',
      hideInSearch: true,
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
    },
    {
      title: '任务进度',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
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
      render: (_, item) => {
        let ms = moment(item.wantendTime).unix() - moment(Date.now()).unix();
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
        headerTitle="日程任务表（分页）"
        request={tableRequest}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
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
            // type="primary"
            key="changeTableType"
            onClick={() => {
              props.setTableType(todoTableType.sort);
            }}
          >
            切换展示拖拽/排序
          </Button>,

          <Button
            type="ghost"
            // type="primary"
            key="add"
            onClick={() => {
              setModalType(1);
            }}
          >
            <PlusOutlined /> 添加任务
          </Button>,
        ]}
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
export default TodoTablePage;
