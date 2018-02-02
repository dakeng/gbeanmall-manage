//var express = require('express');
import express from 'express';
import Commodity from './../../model/commodity';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Commodity.find({},function(err, commoditys){
        if(err){
            res.send(err);
        }else{
            res.json(commoditys);
        }
    });
});

router.post('/', function(req, res, next){
    console.log('录入商品');
    console.log(req.body);
    let commodityName = req.body.commodityName;
    let commodityPrice = req.body.commodityPrice;
    let commoditySpecification = req.body.commoditySpecification;
    Commodity.create({
        commodity_name: commodityName,//商品名称
        commodity_price: commodityPrice,//商品价格
        commodity_specification: commoditySpecification
    }, function(err){
        if(err){
            console.log(err);
            return next(err);
        }else{
            console.log('成功');
            res.json({msg: '成功'});
        }
    })
})

//export {router};
module.exports = router;