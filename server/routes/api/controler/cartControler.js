import Cart from './../../../model/cart';
import Commodity from './../../../model/commodity';
import { generateResData } from './../../../common/utils';

const cartControler = {
    get(req, res, next){
        let userId = req.decoded.userId;
        //console.log(userId)
        Cart.findOne({user_id: userId}).exec().then(result => {
            let commoditys = [];
            if(result){
                Promise.all(result.commoditys.map((id, index) => {return Commodity.findById(id).exec()}))
                    .then(result => {
                    commoditys = result;
                    console.log(commoditys);
                    res.json(generateResData({msg: '获取成功', commoditys: commoditys}));
                }).catch(error => {
                    res.json(error);
                    next(error);
                    return ;
                });
            }else{
                res.json(generateResData({msg: '购物车为空'}))
            }
            return ;
        }).catch(error => {
            res.json(error);
            next(error);
            return ;
        })
    },
    add(req, res, next){
        console.log('加入购物车');
        let user_id = req.decoded.userId;
        let commodity = req.body.commodity_id;
        Cart.findOne({user_id: user_id}).exec().then(result => {
            console.log(result);
            if(result){
                let commoditys = result.commoditys;
                commoditys.push(commodity);
                result.commoditys = commoditys;
                result.save(function (err, updateResult){
                    if(err){
                        res.json(err);
                        next();
                        return;
                    }else{
                        let updateCommoditys = [];
                        Promise.all(updateResult.commoditys.map((id, index) => {return Commodity.findById(id).exec()}))
                            .then(result => {
                                updateCommoditys = result;
                                console.log(updateCommoditys);
                                res.json(generateResData({msg: '加入成功', commoditys: updateCommoditys}));
                        }).catch(error => {
                            res.json(error);
                            next(error);
                            return ;
                        });
                    }
                })
            }else{
                let commoditys = [];
                commoditys.push(commodity);
                Cart.create({user_id: user_id, commoditys: commoditys}).then(result => {
                    res.json(result);
                    return;
                }).catch(error => {
                    res.json(error);
                    next(error);
                    return ;
                })
            }
        })
    },
    delete(req, res, next){
        //删除
        let user_id = req.decoded.userId;
        let commodityId = req.body.commodity_id;
        Cart.findOne({user_id: user_id}).exec().then(result => {
            console.log(result);
            if(result && result.commoditys.length > 0){
                let commoditys = [];
                let index = result.commoditys.indexOf(commodityId);
                commoditys = result.commoditys.slice(0, index).concat(result.commoditys.slice(index+1));
                result.commoditys = commoditys;
                result.save(function (err, updateResult){
                    if(err){
                        res.json(err);
                        next();
                        return;
                    }else{
                        let updateCommoditys = [];
                        Promise.all(updateResult.commoditys.map((id, index) => {return Commodity.findById(id).exec()}))
                            .then(result => {
                                updateCommoditys = result;
                                console.log(updateCommoditys);
                                res.json(generateResData({msg: '移除成功', commoditys: updateCommoditys}));
                        }).catch(error => {
                            res.json(error);
                            next(error);
                            return ;
                        });
                    }
                })
            }
        })
    }
}

export default cartControler;