
const KoaRouter = require('@koa/router')
import momentController from "../controller/moment.controller"
import { verifyAuth } from "../middlewares/login.middleware"
import { verifyContent } from "../middlewares/moment.middleware"
import { verifyPermission } from "../middlewares/permission.middleware"
import { verifyLabelExists } from '../middlewares/label.middleware'

const momentRouter = new KoaRouter({
    prefix: '/moment'
})

momentRouter.post('/', verifyAuth, verifyContent, momentController.create)
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', verifyAuth, momentController.getMomentInfo)
momentRouter.patch('/:momentId', verifyAuth, verifyContent, verifyPermission, momentController.update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)
/**
 * 动态关联标签
 * 1.前端传入momentId和labelId
 * 2.验证是否有登录操作这个动态的权限
 * 3.验证labelId是否存在
 * ** 存在，直接使用
 * ** 不存在，创建后在使用
 * 4.添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)


export default momentRouter