import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import DataTable from '@/components/common/DataTable';
import SearchBar from '@/components/common/SearchBar';
import StatusBadge from '@/components/ui/StatusBadge';

const mockInvoices = [
  { _id: '1', invoiceNo: 'INV-001', patient: 'Arjun Kumar', date: '2026-11-17', services: 'OPD + Lab Tests', amount: 2500, paid: 2500, balance: 0, status: 'paid' },
  { _id: '2', invoiceNo: 'INV-002', patient: 'Meena Ravi', date: '2026-11-15', services: 'IPD - 5 days', amount: 25000, paid: 10000, balance: 15000, status: 'partial' },
  { _id: '3', invoiceNo: 'INV-003', patient: 'Karthik S', date: '2026-11-14', services: 'ICU + Surgery', amount: 85000, paid: 0, balance: 85000, status: 'unpaid' },
  { _id: '4', invoiceNo: 'INV-004', patient: 'Divya P', date: '2026-11-10', services: 'OPD + X-Ray', amount: 1800, paid: 1800, balance: 0, status: 'paid' },
];

const columns = [
  { key: 'invoiceNo', label: 'Invoice No', cellClass: 'font-mono text-xs text-gray-500' },
  { key: 'patient', label: 'Patient', cellClass: 'font-medium' },
  { key: 'date', label: 'Date' },
  { key: 'services', label: 'Services' },
  { key: 'amount', label: 'Total', render: (r) => `₹${r.amount.toLocaleString()}` },
  { key: 'paid', label: 'Paid', render: (r) => <span className="text-green-600">₹{r.paid.toLocaleString()}</span> },
  { key: 'balance', label: 'Balance', render: (r) => <span className={r.balance > 0 ? 'text-red-600 font-semibold' : 'text-gray-400'}>₹{r.balance.toLocaleString()}</span> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', label: 'Actions', render: () => <div className="flex gap-2"><button className="text-xs text-blue-600 hover:underline">View</button><button className="text-xs text-green-600 hover:underline">Pay</button><button className="text-xs text-gray-500 hover:underline"><Download className="h-3 w-3 inline" /></button></div> },
];

export default function Billing() {
  const [search, setSearch] = useState('');
  const filtered = mockInvoices.filter(i => i.patient.toLowerCase().includes(search.toLowerCase()));
  const totalRevenue = mockInvoices.reduce((s, i) => s + i.paid, 0);
  const totalOutstanding = mockInvoices.reduce((s, i) => s + i.balance, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-sm text-gray-500">Invoice management and payment tracking</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Generate Invoice</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoices', value: mockInvoices.length.toString(), color: 'bg-blue-50 text-blue-700' },
          { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString()}`, color: 'bg-green-50 text-green-700' },
          { label: 'Outstanding', value: `₹${totalOutstanding.toLocaleString()}`, color: 'bg-red-50 text-red-700' },
          { label: 'Paid Today', value: '8', color: 'bg-teal-50 text-teal-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color} border border-white`}>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search patient..." className="max-w-sm" />
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
