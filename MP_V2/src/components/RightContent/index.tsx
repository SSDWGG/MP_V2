import { Info } from '@/util/info';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import React from 'react';
import {  useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      {/* 搜索之后可以做成个人项目链接跳转 */}
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Contact me  me up if you need"
        options={[
          {
            label: <a href={Info.github}>github</a>,
            value: 'https://github.com/SSDWGG',
          },
          {
            label: <a href={Info.github}>vx</a>,
            value: '13616549486',
          },
          {
            label: <a href={Info.github}>email</a>,
            value: '1982549567@qq.com',
          },
        ]}
        onSearch={() => {
          // 点击搜索跳转外页
          window.location.href = Info.github;
        }}
      />

      <Tooltip title="祝你开心每一天！" className={styles.action}>
        <QuestionCircleOutlined />
      </Tooltip>
      {/* <NoticeIconView /> */}
      <Avatar menu />
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};

export default GlobalHeaderRight;
