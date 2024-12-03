import connection from "../app/database";

class UserService {
    async create(user) {
        const { name, password } = user

        // 预处理 SQL 语句
        const statement = 'INSERT INTO user (name, password) VALUES (?, ?)'

        // 执行 SQL 语句
        const [ result ] = await connection.execute(statement, [name, password]);
        return result
    }
}

export default new UserService();