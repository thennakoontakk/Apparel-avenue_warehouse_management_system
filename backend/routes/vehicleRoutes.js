// vehicleRoutes.js
const express = require("express");
const router = express.Router();
const {
    addVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
} = require("../controllers/vehicleController.js");

router.post("/add", addVehicle);
router.get("/", getAllVehicles);
router.put("/update/:Id", updateVehicle);
router.delete("/delete/:id", deleteVehicle);
router.get("/get/:id", getVehicleById);

module.exports = router;
