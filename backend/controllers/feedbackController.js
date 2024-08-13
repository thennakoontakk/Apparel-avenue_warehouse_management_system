// feedbackController.js
const Feedback = require("../models/feedbackModel.js");
const expressAsyncHandler = require("express-async-handler");

const addFeedback = expressAsyncHandler(async (req, res) => {
  const {
    c_name,
    source,
    preference,
    last_purchase,
    reg_customer,
    rate,
    satisfaction,
    comments,
    suggestions,
  } = req.body;

  // Generating feedbackID
  let feedbackID;

  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    feedbackID = "FI" + randomNum.toString();
  } while (await Feedback.findOne({ feedbackID: feedbackID }));

  try {
    const existingFeedback = await Feedback.findOne({ feedbackID });

    if (existingFeedback) {
      return res.status(400).json({ error: "feedbackID already exists" });
    }

    const newFeedback = new Feedback({
      feedbackID,
      c_name,
      source,
      preference,
      last_purchase,
      reg_customer,
      rate,
      satisfaction,
      comments,
      suggestions,
    });
    await newFeedback.save();

    if (newFeedback) {
      res.status(201).json({
        feedbackID: newFeedback.feedbackID,
        c_name: newFeedback.c_name,
        source: newFeedback.source,
        preference: newFeedback.preference,
        last_purchase: newFeedback.last_purchase,
        reg_customer: newFeedback.reg_customer,
        rate: newFeedback.rate,
        satisfaction: newFeedback.satisfaction,
        comments: newFeedback.comments,
        suggestions: newFeedback.suggestions,

        message: "Feedback submitted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add feedback" });
  }
});

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

const updateFeedback = async (req, res) => {
  const { feedbackID } = req.params;
  const {
    c_name,
    source,
    preference,
    last_purchase,
    reg_customer,
    rate,
    satisfaction,
    comments,
    suggestions,
  } = req.body;
  try {
    const feedback = await Feedback.findOne({ feedbackID: feedbackID });

    if (!feedback) {
      return res.status(404).json({ error: "feedback not found" });
    }

    if (c_name) feedback.c_name = c_name;
    if (source) feedback.source = source;
    if (preference) feedback.preference = preference;
    if (last_purchase) feedback.last_purchase = last_purchase;
    if (reg_customer) feedback.reg_customer = reg_customer;
    if (rate) feedback.rate = rate;
    if (satisfaction) feedback.satisfaction = satisfaction;
    if (comments) feedback.comments = comments;
    if (suggestions) feedback.suggestions = suggestions;

    await feedback.save();

    res.status(200).json({
      feedbackID: feedback.feedbackID,
      c_name: feedback.c_name,
      source: feedback.source,
      preference: feedback.preference,
      last_purchase: feedback.last_purchase,
      reg_customer: feedback.reg_customer,
      rate: feedback.rate,
      satisfaction: feedback.satisfaction,
      comments: feedback.comments,
      suggestions: feedback.suggestions,

      message: "Feedback details updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update feedback" });
  }
};

const deleteFeedback = async (req, res) => {
  const { feedbackID } = req.params;
  try {
    const deleteFeedback = await Feedback.findOneAndDelete({
      feedbackID: feedbackID,
    });

    if (!deleteFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};

const getFeedbackById = async (req, res) => {
  const { feedbackID } = req.params;
  try {
    const feedback = await Feedback.findOne({ feedbackID: feedbackID });
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

module.exports = {
  addFeedback,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback,
  getFeedbackById,
};
