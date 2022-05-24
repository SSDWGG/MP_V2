// 还是需要先导入koa-router
const Router = require("koa-router");
// 实例化router
const userRouter = new Router();
const {
  exec
} = require("../../database/index.js");
const {
  createToken
} = require("../../utils/account");


// 可以通过ctx.query获取parse后的参数
// 或者通过ctx.queryString获取序列化后的参数
userRouter.get("/getUsersList", async (ctx, next) => {
  const sql = `select * from users`;
  const res = await exec(sql);
  // 拿到res，做数据筛选和数据变换
  ctx.body = {
    code: 200,
    data: res,
    message: "ok",
  };
});
// 注册post方法
// app.js中挂载koa-bodyparse中间件后，
// 可以通过ctx.request.body获取post参数
// eg：这里的data就是前端post时提交的数据
// 登陆
userRouter.post("/login", async (ctx, next) => {
  const sql = `select * from users where username = '${ctx.request.body.username}' && password ='${ctx.request.body.password}'`;
  console.log(sql);
  const res = await exec(sql);
  if (res.length > 0) {
    const token = createToken(res);
    ctx.body = {
      code: 200,
      data: res,
      token: token,
      message: "ok",
    };

  }
});

userRouter.post("/register", async (ctx, next) => {
  const sql = `INSERT INTO users(username, password, email)
  VALUES('${ctx.request.body.username}',
   '${ctx.request.body.password}',
    '${ctx.request.body.email}');`;
  const res = await exec(sql);
  console.log(res);
  ctx.body = res[0]
});

userRouter.post("/CurrentUser", async (ctx, next) => {
  // token无需传参，可以直接在请求头中拿到
  // console.log('在此解析token，并做权限判断，返回相应的用户信息');
  const sql = `select * from users where userid = 1`;
  const res = await exec(sql);
  console.log(res);
  ctx.body = res[0]
});

// 将该模块的路由（api接口）暴露出去
// 供api/index.js路由注册
module.exports = userRouter;