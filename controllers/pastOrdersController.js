const Order = require("../models/currentOrder");
const PastOrder = require("../models/pastOrders");
const Customer = require("../models/customerModel");
const mongoose = require("mongoose");
/*
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
*/
exports.getUserOrders = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid user ID",
      });
    }

    const userOrders = await PastOrder.find({ customerId: userID })
      .populate("orders")
      .select("orders");
    if (userOrders.length === 0) {
      res.json({
        status: "failed",
        message: "User has no orders",
      });
    } else {
      res.json({
        status: "success",
        length: userOrders.length,
        data: userOrders,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.allPastOrders=async(req,res)=>{
  try{
    const pastOrders = await PastOrder.find().populate("orders"); // populate fonksiyonu "orders" alanı üzerinde çağrıldı
    res.status(200).json(pastOrders);
  }
  catch(error){
    res.status(404).json({message:error.message});
  }
}
/*
exports.createPastOrder=async(req,res)=>{
  try{
    const {customerId,restaurantName,date,totalPrice,orderedMeals}=req.body;
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({
        status: "failed",
        message: "There is not a customer with this ID",
      });
    }
    else{
      const newPastOrder=new PastOrder({customerId,restaurantName,date,totalPrice,orderedMeals});
      await newPastOrder.save();
      res.status(201).json(newPastOrder);
    }


  }
  catch(error){
    res.status(404).json({message:error.message});
  }
};*/
