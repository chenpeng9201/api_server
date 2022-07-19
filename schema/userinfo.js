// 用户信息更新接口验证规则对象
const joi = require('joi');

const id = joi.number().integer().min(1).required();

const nickname = joi.string().required();

const user_email = joi.string().email().required();

const password = joi.string().required().pattern(/^[\S]{6,12}/);

// 封装规则对象
const update_userinfo_schema = {
    body: {
        id: id,
        nickname: nickname,
        email: user_email
    }
}

// 重置密码校验规则
const updatepwd_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 更换头像校验规则
const update_avatar_schema = {
    body: {
        avatar: joi.string().dataUri().required()
    }
}

// 对外暴露规则对象
module.exports.update_userinfo_schema = update_userinfo_schema;
module.exports.updatepwd_schema = updatepwd_schema;
module.exports.update_avatar_schema = update_avatar_schema;