// 引入jsonwebtoken
const JWT = require('jsonwebtoken');

// 自定义生成token的密钥(随意定义的字符串)
// 就其安全性而言，不能暴露给前端，不然就可以随意拿到token
const JWT_SECRET = 'system-user-token';

// 从ctx中解析authorization
exports.parseAuth = ctx => {
    if (!ctx || !ctx.header.authorization) return null;
    const parts = ctx.header.authorization.split(' ');
    if (parts.length < 2) return null;
    return parts[1];
}

// 解析JWT Token
exports.decodeToken = (token) => {
    return JWT.decode(token);
};


// 生成JWT Token
// 同时可以设置过期时间
exports.createToken = (config = {}, expiresIn = '7 days') => {
    const {
        userName,
        _id
    } = config;
    const options = {
        userName,
        _id
    };
    const custom = {
        expiresIn
    };
    // 通过配置参数，然后调用JWT.sign方法就会生成token
    return JWT.sign(options, JWT_SECRET, custom);
};

// 暴露出密钥
// 这里将密钥暴露出去是为了后面验证的时候会用到
// 为了统一，不用处处写'system-user-token'这个字符串而已
exports.JWT_SECRET = JWT_SECRET;