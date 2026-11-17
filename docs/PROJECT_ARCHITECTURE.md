# MediCore HMS — Project Architecture

## Overview

MediCore HMS is a **Modular Monolithic** full-stack MERN application.

```
MediCore-HMS/
├── frontend/          React + Vite + Tailwind CSS
├── backend/           Node.js + Express + MongoDB
└── docs/              API, Schema, Architecture docs
```

## Frontend Architecture

```
src/
├── App.jsx                  → BrowserRouter + AuthProvider
├── main.jsx                 → React entry point
├── index.css                → Tailwind v4 global styles
│
├── routes/
│   └── AppRoutes.jsx        → All routes + RequireAuth guard
│
├── context/
│   └── AuthContext.jsx      → Global auth state (user, login, logout)
│
├── components/
│   ├── layout/
│   │   ├── MainLayout.jsx   → Sidebar + Header wrapper
│   │   ├── Sidebar.jsx      → Nav links for all 18 modules
│   │   └── Header.jsx       → Top bar + profile dropdown
│   ├── common/
│   │   ├── DashboardCard    → Stats card with trend
│   │   ├── DataTable        → Generic table with loading skeleton
│   │   ├── Modal            → Reusable overlay modal
│   │   ├── Pagination       → Page controls
│   │   ├── SearchBar        → Search input with clear
│   │   └── Toast            → Notification toasts
│   ├── forms/
│   │   └── FormInput        → Input, Select, Textarea with error
│   └── ui/
│       ├── Button           → Variants: primary, secondary, outline…
│       └── StatusBadge      → Color-coded status pill
│
├── pages/               18 module pages with mock + real data
├── hooks/
│   ├── useFetch.js      → Generic GET hook
│   ├── useMutation.js   → POST/PUT/PATCH/DELETE
│   └── useToast.js      → Toast notification hook
├── services/            One service file per module (Axios calls)
└── utils/
    ├── cn.js            → Tailwind class merger
    └── constants.js     → Roles, status enums, blood groups
```

## Backend Architecture

```
src/
├── server.js            → Entry: loads .env, connects DB, starts server
├── app.js               → Express app: middleware + all routes registered
│
├── config/
│   └── db.js            → Mongoose connection
│
├── models/ (16)         → Mongoose schemas with auto-IDs, virtuals
├── controllers/ (12)    → Request handlers (thin, calls services)
├── routes/ (12)         → Express routers with protect + authorize
├── services/
│   └── authService.js   → Business logic for auth
├── middleware/
│   ├── auth.js          → protect (JWT verify) + authorize (RBAC)
│   ├── errorHandler.js  → Global error handler
│   └── notFound.js      → 404 handler
├── validators/
│   └── authValidator.js → Zod schemas + validate middleware
└── utils/
    ├── apiResponse.js   → successResponse, errorResponse, paginatedResponse
    ├── jwt.js           → generateAccessToken, generateRefreshToken
    └── seeder.js        → Creates demo admin + doctor accounts
```

## Security Design

| Layer | Mechanism |
|-------|-----------|
| Passwords | bcrypt, 12 rounds |
| Auth tokens | JWT access (15m) + refresh (7d) |
| Transport | HTTPS in production |
| API access | every route requires `protect` middleware |
| Authorization | `authorize(...roles)` on each route |
| Input | Zod validation on all mutation endpoints |
| Rate limit | 500 req / 15 min per IP |
| Headers | Helmet (CSP, HSTS, etc.) |
| CORS | Restricted to `CLIENT_URL` |

## Data Flow

```
Browser → Axios (with Bearer token)
       → Express Router
       → protect middleware (verify JWT)
       → authorize middleware (check role)
       → Controller (validate, call model)
       → Mongoose (MongoDB query)
       → successResponse / errorResponse
       → Browser
```

## Running Locally

```bash
# 1. Start MongoDB
# 2. Backend
cd backend && cp .env.example .env  # fill MONGO_URI + JWT secrets
npm install && npm run seed          # creates demo accounts
npm run dev                          # http://localhost:5000

# 3. Frontend
cd frontend && npm install
npm run dev                          # http://localhost:5173
```
