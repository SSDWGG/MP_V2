import React from 'react';

const todolist: React.FC = () => {
  // const [allTodoList, setAllTodoList] = useState<todo[]>([] as todo[]); //全部todo数据
  // const { initialState } = useModel('@@initialState');

  // const getAllTodoData = async () => {
  //   const res = await getTodosList();
  //   setAllTodoList(res.data);
  // };

  // useEffect(() => {
  //   getAllTodoData();
  // }, []);
  return (
    // <PageContainer
    //   header={{
    //     title: `${initialState?.currentUser?.signature}`,
    //     breadcrumb: {},
    //   }}
    //   extraContent={
    //     <div className={styles.extraContent}>
    //       <div className={styles.statItem}>
    //         <Statistic title="总任务数" value={allTodoList.length} />
    //       </div>
    //       <div className={styles.statItem}>
    //         <Statistic title="团队排名" value={7} suffix="/ 43" />
    //       </div>
    //       <div className={styles.statItem}>
    //         <Statistic title="项目数" value={11} />
    //       </div>
    //     </div>
    //   }
    //   content={<PageHeaderContent currentUser={initialState?.currentUser as user} />}
    // >
    //   <Card>
    //     <BasicList />
    //   </Card>
    // </PageContainer>
    <>TEST</>
  );
};

export default todolist;
