const router = require("express").Router();

const tableController = require("../controllers/tableController");
router.route("/qr/:id").get(tableController.getTableByQrCode);
router
  .route("/")
  .get(tableController.getAllTables)
  .delete(tableController.deleteAllTables);

router
  .route("/:id")
  .get(tableController.getTable)
  .post(tableController.createTable);

router.route("/restaurant/:id").get(tableController.getRestaurantTables);



module.exports = router;
