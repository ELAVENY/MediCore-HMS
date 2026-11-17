import { cn } from '@/utils/cn';

export default function DataTable({ columns, data, loading = false, emptyMessage = 'No records found.' }) {
  if (loading) {
    return (
      <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn('px-4 py-3 text-left font-medium whitespace-nowrap', col.headerClass)}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row._id || i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 text-gray-700', col.cellClass)}>
                    {col.render ? col.render(row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
