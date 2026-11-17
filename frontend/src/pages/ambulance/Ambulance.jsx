import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';

const mockAmbulances = [
  { _id: '1', vehicle: 'AMB-001', registration: 'TN 01 AB 1234', driver: 'Ravi Kumar', phone: '9876500010', type: 'ALS', status: 'available' },
  { _id: '2', vehicle: 'AMB-002', registration: 'TN 01 AB 5678', driver: 'Suresh D', phone: '9876500011', type: 'BLS', status: 'dispatched' },
  { _id: '3', vehicle: 'AMB-003', registration: 'TN 01 AB 9012', driver: 'Mani G', phone: '9876500012', type: 'ALS', status: 'maintenance' },
];

const columns = [
  { key: 'vehicle', label: 'Vehicle ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'registration', label: 'Reg. Number', cellClass: 'font-medium' },
  { key: 'driver', label: 'Driver' },
  { key: 'phone', label: 'Phone' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">Dispatch</button><button className="text-xs text-gray-500 hover:underline">Edit</button></div> },
];

export default function Ambulance() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ambulance Management</h1>
          <p className="text-sm text-gray-500">Fleet, drivers, and emergency dispatch</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add Ambulance</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <DataTable columns={columns} data={mockAmbulances} />
      </div>
    </div>
  );
}
