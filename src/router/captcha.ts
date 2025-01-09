const KoaRouter = require('@koa/router')
const svgCaptcha = require('svg-captcha');
const captchaRouter = new KoaRouter({
    prefix: '/captcha'
})

// 生成登录验证码
captchaRouter.get('/', (ctx) => {
    const captcha = svgCaptcha.create();
    const base64Image = `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`
    ctx.body = {
        code: 0,
        text: captcha.text,
        message: "生成验证码成功~", 
        data: base64Image
    }

    // 把验证码保存到全局对象里
    global.captcha = captcha.text
})

export default captchaRouter