import { cn } from '@/utils/cn';

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-teal-100 text-teal-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-orange-100 text-orange-800',
  pending: 'bg-yellow-100 text-yellow-800',
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-red-100 text-red-800',
  maintenance: 'bg-orange-100 text-orange-800',
  admitted: 'bg-blue-100 text-blue-800',
  discharged: 'bg-gray-100 text-gray-700',
  critical: 'bg-red-200 text-red-900',
  paid: 'bg-green-100 text-green-800',
  unpaid: 'bg-red-100 text-red-800',
  partial: 'bg-yellow-100 text-yellow-800',
};

export default function StatusBadge({ status, label, className }) {
  const style = statusStyles[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        style,
        className
      )}
    >
      {label || status}
    </span>
  );
}
