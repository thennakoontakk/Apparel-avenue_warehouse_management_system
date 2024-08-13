// managerModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const managerSchema = new Schema({
  managerID: {
    type: String,
    required: true,
  },
  managerType: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
