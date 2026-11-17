import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Login from '@/pages/auth/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import Patients from '@/pages/patients/Patients';
import Doctors from '@/pages/doctors/Doctors';
import Appointments from '@/pages/appointments/Appointments';
import OPD from '@/pages/opd/OPD';
import IPD from '@/pages/ipd/IPD';
import Wards from '@/pages/wards/Wards';
import MedicalRecords from '@/pages/medical-records/MedicalRecords';
import Prescriptions from '@/pages/prescriptions/Prescriptions';
import Pharmacy from '@/pages/pharmacy/Pharmacy';
import Laboratory from '@/pages/laboratory/Laboratory';
import Radiology from '@/pages/radiology/Radiology';
import Billing from '@/pages/billing/Billing';
import Ambulance from '@/pages/ambulance/Ambulance';
import BloodBank from '@/pages/blood-bank/BloodBank';
import Staff from '@/pages/staff/Staff';
import Users from '@/pages/users/Users';
import Reports from '@/pages/reports/Reports';
import { useAuth } from '@/context/AuthContext';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="opd" element={<OPD />} />
        <Route path="ipd" element={<IPD />} />
        <Route path="wards" element={<Wards />} />
        <Route path="medical-records" element={<MedicalRecords />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="laboratory" element={<Laboratory />} />
        <Route path="radiology" element={<Radiology />} />
        <Route path="billing" element={<Billing />} />
        <Route path="ambulance" element={<Ambulance />} />
        <Route path="blood-bank" element={<BloodBank />} />
        <Route path="staff" element={<Staff />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
