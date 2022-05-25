import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import styles from './Center.less';

const TagList: React.FC<{ tags: [] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

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
      <Row gutter={24}>
        <Col lg={7} md={24}>
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
              <TagList tags={[]} />
              <Divider style={{ marginTop: 16 }} dashed />
              <div className={styles.team}>
                {/* <div className={styles.teamTitle}>团队</div> */}
                <Row gutter={36}></Row>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}></Col>
      </Row>
    </GridContent>
  );
};
export default Center;
