import { useSearch } from '../hooks/useSearch';

export const Header = () => {
  const { search, setSearch } = useSearch();

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-lg font-black text-white">
            SO
          </div>
          <span className="bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
            ShopOnline
          </span>
        </div>
        <div className="relative w-full md:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-lg border border-gray-300 bg-pink-50 py-2 pr-4 pl-10 text-gray-700 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-pink-300 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};
