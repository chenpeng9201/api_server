const express = require('express');

// 创建实例
const app = express();

// 导入跨域中间件
const cors = require('cors');

// 导入用户模块
const userRouter = require('./router/user');

// 导入用户基本信息模块
const userinfoRouter = require('./router/userinfo');

// 导入文章分类模块
const articleCate = require('./router/artcate');

// 导入表单校验规则中间件
const joi = require('joi');

// 导入配置文件
const config = require('./config/config');

// 解析 token 的中间件
const expressJWT = require('express-jwt');


// 注册跨域中间件
app.use(cors());

// 注册解析表单数据中间件
app.use(express.urlencoded({ extended: false }));

// 注册全局中间件，挂载res.cc函数，调用res.send()
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({ status: status, message: err instanceof Error ? err.message : err });
    }
    next();
});

// 使用token中间件进行解析验证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));
// 注册用户路由模块
app.use('/api', userRouter.router);

// 注册用户信息路由模块
app.use('/my', userinfoRouter);

// 注册文章分类路由模块
app.use('/my/article', articleCate);

// 定义全局错误捕获中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err);

    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
    // 未知错误
    res.cc(err);
});
// 启动实例
app.listen('80', () => {
    console.log('api server running at http://127.0.0.1:80')
});