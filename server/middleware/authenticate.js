const User = require("../model/userSchema");
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cookieParser());

const Authenticate = async(req,res,next)=>{
    try{
        
        const token = req.cookies.jwt;
        const verifytoken = jwt.verify(token,process.env.SECREAT_KEY);

        const rootUser = await User.findOne({_id:verifytoken._id, "tokens.token":token});

        if(!rootUser){
            throw new Error("User Not Found");
        }
        req.token= token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    }catch(err){
        res.status(401).send("Unautheticate: No token provided");
        console.log(err);
    }
}

module.exports = Authenticate;