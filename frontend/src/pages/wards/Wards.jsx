import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockWards = [
  { _id: '1', name: 'Ward A', type: 'General', totalBeds: 40, occupied: 32, available: 8 },
  { _id: '2', name: 'Ward B', type: 'General', totalBeds: 40, occupied: 28, available: 12 },
  { _id: '3', name: 'ICU', type: 'Intensive Care', totalBeds: 20, occupied: 18, available: 2 },
  { _id: '4', name: 'NICU', type: 'Neonatal ICU', totalBeds: 15, occupied: 10, available: 5 },
  { _id: '5', name: 'Maternity', type: 'Maternity', totalBeds: 30, occupied: 22, available: 8 },
  { _id: '6', name: 'Surgical', type: 'Surgical', totalBeds: 25, occupied: 20, available: 5 },
];

const mockBeds = [
  { _id: '1', bedNo: 'B-01', ward: 'Ward A', patient: 'Meena Ravi', status: 'occupied' },
  { _id: '2', bedNo: 'B-02', ward: 'Ward A', patient: null, status: 'available' },
  { _id: '3', bedNo: 'ICU-01', ward: 'ICU', patient: 'Karthik S', status: 'occupied' },
  { _id: '4', bedNo: 'B-03', ward: 'Ward A', patient: null, status: 'maintenance' },
];

export default function Wards() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wards & Beds</h1>
          <p className="text-sm text-gray-500">Manage ward allocation and bed availability</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Ward</Button>
      </div>

      {/* Ward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWards.map((ward) => {
          const pct = Math.round((ward.occupied / ward.totalBeds) * 100);
          return (
            <div key={ward._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{ward.name}</p>
                  <p className="text-xs text-gray-400">{ward.type}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${pct >= 90 ? 'bg-red-100 text-red-700' : pct >= 70 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {pct}% Full
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                <div className={`h-2 rounded-full ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-orange-400' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div><p className="font-bold text-gray-900">{ward.totalBeds}</p><p className="text-xs text-gray-400">Total</p></div>
                <div><p className="font-bold text-orange-600">{ward.occupied}</p><p className="text-xs text-gray-400">Occupied</p></div>
                <div><p className="font-bold text-green-600">{ward.available}</p><p className="text-xs text-gray-400">Available</p></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bed Status */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Bed Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockBeds.map((bed) => (
            <div key={bed._id} className={`p-3 rounded-xl border-2 text-sm ${bed.status === 'occupied' ? 'border-red-200 bg-red-50' : bed.status === 'maintenance' ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
              <p className="font-semibold">{bed.bedNo}</p>
              <p className="text-xs text-gray-500">{bed.ward}</p>
              {bed.patient && <p className="text-xs font-medium mt-1">{bed.patient}</p>}
              <StatusBadge status={bed.status} className="mt-1" />
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Ward">
        <form className="space-y-4">
          <FormInput label="Ward Name" placeholder="e.g. Ward C" required />
          <FormSelect label="Ward Type" required>
            <option>General</option><option>Intensive Care</option><option>Neonatal ICU</option><option>Maternity</option><option>Surgical</option>
          </FormSelect>
          <FormInput label="Total Beds" type="number" placeholder="Number of beds" required />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Ward</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
