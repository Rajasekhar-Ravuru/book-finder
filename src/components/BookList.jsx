import BookCard from "./BookCard";

export default function BookList({ docs }) {
  if (!docs?.length) {
    return (
      <div className="bg-white p-6 rounded shadow text-center text-slate-600">
        No books matched your search.
      </div>
    );
  }

  return (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {docs.map((doc) => (
        <BookCard key={doc.key} doc={doc} />
      ))}
    </ul>
  );
}
