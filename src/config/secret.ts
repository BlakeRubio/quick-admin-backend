import * as fs from 'fs'
import * as path from 'path'

// 读取公钥和私钥
export const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.pem'), 'utf-8')
export const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.pem'), 'utf-8')