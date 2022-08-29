import React, { useEffect, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useParams, useModel, history } from 'umi';
import { Card, Col, Row, Typography } from 'antd';
import { getMemoByMemoid } from '@/services/memo';
import './index.less';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { EditOutlined, HighlightTwoTone } from '@ant-design/icons';

const TextDetail: React.FC = () => {
  const { memoid } = useParams<{ memoid: string }>();
  const { initialState } = useModel('@@initialState');
  const [memo, setMemo] = useState<memo>({} as memo);

  const getMemoData = async () => {
    // 用来做请求和改变时候的判断
    const memo = !!memoid ? await getMemoByMemoid(memoid as unknown as number) : {};
    setMemo(memo as memo);
  };
  useEffect(() => {
    getMemoData();
  }, []);
  useEffect(() => {
    document.getElementById('h5content').innerHTML = memo.h5content;
  });
  return (
    <GridContent>
      <Row gutter={24} justify="center">
        <Col lg={16} md={16} sm={16} xs={16}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <div>
              <img
                className="memoimg"
                src={memo.cover || initialState?.currentUser?.avatar}
                alt="avatar"
              />
            </div>
            <Typography>
              <Title className='title'>
                <span> title:{memo.title}</span>

                <HighlightTwoTone
                  className="edit-icon"
                  onClick={() => {
                    history.push(`/memorandum/editTextDetailEditor/${memoid}`);
                  }}
                />
              </Title>
              <Paragraph id="h5content"></Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default TextDetail;
