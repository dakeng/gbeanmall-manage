import User from './../../../model/User';
import { generateResData } from './../../../common/utils';
import crypto from 'crypto';

const userControler = {
    signIn(req, res, next){
        let username = req.body.user.username;
        let password = req.body.user.password;
        let md5 = crypto.createHash("md5");
        let encryptPassword = md5.update(password).digest("hex");

        User.find({name: username}).exec()
            .then((result) => {
                console.log(result);
                if(result.length > 0){
                    if(result[0].password === encryptPassword){
                        res.json(generateResData({msg: "登录成功"}));
                        return ;
                    }
                }
                res.json(generateResData({msg: "无效的用户名或密码"}, 0));
                return ;
            })
            .catch((err) => {
                res.json(err);
                next(err);
                return ;
            });
    },
    signUp(req, res, next){
        let username = req.body.user.username;
        let password = req.body.user.password;
        let md5 = crypto.createHash("md5");
        let encryptPassword = md5.update(password).digest("hex");

        User.find({name: username}).exec()
            .then((result) => {
                console.log(result);
                if(result.length > 0){
                    res.json(generateResData({msg: "用户名已存在"}, 0));
                    return ;
                }else{
                    User.create({name: username, password: encryptPassword})
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
    }
}

export default userControler;