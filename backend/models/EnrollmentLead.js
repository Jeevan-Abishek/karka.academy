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
  campus: { type: String, default: '' },
  format: { type: String, default: '' },
  commitment: { type: String, default: '' },
  visitDate: { type: String, default: '' },
  fitScore: { type: String, default: '' },
  quizAnswers: { type: mongoose.Schema.Types.Mixed },
  source: { type: String, default: 'website' },
  status: { type: String, default: 'Pending Review' }
}, { timestamps: true });

module.exports = mongoose.model('EnrollmentLead', EnrollmentLeadSchema);

