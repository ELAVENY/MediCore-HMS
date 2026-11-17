import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Pagination from '@/components/common/Pagination';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockPatients = [
  { _id: '1', patientId: 'P-0001', name: 'Arjun Kumar', age: 34, gender: 'Male', phone: '9876543210', bloodGroup: 'B+', doctor: 'Dr. Priya', status: 'active', registered: '2026-10-01' },
  { _id: '2', patientId: 'P-0002', name: 'Meena Ravi', age: 28, gender: 'Female', phone: '9123456789', bloodGroup: 'A+', doctor: 'Dr. Suresh', status: 'admitted', registered: '2026-10-15' },
  { _id: '3', patientId: 'P-0003', name: 'Karthik S', age: 52, gender: 'Male', phone: '9988776655', bloodGroup: 'O+', doctor: 'Dr. Nila', status: 'critical', registered: '2026-11-01' },
  { _id: '4', patientId: 'P-0004', name: 'Divya P', age: 23, gender: 'Female', phone: '9871234560', bloodGroup: 'AB-', doctor: 'Dr. Ramesh', status: 'active', registered: '2026-11-05' },
  { _id: '5', patientId: 'P-0005', name: 'Suresh M', age: 45, gender: 'Male', phone: '9765432100', bloodGroup: 'B-', doctor: 'Dr. Priya', status: 'discharged', registered: '2026-11-10' },
  { _id: '6', patientId: 'P-0006', name: 'Lakshmi R', age: 61, gender: 'Female', phone: '9654321099', bloodGroup: 'O-', doctor: 'Dr. Suresh', status: 'active', registered: '2026-11-12' },
];

const columns = [
  { key: 'patientId', label: 'Patient ID', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'name', label: 'Name', cellClass: 'font-medium text-gray-900' },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'phone', label: 'Phone' },
  { key: 'bloodGroup', label: 'Blood Group' },
  { key: 'doctor', label: 'Assigned Doctor' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  {
    key: 'actions', label: 'Actions',
    render: (row) => (
      <div className="flex gap-2">
        <button className="text-xs text-blue-600 hover:underline">View</button>
        <button className="text-xs text-teal-600 hover:underline">Edit</button>
      </div>
    )
  },
];

export default function Patients() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId.includes(search)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500">Manage patient registrations and records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Patient</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: '4,821', color: 'bg-blue-50 text-blue-700' },
          { label: 'Active', value: '3,241', color: 'bg-green-50 text-green-700' },
          { label: 'Admitted (IPD)', value: '204', color: 'bg-orange-50 text-orange-700' },
          { label: 'Discharged Today', value: '12', color: 'bg-gray-50 text-gray-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color} border border-white`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or patient ID..." className="flex-1 min-w-48" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Admitted</option>
            <option>Discharged</option>
            <option>Critical</option>
          </select>
        </div>
        <DataTable columns={columns} data={filtered} />
        <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
      </div>

      {/* Add Patient Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register New Patient" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormInput label="Full Name" placeholder="Patient full name" required className="col-span-2" />
          <FormInput label="Date of Birth" type="date" required />
          <FormSelect label="Gender" required>
            <option value="">Select gender</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </FormSelect>
          <FormInput label="Phone Number" placeholder="10-digit mobile" required />
          <FormInput label="Email" type="email" placeholder="patient@email.com" />
          <FormSelect label="Blood Group">
            <option value="">Select blood group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => <option key={g}>{g}</option>)}
          </FormSelect>
          <FormInput label="Emergency Contact Name" placeholder="Contact person name" />
          <FormInput label="Emergency Contact Phone" placeholder="Emergency phone" />
          <FormInput label="Address" placeholder="Full address" className="col-span-2" />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Register Patient</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
