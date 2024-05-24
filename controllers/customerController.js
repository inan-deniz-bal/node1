const Customer = require("../models/customerModel");

exports.createUser = async (req, res) => {
  try {
    const response = req.body;
    const mail=response.email;
    console.log(response);
    console.log(mail);
    const isUserNew = await Customer.find({email:mail});
    console.log(isUserNew);
    if (isUserNew) {
      return res.status(401).json({
        status: "failed",
        message: "User already exists",
      });
 
    }
    const newUser = await Customer.create( response );
    console.log(newUser)
    return res.status(201).json({
      status: "success",
      data: {
        email: newUser.email,
        userid: newUser._id,
      },
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
    const user = await Customer.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          status: "success",
          message: "Login successful",
          data: {
            email: user.email,
            userid: user._id,
            userType:user.userType
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
