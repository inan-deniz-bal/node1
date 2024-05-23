const mongoose = require("mongoose");
const Card = require("./cardModel");
const pastOrders = require("./pastOrders");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cardInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  pastOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PastOrder",
    },
  ],
  isOrdered: Boolean,
  userType:String
});
module.exports = mongoose.model("Customer", customerSchema);
