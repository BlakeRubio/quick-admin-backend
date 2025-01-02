import commentController from "../controller/comment.controller"
import { verifyComment, verifyReply } from "../middlewares/comment.middleware"
import { verifyAuth } from "../middlewares/login.middleware"

const KoaRouter = require('@koa/router')

const commentRouter = new KoaRouter({
    prefix: '/comment'
})


commentRouter.post('/', verifyAuth, verifyComment,  commentController.create)
commentRouter.post('/reply', verifyAuth, verifyReply, commentController.reply)


export default commentRouter