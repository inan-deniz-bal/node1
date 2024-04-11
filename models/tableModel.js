const mongoose = require("mongoose");
const currentOrder = require("./currentOrder");

const tableSchema = new mongoose.Schema({
  tableName: String,
  status: String,
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "CurrentOrder" },
  customerId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Table", tableSchema);
