'use strict';

import mongoose from './../db';

const Schema = mongoose.Schema;

let adminSchema = mongoose.Schema({
    account: String,
    name: String,
    paassword: String,
});

let admin = mongoose.model('admin', adminSchema);

let renderLogin = (username, paassword, callback) => {
    console.log('renderLogin');
    var info = null;
    if(username === 'false'){
        info = {
            success: false,
            msg: '用户名不存在'
        };
    }
    if(paassword === 'false'){
        info = {
            success: false,
            msg: '密码错误'
        };
    }
    callback(info);
    console.log('回调')
};

let checkAdmin = (username, password, callback) => {
    admin.find({account: username}, function(err, result){
        if(err){
            console.log(err);
        }
        if(result.length === 0){
            callback('/login?username=false')
        }else{
            if(password === result[0].password){
                callback('/')
            }else{
                callback('/login?password=false')
            }
        }
    })
}

let modelLogin = {
    renderLogin: renderLogin,
    checkAdmin: checkAdmin
}

export default modelLogin;