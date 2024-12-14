import UserSchema from "../validators/user";
import userService from "../service/user.service";
import { NAME_IS_ALREADY_EXISTS, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT } from '../constants/error'
import { User } from '../types'
import md5password from "../utils/md5-password";

export const verifyLogin = async (ctx, next) => {
  // 获取客户端传递过来的用户信息
  const { name, password } = ctx.request.body;
  const { error, value } = UserSchema.validate({ name, password });
  
  if (error) {
    ctx.message = error.details[0].message
    return ctx.app.emit("error", 'JOI_ERROR', ctx);
  }

  // 判断用户是否存在
  const users = (await userService.findUserByName(value.name)) as Array<User>;
  const user = users[0];

  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }

  // 判断密码是否正确
  if (user.password !== md5password(value.password)) {
    console.log(md5password(value.password));
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
    
  }

  // 保存用户对象
  ctx.user = user

  await next();
};