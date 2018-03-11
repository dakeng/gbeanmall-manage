import User from './../../../model/user';
import { generateResData } from './../../../common/utils';
import crypto from 'crypto';

const userControler = {
    signIn(req, res, next){
        console.log('Cookie', req.cookies);
        let user = new User(req.body.user);
        /* let username = req.body.user.username;
        let password = req.body.user.password; */
        //console.log(user);
        let md5 = crypto.createHash("md5");
        let encryptPassword = md5.update(user.password).digest("hex");

        User.find({username: user.username, password: encryptPassword}).exec()
            .then((result) => {
                console.log('result', result);
                if(result){
                    if(req.session.user){
                        res.json(generateResData({msg: "已登录"}, 0));
                    }else{
                        req.session.regenerate(err => {
                            if(err){
                                console.log(err);
                                res.json(generateResData({msg: "登录失败,请重试"}, 0));
                            }else{
                                delete user.password;
                                req.session.user = user;
                                console.log('登录session:', req,session);
                                res.json(generateResData({msg: "登录成功"}));
                            }
                        });
                    }
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
        /* let username = req.body.user.username;
        let password = req.body.user.password; */
        //console.log(user);
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
        if(req.session.user){
            req.session.destroy(err => {
                if(err){
                    res.json(generateResData({msg: "登出失败"}, 0))
                }else{
                    res.clearCookie('user_session');
                    res.json(generateResData({msg: "登出成功"}));
                }
            })
        }else{
            res.json(generateResData({msg: "未登录"}, 0));
        }
        return ;
    }
}

export default userControler;