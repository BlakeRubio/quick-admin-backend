import UserService from "../service/user.service";

class UserController {
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
}

export default new UserController();