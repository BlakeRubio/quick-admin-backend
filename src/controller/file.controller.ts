import fileService from "../service/file.service";
import userService from '../service/user.service';
import { SERVER_HOST } from '../config/server';

class fileController {
  async create(ctx, next) {
    // 获取文件信息
    const { filename, size, mimetype } = ctx.request.file
    const { id } = ctx.user

    // 上传文件
    const result = await fileService.create(filename, size, mimetype, id)

    // 将头像地址信息保存到user表中'
    const avatarUrl = `${ SERVER_HOST }:8000/user/avatar/${id}`
    await userService.updateUserAvatarUrl(avatarUrl, id)
    
    ctx.body = {
      code: 0,
      message: "上传成功~",
      data: avatarUrl
    };
  }
}

export default new fileController();
