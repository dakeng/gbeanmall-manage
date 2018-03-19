import User from './../../../model/user';
import { generateResData } from './../../../common/utils';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userControler = {
    signIn(req, res, next){
        console.log('Authentication', req.get('Authentication'));
        let user = new User(req.body.user);
        let md5 = crypto.createHash("md5");
        let encryptPassword = md5.update(user.password).digest("hex");

        User.findOne({username: user.username, password: encryptPassword}).exec()
            .then((result) => {
                //console.log('result', result);
                if(result){

                }else{
                    res.json(generateResData({msg: "无效的用户名或密码"}, 0));
                }
                return ;
            })
            .catch((err) => {
                res.json(err);
                next(err);
                return ;
            });
    },
    signUp(req, res, next){
        let user = new User(req.body.user);
        let md5 = crypto.createHash("md5");
        let encryptPassword = md5.update(user.password).digest("hex");

        User.find({username: user.username}).exec()
            .then((result) => {
                console.log(result);
                if(result.length > 0){
                    res.json(generateResData({msg: "用户名已存在"}, 0));
                    return ;
                }else{
                    User.create({username: user.username, password: encryptPassword})
                        .then((result) => {
                            res.json(generateResData({msg: '注册成功'}));
                            return ;
                        })
                }
            })
            .catch((err) => {
                res.json(err);
                next(err);
                return ;
            });
    },
    signOut(req, res, next){
        
        return ;
    }
}

export default userControler;