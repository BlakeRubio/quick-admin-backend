import fileController from "../controller/file.controller"
import uploadAvatar from "../middlewares/file.middleware"
import { verifyAuth } from "../middlewares/login.middleware"
const KoaRouter = require('@koa/router')

const fileRouter = new KoaRouter({
    prefix: '/file'
})

// 头像上传
fileRouter.post('/avatar', verifyAuth, uploadAvatar, fileController.create)

export default fileRouter