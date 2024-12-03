/** 必须使用 COMMONJS 导入,否则会有错误 */
const KoaRouter = require('@koa/router')

// 路由实例测试
const userRoute = new KoaRouter({
    prefix: '/user'
});
userRoute.get('/info', (ctx) => {
    ctx.body = {
        userInfo: 'user info'
    }
})

export default userRoute