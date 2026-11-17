/**
 * Seed Script — creates demo admin user
 * Run: node src/utils/seeder.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Create super admin
    const existing = await User.findOne({ email: 'admin@medicore.com' });
    if (!existing) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@medicore.com',
        password: 'Admin@123',
        role: 'super_admin',
        isActive: true,
      });
      console.log('✅ Super Admin created: admin@medicore.com / Admin@123');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Create demo doctor user
    const docExists = await User.findOne({ email: 'doctor@medicore.com' });
    if (!docExists) {
      await User.create({
        name: 'Dr. Priya Sharma',
        email: 'doctor@medicore.com',
        password: 'Doctor@123',
        role: 'doctor',
        isActive: true,
      });
      console.log('✅ Demo Doctor created: doctor@medicore.com / Doctor@123');
    }

    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
