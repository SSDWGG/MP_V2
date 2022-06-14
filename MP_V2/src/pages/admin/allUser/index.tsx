import React, { useRef } from 'react';
import { Card, Tag } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { getAllUsers } from '@/services/user';

const Music: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
    </PageContainer>
  );
};
export default Music;
