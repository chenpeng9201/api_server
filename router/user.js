// 用户路由模块
const express = require('express');

// 创建路由对象
const router = express.Router();

// 导入路由处理函数模块
const router_handler = require('../router_handler/user');

// 注册新用户
router.post('/reguser', router_handler.regUser);

// 登录
router.post('/login', router_handler.login);

// 将路由对象导出
module.exports = { router }