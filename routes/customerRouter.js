const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.route("/").post(customerController.createUser).get(customerController.allUsers);

module.exports = router;