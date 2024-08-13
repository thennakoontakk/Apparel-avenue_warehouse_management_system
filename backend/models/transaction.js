const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
