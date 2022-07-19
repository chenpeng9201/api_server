// 用户信息路由模块
const express = require('express');

const route = express.Router();

// 导入规则验证中间件
const expressJoi = require('@escook/express-joi');

// 导入验证规则对象模块
const { update_userinfo_schema, updatepwd_schema, update_avatar_schema } = require('../schema/userinfo');

// 导入处理函数模块
const userinfoHandler = require('../router_handler/userinfo');

// 获取用户基本信息
route.get('/userinfo', userinfoHandler.getUserinfo);

// 更新用户基本信息
route.post('/userinfo', expressJoi(update_userinfo_schema), userinfoHandler.updateUserinfo);

//重置用户密码
route.post('/updatepwd', expressJoi(updatepwd_schema), userinfoHandler.updatepwd);

// 更换用户头像
route.post('/update/avatar', expressJoi(update_avatar_schema), userinfoHandler.updateAvatar);
// 对外暴露路由
module.exports = route;