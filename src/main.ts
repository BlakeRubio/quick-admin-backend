import config from "./config";
import app from "./app";
const InitSwagger = require('./app/swagger')

// 确保错误能有效被执行
require('./utils/handle-error')

new InitSwagger(app)

// 开启 Koa 服务
app.listen(config.port, () => {
    console.log(`🚀 The server is running on the network \n ${config.host}:${config.port}\n`,
        `${config.host}:${config.port}/api/docs`
    );
})
