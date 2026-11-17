# MediCore HMS — Database Schema

## Collections

| Collection | Model File | Auto ID |
|------------|-----------|---------|
| users | User.js | — |
| patients | Patient.js | P-XXXX |
| doctors | Doctor.js | D-XXX |
| appointments | Appointment.js | APT-XXXX |
| wards | Ward.js | — |
| beds | Bed.js | — |
| admissions | Admission.js | IPD-XXXX |
| medicalrecords | MedicalRecord.js | REC-XXXX |
| prescriptions | Prescription.js | RX-XXXX |
| medicines | Medicine.js | MED-XXXX |
| laborders | LabOrder.js | LAB-XXXX |
| radiologyorders | RadiologyOrder.js | RAD-XXXX |
| invoices | Invoice.js | INV-XXXX |
| staff | Staff.js | STF-XXX |
| blooddonors | BloodInventory.js | DON-XXX |
| ambulances | Ambulance.js | AMB-XXX |

## Key Relationships

```
Patient ──────── Appointment ──────── Doctor
   │                                     │
   └──── Admission ──── Ward ──── Bed    │
   │                                     │
   └──── MedicalRecord ──────────────────┘
   │
   └──── Prescription ──── Medicine
   │
   └──── LabOrder
   │
   └──── RadiologyOrder
   │
   └──── Invoice ──── Payment
```

## Security Notes

- Passwords: bcrypt with 12 rounds
- JWT: 15m access + 7d refresh tokens
- Refresh tokens stored (hashed) in DB
- Role-based access enforced at API level
- Soft deletes (status = inactive) preserve data
- Audit: createdBy / updatedBy on critical models
