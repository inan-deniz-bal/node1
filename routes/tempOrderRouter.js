const router = require("express").Router();
const tempOrderController = require("../controllers/tempOrderController");

router
  .route("/")
  .get(tempOrderController.getAllTempOrders)
  .post(tempOrderController.getTempOrder);

router
  .route("/:id")
  .get(tempOrderController.getOneTempOrder)
  .post(tempOrderController.updateTempOrder)
  .delete(tempOrderController.deleteTempOrder);

module.exports = router;
