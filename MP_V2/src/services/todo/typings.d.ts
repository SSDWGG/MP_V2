declare namespace TodoType {
  interface ParamsAddTodo {
    todotitle: string;
    tododescribe: string;
    beginTime: number;
    endTime: number;
  }

  interface ParamsgetTodoListByQuery extends ParamsPageBase {
    userid: number;
    todotitle: string;
    okflag: number;
  }
  interface ParamsgetTodoListByQuerySort {
    userid: number;
    todotitle: string;
    okflag: number;
  }
}
