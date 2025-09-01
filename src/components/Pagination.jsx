export default function Pagination({ page, totalPages, setPage, loading }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page <= 1 || loading}
        className="border px-3 py-1 rounded disabled:opacity-60"
      >
        Prev
      </button>
      <div className="text-xs text-slate-600">
        Page {page}
        {totalPages ? ` / ${totalPages}` : ""}
      </div>
      <button
        onClick={() => setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
        disabled={loading || (totalPages > 0 && page >= totalPages)}
        className="border px-3 py-1 rounded disabled:opacity-60"
      >
        Next
      </button>
    </div>
  );
}
