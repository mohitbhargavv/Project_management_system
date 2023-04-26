const mongoose = require('mongoose');
const {isEmail} =require('validator');
const {authdb}=require('./database')

const authSchema =  mongoose.Schema({
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        validator:[isEmail,`email doesn't exist`]
    },
    password: {
        type:String,
        required:[true,'password is required'],
        minlength:[6,'password is to short'],
    }
})
module.exports = authdb.model("auths",authSchema)
