import noticeController from "../controller/notice.controller"
import { verifyAuth } from "../middlewares/login.middleware"

const KoaRouter = require('@koa/router')

const noticeRouter = new KoaRouter({
    prefix: '/notice'
})

/** 获取公告 */
noticeRouter.get('/', noticeController.list)

/** 获取公告详情 */
noticeRouter.get('/:id', noticeController.details)

/** 创建公告 */
noticeRouter.post('/', verifyAuth, noticeController.create)


export default noticeRouter