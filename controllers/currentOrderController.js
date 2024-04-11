const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const pastOrders = require("../models/pastOrders");
const CurrentOrder = require("../models/currentOrder");

/*
const checkUser = async (req, res, next) => {
  try {
    const { customerId } = req.body.customerId;
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/

exports.createCurrentOrder = async (req, res) => {
  try {
    //checkUser();
    console.log("merhaba");

    const order = req.body;
    //console.log(req.body)

    const newOrder = new CurrentOrder(req.body);
    await newOrder.save();
    res.status(201).json({
      status: "success",
      data: newOrder,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.closeOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid order ID" });
    }
    const order = await CurrentOrder.findById(orderID);
    order.orderStatus = "closed";
    await order.save();


    //checkUser();

    const pastOrder = await pastOrders.findOne({ customerId: order.customerId });
    if (!pastOrder) {
      const newPastOrder = new pastOrders({
        customerId: order.customerId,
        orders: [order],
      });
      await newPastOrder.save();
      res.status(201).json({
        status: "success",
        data: newPastOrder,
      });
    }

    pastOrder.orders.push(order);
    await pastOrder.save();

    res.status(201).json({
      status: "success",
      data: pastOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await CurrentOrder.find();
    res.json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
