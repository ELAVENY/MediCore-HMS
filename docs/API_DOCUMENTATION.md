# MediCore HMS — API Documentation

Base URL: `http://localhost:5000/api`

All protected routes require: `Authorization: Bearer <accessToken>`

---

## Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/login` | Public | Login and get tokens |
| POST | `/auth/register` | Admin | Create new user |
| POST | `/auth/refresh` | Public | Refresh access token |
| POST | `/auth/logout` | Protected | Logout |
| GET | `/auth/me` | Protected | Get current user |
| POST | `/auth/forgot-password` | Public | Request password reset |
| POST | `/auth/reset-password` | Public | Reset password |

## Patients

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/patients?search=&status=&page=&limit=` | All staff |
| GET | `/patients/:id` | All staff |
| POST | `/patients` | Admin, Receptionist, Doctor |
| PUT | `/patients/:id` | Admin, Receptionist, Doctor |
| DELETE | `/patients/:id` | Admin only (soft delete) |

## Doctors

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/doctors` | All staff |
| GET | `/doctors/:id` | All staff |
| POST | `/doctors` | Admin only |
| PUT | `/doctors/:id` | Admin only |

## Appointments

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/appointments?date=&doctorId=&status=` | All staff |
| POST | `/appointments` | Admin, Receptionist, Doctor |
| PUT | `/appointments/:id` | Admin, Receptionist, Doctor |
| PATCH | `/appointments/:id/cancel` | Admin, Receptionist, Doctor |

## Wards & Beds

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/wards` | All staff |
| POST | `/wards` | Admin only |
| GET | `/wards/beds?wardId=&status=` | All staff |
| POST | `/wards/beds` | Admin only |
| PATCH | `/wards/beds/:id/status` | Admin, Nurse |

## IPD (Admissions)

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/admissions` | All staff |
| POST | `/admissions` | Admin, Receptionist, Doctor |
| PATCH | `/admissions/:id/discharge` | Admin, Doctor |

## Pharmacy

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/pharmacy` | All staff |
| GET | `/pharmacy/alerts/low-stock` | All staff |
| POST | `/pharmacy` | Admin, Pharmacist |
| PUT | `/pharmacy/:id` | Admin, Pharmacist |
| PATCH | `/pharmacy/:id/dispense` | Admin, Pharmacist |

## Billing

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/billing` | All staff |
| GET | `/billing/summary/revenue` | Admin, Accountant |
| POST | `/billing` | Admin, Accountant, Receptionist |
| PATCH | `/billing/:id/payment` | Admin, Accountant, Receptionist |

## Laboratory

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/lab` | All staff |
| POST | `/lab` | Admin, Doctor, Receptionist |
| PATCH | `/lab/:id/results` | Lab Technician |
| PATCH | `/lab/:id/verify` | Lab Technician |

## Staff

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/staff` | Admin, HR |
| POST | `/staff` | Admin, HR |
| PUT | `/staff/:id` | Admin, HR |

## Dashboard

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/dashboard/stats` | Admin, Doctor, Nurse, Receptionist |

## Health Check

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/health` | Public |

---

## Standard Response Format

```json
{
  "success": true,
  "message": "Description",
  "data": { ... }
}
```

Paginated:
```json
{
  "success": true,
  "message": "...",
  "data": [...],
  "pagination": { "total": 100, "page": 1, "limit": 20, "totalPages": 5 }
}
```

Error:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```
