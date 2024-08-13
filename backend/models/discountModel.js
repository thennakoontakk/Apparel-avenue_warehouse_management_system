// discountModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;
