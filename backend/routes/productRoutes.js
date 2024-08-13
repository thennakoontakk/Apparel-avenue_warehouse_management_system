const express = require("express");

const router = express.Router();
const {
  addProduct,
  getProductById,
} = require("../controllers/productController.js");

router.post("/", addProduct);
router.get("/get/:id", getProductById);

module.exports = router;
