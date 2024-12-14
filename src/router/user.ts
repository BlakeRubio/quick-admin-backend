/** 必须使用 COMMONJS 导入,否则会有错误 */
const KoaRouter = require('@koa/router')
import userController from "../controller/user.controller";
import verifyUser, { handlePassword } from '../middlewares/user.middleware';


// 路由实例测试
const userRoute = new KoaRouter({
    prefix: '/user'
});

// 定义用户注册接口
userRoute.post('/', verifyUser, handlePassword, userController.create)

export default userRoute