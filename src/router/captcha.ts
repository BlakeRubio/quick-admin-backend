import { createCaptcha } from "../middlewares/captcha.middleware";

const KoaRouter = require('@koa/router')
const captchaRouter = new KoaRouter({
    prefix: '/captcha'
})

// 生成验证码
captchaRouter.get('/', createCaptcha)

export default captchaRouter