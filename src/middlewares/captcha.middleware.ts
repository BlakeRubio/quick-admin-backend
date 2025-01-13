import { CODE_TYPE_IS_REQUIRED, CODE_IS_TYPE_INCORRECT, PHONE_IS_REQUIRED, PHONE_IS_INCORRECT } from "../constants/error";
import { generateRandomCode } from '../utils/helper'

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


export const createCaptchaByPhone = async (ctx, next) => {
  const { phone } = ctx.query;
  if (!phone) return ctx.app.emit("error", PHONE_IS_REQUIRED, ctx);

  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
    return ctx.app.emit("error", PHONE_IS_INCORRECT, ctx);
  }

  const captchaCode = generateRandomCode();

  ctx.body = {
    code: 0,
    message: "验证码生成成功~",
    data: captchaCode,
  };

  // 把验证码保存到全局对象里
  global.phoneCaptcha = captchaCode;
}