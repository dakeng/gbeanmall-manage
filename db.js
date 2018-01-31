import mongoose from 'mongoose';

let db = mongoose.connection;

db.on('error', function callback(){
    console.log("Connection error");
});

db.once('open', function callback(){
    console.log("Connected!")
});

mongoose.connect('mongodb://localhost:27017/gbeanmall');

module.exports = mongoose;