import UserService from "../service/user.service";

class UserController {
    create(ctx, next) {
        // 1. 获取客户端传递过来的用户信息
        const user = ctx.request.body

        // 2. 将用户信息保存到数据库
        UserService.create(user)

        // 3. 返回响应
        ctx.body = '创建用户成功~'
    }
}

export default new UserController();