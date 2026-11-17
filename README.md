# 🏥 MediCore HMS — Hospital Management System

A complete, production-ready Hospital Management System built with the MERN stack.

## Tech Stack

| Area | Technology |
|------|-----------|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Validation | Zod |

## Modules

1. 📊 Admin Dashboard
2. 👥 User & Role Management
3. 🧑‍⚕️ Patient Management
4. 👨‍⚕️ Doctor Management
5. 📅 Appointment Management
6. 🏥 OPD Management
7. 🛏️ IPD Management
8. 🚪 Ward & Bed Management
9. 📋 Medical Records
10. 💊 Prescription Management
11. 🧴 Pharmacy Management
12. 🔬 Laboratory Management
13. 🩻 Radiology Management
14. 💰 Billing & Payments
15. 🚑 Ambulance Management
16. 🩸 Blood Bank Management
17. 👔 Staff & Attendance
18. 📈 Reports & Analytics

## User Roles

Super Admin · Admin · Doctor · Nurse · Receptionist · Pharmacist · Lab Technician · Radiologist · Accountant · HR Staff · Patient

## Development Phases

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Project Setup & Architecture | ✅ Done |
| Phase 2 | Frontend UI Design | 🔄 In Progress |
| Phase 3 | Authentication & Role Management | ⏳ Pending |
| Phase 4 | Patient & Doctor Management | ⏳ Pending |
| Phase 5 | Appointment, OPD & IPD | ⏳ Pending |
| Phase 6 | Ward, Bed & Medical Records | ⏳ Pending |
| Phase 7 | Prescription & Pharmacy | ⏳ Pending |
| Phase 8 | Laboratory & Radiology | ⏳ Pending |
| Phase 9 | Billing, Ambulance, Blood Bank & Staff | ⏳ Pending |
| Phase 10 | Integration, Testing & Deployment | ⏳ Pending |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/medicore_hms
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## ⚠️ Disclaimer
This system is for learning and demonstration purposes.  
Do not use for real clinical decisions without proper medical validation and regulatory compliance.

---
Built with ❤️ — MediCore HMS
