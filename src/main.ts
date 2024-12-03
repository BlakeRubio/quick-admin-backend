import Koa from 'koa'
/** 必须使用 COMMONJS 导入,否则会有错误 */
const KoaRouter = require('@koa/router')


// 实例化 Koa
const app = new Koa()

// 路由实例测试
const userRoute = new KoaRouter({
    prefix: '/user'
});
userRoute.get('/info', (ctx) => {
    ctx.body = {
        userInfo: 'user info'
    }
})

app.use(userRoute.routes())
app.use(userRoute.allowedMethods())

// 测试后台服务是否开启 
app.use((ctx) => {
    ctx.body = 'Hello World!'
    ctx.status = 200
})

// 开启 Koa 服务
app.listen(3000, () => {
    console.log('The quick-admin-backend is running on port 3000~');
})