import Commodity from './../../../model/commodity';

const commodityControler = {
    create(rep, res, next){
        Commodity.create(rep.body, err => {
            if(err){
                console.log(err);
                return next(err);
            }else{
                console.log('成功');
                res.json(this.generateResData({msg: '成功'}));
            }
        });
    },
    find(rep, res, next){
        Commodity.find({}, (err, commoditys) => {
            if(err){
                res.send(err);
            }else{
                res.json(this.generateResData(commoditys));
            }
        });
    },
    generateResData(data){
        let resData = {};
        resData.status = 1;
        resData.data = data;
        return resData;
    }
}

export default commodityControler;