import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const styles = {
  success: 'border-green-200 bg-green-50',
  error: 'border-red-200 bg-red-50',
  info: 'border-blue-200 bg-blue-50',
};

export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg animate-fade-in',
            styles[t.type]
          )}
        >
          {icons[t.type]}
          <p className="text-sm text-gray-800 flex-1">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
