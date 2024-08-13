const express = require("express");
const router = express.Router();
const {
    addAssignment,
    getAllAssignments,
    updateAssignment,
    deleteAssignment,
    getAssignmentById,
} = require("../controllers/assignController.js");

router.post("/add", addAssignment);
router.get("/", getAllAssignments);
router.put("/update/:Id", updateAssignment);
router.delete("/delete/:id", deleteAssignment);
router.get("/get/:id", getAssignmentById);

module.exports = router;
