const mongoose = require("mongoose");
const TempOrder = require("../models/tempOrderModel");
const CurrentOrder = require("../models/currentOrder");

exports.getAllTempOrders = async (req, res) => {
  try {
    const tempOrders = await TempOrder.find();
    res.status(200).json({
      status: "success",
      data: tempOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTempOrder = async (req, res) => {
  try {
    const ordersID = req.body.ordersID;

    if (ordersID.length === 0) {
      return res
        .status(400)
        .json({ message: "There is no order in the table" });
    }
    if (ordersID.length == 1) {
      const currentOr = await TempOrder.findOne({
        currentOrderId: ordersID[0],
      });
      if (!currentOr) {
        const currentOrder = await CurrentOrder.findById(ordersID[0]);
        if (currentOrder.orderStatus === "ready") {
          const newTempOrder = new TempOrder({
            currentOrderId: ordersID[0],
            orderedMeals: currentOrder.orderedMeals,
          });
          await newTempOrder.save();
          return res.status(200).json({
            status: "success",
            data: newTempOrder,
          });
        } else {
          return res.status(400).json({ message: "The order is not ready" });
        }
      }
      return res.status(200).json({
        status: "success",
        data: currentOr,
      });
    }

    // Eğer birden fazla orderID varsa:
    for (let orderId of ordersID) {
      let currentOrder = await CurrentOrder.findOne({
        _id: orderId,
        orderStatus: "ready",
      });
      if (currentOrder) {
        let tempOrder = await TempOrder.findOne({ currentOrderId: orderId });
        if (!tempOrder) {
          tempOrder = new TempOrder({
            currentOrderId: orderId,
            orderedMeals: currentOrder.orderedMeals,
          });
          await tempOrder.save();
        }
        return res.status(200).json({ status: "success", data: tempOrder });
      }
    }

    // Eğer hiçbir uygun order bulunamazsa
    return res.status(400).json({ message: "No ready orders found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneTempOrder = async (req, res) => {
  try {
    const tempOrder = await TempOrder.findById(req.params.id);
    if (!tempOrder) {
      return res.status(404).json({ message: "TempOrder not found" });
    }
    res.status(200).json({
      status: "success",
      data: tempOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTempOrder = async (req, res) => {
  try {
    const tempOrder = await TempOrder.findById(req.params.id);
    if (!tempOrder) {
      return res.status(404).json({ message: "TempOrder not found" });
    }

    if (req.body.orderedMeals.length === 0) {
      tempOrder.orderedMeals = req.body.orderedMeals;
      tempOrder.paidMeals = req.body.paidMeals;
      await tempOrder.save();
      return res.status(400).json({
        message: "done",
      });
    }
    tempOrder.orderedMeals = req.body.orderedMeals;
    tempOrder.paidMeals = req.body.paidMeals;
    await tempOrder.save();

    return res.status(200).json({
      status: "success",
      data: tempOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTempOrder = async (req, res) => {
  try {
    await TempOrder.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "TempOrder deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
