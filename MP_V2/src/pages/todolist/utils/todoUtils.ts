import moment from 'moment';

// 获取指定类型的任务数量
export const getDoingNumByOkFlag = (todoArr: todo[], type: number) => {
  return todoArr.filter((item) => {
    return item.okflag == type;
  }).length;
};

// 筛选一段时间内的todo 默认7天
export const filterTimeTodo = (todoArr: todo[], time = 7) => {
  return todoArr.filter(
    (arr) =>
      //  !!arr.infactendTime已完成的任务中
      !!arr.infactendTime &&
      moment(arr.infactendTime) > moment(Date.now() - 1000 * 60 * 60 * 24 * time) &&
      moment(arr.infactendTime) < moment(Date.now()),
  );
};
// 周平均任务完成时间
export const averageTime = (todoArr: todo[], time = 7) => {
  // 筛选出一段时间内完成的任务
  const arr = filterTimeTodo(todoArr, time);
  let num = 0;
  let count = 0;
  arr.forEach((item) => {
    if (!!item.infactendTime) {
      num += moment(item.infactendTime).unix() - moment(item.beginTime).unix();
      count++;
    }
  });

  return num / count;
};
