import { CODE_TYPE_IS_REQUIRED, CODE_IS_TYPE_INCORRECT } from "../constants/error";

const svgCaptcha = require("svg-captcha");

export const createCaptcha = async (ctx, next) => {
  const { type } = ctx.query;

  if (!type) return ctx.app.emit("error", CODE_TYPE_IS_REQUIRED, ctx);

  if (!['login', 'register'].includes(type)) {
    return ctx.app.emit("error", CODE_IS_TYPE_INCORRECT, ctx);
  }

  const config = { size: 5, background: "#409EFF" };
  const captcha = svgCaptcha.create(config);
  const base64Image = `data:image/svg+xml;base64,${Buffer.from(
    captcha.data
  ).toString("base64")}`;

  ctx.body = {
    code: 0,
    text: captcha.text,
    message: "生成验证码成功~",
    data: base64Image,
  };
  
  // 把验证码保存到全局对象里
  if (type === "login") global.loginCaptcha = captcha.text;
  if (type === "register") global.registerCaptcha = captcha.text;

};
