import React, { useRef, useState } from 'react';
import { Button, Card, message, Modal, Tag } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getAllUsers, updateUser } from '@/services/user';
import ButtonGroup from 'antd/lib/button/button-group';
import ModalShow from './modalshow';

const Music: React.FC = () => {
  const [modalType, setModalType] = useState<number | boolean>(false); //弹窗展示类型
  const [info, setInfo] = useState<user>({} as user); //传递给弹窗的数据默认值

  const actionRef = useRef<ActionType>();
  const { confirm } = Modal;

  const tableRequest = async (p: any) => {
    const params = { ...p };
    const res = await getAllUsers(params);
    return {
      // 这里使用分页来降低传输数据的体量，减少网络传输
      data: res.data,
      pageSize: res.pageSize,
      current: res.current,
      total: res.total,
    };
  };

  const reloadTable = () => {
    // 刷新表格内容
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const handleSubmit = () => {
    reloadTable();
    setModalType(false);
  };
  const handleCancel = () => {
    setModalType(false);
  };

  const columns: ProColumns<user>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: 70,
      ellipsis: true,
    },
    {
      title: '管理员',
      dataIndex: 'admin',
      width: 70,
      ellipsis: true,
      render: (_, item) => {
        return <Tag color="blue">{item.admin === 1 ? '是' : '否'}</Tag>;
      },
    },
    {
      title: '头像path',
      dataIndex: 'avatar',
      width: 70,
      ellipsis: true,
      render: (_, item) => {
        return (
          <img src={item.avatar} style={{ maxHeight: '70px', maxWidth: '70px' }} alt="avatar" />
        );
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 70,
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 70,
      ellipsis: true,
    },
    {
      title: '省市',
      dataIndex: 'geographic',
      width: 100,
      ellipsis: true,
    },
    // 操作
    {
      title: '操作',
      fixed: 'right',
      width: 180,
      hideInSearch: true,
      dataIndex: 'option',
      render: (_, item) => {
        return (
          <ButtonGroup>
            {item.blackTime != '2000-01-01 00:00:00' ? (
              <Button
                key="delete"
                type="dashed"
                size="small"
                onClick={() => {
                  confirm({
                    title: '解除限制登录',
                    content: `确定要解除限制登录用户${item.username}吗？`,
                    onOk: async () => {
                      // 自动设定为这个时间
                      item.blackTime = '2000-01-01 00:00:00';
                      await updateUser(item);
                      message.success('操作成功');
                      reloadTable();
                    },
                  });
                }}
              >
                解除限制登录
              </Button>
            ) : (
              <Button
                key="add"
                type="dashed"
                size="small"
                onClick={() => {
                  setInfo(item);
                  setModalType(1);
                }}
              >
                限制登录
              </Button>
            )}
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Card>
        <ProTable<user>
          columns={columns}
          actionRef={actionRef}
          scroll={{ x: 1200 }}
          rowKey={(record) => `${record.userid}`}
          columnEmptyText="未设定"
          headerTitle="账号表"
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
          toolBarRender={false}
          search={false}
        />
      </Card>
      <ModalShow
        modalType={modalType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        info={info}
      />
    </PageContainer>
  );
};
export default Music;
