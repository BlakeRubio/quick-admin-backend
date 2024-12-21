import connection from "../app/database"

class labelService {
    async create(name) {
        const statement = "INSERT INTO label (name) VALUES (?)";

        const [result] = await connection.execute(statement, [name])

        return result
    }

    async list(page = 0, pageSize = 10) {
        const statement = `SELECT * FROM label LIMIT ?, ?;`;
        const [result] = await connection.execute(statement, [
          String(page),
          String(pageSize),
        ]);
    
        return result;
      }

    async queryLabelByName(name) {
        const statement = `SELECT * FROM label WHERE name = ?;`;
        const [result] = await connection.execute(statement, [name]);
    
        return result;
      }
    
}


export default new labelService()