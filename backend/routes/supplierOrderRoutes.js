// supplierRoutes.js
const express = require("express");

const router = express.Router();
const {
    addSupplierOrder,
  getAllSupplierOrder,
  updateSupplierOrder,
  deleteSupplierOrder,
  getSupplierOrderById
} = require("../controllers/supplierorderController.js");
addSupplierOrder

router.post("/add-supplierOrder", addSupplierOrder);
router.get("/getAllSupplierOrder", getAllSupplierOrder);
router.put("/update-supplierOrder/:id", updateSupplierOrder);
router.delete("/delete-supplierOrder/:id", deleteSupplierOrder);
router.get("/get-supplierOrder/:id", getSupplierOrderById);

module.exports = router;
