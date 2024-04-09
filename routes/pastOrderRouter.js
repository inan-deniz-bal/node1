const express = require("express");
const router = express.Router();
const pastOrdersController = require("../controllers/pastOrdersController");

router.route("/").get(pastOrdersController.allOrders);
/*.delete(pastOrdersController.deleteAllOrders)
.post(pastOrdersController.allUserOrders);

router.route("/:id")
.get(pastOrdersController.userOrder)
.delete(pastOrdersController.deleteOrder)
.post(pastOrdersController.allUserOrders)
.patch(pastOrdersController.updateBallotBox);*/

module.exports = router;
