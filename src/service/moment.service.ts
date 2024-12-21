import connection from "../app/database";

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
    const [result] = await connection.execute(statement, [content, userId]);

    return result;
  }

  async getMomentList(page = 0, pageSize = 10) {
    const statement = `
        SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [
      String(page),
      String(pageSize),
    ]);

    return result;
  }

  async getMomentById(id) {
    const statement = `
        SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user
        FROM moment m
        LEFT JOIN user u ON u.id = m.user_id
        WHERE m.id = ?;
    `;
    const [result] = await connection.execute(statement, [id]);

    return result
  }

  async updateMomentById(content, id) {
    const statement = `
        UPDATE moment SET content = ? WHERE id= ?;`
    const [result] = await connection.execute(statement, [content, id])
  
    return result
  }
  async removeMomentById(id) {
    const statement = `
        DELETE FROM moment WHERE id= ?;`
    const [result] = await connection.execute(statement, [id])
  
    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result]: any = await connection.execute(statement, [momentId, labelId])
  
    return !!result.length
  }

  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
  
    return result
  }
}

export default new MomentService();
