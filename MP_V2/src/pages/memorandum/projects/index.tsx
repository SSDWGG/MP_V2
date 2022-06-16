import { Card, List, Typography } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { useModel } from 'umi';
import AvatarList from './components/AvatarList';
import styles from './style.less';

const { Paragraph } = Typography;

const getKey = (id: string, index: number) => `${id}-${index}`;

const Projects: FC = () => {
  const { initialState } = useModel('@@initialState');

  // useEffect(() => {
  //   getUserAllMemos();
  // }, []);

  const list = [
    {
      memoid: `1`,
      title: '备忘录模板',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
      updateTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * 4).getTime(),
      content: '那时候我只会想自己想要什么，从不想自己拥有什么',
    },
  ];

  return (
    <List<{
      memoid: string;
      title: string;
      cover: string;
      updateTime: number;
      content: string;
    }>
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
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
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
              <span>{moment(item.updateTime).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  <AvatarList.Item
                    key={getKey(initialState?.currentUser?.userid + '', 1)}
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
