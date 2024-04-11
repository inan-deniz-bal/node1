const mongoose = require("mongoose");
const currentOrder = require("./currentOrder");

const pastOrderSchema = new mongoose.Schema({
  /*
  customerId:mongoose.Schema.Types.ObjectId,
  restaurantName: String,
  date: Date,
  totalPrice: Number,
  orderedMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],*/

  customerId: mongoose.Schema.Types.ObjectId,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CurrentOrder",
    },
  ],
});

module.exports = mongoose.model("PastOrder", pastOrderSchema);
