// 导入db模块操作数据库
const db = require('../db/index');

// 导入加密模块
const bcrypt = require('bcryptjs');

// 用户基本信息处理函数模块
module.exports.getUserinfo = (req, res) => {
    const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=? `;
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err);

        if (results.length !== 1) return res.cc('获取用户信息失败！');

        res.send({ status: 0, message: '获取用户信息成功！', data: results[0] });
    });
    // res.send('ok!!');
}

// 更新用户信息处理函数
module.exports.updateUserinfo = (req, res) => {
    const sqlStr = `update ev_users set ? where id=? `;
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);

        if (results.affectedRows !== 1) {
            return res.cc({
                status: 1,
                message: '更新用户信息失败！'
            });
        }

        res.cc({
            status: 0,
            message: '更新用户信息成功！'
        })
    });
}

// 重置密码处理函数
module.exports.updatepwd = (req, res) => {
    // 判断用户是否存在
    const sqlStr = `select * from ev_users where id=? `;
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在！');

        // todo:判断旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('旧密码错误！');

        // 对新密码进行 bcrypt 加密之后，更新到数据库中：
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        const sqlStr = `update ev_users set password=? where id=? `;
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err);

            if (results.affectedRows !== 1) return res.cc('更新密码失败！');

            res.send({ status: 0, message: '重置密码成功！' });
        });
    });
}

// 更换头像处理函数
module.exports.updateAvatar = (req, res) => {
    // res.send('ava ok!');
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新用户头像失败');

        res.cc('更新用户头像成功', 0);
    });
}