const mongoose = require('mongoose');

const EnrollmentLeadSchema = new mongoose.Schema({
  token: { type: String },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true },
  track: { type: String },
  course: { type: String },
  degree: { type: String, default: '' },
  gradYear: { type: String, default: '' },
  source: { type: String, default: 'website' },
  status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('EnrollmentLead', EnrollmentLeadSchema);

