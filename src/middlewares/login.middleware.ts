import * as jwt from "jsonwebtoken";
import md5password from "../utils/md5-password";
import { UserSchema } from "../validators";
import userService from "../service/user.service";
import {
  UNAUTHORIZED,
  NAME_IS_NOT_EXISTS,
  FORBIDDEN,
  PASSWORD_IS_INCORRECT,
  CODE_IS_INCORRECT,
  LOGIN_TYPE_IS_REQUIRED,
  CODE_IS_REQUIRED,
  LOGIN_TYPE_IS_INCORRECT,
  PHONE_IS_INCORRECT,
  PHONE_IS_REQUIRED,
} from "../constants/error";
import { User } from "../types";
import { PUBLIC_KEY } from "../config/secret";

export const verifyLogin = async (ctx, next) => {
  // 获取客户端传递过来的用户信息
  const { loginType } = ctx.request.body;

  if (!loginType) {
    return ctx.app.emit("error", LOGIN_TYPE_IS_REQUIRED, ctx);
  }

  if (!["wx", "pc"].includes(loginType)) {
    return ctx.app.emit("error", LOGIN_TYPE_IS_INCORRECT, ctx);
  }

  if (loginType === "pc") {
    const { name, password, code } = ctx.request.body;
    const { error, value } = UserSchema.validate({ name, password, code });
  
    if (error) {
      ctx.message = error.details[0].message;
      return ctx.app.emit("error", "JOI_ERROR", ctx);
    }
  
    // 保存验证码类型
    ctx.codeType = "login";
  
    // 判断用户是否存在
    const users = (await userService.findUserByName(value.name)) as Array<User>;
    const user = users[0];
  
    if (!user) {
      return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
    }
  
    // 判断密码是否正确
    if (user.password !== md5password(value.password)) {
      return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
    }
    // 保存用户对象
    ctx.user = user;
  } else {
    const { phone, code } = ctx.request.body;
    if (!phone) return ctx.app.emit("error", PHONE_IS_REQUIRED, ctx);

    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
      return ctx.app.emit("error", PHONE_IS_INCORRECT, ctx);
    }

    if (!code) return ctx.app.emit("error", CODE_IS_REQUIRED, ctx);

    // 保存验证码类型
    ctx.codeType = "wxLogin";

    // 判断用户是否存在
    const users = (await userService.findUserByPhone(phone)) as Array<User>;
    const user = users[0];

    if (!user) {
      return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
    }    
    // 保存用户对象
    ctx.user = user;
  }

  await next();
};

// 验证用户输入的验证码
export const verifyCaptcha = async (ctx, next) => {
  const { code } = ctx.request.body;
  const globalCode = ctx.codeType === "login" ? global.loginCaptcha : ctx.codeType === "wxLogin" ? global.phoneCaptcha : global.registerCaptcha;

  if (code.toLowerCase() !== globalCode.toLowerCase()) {
    return ctx.app.emit("error", CODE_IS_INCORRECT, ctx);
  }

  await next();

};

// 验证 token
export const verifyAuth = async (ctx, next) => {
  const authHeader = ctx.request.headers.authorization;
  if (!authHeader) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx);
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    return ctx.app.emit("error", UNAUTHORIZED, ctx);
  }

  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    ctx.user = result
    await next();
  } catch (err) {
    ctx.status = 403;
    return ctx.app.emit("error", FORBIDDEN, ctx);
  }
};
