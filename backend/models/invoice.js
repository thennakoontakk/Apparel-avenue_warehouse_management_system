const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  billTo: { type: String, required: true },
  total: { type: Number, required: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
