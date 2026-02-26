// invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../Controllers/invoiceController');
const authMiddleware = require('../Middleware/authMiddleware');
const roleMiddleware = require('../Middleware/roleMiddleware');

// Invoice routes
router.get('/', authMiddleware, invoiceController.getAllInvoices);
router.post('/', authMiddleware, roleMiddleware(['Admin']), invoiceController.createInvoice);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), invoiceController.updateInvoice);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), invoiceController.deleteInvoice);

module.exports = router;