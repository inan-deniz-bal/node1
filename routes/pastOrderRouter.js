const express = require("express");
const router = express.Router();
const pastOrdersController = require("../controllers/pastOrdersController");

router.route("/").get(pastOrdersController.allPastOrders);
router.route("/:id").get(pastOrdersController.getUserOrders);

//router.route("/create").post(pastOrdersController.createPastOrder);

/*.delete(pastOrdersController.deleteAllOrders)
.post(pastOrdersController.allUserOrders);

router.route("/:id")
.get(pastOrdersController.userOrder)
.delete(pastOrdersController.deleteOrder)
.post(pastOrdersController.allUserOrders)
.patch(pastOrdersController.updateBallotBox);*/

module.exports = router;
