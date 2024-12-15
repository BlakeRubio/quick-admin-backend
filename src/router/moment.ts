
const KoaRouter = require('@koa/router')
import momentController from "../controller/moment.controller"
import { verifyAuth } from "../middlewares/login.middleware"
import { verifyContent } from "../middlewares/moment.middleware"

const momentRouter = new KoaRouter({
    prefix: '/moment'
})


momentRouter.post('/', verifyAuth, verifyContent, momentController.create)
momentRouter.get('/', verifyAuth, momentController.list)
momentRouter.get('/:momentId', verifyAuth, momentController.getMomentInfo)


export default momentRouter