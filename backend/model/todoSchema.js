const mongoose = require('mongoose');
const { todo } = require('./database');
const taskType=[{
    taskDes: String,
    Status: Boolean
}];
const schema = new mongoose.Schema({
    title:String,
    task: taskType
})

module.exports = todo.model("todos",schema)
