const Customer = require("../models/customerModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await Customer.create(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.allUsers = async (req, res) => {
  try {
    const users = await Customer.find();
    res.json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email, password }).select("name _id");
    if (user) {
      return res.json({
        status: "success",
        data: user,
      });
    }
    res.status(401).json({
      status: "failed",
      message: "Invalid email or password",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
