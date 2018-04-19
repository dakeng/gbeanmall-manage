//var express = require('express');
import express from 'express';
import { generateResData, accSub } from './../../common/utils';
import jwt from 'jsonwebtoken';
import config from './../../config';
import Cart from './../../model/cart';
import Order from './../../model/order';
import User from './../../model/user';
import Commodity from './../../model/commodity';
import orderControler from './controler/orderControler';
let router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //console.log(token);
    if (token !== null && token !== '') {      
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, config.cert, function(err, decoded) {      
            if (err) {
                return res.json(generateResData({msg: 'token不合法'}, 0));
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                //console.log(decoded)  ;
                next(); //继续下一步路由
            }
        });
      } else {
        // 没有拿到token 返回错误 
        return res.json(generateResData({msg: '未登录'}, 0));
      }
    });

    /* router.get('/', function(req, res, next){
        console.log(req);
        orderControler.get(req, res, next);
    }); */

    router.post('/', function(req, res, next) {
        console.log(req.body);
        let user_id = req.decoded.userId;
        let commodity_ids = req.body.commodity_ids;
        let commoditys = [];
        let realPayment = 0;
        /* for(let i = 0; i < commodity_ids.length; i++){
            Commodity.findById(commodity_ids[i], (err, result) => {
                if(result){
                    console.log(result);
                    commoditys.push(result);
                    realPayment += result.commodity_price;
                }
            })
        } */
        Promise.all(commodity_ids.map((id, index) => {return Commodity.findById(id).exec()}))
            .then(result => {
                //console.log('result', result);
                commoditys = result;
                result.map((item, index) => {
                    realPayment += item.commodity_price;
                })
                //console.log(commoditys, realPayment);
                //生成订单
                //查询用户余额是否充足
                //充足则扣除余额，修改订单状态为已付款
                //不足则提示用户去做任务赚取更多的金豆
                Order.create({
                    user_id: user_id,
                    commoditys: commoditys,
                    realPayment: realPayment,//实付款
                    addressee: req.body.addressee,//收件人
                    phone: req.body.phone,//手机号码
                    address: req.body.address,//收件地址
                    state: 0,//未付款
                }).then(order => {
                    console.log(order);
                    User.findById(user_id, (err, user) => {
                        if(user){
                            console.log(user);
                            if(user.wallet >= realPayment){
                                user.wallet = accSub(user.wallet, realPayment);
                                user.save((err, updateUser) => {
                                    if(err){
                                        res.json(err);
                                        next();
                                        return;
                                    }else{
                                        order.state = 1;
                                        let userData = {
                                            username: user.username,
                                            wallet: user.wallet,
                                        };
                                        delete userData.password;
                                        order.save((err, updateOrder) => {
                                            updateOrder.user_id = null;
                                            let resData = generateResData({msg: '付款成功', userData: userData, order: updateOrder});
                                            console.log(resData);
                                            res.json(resData);
                                        })
                                    }
                                })
                            }else{
                                res.json(generateResData({msg: '您的账户余额不足'},0));
                            }
                        }
                    });
                })
            }).catch(error => {
                res.json(error);
                next(error);
                return ;
            });
    });

module.exports = router;