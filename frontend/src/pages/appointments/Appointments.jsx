import { useState } from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockAppointments = [
  { _id: '1', aptId: 'APT-001', patient: 'Arjun Kumar', doctor: 'Dr. Priya', date: '2026-11-17', time: '09:00 AM', type: 'OPD', status: 'confirmed' },
  { _id: '2', aptId: 'APT-002', patient: 'Meena Ravi', doctor: 'Dr. Suresh', date: '2026-11-17', time: '10:30 AM', type: 'Follow-up', status: 'scheduled' },
  { _id: '3', aptId: 'APT-003', patient: 'Karthik S', doctor: 'Dr. Nila', date: '2026-11-17', time: '11:00 AM', type: 'OPD', status: 'completed' },
  { _id: '4', aptId: 'APT-004', patient: 'Divya P', doctor: 'Dr. Ramesh', date: '2026-11-17', time: '02:00 PM', type: 'Review', status: 'scheduled' },
  { _id: '5', aptId: 'APT-005', patient: 'Suresh M', doctor: 'Dr. Priya', date: '2026-11-16', time: '03:30 PM', type: 'OPD', status: 'cancelled' },
];

const columns = [
  { key: 'aptId', label: 'Apt. ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  {
    key: 'actions', label: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <button className="text-xs text-blue-600 hover:underline">View</button>
        <button className="text-xs text-orange-500 hover:underline">Reschedule</button>
        <button className="text-xs text-red-500 hover:underline">Cancel</button>
      </div>
    )
  },
];

export default function Appointments() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = mockAppointments.filter(a =>
    a.patient.toLowerCase().includes(search.toLowerCase()) ||
    a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500">Book and manage patient appointments</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Book Appointment</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Total", value: '143', color: 'bg-blue-50 text-blue-700' },
          { label: 'Confirmed', value: '89', color: 'bg-teal-50 text-teal-700' },
          { label: 'Completed', value: '41', color: 'bg-green-50 text-green-700' },
          { label: 'Cancelled', value: '13', color: 'bg-red-50 text-red-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color} border border-white`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search patient or doctor..." className="flex-1 min-w-48" />
          <input type="date" className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="2026-11-17" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
            <option>All Status</option>
            <option>Scheduled</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
          </select>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Book New Appointment" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormSelect label="Patient" required className="col-span-2">
            <option value="">Select patient</option>
            <option>Arjun Kumar (P-0001)</option>
            <option>Meena Ravi (P-0002)</option>
          </FormSelect>
          <FormSelect label="Doctor" required>
            <option value="">Select doctor</option>
            <option>Dr. Priya Sharma</option>
            <option>Dr. Suresh Kumar</option>
          </FormSelect>
          <FormSelect label="Appointment Type" required>
            <option>OPD</option><option>Follow-up</option><option>Review</option><option>Emergency</option>
          </FormSelect>
          <FormInput label="Date" type="date" required />
          <FormInput label="Time" type="time" required />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Book Appointment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
