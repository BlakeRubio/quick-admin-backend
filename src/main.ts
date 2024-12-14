import config from "./config";
import app from "./app";

// 确保错误能有效被执行
require('./utils/handle-error')

// 开启 Koa 服务
app.listen(config.port, () => {
    console.log(`The quick-admin-backend is running on port ${config.port}~`);
})