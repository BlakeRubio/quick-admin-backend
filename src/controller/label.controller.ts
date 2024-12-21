import labelService from "../service/label.service";

class labelController {
  async create(ctx, next) {
    // 获取标签
    const { name } = ctx.request.body;

    await labelService.create(name);

    ctx.body = {
      code: 0,
      message: "标签创建成功~",
    };
  }

  async list(ctx, next) {
    const result = await labelService.list();

    ctx.body = {
      code: 0,
      message: "标签列表获取成功~",
      data: result,
    };
  }
}

export default new labelController();
