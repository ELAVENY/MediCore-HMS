import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';

const mockUsers = [
  { _id: '1', userId: 'USR-001', name: 'Dr. Admin', email: 'admin@medicore.com', role: 'super_admin', createdAt: '2026-01-01', status: 'active' },
  { _id: '2', userId: 'USR-002', name: 'Dr. Priya', email: 'priya@medicore.com', role: 'doctor', createdAt: '2026-01-15', status: 'active' },
  { _id: '3', userId: 'USR-003', name: 'Ram Kumar', email: 'ram@medicore.com', role: 'receptionist', createdAt: '2026-02-01', status: 'active' },
  { _id: '4', userId: 'USR-004', name: 'Deepa S', email: 'deepa@medicore.com', role: 'pharmacist', createdAt: '2026-03-01', status: 'inactive' },
];

const roleColors = {
  super_admin: 'bg-purple-100 text-purple-800',
  admin: 'bg-blue-100 text-blue-800',
  doctor: 'bg-teal-100 text-teal-800',
  nurse: 'bg-pink-100 text-pink-800',
  receptionist: 'bg-green-100 text-green-800',
  pharmacist: 'bg-orange-100 text-orange-800',
};

const columns = [
  { key: 'userId', label: 'User ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'name', label: 'Name', cellClass: 'font-medium' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', render: (r) => <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[r.role] || 'bg-gray-100 text-gray-700'}`}>{r.role.replace('_', ' ')}</span> },
  { key: 'createdAt', label: 'Created' },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-red-500 hover:underline">Deactivate</button></div> },
];

export default function Users() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Role Management</h1>
          <p className="text-sm text-gray-500">Manage system users and their access roles</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add User</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <DataTable columns={columns} data={mockUsers} />
      </div>
    </div>
  );
}
