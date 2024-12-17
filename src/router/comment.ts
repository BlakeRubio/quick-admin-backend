import commentController from "../controller/comment.controller"
import { verifyAuth } from "../middlewares/login.middleware"

const KoaRouter = require('@koa/router')

const commentRouter = new KoaRouter({
    prefix: '/comment'
})


commentRouter.post('/', verifyAuth, commentController.create)
commentRouter.post('/reply', verifyAuth, commentController.reply)


export default commentRouter