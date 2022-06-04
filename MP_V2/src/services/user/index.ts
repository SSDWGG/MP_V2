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
export async function queryCurrentUser(token: string | null) {
  return request<user>(`/v2/user/CurrentUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { token },
  });
}

// 快速注册quickAddUser
export async function addUser(params: UserType.ParamsAddUser) {
  // 需要验证username是否重复，协议个查重username的接口
  return request<{}>(`/v2/user/quickAddUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    // params,
  });
}
