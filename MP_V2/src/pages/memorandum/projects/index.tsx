import { Card, List, Typography } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import AvatarList from './components/AvatarList';
import styles from './style.less';
import { history, useModel } from 'umi';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import { updateMemo } from '@/services/memo';

const { Paragraph } = Typography;

const Projects: FC<{ memosData: memo[]; refresh: () => Promise<memo[]> }> = (props) => {
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
            // history.push(`/memorandum/editTextDetail/${item.memoid}`);

            history.push(`/memorandum/editTextDetail/${item.memoid}`);
          }}
          className={styles.listMemoItem}
        >
          {item.collapse ? (
            <>
              <div
                className={'ce'}
                onClick={async (e) => {
                  // 阻止冒泡到父容器的click上
                  e.stopPropagation();
                  //  发送请求
                  const collapse = item.collapse ? 0 : 1;
                  const memoid = item.memoid;
                  await updateMemo({ memoid, collapse } as memo);
                  // 刷新页面
                  props.refresh();
                }}
              >
                {
                  <>
                    {'展开'}
                    <ArrowsAltOutlined />
                  </>
                }
              </div>
              <Card hoverable>
                <Card.Meta title={<a>{item.title}</a>} />
                <div>
                  <span>更新于：{moment(item.updateTime).fromNow()}</span>
                  <div>
                    <AvatarList size="small">
                      <AvatarList.Item
                        key={initialState?.currentUser?.userid}
                        src={initialState?.currentUser?.avatar as string}
                        tips={initialState?.currentUser?.username}
                      />
                      <AvatarList.Item key={'ryw'} src={'/avatar/initavatar.jpg'} tips={'ssdwgg'} />
                    </AvatarList>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              <div
                className={'ce'}
                onClick={async (e) => {
                  // 阻止冒泡到父容器的click上
                  e.stopPropagation();
                  //  发送请求
                  const collapse = item.collapse ? 0 : 1;
                  const memoid = item.memoid;
                  await updateMemo({ memoid, collapse } as memo);
                  // 刷新页面
                  props.refresh();
                }}
              >
                {
                  <>
                    {'收起'}
                    <ShrinkOutlined />
                  </>
                }
              </div>
              <Card hoverable cover={<img alt={item.title} src={item.cover} />}>
                <Card.Meta
                  title={<a>{item.title}</a>}
                  description={<Paragraph ellipsis={{ rows: 2 }}>{item.content}</Paragraph>}
                />
                <div>
                  <span>更新于：{moment(item.updateTime).fromNow()}</span>
                  <div>
                    <AvatarList size="small">
                      <AvatarList.Item
                        key={initialState?.currentUser?.userid}
                        src={initialState?.currentUser?.avatar as string}
                        tips={initialState?.currentUser?.username}
                      />
                      <AvatarList.Item key={'ryw'} src={'/avatar/initavatar.jpg'} tips={'ssdwgg'} />
                    </AvatarList>
                  </div>
                </div>
              </Card>
            </>
          )}
        </List.Item>
      )}
    />
  );
};

export default Projects;
