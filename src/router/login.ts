import { verifyLogin, verifyCaptcha } from "../middlewares/login.middleware"
import LoginController from "../controller/login.controller"

const KoaRouter = require('@koa/router')

const loginRouter = new KoaRouter({
    prefix: '/login'
})


loginRouter.post('/', verifyLogin, verifyCaptcha, LoginController.generateToken)


export default loginRouter