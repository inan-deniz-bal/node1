const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const mongoose = require("mongoose");

exports.allUserOrders = async (req, res) => {
  try {
    console.log(req.body);
    const userID = await req.body.userID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }

    const userOrders = await Order.find({ customerId: userID });
    if (userOrders.length === 0) {
      console.log("buradayım");
      res.json({
        status: "failed",
        message: "User has no orders",
      });
    } else {
      console.log("olumsuz1");
      res.json({
        status: "success",
        length: userOrders.length,
        data: userOrders,
      });
    }

    res.json(customer.pastOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
