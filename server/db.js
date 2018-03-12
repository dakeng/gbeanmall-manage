import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', function callback(){
    console.log("Connection error");
});

db.once('open', function callback(){
    console.log("Connected!")
});

db.openUri('mongodb://localhost:27017/gbeanmall');
//mongoose.connect('mongodb://localhost:27017/gbeanmall');

export default db;