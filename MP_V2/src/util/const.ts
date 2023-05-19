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

export const GetHelloContent = () => {
  let helloContent = '';
  const nowdate = new Date();
  if (nowdate.getHours() >= 5 && nowdate.getHours() < 9) helloContent = `早晨好☕  `;
  if (nowdate.getHours() >= 9 && nowdate.getHours() < 12) helloContent = `上午好 ☕ `;
  if (nowdate.getHours() >= 12 && nowdate.getHours() < 18) helloContent = `下午好 ☕ `;
  if (nowdate.getHours() >= 18 && nowdate.getHours() < 20) helloContent = `傍晚好 ☕ `;
  if (nowdate.getHours() >= 20 && nowdate.getHours() < 23) helloContent = `晚间好 ☕  `;
  if (nowdate.getHours() >= 23 || nowdate.getHours() < 5) helloContent = `夜已深啦 ❤️️ 尽早休息  `;
  return helloContent;
};

export const todoTableType = {
  page: 1,
  sort: 2,
};

export const maxContentLength = 5000;


export const getEditorDefaultValue = (username:string)=>{
  return  `<p><br></p><p><br></p><p><br></p><h1 style="text-align: center;">${username} 👣</h1><h1 style="text-align: center;">welcome 👏 </h1><p><br></p><p><br></p><p><br></p>`;
} 
export const socketEditorDefaultValue = `<p><br></p><p><br></p><p><br></p><h1 style="text-align: center;"></h1><h1><span style="font-family: Tahoma;">你好呀~</span></h1><p><br></p><p><br></p><p><br></p>`

export const uuid = (len = 8, radix1 = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  );
  const value: string[] = [];
  let i = 0;
  const radix = radix1 || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      value[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    value[8] = value[13] = value[18] = value[23] = '-'; // eslint-disable-line no-multi-assign
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return value.join('');
};
