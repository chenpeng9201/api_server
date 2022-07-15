// 用户校验规则
const joi = require('joi');

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
// 用户名校验
const username = joi.string().alphanum().min(1).max(10).required();
// 密码校验
const password = joi.string().required().pattern(/^[\S]{6,12}/);

// 注册和登录表单的验证规则对象对外导出
module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}