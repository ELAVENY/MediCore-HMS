import { useState } from 'react';
import { Plus, Printer } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';

const mockRx = [
  { _id: '1', rxId: 'RX-001', patient: 'Arjun Kumar', doctor: 'Dr. Priya', date: '2026-11-17', medicines: 'Amlodipine 5mg, Metoprolol 25mg', duration: '30 days' },
  { _id: '2', rxId: 'RX-002', patient: 'Meena Ravi', doctor: 'Dr. Suresh', date: '2026-11-15', medicines: 'Metformin 500mg, Glimepiride 1mg', duration: '60 days' },
  { _id: '3', rxId: 'RX-003', patient: 'Divya P', doctor: 'Dr. Ramesh', date: '2026-11-10', medicines: 'Ibuprofen 400mg, Calcium D3', duration: '15 days' },
];

const columns = [
  { key: 'rxId', label: 'Rx ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'date', label: 'Date' },
  { key: 'medicines', label: 'Medicines', cellClass: 'max-w-xs truncate text-gray-600' },
  { key: 'duration', label: 'Duration' },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-gray-500 hover:underline flex items-center gap-0.5"><Printer className="h-3 w-3" /> Print</button></div> },
];

export default function Prescriptions() {
  const [search, setSearch] = useState('');
  const filtered = mockRx.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-sm text-gray-500">View and manage patient prescriptions</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> New Prescription</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
