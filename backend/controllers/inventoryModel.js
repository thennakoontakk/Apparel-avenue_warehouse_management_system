// InventoryModel.js
const mongoose = require("mongoose");

const InventoryModelSchema = mongoose.Schema;

const managerSchema = new Schema({
 ItemID: {
    type: String,
    required: true,
  },
  
});

const Inventory= mongoose.model("Inventory", InventoryModelSchema);

module.exports = Inventory;
