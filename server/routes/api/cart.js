//var express = require('express');
import express from 'express';
import { generateResData } from './../../common/utils';
import jwt from 'jsonwebtoken';
import config from './../../config';
import Cart from './../../model/cart';
import cartControler from './controler/cartControler';
let router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, config.cert, function(err, decoded) {      
            if (err) {
                return res.json(generateResData({msg: 'token已失效'}, 0));
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                console.log(decoded)  ;
                next(); //继续下一步路由
            }
        });
      } else {
        // 没有拿到token 返回错误 
        return res.status(403).send(generateResData({msg: '未登录'}, 0));
      }
    });

    router.get('/', function(req, res, next){
        console.log(req);
        cartControler.get(req, res, next);
    })

    router.post('/', function(req, res, next) {
        console.log(req);
        switch(req.body.operate){
            //加入购物车
            case 1:
                cartControler.add(req, res, next);
            break;
            case 2:
                cartControler.delete(req, res, next);
            break;
            default:
                res.json(generateResData({msg: 'operate不正确'}, 0));
            break;
        }
    })

/* router.get('/', function(req, res, next) {
    console.log('获取购物车');
    commodityControler.find(req, res, next);
    //res.json(req.query);
});

router.post('/', function(req, res, next){
    console.log(req.body);
    switch(req.body.operate){
        case 1:
            commodityControler.create(req, res, next);
        break;
        case 2:
            commodityControler.del(req, res, next);
        break;
        case 3:
            commodityControler.search(req, res, next);
        break;
        case 4:
            commodityControler.modify(req, res, next);
        break;
        default:
            res.json(generateResData({msg: 'operate不正确'}, 0));
        break;
    }
}) */

//export {router};
module.exports = router;