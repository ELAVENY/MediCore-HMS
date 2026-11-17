import { cn } from '@/utils/cn';

const variants = {
  primary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-700',
  secondary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline: 'border border-blue-900 text-blue-900 hover:bg-blue-50 focus:ring-blue-700',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}
