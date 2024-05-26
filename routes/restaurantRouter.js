const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant)
  .put(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteAllRestaurants);
router.route("/:id").get(restaurantController.getRestaurant).put(restaurantController.updateRestaurantMenu);

router.route("/tables/:id").get(restaurantController.getRestaurantTables);

module.exports = router;
