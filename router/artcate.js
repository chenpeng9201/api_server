// 文章分类路由模块
const express = require('express');

const router = express.Router();

// 导入规则验证模块
const expressJoi = require('@escook/express-joi');
// 导入校验规则模块
const { addArtCate, delArtCate, qryArtCate } = require('../schema/artCate');
// 导入处理函数模块
const artcate_handler = require('../router_handler/artcate');


// 获取文章分类列表
router.get('/cates', artcate_handler.getArticleCates);

// 新增文章分类
router.post('/addcates', expressJoi(addArtCate), artcate_handler.addArticleCates);

// 根据id删除文章分类
router.get('/deletecate/:id', expressJoi(delArtCate), artcate_handler.delArticleCates);

// 根据id查询文章
router.get('/cates/:id', expressJoi(qryArtCate), artcate_handler.qryArticleCates)
    // 对外暴露路由
module.exports = router;