//cartModel and OrderModel used

const Cart = require("../models/cartModel");
const Discount = require("../models/discountModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const uniqid = require("uniqid");

// Validate MongoDB ObjectId
const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Invalid ObjectId");
};

// Create a new cart item
const createCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.create(req.body);
    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a cart item by ID
const updateCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCartItem = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a cart item by ID
const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(204).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
};
