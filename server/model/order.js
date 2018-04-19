'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let orderSchema = mongoose.Schema({
    user_id: String,
    commoditys: Array,
    realPayment: Number,//实付款
    addressee: String,//收件人
    phone: String,//手机号码
    address: String,//收件地址
    state: Number,//0，未付款；1，已付款
});

let Order = mongoose.model('Order', orderSchema);

export default Order;