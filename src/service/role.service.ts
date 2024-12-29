import connection from "../app/database";

class roleService {
  async create(role) {
    const statement = "INSERT INTO role SET ?";
    const [result] = await connection.query(statement, [role]);

    return result;
  }

  async list(page = 0, pageSize = 10) {
    const statement = `SELECT * FROM role LIMIT ?, ?;`;
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
}

export default new roleService();
