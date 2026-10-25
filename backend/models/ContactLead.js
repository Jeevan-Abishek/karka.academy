const mongoose = require('mongoose');

const ContactLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  message: { type: String },
  source: { type: String, default: 'Website Contact Form' },
  status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('ContactLead', ContactLeadSchema);
