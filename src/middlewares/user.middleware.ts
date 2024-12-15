import userService from "../service/user.service";
import md5password from "../utils/md5-password";
import { UserSchema } from "../validators";
import { NAME_IS_ALREADY_EXISTS } from '../constants/error'
import { User } from '../types'

// 用户注册中间件
const verifyUser = async (ctx, next) => {
  const user = ctx.request.body;
  const { error } = UserSchema.validate(user);

  if (error) {
    ctx.message = error.details[0].message
    return ctx.app.emit("error", 'JOI_ERROR', ctx);
  }

  const hasUser = (await userService.findUserByName(user.name)) as Array<User>;
  if (hasUser.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  await next();
};

// 密码加密
export const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  
  await next();
};

export default verifyUser;
