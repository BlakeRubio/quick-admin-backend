const KoaRouter = require('@koa/router')
import labelController from "../controller/label.controller"
import { verifyAuth } from "../middlewares/login.middleware"
import { verifyLabel } from "../middlewares/label.middleware"


const labelRouter = new KoaRouter({
    prefix: '/label'
})


labelRouter.post('/', verifyAuth, verifyLabel, labelController.create)
labelRouter.get('/', labelController.list)

export default labelRouter