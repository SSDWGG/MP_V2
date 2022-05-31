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
  if (nowdate.getDate() >= 5 && nowdate.getDate() < 9)
    helloContent = `早晨好☕   ${currentUser.username}`;
  if (nowdate.getDate() >= 9 && nowdate.getDate() < 12) helloContent = `上午好 ☕ `;
  if (nowdate.getDate() >= 12 && nowdate.getDate() < 18) helloContent = `下午好 ☕ `;
  if (nowdate.getDate() >= 18 && nowdate.getDate() < 20) helloContent = `傍晚好 ☕ `;
  if (nowdate.getDate() >= 20 && nowdate.getDate() < 23) helloContent = `晚间好 ☕  `;
  if (nowdate.getDate() >= 23 || nowdate.getDate() < 5) helloContent = `夜已深啦 ❤️️ 尽早休息  `;

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
