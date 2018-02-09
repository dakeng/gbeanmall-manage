import Commodity from './../../../model/commodity';

//Todo
//传入的参数判断

const commodityControler = {
    create(req, res, next){
        Commodity.create(req.body.data, err => {
            if(err){
                console.log(err);
                return next(err);
            }else{
                console.log('成功');
                res.json(this.generateResData({msg: '成功'}));
            }
        });
    },
    del(req, res, next){
        Commodity.find().remove(req.body.data, err => {
            if(err){
                console.log(err);
                return next(err);
            }else{
                res.json(this.generateResData({msg: '已删除'}));
            }
        })
    },
    search(req, res, next){

    },
    find(req, res, next){
        Commodity.find({}, (err, commoditys) => {
            if(err){
                res.send(err);
            }else{
                res.json(this.generateResData(commoditys));
            }
        });
    },
    generateResData(data, status = 1){
        let resData = {};
        resData.status = status;
        resData.data = data;
        return resData;
    }
}

export default commodityControler;