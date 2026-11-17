import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';

const mockScans = [
  { _id: '1', scanId: 'RAD-001', patient: 'Karthik S', scan: 'Chest X-Ray', doctor: 'Dr. Nila', date: '2026-11-14', status: 'completed' },
  { _id: '2', scanId: 'RAD-002', patient: 'Meena Ravi', scan: 'Abdominal Ultrasound', doctor: 'Dr. Suresh', date: '2026-11-17', status: 'pending' },
  { _id: '3', scanId: 'RAD-003', patient: 'Arjun Kumar', scan: 'Echocardiogram', doctor: 'Dr. Priya', date: '2026-11-17', status: 'in_progress' },
];

const columns = [
  { key: 'scanId', label: 'Scan ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'scan', label: 'Scan Type' },
  { key: 'doctor', label: 'Referred By' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-green-600 hover:underline">Upload Report</button></div> },
];

export default function Radiology() {
  const [search, setSearch] = useState('');
  const filtered = mockScans.filter(s => s.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Radiology</h1>
          <p className="text-sm text-gray-500">Imaging requests, scans, and radiology reports</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> New Imaging Order</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient or scan..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
