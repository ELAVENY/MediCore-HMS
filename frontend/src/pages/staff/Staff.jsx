import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';

const mockStaff = [
  { _id: '1', staffId: 'STF-001', name: 'Nurse Anitha', role: 'Nurse', department: 'Cardiology', shift: 'Morning', phone: '9876500020', status: 'active' },
  { _id: '2', staffId: 'STF-002', name: 'Ram Kumar', role: 'Receptionist', department: 'Front Desk', shift: 'Morning', phone: '9876500021', status: 'active' },
  { _id: '3', staffId: 'STF-003', name: 'Deepa S', role: 'Pharmacist', department: 'Pharmacy', shift: 'Evening', phone: '9876500022', status: 'active' },
  { _id: '4', staffId: 'STF-004', name: 'Murugan K', role: 'Lab Technician', department: 'Laboratory', shift: 'Morning', phone: '9876500023', status: 'inactive' },
];

const columns = [
  { key: 'staffId', label: 'Staff ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'name', label: 'Name', cellClass: 'font-medium' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'shift', label: 'Shift' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-gray-500 hover:underline">Attendance</button></div> },
];

export default function Staff() {
  const [search, setSearch] = useState('');
  const filtered = mockStaff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-500">Hospital staff, attendance, and shift management</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add Staff</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search staff..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
