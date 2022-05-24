import type { FC } from 'react';
import { Avatar, Skeleton } from 'antd';

import styles from './style.less';
import type { CurrentUser } from './data';

const PageHeaderContent: FC<{ currentUser: Partial<user> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {/* 早安，   LAI */}
          {currentUser.username}
          ，祝你开心每一天！
        </div>
        <div>
          __{currentUser.title}__{/* |{currentUser.group} */}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderContent;
