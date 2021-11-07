const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());

//linking router file
app.use(require('./router/auth'));
const User  = require("./model/userSchema");

const PORT = process.env.PORT;

//middleware
const middleware = (req,res,next)=>{
  console.log("Hello middleware");
  next();
}

// app.get("/",(req,res)=>{
//   res.send("Hello World");
// });


// app.get("/about",middleware,(req,res)=>{
//   res.send("Hello about World");
// });


app.get("/contact",(req,res)=>{
  res.send("Hello contact World");
});
app.get("/signin",(req,res)=>{
  res.send("Hello signin World");
});
app.get("/Transsignin",(req,res)=>{
  res.send("Hello signin World");
});
app.get("/signup",(req,res)=>{
  res.send("Hello signup World");
});
app.get("/register",(req,res)=>{
  res.send("Hello register World");
});


app.listen(PORT,()=>{
  console.log('Server is running on port '+PORT);
});
