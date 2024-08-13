// orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  addOrder,
  getAllOrders,
  deleteOrder,
  getOrderById,
} = require("../controllers/orderController.js");

router.post("/", addOrder);
router.get("/", getAllOrders);
router.delete("/delete/:id", deleteOrder);
router.get("/get/:id", getOrderById);

module.exports = router;
