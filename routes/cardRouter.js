// routes/cardRouter.js
const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router
  .route("/")
  .get(cardController.getAllCards)
  .post(cardController.createCard)
  .delete(cardController.removeAllCards);

router
  .route("/:id")
  .get(cardController.getCustomerCards)
  .delete(cardController.removeCustomerCard);

module.exports = router;
