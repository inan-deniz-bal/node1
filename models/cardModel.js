const mongoose = new require("mongoose");

const cardSchema = new mongoose.Schema({
  cardNo: String,
  cardHolder: String,
  cvv: String,
  expirityDate: {
    month: String,
    year: String,
  },
  customerId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model("Card", cardSchema);
