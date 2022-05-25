import { request } from 'umi';

export async function AddTodo(params: TodoType.ParamsAddTodo) {
  return request<ResBase>(`/api/ryw/antpro/addTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

export async function getTodosList() {
  return request<TodoType.ResGetTodosList>(`/api/ryw/antpro/getTodosList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateTodo(params: todo) {
  return request<ResBase>(`/api/ryw/antpro/updateTodo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
export async function deleteTodo(todoid: number) {
  return request<ResBase>(`/api/ryw/antpro/deleteTodo`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { todoid },
  });
}
export async function getTodosListByType(okflag: number) {
  return request<TodoType.ResGetTodosList>(`/api/ryw/antpro/getTodosListByOkFlag`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { okflag },
  });
}
export async function getTodosListByTitle(todotitle: string) {
  return request<TodoType.ResGetTodosList>(`/api/ryw/antpro/getTodosListByTitle`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { todotitle },
  });
}
export async function updateTodoType(todoid: number, okflag: number) {
  return request<ResBase>(`/api/ryw/antpro/updateTodoType`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { todoid, okflag },
  });
}
