import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect, FormTextarea } from '@/components/forms/FormInput';

const mockOPD = [
  { _id: '1', visitId: 'OPD-001', patient: 'Arjun Kumar', doctor: 'Dr. Priya', date: '2026-11-17', complaint: 'Chest pain', diagnosis: 'Hypertension', status: 'completed' },
  { _id: '2', visitId: 'OPD-002', patient: 'Divya P', doctor: 'Dr. Ramesh', date: '2026-11-17', complaint: 'Leg pain', diagnosis: 'Fracture', status: 'pending' },
  { _id: '3', visitId: 'OPD-003', patient: 'Lakshmi R', doctor: 'Dr. Suresh', date: '2026-11-17', complaint: 'High sugar', diagnosis: 'Diabetes', status: 'in_progress' },
];

const columns = [
  { key: 'visitId', label: 'Visit ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'date', label: 'Date' },
  { key: 'complaint', label: 'Chief Complaint' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <button className="text-xs text-blue-600 hover:underline">View</button> },
];

export default function OPD() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = mockOPD.filter(v => v.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OPD Management</h1>
          <p className="text-sm text-gray-500">Outpatient department visits and consultations</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> New Visit</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register OPD Visit" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormSelect label="Patient" required className="col-span-2"><option>Select patient</option></FormSelect>
          <FormSelect label="Doctor" required><option>Select doctor</option></FormSelect>
          <FormInput label="Date" type="date" required />
          <FormTextarea label="Chief Complaint" placeholder="Patient's main complaint" className="col-span-2" required />
          <FormTextarea label="Diagnosis" placeholder="Doctor's diagnosis" className="col-span-2" />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Visit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
