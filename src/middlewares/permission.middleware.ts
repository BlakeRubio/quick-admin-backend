
import { OPERATION_IS_NOT_ALLOWED } from "../constants/error"
import permissionService from "../service/permission.service"


// 权限中间件
export const verifyPermission = async (ctx, next) => {
    // 获取登录用户的 id
    const { id } = ctx.user

    const keyName = Object.keys(ctx.params)[0]
    const resourceId = ctx.params[keyName]
    const resourceName = keyName.replace('Id', '')

    // 查询是否有权限
    const isPermission = await permissionService.checkResource(resourceName, resourceId, id)

    if (!isPermission) {
        return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
    }

    await next()
}