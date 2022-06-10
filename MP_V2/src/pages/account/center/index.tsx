import { HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import styles from './Center.less';

const Center: React.FC = () => {
  //  获取用户信息
  const { initialState } = useModel('@@initialState');

  //  渲染用户信息
  const renderUserInfo = ({ title, geographic, address }: user) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {title || '未设置'}
        </p>

        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {geographic || '未设置'}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          {address || '未设置'}
        </p>
      </div>
    );
  };

  return (
    <GridContent>
      <Row gutter={24} justify="center">
        <Col lg={16} md={16} sm={16} xs={16}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <div className={styles.avatarHolder}>
                <img alt="" src={initialState?.currentUser?.avatar} />
                <div className={styles.name}>{initialState?.currentUser?.username}</div>
                <div>{initialState?.currentUser?.signature}</div>
              </div>
              {renderUserInfo(initialState?.currentUser as user)}
              <Divider dashed />
              {/* 标签暂未入库，v2再做tag的数据字段 */}
              {/* <TagList tags={[]} /> */}
              <Divider style={{ marginTop: 16 }} dashed />
              <div className={styles.team}>
                <Row gutter={36}></Row>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
