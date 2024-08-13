const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); //importing neccessary files
require("dotenv").config();
const cloudinary = require("./cloudinary");

const app = express(); //creating app

// create a server
const PORT = process.env.PORT || 8500;

//connect server
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

//creating a database
const URL = process.env.MONGODB_URL;
mongoose.connect(URL);

//connecting database
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection success");
});

//json format
app.use(cors());
app.use(bodyParser.json());

//router path user
const userRouter = require("./routes/userRoutes.js");
app.use("/user", userRouter);

const itemRouter = require("./routes/itemRoutes.js");
app.use("/item", itemRouter);

//router path complaint
const complaintRouter = require("./routes/complaintRoutes.js");
app.use("/complaint", complaintRouter);

//router path feedback
const feedbackRouter = require("./routes/feedbackRoutes.js");
app.use("/feedback", feedbackRouter);

//router path vehicle
const vehicleRouter = require("./routes/vehicleRoutes.js");
app.use("/vehicle", vehicleRouter);

//router path driver
const driverRouter = require("./routes/driverRoutes.js");
app.use("/driver", driverRouter);

const assignRouter = require("./routes/assignRoutes.js");
app.use("/assign", assignRouter);

//router path supplier
const supplierRouter = require("./routes/supplierRoutes.js");
app.use("/supplier", supplierRouter);

//router path supplier order
const supplierOrderRouter = require("./routes/supplierOrderRoutes.js");
app.use("/supplierorder", supplierOrderRouter);

//finance
const managerRouter = require("./routes/managerRoutes.js");
const invoiceRouter = require("./routes/invoiceRoutes.js");
const salaryCalculationRouter = require("./routes/salaryCalculationRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");

app.use("/manager", managerRouter);
app.use("/invoice", invoiceRouter);
app.use("/salary", salaryCalculationRouter);
app.use("/transaction", transactionRouter);

//order management

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: "20mb",
  })
);

app.post("/upload", async (req, res, next) => {
  try {
    const image_url = req.body.image_url;

    const cloudinary_res = await cloudinary.uploader.upload(image_url, {
      folder: "/images",
    });

    const imageUrl = uploadResult.secure_url;
    console.log(imageUrl);

    console.log(cloudinary_res);
  } catch (err) {
    console.log(err);
  }
});

//router path discount
const discountRouter = require("./routes/discountRoutes.js");
app.use("/discount", discountRouter);

//router path cart
const cartRouter = require("./routes/cartRoutes.js");
app.use("/cart", cartRouter);

const orderRouter = require("./routes/orderRoutes.js");
app.use("/order", orderRouter);

const productRouter = require("./routes/productRoutes.js");
app.use("/product", productRouter);
