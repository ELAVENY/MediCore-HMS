require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// ─── Request Parsing ───────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRoutes);

// Placeholder for future route registrations
// app.use('/api/auth', authRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/doctors', doctorRoutes);
// ... (added in later phases)

// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
