import { Card, List, Typography } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import AvatarList from './components/AvatarList';
import styles from './style.less';
import { history, useModel } from 'umi';

const { Paragraph } = Typography;

const Projects: FC<{ memosData: memo[] }> = (props) => {
  const { initialState } = useModel('@@initialState');
  return (
    <List<memo>
      rowKey="memoid"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={props.memosData}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            history.push(`/memorandum/editTextDetail/${item.memoid}`);
          }}
        >
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.content}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>更新于：{moment(item.updateTime).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  <AvatarList.Item
                    key={initialState?.currentUser?.userid}
                    src={initialState?.currentUser?.avatar as string}
                    tips={initialState?.currentUser?.username}
                  />
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Projects;
