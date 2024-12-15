import momentService from "../service/moment.service";

class MomentController {
  async create(ctx, next) {
    // 获取动态的内容
    const { content } = ctx.request.body;

    // 获取创建者 ID
    const { id } = ctx.user;

    // 创建动态
    const result = await momentService.create(content, id);

    // 3. 返回响应
    ctx.body = {
      code: 0,
      message: "动态发表成功~",
      data: result
    };
  }
}

export default new MomentController();
