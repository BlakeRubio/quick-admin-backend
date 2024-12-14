import Koa from 'koa'
import registerRouters from '../router'
const bodyParser = require('koa-bodyparser')

// 实例化 Koa
const app = new Koa()

app.use(bodyParser())

// 批量注册路由
registerRouters(app)
export default app