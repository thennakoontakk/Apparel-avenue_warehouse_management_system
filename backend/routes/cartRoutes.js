const express = require("express");
const router = express.Router();
const {
  createCartItem,
  getAllCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

router.post("/", createCartItem);
router.get("/", getAllCartItems);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
