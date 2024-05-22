const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const pastOrders = require("../models/pastOrders");
const CurrentOrder = require("../models/currentOrder");

exports.createCurrentOrder = async (req, res) => {
  try {
    console.log("merhaba");

    const order = req.body;
    if (!mongoose.Types.ObjectId.isValid(order.customerId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid customer ID" });
    } //console.log(req.body)

    const newOrder = new CurrentOrder(req.body);
    await newOrder.save();
    return res.status(201).json({
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

    const pastOrder = await pastOrders
      .findOne({ customerId: order.customerId })
      .populate("orders");
    if (!pastOrder) {
      const newPastOrder = new pastOrders({
        customerId: order.customerId,
        orders: [order],
      });
      await newPastOrder.save();
      return res.status(201).json({
        status: "success",
        data: newPastOrder,
      });
    }
    const theOrderExists = pastOrder.orders.some(
      (order) => order._id.toString() === orderID.toString()
    );

    if (theOrderExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "Order already exists" });
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

exports.cancelOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid order ID" });
    }
    await CurrentOrder.findByIdAndDelete(orderID);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  //5 dakika kuralı eklenecek
  try {
    const orderID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid order ID" });
    }
    const order = await CurrentOrder.findById(orderID);
    if (order.orderStatus === "closed") {
      return res
        .status(400)
        .json({ status: "failed", message: "Order is closed" });
    }
    console.log(req.body);
    const updatedOrder = await CurrentOrder.findByIdAndUpdate(
      orderID,
      req.body,
      {
        new: true,
      }
    );
    updatedOrder.save();
    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//yasaklı teknik
exports.deleteAllOrders = async (req, res) => {
  try {
    await CurrentOrder.deleteMany();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
