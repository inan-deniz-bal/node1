const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");

exports.allUserOrders = async (req, res) => {
  try {
    const userID = await req.body.userID;
    const userExist = await Customer.findById(userID);
    if (userExist) {
      const userOrders = await Order.find({ customerId: userID });
      res.json({
        status: success,
        length: userOrders.length,
        data: userOrders,
      });
    } else {
      res.json({
        status: failed,
        message: "User not found",
      });
    }

    res.json(customer.pastOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
