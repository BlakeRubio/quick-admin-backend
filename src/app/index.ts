import Koa from 'koa'
import userRouter from "../router/user"
import loginRouter from '../router/login'
const bodyParser = require('koa-bodyparser')

// 实例化 Koa
const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

export default app