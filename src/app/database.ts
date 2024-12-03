import * as mysql from 'mysql2';

// 创建数据库连接池
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'quick-admin',
    connectionLimit: 10
})

// 获取是否连接成功
connectionPool.getConnection((err, connection) => {
    if (err) {
        console.log('获取连接失败' + err);
        return;
    }
    
    // 尝试建立连接
    connection.connect(err => {
        if (err) {
            console.log('数据库连接失败' + err);
            return;
        }
    });
    console.log('数据库连接成功~');
})

// 获取连接池中的连接对象
const connection = connectionPool.promise();

export default connection;