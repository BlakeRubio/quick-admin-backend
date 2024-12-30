const KoaRouter = require('@koa/router')
import roleController from "../controller/role.controller"
import { verifyAuth } from "../middlewares/login.middleware"

const roleRouter = new KoaRouter({
    prefix: '/role'
})

// 新增角色
roleRouter.post('/', verifyAuth, roleController.create)

// 获取角色列表
roleRouter.get('/', roleController.list)

// 修改角色
roleRouter.patch('/:roleId', verifyAuth, roleController.update)

// 删除角色
roleRouter.delete('/:roleId', verifyAuth, roleController.delete)

// 分配权限
roleRouter.post('/:roleId/menu', verifyAuth, roleController.assignMenu)


export default roleRouter