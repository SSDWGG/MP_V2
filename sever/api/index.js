// 引入koa-router
const Router = require('koa-router');

// 引入modules文件夹下的路由模块
const userRouter = require('./modules/user')
const todoRouter = require('./modules/todo')

// 实例化Router中间件
const router = new Router();

// 注册路由
// 注意该路由模块文件在注册时增加了'/user前缀
// 即该模块下所有的接口地址都会以/user作为前缀
router.use('/api/ryw/antpro', userRouter.routes(), userRouter.allowedMethods())
router.use('/api/ryw/antpro', todoRouter.routes(), todoRouter.allowedMethods())

// 将注册后的路由导出
// 供app.js中的koa挂载
module.exports = router;