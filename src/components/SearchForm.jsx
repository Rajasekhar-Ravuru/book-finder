export default function SearchForm({ query, setQuery, searchBy, setSearchBy, onSubmit, loading }) {
  const canSearch = query.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
    <section className="bg-white p-4 rounded shadow-sm ">
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="flex items-center gap-2 max-w-8xl mx-auto">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="border rounded px-3 py-2 bg-white"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
        </div>

        <input
         className="flex-grow min-w-0 border rounded px-3 py-2"
          placeholder={`Search by ${searchBy}… e.g. "harry potter"`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />

        <button
          type="submit"
          disabled={!canSearch || loading}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
          >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      <div className="text-xs text-slate-500 mt-2">
        Try: <span className="font-medium">harry potter</span>,{" "}
        <span className="font-medium">agatha christie</span>,{" "}
        <span className="font-medium">machine learning</span>
      </div>
    </section>
            </div>
  );
}
