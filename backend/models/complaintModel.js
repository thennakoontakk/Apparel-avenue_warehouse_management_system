// complaintModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    complaintID: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now, // Set default value to current date
    },

    orderID: {
      type: String,
      required: [true, "Please enter the correct Order ID"],
    },

    customerID: {
      type: String,
      validate: {
        validator: function (value) {
          return /^CU\d{4}$/.test(value);
        },
      },

      required: [true, "Please enter the correct Customer ID"],
    },

    contact_no: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if the value contains exactly 10 digits
          return /^[0-9]{10}$/.test(value);
        },
      },
      required: [true, "Please enter a valid contact Number with 10 digits"],
    },

    complaintType: {
      type: String,
      required: true,
      enum: [
        "Delivery Delays",
        "Defect Products",
        "Incorrect/Incomplete Order",
        "Other",
      ],
    },

    requestType: {
      type: String,
      required: true,
      enum: ["Return", "Refund", "None"],
      default: "None", // Default value is "None"
    },

    description: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
