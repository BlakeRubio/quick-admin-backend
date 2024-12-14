// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
import UserService from "../service/user.service";

class LoginController {
  // 返回用户信息
  sign(ctx, next) {
    // 获取用户信息
    const { id, name } = ctx.user;
    // 颁发令牌
    const token = jwt.sign({ id, name }, "secret", {
        expiresIn: 60 * 60,
        algorithm: "RS256",
    });
    console.log('test');
    ctx.body = {
      code: 0,
      message: "登录成功~",
      data: {
        id,
        name,
        token,
      },
    };
  }
}

export default new LoginController();
