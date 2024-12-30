import connection from "../app/database";
import menuService from "./menu.service";

class roleService {
  async create(role) {
    const statement = "INSERT INTO role SET ?";
    const [result] = await connection.query(statement, [role]);

    return result;
  }

  async list(page = 0, pageSize = 10) {
    const statement = `SELECT * FROM role LIMIT ?, ?`;
    const [result] = await connection.execute(statement, [
        String(page),
        String(pageSize),
      ]);

    return result;
  }

  async remove(roleId) {
    const statement = "DELETE FROM role WHERE id = ?";
    const [result] = await connection.execute(statement, [roleId]);

    return result;
  }

  async update(roleId) {
    const statement = "UPDATE role SET name = ? WHERE id = ?";
    const [result] = await connection.execute(statement, [roleId]);

    return result;
  }

  async assignMenu(roleId, menuIds) {
    // 先删除之前的关系
    const deleteStatement = "DELETE FROM role_menu WHERE roleId = ?";
    await connection.query(deleteStatement, [roleId]);

    // 再插入新的关系 参考动态和标签的关系优化
    const insertStatement = "INSERT INTO role_menu (roleId, menuId) VALUES (?,?)";
    for(const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId]);
    } 
  }

  async getRoleMenus(roleId) {
    const getMenuIdsStatement = `
    SELECT rm.roleId, JSON_ARRAYAGG(rm.menuId) menuIds 
    FROM role_menu rm WHERE rm.roleId = ? GROUP BY rm.roleId`

    const [roleMenuIds]:any = await connection.query(getMenuIdsStatement, [roleId]);
    const menuIds = roleMenuIds.length && roleMenuIds[0].menuIds;

    const wholeMenu = await menuService.wholeMenu();

    function filterMenu(menu) {
      const newMenu = []
      for (const item of menu) {
        if (item.children) {
          item.children = filterMenu(item.children)
        }

        if (menuIds && menuIds.includes(item.id)) {
          newMenu.push(item)
        }
      }
      return newMenu
    }

    const finalMenu = filterMenu(wholeMenu)

    return finalMenu
  }
}

export default new roleService();
