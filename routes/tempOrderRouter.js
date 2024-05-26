const router = require("express").Router();
const tempOrderController = require("../controllers/tempOrderController");

router
  .route("/")
  .get(tempOrderController.getAllTempOrders)
  .post(tempOrderController.getTempOrder);

router
  .route("/:id")
  .get(tempOrderController.getOneTempOrder)
  .post(tempOrderController.updateTempOrder);

module.exports = router;
