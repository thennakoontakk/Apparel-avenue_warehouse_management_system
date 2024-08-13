const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  quantity_in_stock: {
    type: Number,
  },
  color: {
    type: [String], // Assuming color is a string
  },
  size: {
    type: [String], // Assuming color is a string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
