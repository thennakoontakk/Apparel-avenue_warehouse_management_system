const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/addInvoice', invoiceController.addInvoice);
router.get('/getInvoice', invoiceController.getAllInvoices);
router.put('/updateInvoice/:id', invoiceController.updateInvoice);
router.delete('/deleteInvoice/:id', invoiceController.deleteInvoice);
router.get('/getInvoiceByID/:id', invoiceController.getInvoiceById);

module.exports = router;
