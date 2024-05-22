const mongoose = require("mongoose");
const Card = require("../models/cardModel");

exports.createCard = async (req, res) => {
  try {
    const card = req.body;
    const newCard = new Card(card);
    await newCard.save();

    return res.status(201).json({
      status: "success",
      data: newCard,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.json({
      status: "success",
      length: cards.length,
      data: cards,
    });
  } catch (error) {
    return res.status(200).json({ message: "There is no card" });
  }
};

exports.getCustomerCards = async (req, res) => {
  try {
    const customerID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid customer ID" });
    }
    const cards = await Card.find({ customerId: customerID });

    if (cards.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "There is no card for this customer",
      });
    }
    const responseCard = cards.map((card) => {
      return {
        _id: card._id,
        cardNo: card.cardNo,
        cardHolder: card.cardHolder,
        cvv: card.cvv,
        expirityDate: card.expirityDate,
      };
    });

    return res.json({
      status: "success",
      data: responseCard,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.removeCustomerCard = async (req, res) => {
  try {
    const customerID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid customer ID" });
    }
    const card = await Card.findOneAndDelete({ customerId: customerID, _id: req.body._id });
    return res.json({
      status: "success",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeAllCards = async (req, res) => {
  try {
    await Card.deleteMany();
    return res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
