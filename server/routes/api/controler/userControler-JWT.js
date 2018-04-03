import User from './../../../model/user';
import { generateResData } from './../../../common/utils';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from './../../../config';

const userControler = {
    signIn(req, res, next){
        let user = new User(req.body.user);
        let md5 = crypto.createHash("md5");
        //对密码进行md5加密
        let encryptPassword = md5.update(user.password).digest("hex");
        //查找用户
        User.findOne({username: user.username, password: encryptPassword}).exec()
            .then((result) => {
                console.log('result', result);
                if(result){
                    let _token = jwt.sign({userId: result._id}, config.cert, {expiresIn: '1d'});
                    res.json(generateResData({
                        msg: "登录成功",
                        userData: {
                            username: result.username,
                        },
                        token: _token
                    }));
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
        return res.json(generateResData({
            msg: "退出成功",
            userData: '',
            token: ''
        }));;
    }
}

export default userControler;