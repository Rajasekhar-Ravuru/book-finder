export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow">
      <div className="max-w-8xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Book Finder</h1>
          <p className="text-base opacity-80">Search books by title, author, or subject</p>
        </div>
      </div>
    </header>
  );
}
