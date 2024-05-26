const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Customer = require("./models/customerModel");
const Card = require("./models/cardModel");
const pastOrderRouter = require("./routes/pastOrderRouter");
const customerRouter = require("./routes/customerRouter");
const currentOrderRouter = require("./routes/currentOrderRouter");
const restaurantRouter = require("./routes/restaurantRouter");
const cardRouter = require("./routes/cardRouter");
const tableRouter = require("./routes/tableRouter");
const restOrderRouter = require("./routes/restOrderRouter");
const tempOrderRouter = require("./routes/tempOrderRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/pastOrders", pastOrderRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/currentOrders", currentOrderRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/cards/", cardRouter);
app.use("/api/v1/tables", tableRouter);
app.use("/api/v1/rest", restOrderRouter);
app.use("/api/v1/tempOrders", tempOrderRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(
    //"mongodb+srv://idb:lGZfzsmEAIj3RMTN@cluster0.6xaa8gm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    "mongodb+srv://user2:user2.idb@cluster0.6xaa8gm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// Kartı ve müşteriyi aynı anda kaydetmek için async/await kullanabilirsiniz
const createCustomerWithCard = async () => {
  try {
    const card1 = new Card({
      cardNo: "1234567890",
      cardHolder: "John Doe",
      cvv: "123",
      expirityDate: {
        month: "01",
        year: "2022",
      },
    });
    const card2 = new Card({
      cardNo: "1234567890",
      cardHolder: "John Doe",
      cvv: "123",
      expirityDate: {
        month: "01",
        year: "2022",
      },
    });

    const customer = new Customer({
      name: "John Doe",
      email: "",
      password: "password",
      cardInfo: [card1._id, card2._id], // Kartın ObjectId'sini atıyoruz
    });

    card1.save();
    card2.save();
    const savedCustomer = await customer.save();
    console.log(savedCustomer);
  } catch (error) {
    console.error("Failed to create customer with card:", error);
  }
};
