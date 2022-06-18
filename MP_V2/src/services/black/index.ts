import { request } from 'umi';

export async function getBlackByUserid(userid: number) {
  return request<black>(`/v2/black/getBlackByUserid`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { userid },
  });
}
export async function addblack(black: black) {
  return request<{}>(`/v2/black/addblack`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: black,
  });
}
export async function deleteBlackByUserid(userid: number) {
  return request<{}>(`/v2/black/deleteBlackByUserid`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { userid },
  });
}
