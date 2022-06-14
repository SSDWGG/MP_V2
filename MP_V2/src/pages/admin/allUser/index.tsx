import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Info from '@/pages/todolist/basic-list/titleinfo';
import { Card, Row, Col, Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import titleStyle from './index.less';
import { useModel } from 'umi';

const Music: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Card>
        <div className={titleStyle.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title={`进行中任务（now）`} value={`1`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title={`近期任务平均完成时间（周）`} value={`1`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="近期完成任务（周）" value={`1`} />
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
        </div>
      </Card>
    </PageContainer>
  );
};
export default Music;
