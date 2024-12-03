import * as Joi from "joi";

// 定义 user 验证规则
const UserSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(30)
  .required()
  .messages({
    'string.min': '用户名必须至少包含 {{#limit}} 个字符',
    'string.max': '用户名不能超过 {{#limit}} 个字符',
    'string.empty': '用户名不能为空',
    'any.required': '用户名是必填项'
  }),
  password: Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required()
  .messages({
    'string.pattern': '密码的格式不正确，请重新输入',
    'string.max': '密码不能超过 {{#limit}} 个字符',
    'string.empty': '密码不能为空',
    'any.required': '密码是必填项'
  }),
  repeat_password: Joi.ref("password"),
});


export default UserSchema