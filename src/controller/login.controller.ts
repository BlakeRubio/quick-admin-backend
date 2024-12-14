import * as jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config/secret'

class LoginController {
  // 返回用户信息
  generateToken(ctx, next) {
    // 获取用户信息
    const { id, name } = ctx.user;

    // 颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, { 
      algorithm: 'RS256',
      expiresIn: '1h'
    });

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
