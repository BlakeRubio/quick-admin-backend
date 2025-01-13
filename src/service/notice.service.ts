import connection from "../app/database"

class noticeService {
    async create(id) {
        const statement = 'statement '
        const result = await connection.execute(statement, [id])

        return result
    }

    async details(id) {
        const statement = 'SELECT * FROM notice WHERE id = ?'
        const [result] = await connection.execute(statement, [id])

        return result
    }
    async list() {
        const statement = 'SELECT * FROM notice'
        const [result] = await connection.execute(statement)

        return result
    }
}


export default new noticeService()