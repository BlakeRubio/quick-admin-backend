
const KoaRouter = require('@koa/router')
import momentController from "../controller/moment.controller"
import { verifyAuth } from "../middlewares/login.middleware"
import { verifyContent } from "../middlewares/moment.middleware"
import { verifyPermission } from "../middlewares/permission.middleware"

const momentRouter = new KoaRouter({
    prefix: '/moment'
})


momentRouter.post('/', verifyAuth, verifyContent, momentController.create)
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', verifyAuth, momentController.getMomentInfo)
momentRouter.patch('/:momentId', verifyAuth, verifyContent, verifyPermission, momentController.update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)


export default momentRouter