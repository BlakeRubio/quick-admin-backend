import * as crypto from 'crypto'

// 使用 md5 加密算法进行加密
const md5password = (password: string) => {
    const md5 = crypto.createHash('md5')
    const md5pwd = md5.update(password).digest('hex')
    return md5pwd
}


export default md5password