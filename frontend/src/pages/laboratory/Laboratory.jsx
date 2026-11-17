import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';

const mockTests = [
  { _id: '1', testId: 'LAB-001', patient: 'Arjun Kumar', test: 'Complete Blood Count', doctor: 'Dr. Priya', date: '2026-11-17', status: 'completed' },
  { _id: '2', testId: 'LAB-002', patient: 'Meena Ravi', test: 'HbA1c', doctor: 'Dr. Suresh', date: '2026-11-17', status: 'pending' },
  { _id: '3', testId: 'LAB-003', patient: 'Divya P', test: 'Lipid Profile', doctor: 'Dr. Ramesh', date: '2026-11-17', status: 'in_progress' },
];

const columns = [
  { key: 'testId', label: 'Test ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'test', label: 'Test Name' },
  { key: 'doctor', label: 'Referred By' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-green-600 hover:underline">Enter Result</button></div> },
];

export default function Laboratory() {
  const [search, setSearch] = useState('');
  const filtered = mockTests.filter(t => t.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laboratory</h1>
          <p className="text-sm text-gray-500">Lab test orders, samples, and results</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> New Test Order</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient or test..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
