import { createCaptcha, createCaptchaByPhone } from "../middlewares/captcha.middleware";

const KoaRouter = require('@koa/router')
const captchaRouter = new KoaRouter({
    prefix: '/captcha'
})

// 生成验证码
captchaRouter.get('/', createCaptcha)

// 获取手机号验证码
captchaRouter.get('/phone', createCaptchaByPhone)

export default captchaRouter