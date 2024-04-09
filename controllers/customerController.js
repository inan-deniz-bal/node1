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
    }
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
    }

