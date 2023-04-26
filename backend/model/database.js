const dotenv=require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
const url = process.env.dbConnectTodo;

    module.exports.trackdb=mongoose.createConnection(url);
    module.exports.authdb=mongoose.createConnection(url);
    module.exports.todo=mongoose.createConnection(url);