// supplierRoutes.js
const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getAllSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
} = require("../controllers/supplierController.js");

router.post("/add-supplier", addSupplier);
router.get("/getAll", getAllSupplier);
router.put("/update-supplier/:id", updateSupplier);
router.delete("/delete-supplier/:id", deleteSupplier);
router.get("/get-supplier/:id", getSupplierById);

module.exports = router;
