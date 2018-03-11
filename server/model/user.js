'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    user_id: String,//生成用户id
    username: String,//用户名，用户无输入默认随机生成
    password: String,//密码
    head_portrait: String//头像，url
});

let User = mongoose.model('User', userSchema);

export default User;