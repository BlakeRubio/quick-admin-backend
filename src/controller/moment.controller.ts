import momentService from "../service/moment.service";

class MomentController {
  // 创建一条动态
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
      data: result,
    };
  }

  // 获取动态列表
  async list(ctx, next) {
    // 获取 page pageSize
    const { page, pageSize } = ctx.query;

    // 获取动态列表
    const result = await momentService.getMomentList(page, pageSize);

    // 3. 返回响应
    ctx.body = {
      code: 0,
      page,
      pageSize,
      data: result,
    };
  }

  async getMomentInfo(ctx, next) {
    // 获取动态 id
    const { momentId } = ctx.params;

    const result = await momentService.getMomentById(momentId);

    // 3. 返回响应
    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;

    // 内容
    const { content } = ctx.request.body;

    await momentService.updateMomentById(content, momentId);

    ctx.body = {
      code: 0,
      message: "修改成功`",
    };
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;

    await momentService.removeMomentById(momentId);

    ctx.body = {
      code: 0,
      message: "删除成功`",
    };
  }
}

export default new MomentController();
