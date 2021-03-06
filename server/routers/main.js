var express = require('express');
var router = express.Router();
var path = require('path');
var userModel = require('../modules/User.js');

router.get('/*', function(req, res, next) {
    console.log('req', req);
    console.log('req.session', req.session);

    // 判断session内用户信息，如果有用户名和用户密码则说明已登录
    var isLogined = req.session.userInfo && req.session.userInfo.userName && req.session.userInfo.password && req.cookies.userName;
    if (isLogined) {
        res.render('index', {
            isProduction: 'development',
            isLogined: isLogined
        });
    } else {
        req.session.destroy();
        res.clearCookie();
        res.render('index', {
            isProduction: 'development',
            isLogined: isLogined
        });
    }
});

module.exports = router;