import type { FC } from 'react';
import { Avatar, Skeleton } from 'antd';
import styles from './style.less';
import { HomeOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons';
import { GetHelloContent } from '@/util/const';

const PageHeaderContent: FC<{ currentUser: Partial<user> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  
  
       const  ip=  localStorage.getItem('MP_V2_IP');
       const city = localStorage.getItem('MP_V2_CITY');


  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          { GetHelloContent()}
          {currentUser.username}
        </div>
        <div>
          <UserOutlined />
          {currentUser.title}
        </div>
        <div>
          <HomeOutlined />
          {city}
        </div>
        <div>
          <WifiOutlined /> {ip}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderContent;
