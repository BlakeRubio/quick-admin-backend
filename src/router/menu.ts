import menuController from "../controller/menu.controller"
import { verifyAuth } from "../middlewares/login.middleware"

const KoaRouter = require('@koa/router')

const menuRouter = new KoaRouter({
    prefix: '/menu'
})

// 新增菜单
menuRouter.post('/', verifyAuth, menuController.create)

// 菜单列表
menuRouter.get('/', verifyAuth, menuController.list)


export default menuRouter