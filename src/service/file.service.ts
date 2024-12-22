import connection from "../app/database"

class fileService {
    async create(filename, size, mimetype, id) {
        const statement = 'INSERT INTO avatar (filename, size, mimetype, user_id) VALUES (?, ?, ?, ?)'
        const [result] = await connection.execute(statement, [filename, size, mimetype, id])

        return result
    }
}


export default new fileService()