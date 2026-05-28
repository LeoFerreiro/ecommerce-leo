import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div
      className="flex items-center gap-4
      bg-white border border-black/5
      rounded-2xl px-5 py-4"
    >

      <FaSearch className="text-gray-400" />

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none bg-transparent"
      />

    </div>
  );
}

export default SearchBar;