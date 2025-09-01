import { coverUrl } from "../utils/coverUrl";

export default function BookCard({ doc }) {
  return (
    <li className="bg-white rounded shadow overflow-hidden flex flex-col">
      <div className="aspect-[3/4] bg-slate-100 flex items-center justify-center">
        {doc.cover_i ? (
          <img
            src={coverUrl(doc.cover_i, "M")}
            alt={doc.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-slate-400">No cover</div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{doc.title}</h3>
        <p className="text-xs text-slate-600 mb-2">
          {doc.author_name?.join(", ") ?? "Unknown author"}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-slate-500">{doc.first_publish_year ?? "—"}</span>
          <a
            className="text-xs text-blue-600 hover:underline"
            href={`https://openlibrary.org${doc.key}`}
            target="_blank"
            rel="noreferrer"
          >
            Open
          </a>
        </div>
      </div>
    </li>
  );
}
