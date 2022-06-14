import { HomeOutlined, ContactsOutlined, ClusterOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Input, InputRef, message, Row, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import styles from './Center.less';
import { TweenOneGroup } from 'rc-tween-one';
import { updateUser } from '@/services/user';

const Center: React.FC = () => {
  //  获取用户信息
  const { initialState, refresh } = useModel('@@initialState');
  const [tags, setTags] = useState<string[]>(
    !!initialState?.currentUser?.tags
      ? (initialState?.currentUser?.tags?.split('-') as string[])
      : [],
  );
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    // 请求更新
    updateUser({
      tags: tags.join('-'),
      userid: initialState?.currentUser?.userid as number,
      admin: initialState?.currentUser?.admin,
    } as user);
    // 刷新initstate
    refresh();
  }, [tags]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags.length >= 5
        ? message.warning('标签数量达到上限')
        : inputValue.length > 12
        ? message.warning('标签内容长度需小于12字符')
        : setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        color={'processing'}
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = !!tags ? tags.map(forMap) : [];
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

              <div style={{ marginBottom: 16 }}>
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                  }}
                  // onEnd={(e: { type: string; target: any }) => {
                  //   if (e.type === 'appear' || e.type === 'enter') {
                  //     (e.target as any).style = 'display: inline-block';
                  //   }
                  // }}
                  leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
              </div>
              {inputVisible && (
                <Input
                  ref={inputRef}
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
                <Tag onClick={showInput} className="site-tag-plus" color={'processing'}>
                  <PlusOutlined /> 添加标签
                </Tag>
              )}
              <Divider style={{ marginTop: 16 }} dashed />
            </div>
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
