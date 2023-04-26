
const dotenv=require('dotenv')
const authdb =require('../model/authSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

var password;
const secretMessage=process.env.secretMessage;
const maxAge=3*24*60*60
const createToken=(id)=>{
    return jwt.sign({id},secretMessage,{expiresIn:maxAge})
}
function handleErr(res,err){
    res.status(err.message,err.code);
}
module.exports.signup =async(req,res)=>{
    const mail=req.body.mail_id;
    const salt =await bcrypt.genSalt();
    console.log(`AuthController Password:${req.body.password}`)
    if(req.body.password.length+1>6){

        password=await bcrypt.hash(req.body.password,salt);
        try{
        
            const user = await authdb.insertMany({
                email:mail,
                password:password
            })
            // console.log(user[0]._id.toString());
            const token=createToken(user[0]._id);
            console.log(`token:${token}`)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
            res.send("Auth Successful");
        }
        catch(err){
                handleErr(res,err);
        }
    }
    else{
        err='password is too short'
        res.send(err)
    }
   
    
    
}

module.exports.login =async(req,res)=>{
    console.log(req.body)
    const mail=req.body.mail_id;
    const password=req.body.password;
    try{

        const user = await authdb.findOne({ email: mail });
        if (user) {
            console.log(`user:${user} password:${user.password}`);
          const compare = await bcrypt.compare(password, user.password);
          const token=createToken(user._id);
            console.log(`token:${token}`)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
          if (compare) {
            res.send("Auth Successful");
          } else {
            res.send("Wrong username or password.");
          }
        } 
    }
    catch(err){
        handleErr(res,err);
    }
}
