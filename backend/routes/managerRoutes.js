// managerRoutes.js
const express = require("express");
const router = express.Router();
const {
  addManager,
  getAllManagers,
  updateManager,
  deleteManager,
  getManagerById,
} = require("../controllers/managerController.js");

router.post("/add", addManager);
router.get("/", getAllManagers);
router.put("/update/:id", updateManager);
router.delete("/delete/:id", deleteManager);
router.get("/get/:id", getManagerById);

module.exports = router;
