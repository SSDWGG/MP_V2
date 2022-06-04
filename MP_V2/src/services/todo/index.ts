import { request } from 'umi';

// 在该页面程序改完后将该接口废除，后台计算并返回需要用到几个数据元
// 获取全部该user的todo
export async function getTodosList(userid: number) {
  return request<todo[]>(`/v2/todo/getUserAllTodos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { userid },
  });
}

// 条件查询列表todo
export async function getTodoListByQuery(params: TodoType.ParamsgetTodoListByQuery) {
  return request<ResList<todo>>(`/v2/todo/getTodoListByQuery`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
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
