import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { reportsService } from '@/services/reportsService';

const COLORS = ['#1e3a8a', '#0d9488', '#7c3aed', '#ea580c', '#db2777', '#16a34a', '#ca8a04', '#dc2626'];

export default function Reports() {
  const [trend, setTrend] = useState([]);
  const [deptStats, setDeptStats] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    reportsService.getMonthlyTrend().then(r => setTrend(r.data.data?.data || [])).catch(() => {});
    reportsService.getDepartmentStats().then(r => {
      const mapped = (r.data.data?.stats || []).map((s, i) => ({ name: s._id, value: s.count, color: COLORS[i % COLORS.length] }));
      setDeptStats(mapped);
    }).catch(() => {});
    reportsService.getSummary().then(r => setSummary(r.data.data || {})).catch(() => {});
  }, []);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Hospital performance metrics and reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients (YTD)', value: summary.totalPatients ?? '—' },
          { label: 'Revenue (YTD)', value: summary.totalRevenue ? `₹${Number(summary.totalRevenue).toLocaleString()}` : '—' },
          { label: 'Avg Daily OPD', value: summary.opdToday ?? '—' },
          { label: 'Total Admissions', value: summary.totalAdmissions ?? '—' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient & Revenue Trend */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Monthly Patients & Revenue</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={trend.length ? trend : [{ month: '-', patients: 0, revenue: 0 }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="patients" fill="#1e3a8a" radius={[4,4,0,0]} name="Patients" />
              <Bar yAxisId="right" dataKey="revenue" fill="#0d9488" radius={[4,4,0,0]} name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Patients by Department</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={deptStats.length ? deptStats : [{ name: 'No data', value: 1, color: '#e5e7eb' }]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {deptData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Report Links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Generate Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Patient Report', 'Revenue Report', 'Lab Report', 'Pharmacy Report', 'Appointment Report', 'Staff Report', 'IPD Report', 'OPD Report'].map(r => (
            <button key={r} className="p-3 text-sm border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors text-left">
              📄 {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
