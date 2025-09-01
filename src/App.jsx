import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchStatus from "./components/SearchStatus";
import Pagination from "./components/Pagination";
import BookList from "./components/BookList";
import Footer from "./components/Footer";

const PAGE_SIZE = 20;

export default function App() {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title"); // title | author | subject
  const [page, setPage] = useState(1);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);
  const canSearch = query.trim().length > 0;

  const url = useMemo(() => {
    const base = new URL("https://openlibrary.org/search.json");
    if (query.trim()) base.searchParams.set(searchBy, query.trim());
    base.searchParams.set("page", String(page));
    base.searchParams.set("limit", String(PAGE_SIZE));
    return base.toString();
  }, [query, searchBy, page]);

  const doSearch = async () => {
    if (!canSearch) {
      setData(null);
      setError(null);
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e?.message || "Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canSearch) doSearch();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    doSearch();
  };

  const total = data?.numFound ?? 0;
  const showingFrom = canSearch && data ? data.start + 1 : 0;
  const showingTo = canSearch && data ? data.start + data.docs.length : 0;
  const totalPages = total > 0 ? Math.ceil(total / PAGE_SIZE) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 flex-grow">
        <SearchForm
          query={query}
          setQuery={setQuery}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          onSubmit={onSubmit}
          loading={loading}
        />

        <SearchStatus error={error} canSearch={canSearch} />

        {canSearch && !error && (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {loading ? (
                  "Loading…"
                ) : data && total > 0 ? (
                  <span>
                    Showing <strong>{showingFrom}</strong>–<strong>{showingTo}</strong> of{" "}
                    <strong>{total.toLocaleString()}</strong>
                  </span>
                ) : (
                  "No results found."
                )}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                loading={loading}
              />
            </div>

            {loading && !data ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded shadow p-4 h-56" />
                ))}
              </div>
            ) : (
              <BookList docs={data?.docs ?? []} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
