const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");
const ObjectId = require('mongodb').ObjectID
require('../db/conn');

const User = require("../model/userSchema");

const Transporter = require("../model/transporterSchema");

const Truck = require("../model/truckSchema");

const Booking = require("../model/bookingSchema");

const History = require("../model/HistorySchema");
const { update } = require('../model/userSchema');

router.get("/",(req,res) => {
  res.send('Hello from router');
});

// using promises
// router.post("/register",async(req,res)=>{
//   // console.log({message : req.body});
//   const{name, email, phone, work, password, cpassword}= req.body;

//   if(!name|| !email|| !phone|| !work||!password|| !cpassword){
//     return res.status(422).json({error : "Plz filled the field properly"});
//   }
//   User.findOne({email : email})
//     .then((userExits)=>{
//       if(userExits){
//         return res.status(422).json({erro:" User Exists"});
//       }
//       const user = new User({name,email,phone,work,password,cpassword});
//       user.save().then(()=>{
//         res.status(201).json({message:"user registerd successfully"});
//       }).catch((err)=>res.status(500).json({error : "Failed"}))
//     }).catch(err =>{console.log(err);});
// });

//register route
router.route("/register").post(async(req,res)=>{
  const{name, email, phone, work, password, cpassword}= req.body; 
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.work);
  console.log(req.body.password);
  console.log(req.body.cpassword);
  if(!name|| !email|| !phone|| !work||!password|| !cpassword){
    return res.status(422).json({error : "Plz fill the field properly"});
  }
  else{
  try{
    const userExits = await User.findOne({email: email});
    if(userExits){
      console.log("User Exits");
      return res.status(422).json({err:" User Exists"});
    }else if(password != cpassword){
      console.log("Error password not matching");
      return res.status(422).json({err:" password not matching"});
    }else{
      const user = new User({name,email,phone,work,password,cpassword});
      const userRegister =  await user.save();
      console.log('${user} user Register success');
      console.log(userRegister);
      res.status(201).json({ message:"user registerd successfully" });
  
    }

  }catch(err){
    console.log(err);
  }
  }
});

router.route("/addTruck").post(async(req,res)=>{
  const{name, number, pickupcity, dropcity, company, capacitty,transemail}= req.body; 
  console.log(req.body.name);
  console.log(req.body.number);
  console.log(req.body.pickupcity);
  console.log(req.body.dropcity);
  console.log(req.body.company);
  console.log(req.body.company);
  console.log(req.body.transemail);
  const status = "true";  
  if(!name|| !number|| !pickupcity|| !dropcity||!company|| !transemail){
    return res.status(422).json({error : "Plz fill the field properly"});
  }
  try{
    const truckExits = await Truck.findOne({number : number});
    if(truckExits){
      console.log("truck Exits");
      return res.status(422).json({err:" truck Exists"});
    }else{
      const truck = new Truck({name, number, pickupcity, dropcity, company,capacitty, status, transemail});
      const truckRegister =  await truck.save();
      console.log('admin Register success');
      console.log(truckRegister);
      res.status(201).json({ message:"Truck registerd successfully"});
    }
  }catch(err){
    console.log(err);
  }
});


router.route("/trucklist").post(async(req,res)=>{
  const{transemail} = req.body;
  console.log(req.body.adminemail)
  if(!transemail)
  {
    return res.status(422).json({error : "Pls fill the field properly"});
  }
  try{
    const truckList = await Truck.find({transemail:transemail});
    console.log(truckList);
    res.json(truckList);
  }catch(err){
    console.log(err)
  }

});

router.route("/truck").post(async(req,res)=>{
    const id = req.body.id;
    console.log(id);
    try{
      const truckList = await Truck.findOne({_id:ObjectId(id)});
      console.log(truckList);
      res.json(truckList);
    }catch(err){
      console.log(err)
    }
})

router.route("/userTruckList").post(async(req,res)=>{
  const{pickupcity, dropcity, capacitty} = req.body;
  console.log(req.body.pickupcity)
  console.log(req.body.dropcitty)
  try{
    const truckList = await Truck.find({pickupcity:pickupcity, dropcity:dropcity,capacitty:{$gt: capacitty}});
    if(truckList.length<=0)
        res.json({err : "No Truck Found"});
    else {console.log(truckList);
    // console.log(truckList[0].company);
    res.json(truckList);}
  }catch(err){
    console.log(err);
  }
})

