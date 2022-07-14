// 导入db模块
const db = require('../db/index');
// 导入加密模块
const bcrypt = require('bcryptjs')

// 用户注册功能
module.exports.regUser = (req, res) => {
    const userinfo = req.body;
    // console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        // return res.send({ status: 1, message: '用户名或密码不能为空' });
        return res.cc('用户名或密码不能为空');
    }

    // 校验用户名是否存在
    var sql = 'select * from ev_users where username = ?';
    db.query(sql, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message });
            return res.cc(err);
        }
        // 用户名被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名已存在，请更换用户名！' });
            return res.cc('用户名已存在，请更换用户名！');
        }
        // 用户名可用，开始注册流程
        // 对密码进行加密处理
        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        // 定义插入sql
        sql = 'insert into ev_users set ?';
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) {
                // return res.send({ status: 1, message: err.message });
                return res.cc(err);
            }
            // sql语句执行成功，但影响行数不是1，说明插入有异常
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            //注册成功
            // res.send({ status: 0, message: '注册成功' });
            return res.cc('注册成功', 0);
        });

    });
    // res.send('reg ok!');
}

module.exports.login = (req, res) => {
    res.send('login ok!');
}