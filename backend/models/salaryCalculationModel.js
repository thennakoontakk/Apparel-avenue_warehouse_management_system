const mongoose = require('mongoose');

const salaryCalcSchema = new mongoose.Schema({
  empID: { type: String, required: true },
  empType: { type: String, required: true },
  basic: { type: Number, required: true },
  otRate: { type: Number, required: true },
  bonus: { type: Number, required: true },
  otHours: { type: Number, required: true }
});

const SalaryCalculation = mongoose.model('SalaryCalculation', salaryCalcSchema);

module.exports = SalaryCalculation;
