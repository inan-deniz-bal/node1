const express = require("express");
const router = express.Router();
const currentOrderController = require("../controllers/currentOrderController");
router.route("/active").get(currentOrderController.allActiveOrders);

router
  .route("/")
  .post(currentOrderController.createCurrentOrder)
  .get(currentOrderController.allOrders)
  .delete(currentOrderController.deleteAllOrders);

router.route("/customer/:id").get(currentOrderController.getCustomerOrders);
router
  .route("/:orderID/:tableId")
  .get(currentOrderController.closeOrder)
  .delete(currentOrderController.cancelOrder)
  .put(currentOrderController.updateOrder);
module.exports = router;
