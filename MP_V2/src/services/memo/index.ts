import { request } from 'umi';

export async function getUserAllMemos() {
  return request<memo[]>(`/v2/memo/getUserAllMemos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export async function getMemoByMemoid(memoid: number) {
  return request<memo>(`/v2/memo/getMemoByMemoid`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { memoid },
  });
}

export async function addMemo(memo: memo) {
  return request<memo>(`/v2/memo/addMemo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: memo,
  });
}
export async function deleteMemo(memoid: number) {
  return request<memo>(`/v2/memo/deleteMemoByMemoid`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { memoid },
  });
}
export async function updateMemo(memo: memo) {
  return request<memo>(`/v2/memo/updateMemo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: memo,
  });
}
