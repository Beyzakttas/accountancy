// Invoice.js

// Placeholder for Invoice model
const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  paymentType: String,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);