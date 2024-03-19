const mongoose = require("mongoose");
const Card=require("./cardModel")

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cardInfo:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Card"
  }]
});
module.exports = mongoose.model("Customer", customerSchema);
