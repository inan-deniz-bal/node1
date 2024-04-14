const express = require("express");
const router = express.Router();
const currentOrderController = require("../controllers/currentOrderController");

router.route("/").post(currentOrderController.createCurrentOrder).get(currentOrderController.allOrders).delete(currentOrderController.deleteAllOrders);

router.route("/:id").get(currentOrderController.closeOrder).delete(currentOrderController.cancelOrder).put(currentOrderController.updateOrder);
module.exports = router;