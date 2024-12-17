import connection from "../app/database"

class commentService {
    async create(content, momentId, userId) {
        const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
        const result = await connection.execute(statement, [content, momentId, userId])

        return result
    }
    async reply(content, momentId, commentId, userId) {
        const statement = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?);`
        const result = await connection.execute(statement, [content, momentId, commentId, userId])

        return result
    }
}


export default new commentService()