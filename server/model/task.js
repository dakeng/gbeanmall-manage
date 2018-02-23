'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let taskSchema = mongoose.Schema({
    task_id: String,//任务id
    task_name: String,//任务名称
    task_reward: Number,//任务奖励
    task_des: String,//任务描述
});

let Task = mongoose.model('Task', taskSchema);

export default Task;