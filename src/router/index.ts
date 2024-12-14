const fs = require("fs");

// 批量注册路由
function registerRouters(app) {
  // 读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname);
  for (const file of files) {

    if (file === "index.ts") continue;

    import(`./${file}`).then(async (res) => {

      const router = await res.default;
      app.use(router.routes());
      app.use(router.allowedMethods());
    });
  }
}

export default registerRouters;
