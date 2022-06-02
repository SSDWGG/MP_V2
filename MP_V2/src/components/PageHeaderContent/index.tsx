import type { FC } from 'react';
import { Avatar, Skeleton } from 'antd';

import styles from './style.less';

const PageHeaderContent: FC<{ currentUser: Partial<user> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  const nowdate = new Date();
  let helloContent = '';
  if (nowdate.getHours() >= 5 && nowdate.getHours() < 9) helloContent = `早晨好☕  `;
  if (nowdate.getHours() >= 9 && nowdate.getHours() < 12) helloContent = `上午好 ☕ `;
  if (nowdate.getHours() >= 12 && nowdate.getHours() < 18) helloContent = `下午好 ☕ `;
  if (nowdate.getHours() >= 18 && nowdate.getHours() < 20) helloContent = `傍晚好 ☕ `;
  if (nowdate.getHours() >= 20 && nowdate.getHours() < 23) helloContent = `晚间好 ☕  `;
  if (nowdate.getHours() >= 23 || nowdate.getHours() < 5) helloContent = `夜已深啦 ❤️️ 尽早休息  `;

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {helloContent}
          {currentUser.username}
        </div>
        <div>身份：{currentUser.title}</div>
      </div>
    </div>
  );
};

export default PageHeaderContent;
