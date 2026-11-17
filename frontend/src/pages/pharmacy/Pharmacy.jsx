import { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/common/Modal';
import FormInput, { FormSelect } from '@/components/forms/FormInput';

const mockMedicines = [
  { _id: '1', code: 'MED-001', name: 'Metformin 500mg', category: 'Antidiabetic', stock: 450, unit: 'Tablets', expiry: '2027-06-30', price: 2.5, status: 'active' },
  { _id: '2', code: 'MED-002', name: 'Amlodipine 5mg', category: 'Antihypertensive', stock: 12, unit: 'Tablets', expiry: '2026-12-31', price: 3.0, status: 'active' },
  { _id: '3', code: 'MED-003', name: 'Paracetamol 650mg', category: 'Analgesic', stock: 1200, unit: 'Tablets', expiry: '2028-03-31', price: 1.5, status: 'active' },
  { _id: '4', code: 'MED-004', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 5, unit: 'Capsules', expiry: '2026-11-30', price: 8.0, status: 'active' },
];

const columns = [
  { key: 'code', label: 'Code', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'name', label: 'Medicine Name', cellClass: 'font-medium' },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock', render: (r) => (
    <span className={r.stock < 20 ? 'text-red-600 font-semibold flex items-center gap-1' : ''}>
      {r.stock < 20 && <AlertTriangle className="h-3 w-3" />} {r.stock} {r.unit}
    </span>
  )},
  { key: 'expiry', label: 'Expiry Date' },
  { key: 'price', label: 'Price', render: (r) => `₹${r.price}` },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">Edit</button><button className="text-xs text-teal-600 hover:underline">Dispense</button></div> },
];

export default function Pharmacy() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = mockMedicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = mockMedicines.filter(m => m.stock < 20).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-sm text-gray-500">Medicine inventory and dispensing management</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Add Medicine</Button>
      </div>
      {lowStock > 0 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <strong>{lowStock} medicine(s)</strong> are running low on stock. Please reorder.
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search medicine..." className="flex-1" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2"><option>All Categories</option><option>Antidiabetic</option><option>Antibiotic</option><option>Analgesic</option></select>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Medicine" size="lg">
        <form className="grid grid-cols-2 gap-4">
          <FormInput label="Medicine Name" placeholder="Generic name + strength" required className="col-span-2" />
          <FormSelect label="Category" required><option>Analgesic</option><option>Antibiotic</option><option>Antidiabetic</option><option>Antihypertensive</option></FormSelect>
          <FormInput label="Stock Quantity" type="number" required />
          <FormSelect label="Unit"><option>Tablets</option><option>Capsules</option><option>Syrup (ml)</option><option>Injection (ml)</option></FormSelect>
          <FormInput label="Expiry Date" type="date" required />
          <FormInput label="Price per Unit (₹)" type="number" step="0.01" required />
          <FormInput label="Reorder Level" type="number" placeholder="Min stock alert level" />
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Medicine</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
