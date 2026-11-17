import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardCard({ title, value, icon: Icon, trend, trendValue, color = 'blue', className }) {
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-700', border: 'border-blue-100' },
    teal: { bg: 'bg-teal-50', icon: 'text-teal-700', border: 'border-teal-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-700', border: 'border-green-100' },
    red: { bg: 'bg-red-50', icon: 'text-red-700', border: 'border-red-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-700', border: 'border-purple-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-700', border: 'border-orange-100' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={cn('bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trendValue !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend === 'up' ? 'text-green-600' : 'text-red-500')}>
              {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-xl', c.bg)}>
            <Icon className={cn('h-6 w-6', c.icon)} />
          </div>
        )}
      </div>
    </div>
  );
}
