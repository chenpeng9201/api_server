const express = require('express');

// 创建实例
const app = express();

// 导入跨域中间件
const cors = require('cors');

// 导入用户模块
const userRouter = require('./router/user');

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
// 注册用户路由模块
app.use('/api', userRouter.router);

// 启动实例
app.listen('3007', () => {
    console.log('api server running at http://127.0.0.1:3007')
});