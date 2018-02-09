//var express = require('express');
import express from 'express';
import Commodity from './../../model/commodity';
import commodityControler from './controler/commodityControler';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('获取商品列表');
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
        default:
            res.json(commodityControler.generateResData({msg: 'operate不正确'}, 0));
        break;
    }
})

//export {router};
module.exports = router;