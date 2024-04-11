const mongoose = require("mongoose");

const currentOrderSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  restaurantName: String,
  date: Date,
  totalPrice: Number,
  orderedMeals: [
    {
      mealName: String,
      mealQuantity: Number,
      mealPrice: Number,
    },
  ],
  orderStatus: String,
});

// Exporting as default export
module.exports = mongoose.model("CurrentOrder", currentOrderSchema);
