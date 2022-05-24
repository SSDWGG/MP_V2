// 引入Koa库并初始化
const Koa = require("koa");
const app = new Koa();
// 引入jwt
const jwt = require("koa-jwt");
// 拿到我们的密钥字符串
const { JWT_SECRET } = require("./utils/account");

// 启动服务
// 监听3000端口
const appService = app.listen(3000, () => {
  console.log("[Koa]Server is starting at localhost:3000");
});
module.exports = appService;
// 挂载路由
// 服务启动后可以在浏览器输入localhost:3000看到提示
// app.use(async ctx => ctx.body = '服务启动成功');

// 引入koa-bodyparser用于解析post数据
const bodyParser = require("koa-bodyparser");

// 引入根目录下的api路由
// 即把koa-test/api/index.js暴露出来的路由引入进来
const router = require("./api");

// jwt验证错误的处理
// jwt会对验证不通过的路由返回401状态码
// 我们通过koa拦截错误，并对状态码为401的返回无权限的提示
// 注意：需要放在jwt中间件挂载之前
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "暂无权限",
      };
    } else {
      throw err;
    }
  });
});

// 挂载jwt中间件
// secret参数是用于验证的密钥
// unless方法，设置不需要token的接口
app.use(
  jwt({ secret: JWT_SECRET }).unless({
    path: ["/api/ryw/antpro/login", "/register"],
  })
);

// app.js中挂载koa-bodyparser
// 注意：在路由挂载前先挂载 koa-bodyparser
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
