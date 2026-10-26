require('dotenv').config({ path: require('path').join(__dirname, '.env') });
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

const path = require('path');
const ContactLead = require('./models/ContactLead');
const EnrollmentLead = require('./models/EnrollmentLead');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

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

// POST /api/leads/syllabus-download - Syllabus download WhatsApp trigger
app.post('/api/leads/syllabus-download', async (req, res) => {
  try {
    const { name, phone, course, optInUpdates } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone are required' });
    }

    const cleanName = String(name).trim();
    const cleanPhone = String(phone).trim();
    const selectedCourse = course ? String(course).trim() : 'Official Syllabus Download';

    // Save under enrollmentleads collection as requested
    const newEnrollmentLead = new EnrollmentLead({
      name: cleanName,
      phone: cleanPhone,
      course: selectedCourse,
      track: selectedCourse,
      source: 'whatsapp_syllabus_download',
      status: 'New',
      createdAt: new Date()
    });

    await newEnrollmentLead.save();
    console.log('Saved WhatsApp Syllabus Lead (EnrollmentLead):', newEnrollmentLead);

    return res.status(200).json({
      success: true,
      message: 'Lead saved successfully',
      data: newEnrollmentLead
    });
  } catch (error) {
    console.error('Error saving syllabus download lead:', error);
    return res.status(500).json({ success: false, message: 'Server error saving syllabus lead' });
  }
});

// Admin Authentication Middleware
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || 'karka@admin2026';

const requireAdmin = (req, res, next) => {
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey || (req.body && req.body.adminKey);
  if (!providedKey || providedKey !== ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing Admin API Key'
    });
  }
  next();
};

// POST /api/admin/verify - Verify admin passcode
app.post('/api/admin/verify', requireAdmin, (req, res) => {
  res.status(200).json({ success: true, message: 'Passcode verified successfully' });
});

// GET /api/admin/leads - Fetch all Contact and Enrollment leads (newest first)
app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  try {
    const contacts = await ContactLead.find().sort({ createdAt: -1 });
    const enrollments = await EnrollmentLead.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      contacts,
      enrollments
    });
  } catch (error) {
    console.error('Error fetching admin leads:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching leads' });
  }
});

// DELETE /api/admin/lead/:type/:id - Delete lead (type: contact or enrollment)
app.delete('/api/admin/lead/:type/:id', requireAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    let deleted = null;
    if (type === 'contact') {
      deleted = await ContactLead.findByIdAndDelete(id);
    } else if (type === 'enrollment') {
      deleted = await EnrollmentLead.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid lead type' });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Lead record not found' });
    }

    console.log(`Deleted ${type} lead:`, id);
    return res.status(200).json({ success: true, message: 'Lead deleted successfully', id });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting lead' });
  }
});

// PATCH /api/admin/lead/:type/:id - Update lead status
app.patch('/api/admin/lead/:type/:id', requireAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    let updated = null;
    if (type === 'contact') {
      updated = await ContactLead.findByIdAndUpdate(id, { status }, { returnDocument: 'after', new: true });
    } else if (type === 'enrollment') {
      updated = await EnrollmentLead.findByIdAndUpdate(id, { status }, { returnDocument: 'after', new: true });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid lead type' });
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Lead record not found' });
    }

    console.log(`Updated ${type} lead ${id} status to:`, status);
    return res.status(200).json({ success: true, message: 'Lead status updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return res.status(500).json({ success: false, message: 'Server error updating lead status' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Karka Academy Backend server is running on http://localhost:${PORT}`);
});

