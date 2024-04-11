const express = require("express");
const router = express.Router();
const currentOrderController = require("../controllers/currentOrderController");

router.route("/").post(currentOrderController.createCurrentOrder).get(currentOrderController.allOrders);

router.route("/:id").get(currentOrderController.closeOrder);
module.exports = router;