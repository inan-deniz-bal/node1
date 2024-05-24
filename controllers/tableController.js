const mongoose = require("mongoose");
const Table = require("../models/tableModel");
const Restaurant = require("../models/restaurantModel");
const CurrentOrder = require("../models/currentOrder");

exports.getAllTables = async (req, res) => {
  try {
    const Table = mongoose.model("Table");
    const tables = await Table.find();
    res.status(200).json({
      status: "success",
      results: tables.length,
      data: {
        tables,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createTable = async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        status: "fail",
        message: "No restaurant found with that ID",
      });
    }

    const tables = req.body; // Assuming req.body is an array of table objects
    if (!Array.isArray(tables)) {
      return res.status(400).json({
        status: "fail",
        message: "Request body should be an array of table objects",
      });
    }

    const createdTables = [];

    for (const tableData of tables) {
      const table = await Table.create(tableData);
      restaurant.tableList.push(table._id);
      createdTables.push(table);
      console.log(`Table created with ID: ${table._id}`);
    }

    await restaurant.save();
    console.log(`Restaurant updated with new tables: ${restaurant.tableList}`);

    res.status(201).json({
      status: "success",
      data: {
        tables: createdTables,
      },
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        table,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAllTables = async (req, res) => {
  try {
    await Table.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getRestaurantTables = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "tableList"
    );
    console.log(restaurant);
    if (!restaurant) {
      return res.status(404).json({
        status: "fail",
        message: "No restaurant found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        tables: restaurant.tableList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTableByQrCode = async (req, res) => {
  try {
    const tableid = req.params.id;
    const date = Date.now();
    const table = await Table.findById(tableid);
    console.log("table", table);

    if (!table) {
      return res.status(404).json({
        status: "fail",
        message: "No table found with that ID",
      });
    }

    //const date = req.body.date;

    const currentOrder = await CurrentOrder.findOne({
      tableId: tableid,
    });
    if (!currentOrder) {
      const restaurant = await Restaurant.findOne({
        tableList: tableid,
      });
      console.log(restaurant);
      return res.status(200).json({
        status: "success",
        data: {
          menu: restaurant.menu,
        },
      });
    }
    if (Math.abs(new Date(currentOrder.date) - date) >= 3600000) {
      const restaurant = await Restaurant.findOne({
        tableList: tableid,
      });
      return res.status(200).json({
        status: "success",
        data: {
          menu: restaurant.menu,
        },
      });
    }
    return res.status(400).json({
      status: "failed",
      message: "Masa rezerve edilmiştir, lütfen başka bir masaya geçiniz!",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
