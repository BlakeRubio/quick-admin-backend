import Koa from 'koa'
import userRoute from "./router/user"
import config from "./config";

// 实例化 Koa
const app = new Koa()

app.use(userRoute.routes())
app.use(userRoute.allowedMethods())

// 测试后台服务是否开启 
app.use((ctx) => {
    ctx.body = 'Hello World!'
    ctx.status = 200
})

// 开启 Koa 服务
app.listen(config.port, () => {
    console.log(`The quick-admin-backend is running on port ${config.port}~`);
})