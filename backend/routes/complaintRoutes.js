// complaintRoutes.js
const express = require("express");
const router = express.Router();
const {
  addComplaint,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
  updateStatus,
} = require("../controllers/complaintController.js");

router.post("/add-Complaint", addComplaint);
router.get("/allComplaints", getAllComplaints);
router.put("/update-complaint/:complaintID", updateComplaint);
router.delete("/delete-complaint/:complaintID", deleteComplaint);
router.get("/get/:complaintID", getComplaintById);
router.put("/update-status/:complaintID", updateStatus);

module.exports = router;
