import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-[#d7e3d2] bg-white px-5 py-4 shadow-sm">
      <FaSearch className="text-[#1f7a3a]" />

      <input
        type="text"
        placeholder="Buscar indumentaria, marcas, deportes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-[#111813] outline-none placeholder:text-[#7b887e]"
      />
    </div>
  );
}

export default SearchBar;
