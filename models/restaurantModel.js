const mongoose = require("mongoose");
const Menu = require("./menuModel");
const Staff = require("./staffModel");
const Table = require("./tableModel");

constRestaurantSchema = new mongoose.Schema({
  name: String,
  tableList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  totalCapacity: Number,
  customerCount: Number,
  staffList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  address: String,
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
