require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Routes
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const wardRoutes = require('./routes/wardRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const billingRoutes = require('./routes/billingRoutes');
const labRoutes = require('./routes/labRoutes');
const staffRoutes = require('./routes/staffRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const opdRoutes = require('./routes/opdRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const radiologyRoutes = require('./routes/radiologyRoutes');
const bloodBankRoutes = require('./routes/bloodBankRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes');
const userRoutes = require('./routes/userRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();

// ─── Security ──────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use('/api', limiter);

// ─── Parsing ───────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Logging ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/opd', opdRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/radiology', radiologyRoutes);
app.use('/api/blood-bank', bloodBankRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportsRoutes);

// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
