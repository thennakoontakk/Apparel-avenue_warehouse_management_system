// feedbackModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    feedbackID: {
      type: String,
      required: true,
    },

    c_name: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
      enum: ["Social Media", "Google", "Friends", "Colleagues"],
    },

    preference: {
      type: [String],
      required: true,
      enum: ["Yes.I Do", "No,I'm Not"],
    },

    last_purchase: {
      type: [String],
      required: true,
      enum: ["Jeans", "Dresses", "Blouses", "Denims", "Other"],
    },

    reg_customer: {
      type: String,
      required: true,
      enum: [
        "I am a Regular Customer",
        "I purchase particular item only",
        "Very rarely purchase online",
      ],
    },

    rate: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4", "5"],
    },

    satisfaction: {
      type: String,
      required: true,
      enum: ["Very Easy", "Easy", "Average", "Difficult", "Very Difficult"],
    },

    comments: {
      type: String,
    },
    suggestions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
