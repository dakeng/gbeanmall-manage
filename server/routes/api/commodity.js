//var express = require('express');
import express from 'express';
import Commodity from './../../model/commodity';
import commodityControler from './controler/commodityControler';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('获取商品列表');
    commodityControler.find(req, res, next);
});

router.post('/', function(req, res, next){
    console.log('录入商品');
    //console.log(req.body);
    commodityControler.create(req, res, next);
})

//export {router};
module.exports = router;