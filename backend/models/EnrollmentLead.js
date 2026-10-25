const mongoose = require('mongoose');

const EnrollmentLeadSchema = new mongoose.Schema({
  token: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  track: { type: String, required: true },
  degree: { type: String },
  gradYear: { type: String },
  status: { type: String, default: 'Pending Review' }
}, { timestamps: true });

module.exports = mongoose.model('EnrollmentLead', EnrollmentLeadSchema);
