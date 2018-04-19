'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let cartSchema = mongoose.Schema({
    user_id: String,
    commoditys: Array,//商品
    selected: Array,//选中的商品
});

let Cart = mongoose.model('Cart', cartSchema);

export default Cart;