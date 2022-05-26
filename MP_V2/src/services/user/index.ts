import { request } from 'umi';

export async function login(params: UserType.ParamsLogin) {
  return request<UserType.ResLogin>(`/api/ryw/antpro/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
export async function queryCurrentUser(token: string | null) {
  return request<user>(`/api/ryw/antpro/CurrentUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { token },
  });
}
export async function addUser(params: UserType.ParamsAddUser) {
  // 需要验证username是否重复，协议个查重username的接口
  return request<ResBase>(`/v2/user/quickAddUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    // params,
  });
}
