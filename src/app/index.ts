import Koa from 'koa'
import userRoute from "../router/user"
const bodyParser = require('koa-bodyparser')

// 实例化 Koa
const app = new Koa()

app.use(bodyParser())
app.use(userRoute.routes())
app.use(userRoute.allowedMethods())

export default app