declare namespace TodoType {
  interface ParamsAddTodo {
    todotitle: string;
    tododescribe: string;
    beginTime: number;
    endTime: number;
  }

  interface ResGetTodosList extends ResBase {
    data: todo[];
  }
}