router.route("/registerTransporter").post(async(req,res)=>{
  const{name, email, phone, company,address, password, cpassword}= req.body; 
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.company);
  console.log(req.body.password);
  console.log(req.body.cpassword);
  if(!name|| !email|| !phone|| !company||!password|| !cpassword){
    return res.status(422).json({error : "Plz fill the field properly"});
  }
  try{
    const transporterExits = await Transporter.findOne({email: email,company:company});
    if(transporterExits){
      console.log("Admin Exits");
      return res.status(422).json({err:" Transporter already exists"});
    }else if(password != cpassword){
      console.log("Error password not matching");
      return res.status(422).json({err:" password not matching"});
    }else{
      const transporter = new Transporter({name,email,phone,company,address,password,cpassword});
      const transRegister =  await transporter.save();
      console.log(transporter+'transporter Register success');
      console.log(transRegister);
      res.status(201).json({ message:"Transporter registerd successfully" });
    }
  }catch(err){
    console.log(err);
  }
});


//login route
router.post("/signin",async(req,res)=>{
  try{
    let token; 
    const{email,password} = req.body;
    if(!email){
      return res.status(400).json({error : "Plz fill the field properly"});
    }

    const userLogin= await User.findOne({email : email});
    

    if(userLogin){
      const isMatch = await bcrypt.compare(password,userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie('jwt',token,{
        expires: new Date(Date.now()+25892000000),
        httpOnly:true
      });
      res.json({token});

      if(!isMatch){
        return res.status(400).json({error : "invalid pass or email"});
      }
      else{
        return res.status(200).json({message : "Login Success", token: token});
      }    
    }else{
      return res.status(400).json({error : "Invalid credentials"});
    }
  
  }catch(err){
    console.log(err);
  }
});


router.post("/Transsignin",async(req,res)=>{
  try{
    let token; 
    const{email,password} = req.body;
    if(!email||!password){
      return res.status(400).json({error : "Plz fill the field properly"});
    }
    else{
      const transLogin= await Transporter.findOne({email : email});
      if(transLogin){
        const isMatch = await bcrypt.compare(password,transLogin.password);
        token = await transLogin.generateTransporterAuthToken();
        console.log(token);
  
        await res.cookie("jwt",token,{
          expires: new Date(Date.now()+25892000000),
          httpOnly:true
        });
        res.json({token});
        
        if(!isMatch){
          res.status(400).json({error : "invalid pass or email"});
        }
        else{
          sessionStorage.setItem("tr",email);
          res.status(200).json({message : "Login Success", token: token});
        }    
      }else{
        return res.status(400).json({error : "Invalid credentials"});
      }
    }
  }catch(err){
    console.log(err);
  }
});

//booking
router.route('/booking').post(async(req,res)=>{
    try{
      const {user, pickupcity, dropcity, date, weight,  adminemail,truckid,typeofgoods,price} = req.body;
      const status = false;
      const bookingId = Booking.length;
      const transconfirm = false;
      const book = new Booking({user, pickupcity, dropcity, date, weight,transemail:adminemail,truckid,typeofgoods,price,status,transconfirm,bookingId});
      const bookReq = book.save();
      console.log(bookReq);
      res.status(201).json({message:"Booking data saved successfully"});

    }catch(err){
        console.log(err);
    }
});

router.route('/bookingRequests').post(async(req,res)=>{
    try{
      const transemail = req.body.transemail;
      const result = await Booking.find({transemail : transemail});
      console.log(result);
      res.status(200).json(result)
    }catch(err){
      console.log(err)
    }
});
router.route('/transConfirm').post(async(req,res)=>{
  try{
    
    const{user, pickupcity,dropcity,date,weight,transemail,truckNo,typeofgoods,price,status,transconfirm}=req.body
    console.log(req.body.date);
    await Booking.deleteMany({user, pickupcity,dropcity,date,weight,transemail,truckid:truckNo,typeofgoods,price}).then(res => {console.log(res)});
    const history = new History({user, pickupcity,dropcity,date,weight,transemail,truckNo,typeofgoods,price,status,transconfirm});
    const historyCon = await history.save().then(res => {console.log(res)});

   
    console.log(historyCon);
    res.status(200).json({message:"Booking confirmed successfully"});
  }catch(err){
    console.log(err);
  }
});
router.route('/trans/history').post(async(req,res)=>{
  if(req.body.role == "customer")
  {
    try{
      const user = req.body.user;
      const result = await History.find({user : user,transconfirm:true});
      console.log(result);
      res.status(200).json(result);
    }catch(err){
      console.log(err)
    }
  }
  else{
    try{
      const transemail = req.body.transemail;
      const result = await History.find({transemail : transemail,transconfirm:true});
      console.log(result);
      res.status(200).json(result);
    }catch(err){
      console.log(err)
    }
  }
  
});

router.route('/trucks').get(async(req,res)=>{
  try{
    var truckList = await Truck.find();
    res.status(200).json(truckList);
  }catch(err){
    console.log(err);
  }
})

router.route('/logout').get((req,res)=>{
  res.clearCookie('jwt');
  res.status(200).send({"message":"User logout"});
  console.log("Success");
});


//about page
router.route('/about').get(Authenticate,(req,res)=>{
  res.send("Hello about World");
  console.log(req.rootUser);
  res.send(req.rootUser);
});


module.exports = router;
