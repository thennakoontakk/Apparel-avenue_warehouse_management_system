const SalaryCalculation = require('../models/salaryCalculationModel');

exports.addSalaryCalculation = async (req, res) => {
  try {
    const salaryCalculation = new SalaryCalculation(req.body);
    const newSalaryCalculation = await salaryCalculation.save();
    res.status(201).json(newSalaryCalculation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllSalaryCalculations = async (req, res) => {
  try {
    const salaryCalculations = await SalaryCalculation.find();
    res.json(salaryCalculations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSalaryCalculation = async (req, res) => {
  try {
    const updatedSalaryCalculation = await SalaryCalculation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSalaryCalculation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSalaryCalculation = async (req, res) => {
  try {
    await SalaryCalculation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Salary calculation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalaryCalculationById = async (req, res) => {
  try {
    const salaryCalculation = await SalaryCalculation.findById(req.params.id);
    if (!salaryCalculation) {
      return res.status(404).json({ message: 'Salary calculation not found' });
    }
    res.json(salaryCalculation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalaryDetailsByType = async (req, res) => {
  const { empType } = req.params;
  try {
    const salaryDetails = await SalaryCalculation.find({ empType }); 
    res.status(200).json(salaryDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
