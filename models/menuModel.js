const mongoose = require("mongoose");
const Meal = require("./mealModel");

const menuSchema = new mongoose.Schema({
  mealType: String,
  mealList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

module.exports = mongoose.model("Menu", menuSchema);
