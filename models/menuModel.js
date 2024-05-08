const mongoose = require("mongoose");
//const Meal = require("./mealModel");

const menuSchema = new mongoose.Schema({
  mealType: String,
  mealList: [
    {
      mealName: String,
      mealPrice: Number,
      mealCount: Number,
      ingridients: [String],
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
