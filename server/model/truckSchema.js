const mongoose = require("mongoose");


const truckSchema = new mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  number:{
    type: String,
    required : true
  },
  pickupcity:{
    type: String,
    required : true
  },
  dropcity:{
    type: String,
    required : true
  },
  company:{
    type: String,
    required : true
  },
  capacitty:{
      type: Number,
      required: true
  },
  status:{
      type: String,
      required: true
  },
  transemail:{
    type: String,
    required: true
  }
})


const Truck = mongoose.model('TRUCK',truckSchema);
module.exports = Truck;