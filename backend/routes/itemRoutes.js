// routes/itemRoutes.js

const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Route to add an item
router.post("/add", itemController.addItem);

// Route to get best selling items
router.get("/best-selling", itemController.getBestSellingItems);

// Route to get recently added items
router.get("/recently-added", itemController.getRecentlyAddedItems);

// Route to get most viewed items
router.get("/most-viewed", itemController.getMostViewedItems);

module.exports = router;
