const mongoose = require("mongoose");
const Order = require("./orderModel");

const pastOrderSchema = new mongoose.Schema({
  customerId:String,
  restaurantName: String,
  date: Date,
  totalPrice: Number,
  orderedMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("PastOrder", pastOrderSchema);
