// 文章分类路由模块
const express = require('express');

const router = express.Router();

// 导入处理函数模块
const artcate_handler = require('../router_handler/artcate');

router.get('/cates', artcate_handler.getArticleCates);

// 对外暴露路由
module.exports = router;