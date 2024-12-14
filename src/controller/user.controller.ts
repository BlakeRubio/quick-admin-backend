import UserService from "../service/user.service";

class UserController {
    // 用户注册
    async create(ctx, next) {
        // 1. 获取客户端传递过来的用户信息
        const user = ctx.request.body

        // 2. 将用户信息保存到数据库
        const result = await UserService.create(user)

        // 3. 返回响应
        ctx.body = {
            code: 0,
            message: '用户注册成功~',
            data: result
        }
    }

    // 获取用户信息
    async getUserInfo(ctx, next) {
        // 1. 获取客户端传递过来的用户 id
        const { id } = ctx.request.query

        // 2. 根据用户 id 查询用户信息
        const result = await UserService.findUserById(id)

        // 3. 返回响应
        ctx.body = {
            code: 0,
            message: '获取用户信息成功~',
            data: result
        }
    }
}

export default new UserController();