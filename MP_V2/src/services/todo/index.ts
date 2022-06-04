import { request } from 'umi';

export async function getTodosList(userid: number) {
  return request<todo[]>(`/v2/todo/getUserAllTodos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { userid },
  });
}
export async function AddTodo(userid: number, todo: TodoType.ParamsAddTodo) {
  return request<ResBase>(`/v2/todo/addTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { userid },
    data: todo,
  });
}
export async function updateTodo(todo: todo) {
  return request<ResBase>(`/v2/todo/updateTodo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: todo,
  });
}
export async function deleteTodo(todoid: number) {
  return request<{}>(`/v2/todo/deleteTodo`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { todoid },
  });
}
// export async function getTodosListByType(okflag: number) {
//   return request<TodoType.ResGetTodosList>(`/api/ryw/antpro/getTodosListByOkFlag`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: { okflag },
//   });
// }
// export async function getTodosListByTitle(todotitle: string) {
//   return request<TodoType.ResGetTodosList>(`/api/ryw/antpro/getTodosListByTitle`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: { todotitle },
//   });
// }
export async function updateTodoType(todo: todo, okflag: number) {
  return request<String>(`/v2/todo/updateTodoType`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { okflag },
    data: todo,
  });
}
