import { Plus, Droplets } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';

const bloodStock = [
  { group: 'A+', units: 42, status: 'available' },
  { group: 'A-', units: 8, status: 'available' },
  { group: 'B+', units: 35, status: 'available' },
  { group: 'B-', units: 3, status: 'critical' },
  { group: 'AB+', units: 18, status: 'available' },
  { group: 'AB-', units: 2, status: 'critical' },
  { group: 'O+', units: 60, status: 'available' },
  { group: 'O-', units: 5, status: 'available' },
];

const mockDonors = [
  { _id: '1', donorId: 'DON-001', name: 'Rajesh Kumar', blood: 'O+', date: '2026-11-01', units: 1, status: 'active' },
  { _id: '2', donorId: 'DON-002', name: 'Priya S', blood: 'A+', date: '2026-10-20', units: 1, status: 'active' },
  { _id: '3', donorId: 'DON-003', name: 'Suresh M', blood: 'B-', date: '2026-11-10', units: 1, status: 'active' },
];

const donorColumns = [
  { key: 'donorId', label: 'Donor ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'name', label: 'Name', cellClass: 'font-medium' },
  { key: 'blood', label: 'Blood Group' },
  { key: 'date', label: 'Donation Date' },
  { key: 'units', label: 'Units' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function BloodBank() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blood Bank</h1>
          <p className="text-sm text-gray-500">Donor management and blood inventory</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Register Donor</Button>
      </div>

      {/* Blood Stock */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Droplets className="h-5 w-5 text-red-500" /> Blood Stock</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {bloodStock.map((b) => (
            <div key={b.group} className={`text-center p-3 rounded-xl border-2 ${b.units <= 5 ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
              <p className="text-2xl font-bold text-red-600">{b.group}</p>
              <p className="text-lg font-semibold text-gray-800">{b.units}</p>
              <p className="text-xs text-gray-400">units</p>
              {b.units <= 5 && <p className="text-xs text-red-600 font-semibold mt-1">Low!</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Donors */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Donors</h3>
        <DataTable columns={donorColumns} data={mockDonors} />
      </div>
    </div>
  );
}
