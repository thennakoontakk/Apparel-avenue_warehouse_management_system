// driverRoutes.js
const express = require("express");
const router = express.Router();
const {
    addDriver,
    getAllDrivers,
    updateDriver,
    deleteDriver,
    getDriverById,
    
} = require("../controllers/driverController.js");

router.post("/add", addDriver);
router.get("/", getAllDrivers);
router.put("/update/:Id", updateDriver);
router.delete("/delete/:id", deleteDriver);
router.get("/get/:id", getDriverById);


module.exports = router;
