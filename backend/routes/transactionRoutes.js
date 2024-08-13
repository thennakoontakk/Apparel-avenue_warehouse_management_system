const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/addTransaction', transactionController.addTransaction);
router.get('/getTransaction', transactionController.getAllTransactions);
router.put('/updateTransaction/:id', transactionController.updateTransaction);
router.delete('/deleteTransaction/:id', transactionController.deleteTransaction);
router.get('/getTransactionByID/:id', transactionController.getTransactionById);

module.exports = router;
