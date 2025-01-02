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


// 定义 content 验证规则
const MomentSchema = Joi.object({
  content: Joi.string()
  .min(3)
  .max(1500)
  .required()
  .messages({
    'string.min': '动态内容必须至少包含 {{#limit}} 个字符',
    'string.max': '动态内容不能超过 {{#limit}} 个字符',
    'string.empty': '动态内容不能为空',
    'any.required': '动态内容是必填项'
  }),
});

// 定义标签 label 验证规则
const labelSchema = Joi.object({
  name: Joi.string()
  .min(2)
  .max(15)
  .required()
  .messages({
    'string.min': '标签名必须至少包含 {{#limit}} 个字符',
    'string.max': '标签名不能超过 {{#limit}} 个字符',
    'string.empty': '标签名不能为空',
    'any.required': '标签名是必填项'
  }),
})

// 定义 comment 验证规则
const CommentSchema = Joi.object({
  content: Joi.string()
  .min(3)
  .max(1500)
  .required()
  .messages({
    'string.min': '评论内容必须至少包含 {{#limit}} 个字符',
    'string.max': '评论内容不能超过 {{#limit}} 个字符',
    'string.empty': '评论内容不能为空'
  }),
  momentId: Joi.string()
  .required()
  .messages({
    'string.empty': '动态ID不能为空'
  }),  
});
// 定义 reply 验证规则
const ReplySchema = Joi.object({
  content: Joi.string()
  .min(3)
  .max(1500)
  .required()
  .messages({
    'string.min': '评论内容必须至少包含 {{#limit}} 个字符',
    'string.max': '评论内容不能超过 {{#limit}} 个字符',
    'string.empty': '评论内容不能为空'
  }),
  momentId: Joi.string()
  .required()
  .messages({
    'string.empty': '动态ID不能为空'
  }),  
  commentId: Joi.string()
  .required()
  .messages({
    'string.empty': '回复的评论ID不能为空'
  }),  
});

export { UserSchema, MomentSchema, labelSchema, CommentSchema, ReplySchema }