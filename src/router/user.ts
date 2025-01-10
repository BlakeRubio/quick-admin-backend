/** 必须使用 COMMONJS 导入,否则会有错误 */
const KoaRouter = require('@koa/router')
import userController from "../controller/user.controller";
import verifyUser, { handlePassword } from '../middlewares/user.middleware';
import { verifyAuth, verifyCaptcha } from '../middlewares/login.middleware';


// 路由实例测试
const userRoute = new KoaRouter({
    prefix: '/user'
});

// 用户注册接口
userRoute.post('/', verifyUser, handlePassword, verifyCaptcha, userController.create)

// 获取用户信息
userRoute.get('/info', verifyAuth, userController.getUserInfo)

// 查看头像
userRoute.get('/avatar/:userId', userController.getAvatar)

export default userRoute