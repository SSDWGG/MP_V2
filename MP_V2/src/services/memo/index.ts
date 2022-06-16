import { request } from 'umi';

export async function getUserAllMemos() {
  return request<memo[]>(`/v2/todo/getUserAllMemos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
