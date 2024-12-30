import * as jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config/secret'
import { createResponse } from '../utils/helper';


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

    const data = { id, name, token }

    ctx.body = createResponse(ctx, 0, "登录成功~", data)
  }
}

export default new LoginController();
