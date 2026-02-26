// Company.js

// Placeholder for Company model
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: String,
  quota: Number,
});

module.exports = mongoose.model('Company', CompanySchema);