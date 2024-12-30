import roleService from "../service/role.service";

class roleController {
  async create(ctx, next) {
    // 获取前端传过来的数据
    const role = ctx.request.body;

    // 将数据保存到数据库
    const result = await roleService.create(role);

    ctx.body = {
      code: 0,
      message: "角色创建成功~",
      data: result,
    };
  }

  async list(ctx, next) {

    const { page, pageSize } = ctx.query;
    const result: any = await roleService.list(page, pageSize);

    // 获取菜单信息
    for (const role of result) {
       const menu =  await roleService.getRoleMenus(role.id);
       role.menus = menu
    }

    ctx.body = {
      code: 0,
      message: "角色列表获取成功~",
      data: result,
    };
  }

  async delete(ctx, next) {
    const { roleId } = ctx.params;

    const result = await roleService.remove(roleId);

    ctx.body = {
      code: 0,
      message: "角色删除成功~",
      data: result,
    };
  }

  async update(ctx, next) {
    const { roleId } = ctx.params;

    const result = await roleService.update(roleId);

    ctx.body = {
      code: 0,
      message: "角色修改成功~",
      data: result,
    };
  }

  async assignMenu(ctx, next) {
    const { roleId } = ctx.params;
    const menuIds = ctx.request.body.menuIds;
    
    // 分配权限
    await roleService.assignMenu(roleId, menuIds);

    ctx.body = {
      code: 0,
      message: "分配权限成功~",
    };
  }
}
export default new roleController();
