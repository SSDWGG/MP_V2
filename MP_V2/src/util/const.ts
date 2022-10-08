export const MobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //手机号
export const PasswordReg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/; //8-20位字符，必须包含大小写字母和数字
export const TodoFlagType = {
  nobegin: 0,
  doing: 1,
  stop: 2,
  complete: 3,
};

/**
 * 检测字符串是否合法
 * 检测是否含有特殊字符
 * @param 需要检测的字符串
 */
export const checkIllegalityStr = (str: string): Boolean => {
  var reg: RegExp = /^[\u4E00-\u9FA5A-Za-z0-9_+，,]+$/im;

  if (reg.test(str)) {
    //可在这里 弹提示语 (增强用户体验)
    return false;
  }
  return true;
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
export const TodoTypefiltersEnum = [
  {
    text: '未开始',
    value: 0,
  },
  {
    text: '进行中',
    value: 1,
  },
  {
    text: '阻塞中',
    value: 2,
  },
  {
    text: '已完成',
    value: 3,
  },
];

export const GetHelloContent  = ()=>{
  let helloContent = '';
  const nowdate = new Date();
  if (nowdate.getHours() >= 5 && nowdate.getHours() < 9) helloContent = `早晨好☕  `;
  if (nowdate.getHours() >= 9 && nowdate.getHours() < 12) helloContent = `上午好 ☕ `;
  if (nowdate.getHours() >= 12 && nowdate.getHours() < 18) helloContent = `下午好 ☕ `;
  if (nowdate.getHours() >= 18 && nowdate.getHours() < 20) helloContent = `傍晚好 ☕ `;
  if (nowdate.getHours() >= 20 && nowdate.getHours() < 23) helloContent = `晚间好 ☕  `;
  if (nowdate.getHours() >= 23 || nowdate.getHours() < 5) helloContent = `夜已深啦 ❤️️ 尽早休息  `;
  return helloContent
}

export const todoTableType = {
  page: 1,
  sort: 2,
};

export  const maxContentLength = 5000;
