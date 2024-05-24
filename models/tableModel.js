const mongoose = require("mongoose");
const currentOrder = require("./currentOrder");

const tableSchema = new mongoose.Schema({
  tableName: String,
  orders: [
    {
      date: Date,
      currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurrentOrder",
      },
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
      status: String,
    },
  ],
});

module.exports = mongoose.model("Table", tableSchema);
