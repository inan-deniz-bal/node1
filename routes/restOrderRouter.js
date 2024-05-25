const express = require("express");
const router = express.Router();
const restOrderController = require("../controllers/restOrderController");
router.route("/:id").get(restOrderController.getRestaurantActiveOrders)
.post(restOrderController.cancelOrder);

router.route("/ready/:id").get(restOrderController.changeOrderStatus)
module.exports = router;
