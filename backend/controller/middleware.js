const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
// var userId;

dotenv.config();
const secretMessage= process.env.secretMessage;
const routesCheck=async (req,res,next)=>{
    // console.log(req);
    // console.log(req.cookies);
    
    if(req.cookies && req.cookies.jwt){
        const token=req.cookies.jwt;
        const check=jwt.verify(token,secretMessage);
        if(check){
            const userId=check.id;
            res.locals.userId =userId;
            next();
        }
        else{
            
            res.send("Not allowed.")
        }  
    }
    else{
        res.send("Not a valid token.")
    }
    // console.log(`routeCheck:${userId}`)
}
module.exports.routesCheck=routesCheck;
