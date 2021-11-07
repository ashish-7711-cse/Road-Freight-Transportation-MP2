const mongoose = require("mongoose");
const HistorySchema = new mongoose.Schema({
  user:{
    type: String
    // required : true
  },
  pickupcity:{
    type: String
    // required : true
  },
  dropcity:{
    type: String
    // required : true
  },
  date:{
    type: Date
    // required : true
  },
  weight:{
    type: Number
      // required: true
  },
  transemail:{
    type: String
    // required: true
  },
  truckNo:{
    type: String
    // required: true
  },
  typeofgoods:{
    type: String
    // required: true
  },
  price:{
    type: String
    // required: true
  },
  status:{
    type : Boolean
  },
  transconfirm:{
    type: Boolean
  }
})
const History = mongoose.model('HISTORY',HistorySchema);
module.exports = History;