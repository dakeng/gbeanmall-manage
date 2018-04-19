import Order from './../../../model/order';
import Commodity from './../../../model/commodity';
import { generateResData } from './../../../common/utils';

const cartControler = {
    //获取订单
    get(req, res, next){
        let userId = req.decoded.userId;
        Order.find({user_id: userId}).exec().then(result => {
            if(result){
                result.map((item, index) => {
                    item.user_id = null;
                })
                console.log(result);
                res.json(generateResData({msg: '获取成功', data: result}));
            }else{
                res.json(generateResData({msg: '您还没有购物哦~'}))
            }
            return ;
        }).catch(error => {
            res.json(error);
            next(error);
            return ;
        })
    },
    //生成订单
    create(req, res, next){
        let user_id = req.decoded.userId;
        let commodity_ids = req.body.commodity_ids;
        let commoditys = [];
        let realPayment = 0;
        /* for(let i = 0; i < commodity_ids.length; i++){
            Commodity.findById(commodity_ids[i], (err, result) => {
                if(result){
                    console.log(result);
                    commoditys.push(result);
                    realPayment += result.commodity_price;
                }
            })
        } */
        Promise.all(commodity_ids.map((id, index) => {return Commodity.findById(id).exec()}))
            .then(result => {
                commoditys.push(result);
                realPayment += result.commodity_price;
                console.log(commoditys, realPayment);
            }).catch(error => {
                res.json(error);
                next(error);
                return ;
            });
        Order.create({
            user_id: user_id,
            commoditys: commoditys,
            realPayment: realPayment,//实付款
            addressee: req.body.addressee,//收件人
            phone: req.body.phone,//手机号码
            address: req.body.String,//收件地址
            state: 0,//未付款
        }).then(order => {
            res.json(generateResData({msg: '提交成功', data: order}));
        }).catch(err => {
            res.json(err);
            next(error);
            return ;
        })
    },
    //删除订单
    delete(req, res, next){
        //删除
        let user_id = req.decoded.userId;
        let order_id = req.body.order_id;
        Order.find().remove({_id: order_id}, (err, result) => {
            if(err){
                res.json(generateResData(err, 0));
                next(err);
            }else{
                res.json(generateResData({msg: '已删除', data: result}));
            }
        })
    }
}

export default cartControler;