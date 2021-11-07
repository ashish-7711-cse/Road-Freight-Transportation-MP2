const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const transporterSchema = new mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  email:{
    type: String,
    required : true
  },
  phone:{
    type: String,
    required : true
  },
  company:{
    type: String,
    required : true
  },
  password:{
    type: String,
    required : true
  },
  cpassword:{
    type: String,
    required: true
  },
  tokens:[
    {
      token:{
        type: String,
        required: true
      }
    }
  ]
})

//we are hasshing the password

transporterSchema.pre('save',async function(next){
  console.log("Hi from pre");
  if(this.isModified('password')){
    this.password= await bcrypt.hash(this.password, 12);
    this.cpassword= await bcrypt.hash(this.cpassword,12);
  }
  next();
})


//generating token
transporterSchema.methods.generateTransporterAuthToken = async function(){
  try{
    let token = jwt.sign({_id:this._id,email:this.email, name:this.name }, process.env.SECREAT_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  }catch(err){
    console.log(err)
  }
}

const Transporter = mongoose.model('TRANSPORTER',transporterSchema);
module.exports = Transporter;
