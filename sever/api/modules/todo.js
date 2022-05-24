// 还是需要先导入koa-router
const Router = require("koa-router");
// 实例化router
const todoRouter = new Router();
const {
  exec
} = require("../../database/index.js");


todoRouter.get("/getTodosList", async (ctx, next) => {
  const sql = `select * from todo`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    data: res,
    message: "ok",
  };
});
todoRouter.put("/updateTodo", async (ctx, next) => {
  if (ctx.request.body.schedule == 0) ctx.request.body.okflag = 0
  else if (ctx.request.body.schedule > 0 && ctx.request.body.schedule < 100) ctx.request.body.okflag = 1
  else if (ctx.request.body.schedule >= 100) ctx.request.body.okflag = 3
  ctx.request.body.tododescribe = !ctx.request.body.tododescribe ? '' : ctx.request.body.tododescribe
  ctx.request.body.beginTime = !ctx.request.body.beginTime ? '' : ctx.request.body.beginTime
  ctx.request.body.endTime = !ctx.request.body.endTime ? '' : ctx.request.body.endTime
  ctx.request.body.infactendTime = !ctx.request.body.infactendTime ? '' : ctx.request.body.infactendTime
  // 默认输入空字符串
  const sql = `UPDATE todo SET todotitle='${ctx.request.body.todotitle}', 
  tododescribe='${ctx.request.body.tododescribe}' ,
   beginTime = '${ctx.request.body.beginTime}' ,
   endTime = '${ctx.request.body.endTime}',
   infactendTime = '${ ctx.request.body.infactendTime}',
 okflag = ${ ctx.request.body.okflag},
   schedule = ${ctx.request.body.schedule} WHERE todoid=${ctx.request.body.todoid};`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    message: "ok",
  };
});
todoRouter.put("/updateTodoType", async (ctx, next) => {
  const sql = `UPDATE todo SET 
  okflag = ${ctx.request.body.okflag} WHERE todoid=${ctx.request.body.todoid};`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    message: "ok",
  };
});
todoRouter.post("/addTodo", async (ctx, next) => {
  // title必填，其余可选，是否有值由前端来判断
  if (ctx.request.body.schedule == 0) ctx.request.body.okflag = 0
  else if (ctx.request.body.schedule > 0 && ctx.request.body.schedule < 100) ctx.request.body.okflag = 1
  else if (ctx.request.body.schedule >= 100) ctx.request.body.okflag = 3
  if (!ctx.request.body.tododescribe) ctx.request.body.tododescribe = ''
  if (!ctx.request.body.beginTime) ctx.request.body.beginTime = ''
  if (!ctx.request.body.endTime) ctx.request.body.endTime = ''
  const sql = `INSERT INTO todo(todotitle, tododescribe, beginTime,schedule, endTime, okflag)
  VALUES('${ctx.request.body.todotitle}',
   '${ctx.request.body.tododescribe}',
    '${ctx.request.body.beginTime}', 
    ${ctx.request.body.schedule}, 
    '${ctx.request.body.endTime}', ${ctx.request.body.okflag});`;
  console.log(sql);
  const res = await exec(sql);
  ctx.body = {
    code: 200,
    message: "ok",
  };


});
todoRouter.delete("/deleteTodo", async (ctx, next) => {
  const sql = `DELETE FROM todo WHERE todoid = ${ctx.request.body.todoid};`;
  const res = await exec(sql);
  ctx.body = {
    code: 200,
    message: "ok",
  };

});
// 任务状态条件查询
todoRouter.get("/getTodosListByOkFlag", async (ctx, next) => {
  const sql = `select * from todo WHERE okflag = ${ctx.query.okflag};`
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    data: res,
    message: "ok",
  };
});

// 模糊查询任务title
todoRouter.get("/getTodosListByTitle", async (ctx, next) => {
  const sql = `SELECT * FROM todo WHERE todotitle LIKE '%${ctx.query.todotitle}%' ;`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    data: res,
    message: "ok",
  };
});

// 任务按照id查询
todoRouter.get("/getTodosListById", async (ctx, next) => {
  const sql = `select * from todo WHERE todoid = ${ctx.query.todoid};`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    data: res,
    message: "ok",
  };
});
// 将该模块的路由（api接口）暴露出去
// 供api/index.js路由注册
module.exports = todoRouter;