export default function SearchStatus({ error, canSearch }) {
  return (
    <section>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!canSearch && (
        <div className="bg-white p-6 rounded shadow-sm text-center text-slate-600">
          Enter a search term above and press Search to find books.
        </div>
      )}
    </section>
  );
}

