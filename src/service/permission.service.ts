import connection from "../app/database"

class permissionService {
    async checkMoment(momentId, userId) {
        const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?`
        const [ result ]: any  = await connection.execute(statement, [momentId, userId])
        
        return !!result.length
    }

    // 检查是否有删除某类资源的权限
    async checkResource(resourceName, resourceId, userId) {
        const statement = `SELECT * FROM ${ resourceName } WHERE id = ? AND user_id = ?`
        const [ result ]: any  = await connection.execute(statement, [resourceId, userId])
        
        return !!result.length
    }
}


export default new permissionService()