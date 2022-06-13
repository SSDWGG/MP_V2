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
  return request<user>(`/v2/user/CurrentUser`, {
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

export async function avatarUpload(file: UploadFile) {
  return request<{}>(`/v2/user/avatarUpload`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: file,
  });
}
