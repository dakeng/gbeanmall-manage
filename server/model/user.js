'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    user_id: String,//生成用户id
    username: String,//用户名
    password: String,//密码
    head_portrait: String,//头像，url
    wallet: Number,//金豆
});

let User = mongoose.model('User', userSchema);

export default User;