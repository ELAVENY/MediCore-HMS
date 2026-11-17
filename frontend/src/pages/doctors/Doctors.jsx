import { useState } from 'react';
import { Plus, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockDoctors = [
  { _id: '1', doctorId: 'D-001', name: 'Dr. Priya Sharma', specialization: 'Cardiologist', department: 'Cardiology', phone: '9876500001', email: 'priya@medicore.com', experience: '12 yrs', status: 'active', patients: 142 },
  { _id: '2', doctorId: 'D-002', name: 'Dr. Suresh Kumar', specialization: 'Diabetologist', department: 'Endocrinology', phone: '9876500002', email: 'suresh@medicore.com', experience: '8 yrs', status: 'active', patients: 98 },
  { _id: '3', doctorId: 'D-003', name: 'Dr. Nila Devi', specialization: 'Cardiologist', department: 'Cardiology', phone: '9876500003', email: 'nila@medicore.com', experience: '15 yrs', status: 'active', patients: 201 },
  { _id: '4', doctorId: 'D-004', name: 'Dr. Ramesh G', specialization: 'Orthopedic', department: 'Orthopedics', phone: '9876500004', email: 'ramesh@medicore.com', experience: '10 yrs', status: 'active', patients: 115 },
  { _id: '5', doctorId: 'D-005', name: 'Dr. Anitha V', specialization: 'Neurologist', department: 'Neurology', phone: '9876500005', email: 'anitha@medicore.com', experience: '6 yrs', status: 'inactive', patients: 73 },
];

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = mockDoctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-sm text-gray-500">Manage doctor profiles and schedules</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Doctor</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or specialization..." className="flex-1 min-w-48" />
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2">
          <option>All Departments</option>
          <option>Cardiology</option><option>Orthopedics</option><option>Neurology</option><option>Endocrinology</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div key={doc._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {doc.name.split(' ')[1]?.[0] || doc.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{doc.name}</p>
                  <p className="text-sm text-teal-600">{doc.specialization}</p>
                </div>
              </div>
              <StatusBadge status={doc.status} />
            </div>
            <div className="space-y-1.5 text-sm text-gray-500">
              <p><span className="font-medium text-gray-700">Dept:</span> {doc.department}</p>
              <p><span className="font-medium text-gray-700">Experience:</span> {doc.experience}</p>
              <p><span className="font-medium text-gray-700">Patients:</span> {doc.patients}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{doc.phone}</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{doc.email}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
              <Button size="sm" className="flex-1">Schedule</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Doctor" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormInput label="Full Name" placeholder="Dr. Full Name" required className="col-span-2" />
          <FormInput label="Specialization" placeholder="e.g. Cardiologist" required />
          <FormSelect label="Department" required>
            <option value="">Select department</option>
            <option>Cardiology</option><option>Orthopedics</option><option>Neurology</option><option>Endocrinology</option><option>General Medicine</option>
          </FormSelect>
          <FormInput label="Phone" placeholder="Mobile number" required />
          <FormInput label="Email" type="email" placeholder="doctor@medicore.com" required />
          <FormInput label="Experience (years)" type="number" placeholder="Years of experience" />
          <FormInput label="Qualification" placeholder="MBBS, MD etc." />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Doctor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
