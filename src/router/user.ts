/** 必须使用 COMMONJS 导入,否则会有错误 */
const KoaRouter = require('@koa/router')
import userController from "../controller/user.controller";


// 路由实例测试
const userRoute = new KoaRouter({
    prefix: '/user'
});

// 定义用户注册接口
userRoute.post('/', userController.create)

export default userRoute