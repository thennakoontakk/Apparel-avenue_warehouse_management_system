// supplierOrderModel.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({

  supplierOrderID: {
    type: String,
    required: true,
  },
  supplierOrderStatus: {
    type: String,
    required: true,
  },
  ItemID: {
    type: String,
    required: true,
  },
  supplierID: {
      type: String,
      required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  itemPerPrice: {
    type: String,
    required: true,
  },
 
  
  description: {
    type: String,
    required: true,
  },
 
  
  
});

const Supplierorder = mongoose.model("Supplierorder",orderSchema);

module.exports = Supplierorder;
