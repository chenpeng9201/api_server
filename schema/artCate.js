const joi = require('joi');

// 定义校验规则对象
const name = joi.string().required();

const alias = joi.string().alphanum().required();

const id = joi.number().integer().min(1).required();

const addArtCate = {
    body: {
        name,
        alias
    }
}

const delArtCate = {
    params: {
        id
    }
}

const qryArtCate = {
    params: {
        id
    }
}

const updArtCate = {
        body: {
            Id: id,
            name,
            alias
        }
    }
    // 对外暴露规则对象
module.exports.addArtCate = addArtCate;
module.exports.delArtCate = delArtCate;
module.exports.qryArtCate = qryArtCate;
module.exports.updArtCate = updArtCate;