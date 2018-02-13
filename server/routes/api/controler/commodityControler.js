import Commodity from './../../../model/commodity';

//Todo
//传入的参数判断

const commodityControler = {
    create(req, res, next){
        Commodity.create(req.body.data, (err, docs) => {
            if(err){
                res.json(this.generateResData(err, 0));
                next(err);
            }else{
                console.log('成功');
                res.json(this.generateResData({msg: '成功', data: docs}));
            }
        });
    },
    del(req, res, next){
        if(!req.body._id){
            res.json(this.generateResData({msg: '缺少参数_id'}, 0));
        }else{
            Commodity.find().remove({_id: req.body._id}, (err, docs) => {
                if(err){
                    res.json(this.generateResData(err, 0));
                    next(err);
                }else{
                    res.json(this.generateResData({msg: '已删除', data: docs}));
                }
            })
        }
    },
    search(req, res, next){

    },
    find(req, res, next){
        Commodity.find({}, (err, commoditys) => {
            if(err){
                res.json(this.generateResData(err, 0));
                next(err);
            }else{
                res.json(this.generateResData(commoditys));
            }
        });
    },
    modify(req, res, next){
        if(!req.body._id){
            res.json(this.generateResData({msg: '缺少参数_id'}, 0));
        }else{
            let conditions = {
                _id: req.body._id
            }
            Commodity.update(conditions, req.body.data, {}, err => {
                if(err){
                    res.json(this.generateResData(err, 0));
                    next(err);
                }else{
                    res.json(this.generateResData({msg: '修改成功'}));
                }
            });
        }
    },
    generateResData(data, status = 1){
        let resData = {};
        resData.status = status;
        resData.data = data;
        return resData;
    }
}

export default commodityControler;