import Koa from 'koa'

// 实例化 Koa
const app = new Koa()

// 开启 Koa 服务
app.listen(3000, () => {
    console.log('quick-admin-backend is running on port 3000~');
})