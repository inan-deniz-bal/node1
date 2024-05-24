const mongoose = require("mongoose");
const Menu = require("./menuModel");
const Staff = require("./staffModel");
const Table = require("./tableModel");
const Customer = require("./customerModel");
const RestaurantSchema = new mongoose.Schema({
  name: String,
  //tableList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  /*tableList: [
    {
      tableName: String,
      status: String,
      currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurrentOrder",
      },
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    },
  ], */
  tableList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  totalCapacity: Number,
  customerCount: Number,
  staffList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  address: String,
  features: [String],
  //menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  menu: [
    {
      mealType: String,
      meals: [
        {
          mealName: String,
          mealPrice: Number,
          mealCount: Number,
          ingridients: [String],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
