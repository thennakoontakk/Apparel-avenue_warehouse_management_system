// feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  addFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
  getFeedbackById,
} = require("../controllers/feedbackController.js");

router.post("/add-feedback", addFeedback);
router.get("/allFeedbacks", getAllFeedbacks);
router.put("/update-feedback/:feedbackID", updateFeedback);
router.delete("/delete-feedback/:feedbackID", deleteFeedback);
router.get("/get/:feedbackID", getFeedbackById);

module.exports = router;
