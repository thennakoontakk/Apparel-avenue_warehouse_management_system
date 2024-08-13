const express = require('express');
const router = express.Router();
const salaryCalculationController = require('../controllers/salaryCalculationController');

router.post('/addSalaryCalculation', salaryCalculationController.addSalaryCalculation);
router.get('/getAllSalaryCalculations', salaryCalculationController.getAllSalaryCalculations);
router.put('/updateSalaryCalculation/:id', salaryCalculationController.updateSalaryCalculation);
router.delete('/deleteSalaryCalculation/:id', salaryCalculationController.deleteSalaryCalculation);
router.get('/getSalaryCalculationByID/:id', salaryCalculationController.getSalaryCalculationById);
router.get('/getSalaryDetailsByType/:empType', salaryCalculationController.getSalaryDetailsByType);

module.exports = router;
