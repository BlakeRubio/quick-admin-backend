import * as fs from 'fs'
import UserService from "../service/user.service";
import { AVATAR_PATH } from '../config/path';

class UserController {
  // 用户注册
  async create(ctx, next) {
    // 1. 获取客户端传递过来的用户信息
    const user = ctx.request.body;

    // 2. 将用户信息保存到数据库
    const result = await UserService.create(user);

    // 3. 返回响应
    ctx.body = {
      code: 0,
      message: "用户注册成功~",
      data: result,
    };
  }

  // 获取用户信息
  async getUserInfo(ctx, next) {
    // 1. 获取客户端传递过来的用户 id
    const { id } = ctx.request.query;

    // 2. 根据用户 id 查询用户信息
    const result = await UserService.findUserById(id);

    // 3. 返回响应
    ctx.body = {
      code: 0,
      message: "获取用户信息成功~",
      data: result,
    };
  }

  // 获取用户头像
  async getAvatar(ctx, next) {
    // 获取用户 id
    const { userId } = ctx.params;

    // 查询用户头像
    const result = await UserService.getAvatarById(userId);

    // 读取头像所在的文件
    const { filename, mimetype } = result;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`);
  }
}

export default new UserController();
