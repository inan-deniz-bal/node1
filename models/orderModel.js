const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  mealName: String,
  mealQuantity: Number,
  mealPrice: Number,
});

module.exports = mongoose.model("Order", orderSchema);
