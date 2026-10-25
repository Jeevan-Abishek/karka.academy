require('dotenv').config();
const dns = require('dns');
// Use public DNS to ensure robust SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // fallback to system default
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const ContactLead = require('./models/ContactLead');
const EnrollmentLead = require('./models/EnrollmentLead');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
// GET /
app.get('/', (req, res) => {
  res.send('Karka Academy Backend API is live');
});

// POST /api/contact - Career counseling / contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;
    const newLead = new ContactLead({ name, email, phone, program, message });
    await newLead.save();
    console.log('Saved Contact Lead:', newLead);
    return res.status(200).json({
      success: true,
      message: 'Message received and saved successfully!',
      data: newLead
    });
  } catch (error) {
    console.error('Error saving contact lead:', error);
    return res.status(500).json({ success: false, message: 'Server error saving data' });
  }
});

// POST /api/enroll - Course enrollment leads
app.post('/api/enroll', async (req, res) => {
  try {
    const { token, name, email, phone, track, degree, gradYear } = req.body;
    const newEnrollment = new EnrollmentLead({ token, name, email, phone, track, degree, gradYear });
    await newEnrollment.save();
    console.log('Saved Enrollment Lead:', newEnrollment);
    return res.status(200).json({
      success: true,
      message: 'Enrollment application saved successfully!',
      data: newEnrollment
    });
  } catch (error) {
    console.error('Error saving enrollment lead:', error);
    return res.status(500).json({ success: false, message: 'Server error saving enrollment' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Karka Academy Backend server is running on http://localhost:${PORT}`);
});
