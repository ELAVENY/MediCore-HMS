import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jun', patients: 320, revenue: 142000 },
  { month: 'Jul', patients: 380, revenue: 165000 },
  { month: 'Aug', patients: 410, revenue: 178000 },
  { month: 'Sep', patients: 390, revenue: 155000 },
  { month: 'Oct', patients: 450, revenue: 192000 },
  { month: 'Nov', patients: 480, revenue: 210000 },
];

const deptData = [
  { name: 'Cardiology', value: 320, color: '#1e3a8a' },
  { name: 'Orthopedics', value: 210, color: '#0d9488' },
  { name: 'General', value: 450, color: '#7c3aed' },
  { name: 'Neurology', value: 180, color: '#ea580c' },
  { name: 'Maternity', value: 150, color: '#db2777' },
];

export default function Reports() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Hospital performance metrics and reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients (YTD)', value: '4,821' },
          { label: 'Revenue (YTD)', value: '₹18.6L' },
          { label: 'Avg Daily OPD', value: '89' },
          { label: 'Bed Occupancy Rate', value: '72%' },
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
            <BarChart data={monthlyData}>
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
              <Pie data={deptData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
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
