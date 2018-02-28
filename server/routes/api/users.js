//var express = require('express');
import express from 'express';
import crypto from 'crypto';
//import User from './../../model/user';
import userControler from './controler/userControler';

let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  //console.log(req.body)
  if(req.body.operate === 1){
    //登录
    userControler.signIn(req, res, next);
  }else if(req.body.operate === 0){
    //注册
    userControler.signUp(req, res, next);
  }
});
module.exports = router;
