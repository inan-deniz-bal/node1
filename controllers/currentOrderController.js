const mongoose = require("mongoose");
const Customer = require("../models/customerModel");
const pastOrders = require("../models/pastOrders");
const CurrentOrder = require("../models/currentOrder");
const Table = require("../models/tableModel");

exports.createCurrentOrder = async (req, res) => {
  try {
    console.log("merhaba");
    const now = new Date();
    const offset = 3 * 60; // GMT+3 saat dilimi için ofset (dakika cinsinden)

    // GMT+3 zaman diliminde saat al
    const gmt3Date = new Date(now.getTime() + offset * 60 * 1000);

    console.log("gmt3Date", gmt3Date);
    const orderDate = req.body.date
 

    const order = req.body;
    console.log("sipariş", order);
    //console.log("sipariş", order)
    console.log("sipariş tarihi", orderDate);
    if (!mongoose.Types.ObjectId.isValid(order.customerId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid customer ID" });
    } //)

    const newOrder = new CurrentOrder(req.body);
    //console.log("yeni sipariş", newOrder);

    const table = await Table.findById(newOrder.tableId);
    //console.log("masa", table)

    if (!table) {
      return res.status(400).json({
        status: "failed",
        message: "Table not found",
      });
    }

    if (gmt3Date - orderDate >= 10000) {
      console.log("geçmiş zamanlı sipariş");
      return res.status(400).json({
        status: "failed",
        message: "Geçmiş zamanlı sipariş veremezsiniz!",
      });
    }
    if (table.orders.length === 0) {
      await newOrder.save();
      table.orders.push({
        date: orderDate,
        currentOrder: newOrder._id,
        customerId: newOrder.customerId,
        status: "occupied",
      });
      await table.save();
      return res.status(201).json({
        status: "success",
        data: newOrder,
      });
    }
    console.log("masa siparişi", table.orders);
    table.orders.forEach((order) => {
      if (order.status === "occupied") {
        if (Math.abs(orderDate - gmt3Date) <= 3600000) {
          return res.status(400).json({
            status: "failed",
            message: "Masa rezerve edilmiş!",
          });
        }
      }
    });

    await newOrder.save();
    table.orders.push({
      date: orderDate,
      currentOrder: newOrder._id,
      customerId: newOrder.customerId,
      status: "occupied",
    });
    await table.save();

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
    const { orderID, tableId } = req.params;
    console.log("orderID", orderID, "tableId", tableId);
    if (!mongoose.Types.ObjectId.isValid(orderID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid order ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid table ID" });
    }
    const table = await Table.findById(tableId).populate("orders");

    newOrders = [];
    if (table.orders.length !== 0) {
      table.orders.forEach((order) => {
        console.log("currentorder", order.currentOrder._id.toString(), orderID);
        if (order.currentOrder._id.toString() !== orderID) {
          newOrders.push(order);
        }
      });
      table.orders = newOrders;
      await table.save();
    }

    console.log("masa2", table);
    const order = await CurrentOrder.findById(orderID);
    order.orderStatus = "closed";
    await order.save();

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

exports.allActiveOrders = async (req, res) => {
  try {
    const orders = await CurrentOrder.find({ orderStatus: "active" });
    res.json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const customerID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid customer ID" });
    }
    const orders = await CurrentOrder.find({
      customerId: customerID,
      orderStatus: !"closed",
    });
    res.json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
