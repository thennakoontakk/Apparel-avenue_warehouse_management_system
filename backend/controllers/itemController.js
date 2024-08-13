// controllers/itemController.js
const expressAsyncHandler = require("express-async-handler");
const Item = require("../models/item");

// Controller function to add an item
exports.addItem = expressAsyncHandler(async (req, res) => {
  const { name, description, price, quantity } = req.body;

  // Validation
  if (!name || !description || !price || !quantity) {
    res.status(400);
    return res.json({ error: "Please include all fields" });
  }

  // Create a new item
  const newItem = new Item({
    name,
    description,
    price,
    quantity,
  });

  try {
    // Save the new item to the database
    await newItem.save();

    // Send response with the newly added item
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Controller function to get best selling items
exports.getBestSellingItems = async (req, res) => {
  try {
    const bestSellingItems = await Item.find().sort({ quantity: -1 }).limit(10);
    res.status(200).json(bestSellingItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get recently added items
exports.getRecentlyAddedItems = async (req, res) => {
  try {
    const recentlyAddedItems = await Item.find()
      .sort({ dateAdded: -1 })
      .limit(6);
    res.status(200).json(recentlyAddedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get most viewed items
exports.getMostViewedItems = async (req, res) => {
  try {
    const mostViewedItems = await Item.find().sort({ views: -1 }).limit(10);
    res.status(200).json(mostViewedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
