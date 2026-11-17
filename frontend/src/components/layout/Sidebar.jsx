import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard, Users, UserRound, Stethoscope, CalendarDays,
  Clipboard, BedDouble, Building2, FileText, Pill, FlaskConical,
  Scan, Receipt, Truck, Droplets, UserCheck, BarChart3, X, Heart
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Patients', path: '/patients', icon: UserRound },
  { label: 'Doctors', path: '/doctors', icon: Stethoscope },
  { label: 'Appointments', path: '/appointments', icon: CalendarDays },
  { label: 'OPD', path: '/opd', icon: Clipboard },
  { label: 'IPD', path: '/ipd', icon: BedDouble },
  { label: 'Wards & Beds', path: '/wards', icon: Building2 },
  { label: 'Medical Records', path: '/medical-records', icon: FileText },
  { label: 'Prescriptions', path: '/prescriptions', icon: Pill },
  { label: 'Pharmacy', path: '/pharmacy', icon: FlaskConical },
  { label: 'Laboratory', path: '/laboratory', icon: Scan },
  { label: 'Radiology', path: '/radiology', icon: Scan },
  { label: 'Billing', path: '/billing', icon: Receipt },
  { label: 'Ambulance', path: '/ambulance', icon: Truck },
  { label: 'Blood Bank', path: '/blood-bank', icon: Droplets },
  { label: 'Staff', path: '/staff', icon: UserCheck },
  { label: 'User Roles', path: '/users', icon: Users },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-30 h-full w-64 bg-blue-950 text-white flex flex-col transition-transform duration-300',
          'lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <div className="bg-teal-500 p-1.5 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-base leading-none">MediCore</p>
              <p className="text-blue-400 text-xs">HMS</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-blue-900">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-blue-900">
          <p className="text-blue-500 text-xs">MediCore HMS v1.0</p>
        </div>
      </aside>
    </>
  );
}
