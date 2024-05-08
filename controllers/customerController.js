const Customer = require("../models/customerModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserNew = await Customer.findOne({ email });
    console.log(isUserNew);
    if (isUserNew) {
      res.status(401).json({
        status: "failed",
        message: "User already exists",
      });
      return;
    }
    const newUser = await Customer.create({ name, email, password });
    res.status(201).json({
      status: "success",
      data: {
        email: newUser.email,
        userid: newUser._id,
      },
    });
    return;
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
    const user = await Customer.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          status: "success",
          message: "Login successful",
          data: {
            email: user.email,
            userid: user._id,
          },
        });
        return;
      } else {
        res.status(401).json({
          status: "failed",
          message: "Invalid email or password",
        });
        return;
      }
    }
    res.status(401).json({
      status: "failed",
      message: "Email not found",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
