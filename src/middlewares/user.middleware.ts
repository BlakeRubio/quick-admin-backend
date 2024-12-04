import UserSchema from "../validators/user";
import userService from "../service/user.service";

interface User {
  id: number;
  name: string;
  password: string;
  createAt: Date;
  updateAt: Date;
}

// 用户注册中间件
const verifyUser = async (ctx, next) => {
  const user = ctx.request.body;
  const { error, value } = UserSchema.validate(user);
  if (error) {
    ctx.body = {
      code: -1001,
      message: error.details[0].message,
    };
    return
  }

  const hasUser = (await userService.findUserByName(user.name)) as Array<User>;
    if (hasUser.length) {
        ctx.body = {
            code: -1002,
            message: '用户名已经被占用，换一个试试吧~'
        }
        return
    }

    await next();
};

export default verifyUser;
