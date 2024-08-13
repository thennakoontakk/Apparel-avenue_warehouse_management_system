// supplierModel.js
const mongoose = require("mongoose");
const{ default: isEmail } = require("validator/lib/isemail");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  supplierID: {
    type: String,
    required: true,
  },
 supplierType: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: [true,"Please add a full name "],
  },

  garmentName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true,"Please add a email "],
    unique: true,
    lowercase: true,
    validate: [isEmail,"Please add a valid email  "],
  },
  phone: {
    type: Number,
    required: [true,"Please add a Phone number "],
    minlength:[10,"Please enter only 10 characters"],
    maxlength:[10,"Please enter only  characters"],

  },
  description: {
    type: String,
    required: true,
  },
  
  
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
