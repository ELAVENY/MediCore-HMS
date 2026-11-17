import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';

const mockRecords = [
  { _id: '1', recId: 'REC-001', patient: 'Arjun Kumar', doctor: 'Dr. Priya', date: '2026-11-17', diagnosis: 'Hypertension Stage 2', vitals: 'BP: 150/95, HR: 88', notes: 'Increased medication dosage.' },
  { _id: '2', recId: 'REC-002', patient: 'Meena Ravi', doctor: 'Dr. Suresh', date: '2026-11-15', diagnosis: 'Type 2 Diabetes', vitals: 'BS: 220 mg/dL, Wt: 68kg', notes: 'Diet modification advised.' },
  { _id: '3', recId: 'REC-003', patient: 'Karthik S', doctor: 'Dr. Nila', date: '2026-11-14', diagnosis: 'Acute MI', vitals: 'BP: 90/60, HR: 110', notes: 'Emergency intervention done.' },
];

const columns = [
  { key: 'recId', label: 'Record ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'date', label: 'Date' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'vitals', label: 'Vitals' },
  { key: 'notes', label: 'Notes', cellClass: 'text-gray-500 max-w-xs truncate' },
  { key: 'actions', label: 'Actions', render: () => <button className="text-xs text-blue-600 hover:underline flex items-center gap-1"><FileText className="h-3 w-3" /> View</button> },
];

export default function MedicalRecords() {
  const [search, setSearch] = useState('');
  const filtered = mockRecords.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-sm text-gray-500">Patient clinical notes, diagnosis, and vital signs</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add Record</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
