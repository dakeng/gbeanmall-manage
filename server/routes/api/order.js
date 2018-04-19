//var express = require('express');
import express from 'express';
import { generateResData } from './../../common/utils';
import jwt from 'jsonwebtoken';
import config from './../../config';
import Cart from './../../model/cart';
import orderControler from './controler/orderControler';
let router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (token !== null && token !== '') {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, config.cert, function(err, decoded) {      
            if (err) {
                return res.json(generateResData({msg: 'token不合法'}, 0));
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                console.log(decoded)  ;
                next(); //继续下一步路由
            }
        });
      } else {
        // 没有拿到token 返回错误 
        return res.json(generateResData({msg: '未登录'}, 0));
      }
    });

    router.get('/', function(req, res, next){
        console.log(req);
        orderControler.get(req, res, next);
    });

    router.post('/', function(req, res, next) {
        console.log(req);
        switch(req.body.operate){
            //生成订单
            case 1:
                orderControler.create(req, res, next);
            break;
            //删除订单
            case 2:
                orderControler.delete(req, res, next);
            break;
            default:
                res.json(generateResData({msg: 'operate不正确'}, 0));
            break;
        }
    });

module.exports = router;