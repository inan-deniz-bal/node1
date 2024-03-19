const mongoose = require("mongoose");
const mealSchema = new mongoose.Schema({
  mealName: String,
  mealPrice: Number,
  mealCount: Number,
  ingridients: [String],
});

module.exports = mongoose.model("Meal", mealSchema);
