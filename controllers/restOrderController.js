const mongoose = require("mongoose");

const CurrentOrder = require("../models/currentOrder");
const Restaurant = require("../models/restaurantModel");
const Table = require("../models/tableModel");
exports.getRestaurantActiveOrders = async (req, res) => {
  try {
    console.log("ÇALIŞTI");
    const restaurantID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(restaurantID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid restaurant ID" });
    }
    const rest = await Restaurant.findById(restaurantID);

    if (!rest) {
      return res.status(404).json({
        status: "failed",
        message: "Restaurant not found",
      });
    }
    const orders = await CurrentOrder.find({
        restaurantName: rest.name,
        orderStatus: { $in: ["active", "ready"] }
      });
      
    const table = await Table.findOne({
      "orders.currentOrder._id": orders._id,
    }).populate("orders.currentOrder");
    console.log("masa", table);
    return res.json({
      status: "success",
      data: {
        orders: orders,
        table: table.tableName,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const tableId=req.body.tableId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid order ID" });
    }
    const order = await CurrentOrder.findById(id);
    if (!order) {
      return res.status(404).json({
        status: "f1",
        message: "Order not found",
      });
    }
    order.orderStatus = "cancel";
    await order.save();
    const table = await Table.findById(tableId).populate("orders")
    if (!table) {
      return res.status(404).json({
        status: "f2",
        message: "Table not found",
      });
    }
    newOrders = [];
    if (table.orders.length !== 0) {
      table.orders.forEach((order) => {
        console.log("currentorder", order.currentOrder._id.toString(), id);
        if (order.currentOrder._id.toString() !== id) {
          newOrders.push(order);
        }
      });
      table.orders = newOrders;
      await table.save();
    }

    return res.json({
      status: "success",
      message: "Order cancelled",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.changeOrderStatus = async (req, res) => {
    try{
        const { id } = req.params;
        const currentOrder = await CurrentOrder.findById(id);
        if (!currentOrder) {
            return res.status(404).json({
                status: "failed",
                message: "Order not found",
            });
        }
        console.log("merhabai", currentOrder)
        currentOrder.orderStatus = "ready";
        await currentOrder.save();
        return res.json({
            status: "success",
            message: "Order status changed to ready",
        });
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}