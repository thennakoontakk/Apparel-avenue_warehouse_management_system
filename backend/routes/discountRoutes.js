// discountRoutes.js
const express = require("express");
const router = express.Router();
const {
  addDiscount,
  getAllDiscounts,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
} = require("../controllers/discountController.js");

router.post("/add", addDiscount);
router.get("/", getAllDiscounts);
router.put("/update/:id", updateDiscount);
router.delete("/delete/:id", deleteDiscount);
router.get("/get/:id", getDiscountById);

module.exports = router;
