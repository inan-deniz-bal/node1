const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.route("/").post(customerController.createUser).get(customerController.allUsers);

router.route("/:id").get(customerController.getCustomer);

router.route("/login").post(customerController.login);
module.exports = router;