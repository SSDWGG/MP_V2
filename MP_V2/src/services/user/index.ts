import { UploadFile } from 'antd/lib/upload/interface';
import { request } from 'umi';

// 验证账号密码
export async function login(params: UserType.ParamsLogin) {
  return request<string>(`/v2/user/login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}

// 拿到当前的用户的信息
export async function queryCurrentUser() {
  return request<UserType.ResCurrentUser>(`/v2/user/CurrentUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 快速注册quickAddUser
export async function addUser(params: UserType.ParamsAddUser) {
  return request<{}>(`/v2/user/quickAddUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    // params,
  });
}

export async function checkhave(params: any) {
  // 重复性校验，返回数据库中存在的个数
  return request<user[]>(`/v2/user/checkhave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
// 更新userinfo
export async function updateUser(params: user) {
  return request<{}>(`/v2/user/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 更新userpassword
export async function updateUserPassword(params: user) {
  return request<{}>(`/v2/user/updateUserPassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
export async function avatarUpload(file: UploadFile) {
  return request<{}>(`/v2/user/avatarUpload`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: file,
  });
}

// 查询全部用户 page分页情况下
export async function getAllUsers(params: ParamsPageBase) {
  return request<ResList<user>>(`/v2/user/getAllUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}

// 校验验证码
export async function testCode(params: { code: string; email: string }) {
  return request<boolean>(`/v2/code/testCode`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}


// 发送验证码
export async function sendCode(email: string) {
  return request<string>(`/v2/code/sendEmail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params:{email}
  });
}

// email验证更新userpassword
export async function updatePasswordByEmail(params: {email:string,password:string}) {
  return request<{state:string}>(`/v2/user/updatePasswordByEmail`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}