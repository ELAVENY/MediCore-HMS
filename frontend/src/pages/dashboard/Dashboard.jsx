import {
  UserRound, Stethoscope, CalendarDays, BedDouble,
  TrendingUp, FlaskConical, Receipt, Users
} from 'lucide-react';
import DashboardCard from '@/components/common/DashboardCard';
import StatusBadge from '@/components/ui/StatusBadge';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

const appointmentData = [
  { month: 'Jun', appointments: 320, patients: 210 },
  { month: 'Jul', appointments: 380, patients: 250 },
  { month: 'Aug', appointments: 410, patients: 280 },
  { month: 'Sep', appointments: 390, patients: 260 },
  { month: 'Oct', appointments: 450, patients: 310 },
  { month: 'Nov', appointments: 480, patients: 330 },
];

const revenueData = [
  { month: 'Jun', revenue: 142000 },
  { month: 'Jul', revenue: 165000 },
  { month: 'Aug', revenue: 178000 },
  { month: 'Sep', revenue: 155000 },
  { month: 'Oct', revenue: 192000 },
  { month: 'Nov', revenue: 210000 },
];

const recentPatients = [
  { id: 'P-001', name: 'Arjun Kumar', age: 34, diagnosis: 'Hypertension', doctor: 'Dr. Priya', status: 'active' },
  { id: 'P-002', name: 'Meena Ravi', age: 28, diagnosis: 'Diabetes', doctor: 'Dr. Suresh', status: 'admitted' },
  { id: 'P-003', name: 'Karthik S', age: 52, diagnosis: 'Cardiac Care', doctor: 'Dr. Nila', status: 'critical' },
  { id: 'P-004', name: 'Divya P', age: 23, diagnosis: 'Fracture', doctor: 'Dr. Ramesh', status: 'active' },
  { id: 'P-005', name: 'Suresh M', age: 45, diagnosis: 'Kidney Stone', doctor: 'Dr. Priya', status: 'discharged' },
];

const upcomingAppointments = [
  { time: '09:00 AM', patient: 'Ravi Kumar', doctor: 'Dr. Priya', type: 'OPD' },
  { time: '10:30 AM', patient: 'Anitha S', doctor: 'Dr. Suresh', type: 'Follow-up' },
  { time: '11:15 AM', patient: 'Murugan K', doctor: 'Dr. Nila', type: 'OPD' },
  { time: '02:00 PM', patient: 'Lakshmi R', doctor: 'Dr. Ramesh', type: 'Review' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of MediCore HMS — Today, Nov 17 2026</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Patients" value="4,821" icon={UserRound} color="blue" trend="up" trendValue="+12% this month" />
        <DashboardCard title="Active Doctors" value="68" icon={Stethoscope} color="teal" />
        <DashboardCard title="Today's Appointments" value="143" icon={CalendarDays} color="purple" trend="up" trendValue="+8 from yesterday" />
        <DashboardCard title="Occupied Beds" value="204/280" icon={BedDouble} color="orange" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Pending Lab Tests" value="37" icon={FlaskConical} color="green" />
        <DashboardCard title="OPD Today" value="89" icon={Users} color="blue" />
        <DashboardCard title="Revenue (Nov)" value="₹2.1L" icon={Receipt} color="teal" trend="up" trendValue="+9% vs Oct" />
        <DashboardCard title="New Registrations" value="23" icon={TrendingUp} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Trend */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Appointments & Patients (6 Months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={appointmentData}>
              <defs>
                <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="appointments" stroke="#1e3a8a" fill="url(#colorApt)" strokeWidth={2} />
              <Area type="monotone" dataKey="patients" stroke="#0d9488" fill="url(#colorPat)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend (₹)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#0d9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Patients</h3>
            <a href="/patients" className="text-sm text-blue-600 hover:underline">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b border-gray-50">
                  <th className="pb-2 text-left">Patient ID</th>
                  <th className="pb-2 text-left">Name</th>
                  <th className="pb-2 text-left">Age</th>
                  <th className="pb-2 text-left">Diagnosis</th>
                  <th className="pb-2 text-left">Doctor</th>
                  <th className="pb-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {recentPatients.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 font-mono text-xs text-gray-500">{p.id}</td>
                    <td className="py-2.5 font-medium text-gray-800">{p.name}</td>
                    <td className="py-2.5 text-gray-500">{p.age}</td>
                    <td className="py-2.5 text-gray-600">{p.diagnosis}</td>
                    <td className="py-2.5 text-gray-600">{p.doctor}</td>
                    <td className="py-2.5"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
            <a href="/appointments" className="text-sm text-blue-600 hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="bg-blue-900 text-white text-xs font-semibold px-2 py-1 rounded-lg min-w-fit">
                  {apt.time}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{apt.patient}</p>
                  <p className="text-xs text-gray-500">{apt.doctor} · {apt.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
