//var express = require('express');
import express from 'express';
import Task from './../../model/task';

import { generateResData } from './../../common/utils';

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('获取任务列表');
    Task.find({}, (err, tasks)=> {
        if(err){
            res.json(generateResData(err, 0));
            next(err);
        }else{
            res.json(generateResData(tasks));
        }
    })
});

router.post('/', function(req, res, next){
    console.log(req.body);
    Task.create(req.body.data, (err, docs) => {
        if(err){
            res.json(generateResData(err, 0));
            next(err);
        }else{
            console.log('成功');
            res.json(generateResData({msg: '成功', data: docs}));
        }
    });
})

//export {router};
module.exports = router;