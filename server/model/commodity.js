'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let commoditySchema = mongoose.Schema({
    commodity_id: String,//商品id
    commodity_name: String,//商品名称
    commodity_img: [String],//商品图片
    commodity_price: Number//商品价格
});

let Commodity = mongoose.model('Commodity', commoditySchema);

export default Commodity;