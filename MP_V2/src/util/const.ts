export const MobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //手机号
export const PasswordReg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/; //8-20位字符，必须包含大小写字母和数字
export const TodoFlagType = {
  nobegin: 0,
  doing: 1,
  stop: 2,
  complete: 3,
};
export const TodoTypeEnum = {
  0: { text: '未开始', status: 'Warning' },
  1: {
    text: '进行中',
    status: 'Success',
  },
  2: {
    text: '阻塞中',
    status: 'Default',
  },
  3: {
    text: '已完成',
    status: 'Processing',
  },
};

export const todoSortSelectOption = [
  {
    label: '创建时间排序（晚->早）默认',
    value: 1,
  },
  {
    label: '剩余时间排序（少->多）',
    value: 2,
  },
];
