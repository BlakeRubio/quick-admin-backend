import connection from "../app/database";

class UserService {
    // 创建一个用户
    async create(user) {
        const { name, password } = user

        // 预处理 SQL 语句
        const statement = 'INSERT INTO user (name, password) VALUES (?, ?)'

        // 执行 SQL 语句
        const [ result ] = await connection.execute(statement, [name, password]);
        return result
    }
    
    // 根据用户名查找用户
    async findUserByName(name) {
        const statement = 'SELECT * FROM user WHERE name = ?'
       const [ values ] = await connection.execute(statement, [name])
       return values
    }

    // 根据用户 id 查找用户
    async findUserById(id) {
        const statement = 'SELECT * FROM user WHERE id = ?'
       const [ values ] = await connection.execute(statement, [id])
       return values
    }
}

export default new UserService();