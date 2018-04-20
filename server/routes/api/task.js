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
            res.json(generateResData({msg: '获取成功', data: tasks}));
        }
    })
});

router.post('/', function(req, res, next){
    console.log(req.body);
    switch(req.body.operate){
        case 1: 
        //创建任务
            Task.create(req.body.data, (err, docs) => {
                if(err){
                    res.json(generateResData(err, 0));
                    next(err);
                }else{
                    console.log('成功');
                    res.json(generateResData({msg: '成功', data: docs}));
                }
            });
            break;
        case 2: 
            //删除任务
            Task.find().remove({_id: req.body.data._id}, (err, docs) => {
                if(err){
                    res.json(generateResData(err, 0));
                    next(err);
                }else{
                    res.json(generateResData({msg: '已删除', data: []}));
                }
            })
            break;
        default:
            res.json(generateResData({msg: '传入数据有误'}, 0))
    }
})

//export {router};
module.exports = router;