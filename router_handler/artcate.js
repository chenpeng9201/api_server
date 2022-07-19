// 文章分类处理函数模块
const db = require('../db/index');

// 获取文章分类列表
const getArticleCates = (req, res) => {
    // res.send('art ok');
    const sql = `select * from ev_article_cate where is_delete = 0 `;
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);

        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: results
        });
    });
}

module.exports.getArticleCates = getArticleCates