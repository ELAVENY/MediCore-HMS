import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockIPD = [
  { _id: '1', admitId: 'IPD-001', patient: 'Meena Ravi', doctor: 'Dr. Suresh', ward: 'Ward A', bed: 'B-04', admitDate: '2026-11-10', reason: 'Diabetes complications', status: 'admitted' },
  { _id: '2', admitId: 'IPD-002', patient: 'Karthik S', doctor: 'Dr. Nila', ward: 'ICU', bed: 'ICU-02', admitDate: '2026-11-14', reason: 'Cardiac arrest', status: 'critical' },
  { _id: '3', admitId: 'IPD-003', patient: 'Suresh M', doctor: 'Dr. Priya', ward: 'Ward B', bed: 'B-11', admitDate: '2026-11-01', reason: 'Kidney stone surgery', status: 'discharged' },
];

const columns = [
  { key: 'admitId', label: 'Admit ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'ward', label: 'Ward' },
  { key: 'bed', label: 'Bed' },
  { key: 'admitDate', label: 'Admit Date' },
  { key: 'reason', label: 'Reason' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-green-600 hover:underline">Discharge</button></div> },
];

export default function IPD() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = mockIPD.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IPD Management</h1>
          <p className="text-sm text-gray-500">Inpatient admissions and discharge management</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Admit Patient</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Currently Admitted', value: '204' }, { label: 'Discharged Today', value: '12' }, { label: 'Available Beds', value: '76' }].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Admit Patient (IPD)" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormSelect label="Patient" required className="col-span-2"><option>Select patient</option></FormSelect>
          <FormSelect label="Doctor" required><option>Select doctor</option></FormSelect>
          <FormSelect label="Ward" required><option>Ward A</option><option>Ward B</option><option>ICU</option></FormSelect>
          <FormSelect label="Bed" required><option>B-01</option><option>B-02</option></FormSelect>
          <FormInput label="Admission Date" type="date" required />
          <FormInput label="Reason for Admission" placeholder="Diagnosis / reason" className="col-span-2" />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Admit Patient</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
